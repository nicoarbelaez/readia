import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';
import { authenticateUser } from '../_shared/auth.ts';
import { generateSharedObject } from '../_shared/ai.ts';
import { z } from 'npm:zod';

const RoadmapNodeSchema = z.object({
  id: z.string(),
  type: z.literal("CustomNode"),
  position: z.object({
    x: z.number(),
    y: z.number(),
  }),
  data: z.object({
    label: z.string(),
    type: z.string(),
    shortDescription: z.string(),
    description: z.string().optional(),
    owner: z.string().optional(),
    objectives: z.array(z.string()).optional(),
    actions: z.array(z.string()).optional(),
    tools: z.array(z.string()).optional(),
    kpis: z.array(z.string()).optional(),
    nextSteps: z.array(z.string()).optional(),
    isDone: z.boolean().optional(),
    timeline: z.string().optional(),
    subtasks: z.any().optional(),
  }),
});

const RoadmapEdgeSchema = z.object({
  id: z.string(),
  source: z.string(),
  target: z.string(),
  animated: z.boolean().optional(),
});

const RoadmapResultSchema = z.object({
  nodes: z.array(RoadmapNodeSchema),
  edges: z.array(RoadmapEdgeSchema),
});

Deno.serve(async (req: Request) => {
  const preflight = handleCors(req);
  if (preflight) return preflight;

  console.log(`[generate-roadmap] Received request: ${req.method} ${req.url}`);

  try {
    const authHeader = req.headers.get('Authorization');
    const { supabase, userId } = await authenticateUser(authHeader, { request: req });
    console.log(`[generate-roadmap] User authenticated: ${userId}`);

    if (req.method !== 'POST') {
      console.warn(`[generate-roadmap] Method not allowed: ${req.method}`);
      return errorResponse(new Error('Method not allowed'), 405);
    }

    const { businessId } = await req.json();
    if (!businessId) {
      console.warn(`[generate-roadmap] businessId missing in request`);
      return errorResponse(new Error('businessId is required'), 400);
    }

    console.log(`[generate-roadmap] Fetching business info for businessId: ${businessId}`);
    // Check ownership
    const { data: business, error: bizError } = await supabase
      .schema('public_web')
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .eq('user_owner_id', userId)
      .single();

    if (bizError || !business) {
      console.error(`[generate-roadmap] Business check failed:`, bizError);
      return errorResponse(new Error('Business not found or unauthorized'), 404);
    }

    console.log(`[generate-roadmap] Fetching diagnostic to base the roadmap on...`);
    // Get diagnostic to base the roadmap on
    const { data: diag, error: diagError } = await supabase
      .schema('public_web')
      .from('diagnostics')
      .select(`
        id, overall_score, score_label, score_description, conclusions_markdown,
        diagnostic_pillars (title, description, diagnostic_pillar_data (subject, a_value, full_mark)),
        diagnostic_recommendations (*)
      `)
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (diagError) {
      console.warn(`[generate-roadmap] Non-fatal or fatal error loading diagnostic:`, diagError);
    }

    console.log(`[generate-roadmap] Diagnostic details retrieved: ${diag ? 'Found' : 'Not Found'}. Prompting AI for roadmap strategy...`);

    const systemInstruction = `You are a world-class IT program manager and enterprise architect. Your role is to build a structured, step-by-step digital transformation roadmap for a business based on its profile and AI maturity diagnostic.`;

    const prompt = `
Generate a strategic implementation roadmap for the company below, basing the phases and tasks on their business context and the detailed results of their AI/IT diagnostic.

### Company Profile:
${JSON.stringify(business, null, 2)}

### Detailed AI & IT Diagnostic:
${JSON.stringify(diag, null, 2)}

### Guidelines for Roadmap Generation:
1. Node IDs: Create custom node IDs. To prevent database key collisions, use logical names like "phase-1", "phase-2", "task-1-1", "task-1-2" (these will be mapped to UUIDs dynamically in our database).
2. Layout: All nodes should be returned with position x: 0, y: 0, as our frontend uses a library (Dagre) to lay them out dynamically.
3. Structure: Construct a clear timeline/dependency graph:
   - Identify the stages of transformation (Phases).
   - Create specific subtasks (Tasks) belonging to each phase.
   - Connect these with edges to specify sequential order or dependencies.
4. Professional Spanish Translation: The final labels, short descriptions, descriptions, objectives, actions, and KPI texts MUST be entirely in Spanish, as the client ONLY speaks Spanish.
`;

    const { object, meta } = await generateSharedObject({
      prompt,
      system: systemInstruction,
      schema: RoadmapResultSchema,
    });

    console.log(`[generate-roadmap] Roadmap generated successfully using model ${meta.modelUsed} after ${meta.attemptsCount} attempts.`);
    console.log(`[generate-roadmap] Attempts log: ${JSON.stringify(meta.attemptsLog)}`);

    console.log(`[generate-roadmap] Roadmap generated successfully by AI. Nodes: ${object.nodes.length}, Edges: ${object.edges.length}. Saving to db...`);

    // 1. Insert Roadmap
    console.log(`[generate-roadmap] Inserting roadmap record...`);
    const { data: roadmap, error: roadmapError } = await supabase
      .schema('public_web')
      .from('roadmaps')
      .insert({
        business_id: businessId,
      })
      .select()
      .single();

    if (roadmapError) {
      console.error(`[generate-roadmap] Error inserting roadmap:`, roadmapError);
      throw roadmapError;
    }
    const roadmapId = roadmap.id;
    console.log(`[generate-roadmap] Roadmap inserted. ID: ${roadmapId}`);

    // Map AI-generated id -> fresh UUID
    const nodeIdMap = new Map<string, string>();

    // 2. Insert Nodes (use server-generated UUIDs to avoid PK collisions
    //    when the AI reuses the same logical IDs, e.g. 'phase-1', across runs)
    if (object.nodes.length > 0) {
      console.log(`[generate-roadmap] Inserting ${object.nodes.length} nodes...`);

      for (const n of object.nodes) {
        nodeIdMap.set(n.id, crypto.randomUUID());
      }

      const { error: nodeError } = await supabase
        .schema('public_web')
        .from('roadmap_nodes')
        .insert(object.nodes.map(n => ({
          id: nodeIdMap.get(n.id),   // server UUID, never collides
          roadmap_id: roadmapId,
          type: n.type,
          position_x: n.position.x,
          position_y: n.position.y,
          label: n.data.label,
          node_type: n.data.type,
          short_description: n.data.shortDescription,
          description: n.data.description,
          owner: n.data.owner,
          objectives: n.data.objectives,
          actions: n.data.actions,
          tools: n.data.tools,
          kpis: n.data.kpis,
          next_steps: n.data.nextSteps,
          is_done: n.data.isDone,
          timeline: n.data.timeline,
          subtasks: n.data.subtasks,
        })));
      if (nodeError) {
        console.error(`[generate-roadmap] Error inserting nodes:`, nodeError);
        throw nodeError;
      }
    }

    // 3. Insert Edges
    if (object.edges.length > 0) {
      console.log(`[generate-roadmap] Inserting ${object.edges.length} edges...`);
      const { error: edgeError } = await supabase
        .schema('public_web')
        .from('roadmap_edges')
        .insert(object.edges.map(e => ({
          id: crypto.randomUUID(),               // always fresh
          roadmap_id: roadmapId,
          source: nodeIdMap.get(e.source) ?? e.source,  // remapped UUID
          target: nodeIdMap.get(e.target) ?? e.target,  // remapped UUID
          animated: e.animated,
        })));
      if (edgeError) {
        console.error(`[generate-roadmap] Error inserting edges:`, edgeError);
        throw edgeError;
      }
    }

    console.log(`[generate-roadmap] Roadmap fully saved. Returning success to client.`);
    return jsonResponse({ success: true, roadmapId, nodes: object.nodes, edges: object.edges });
  } catch (error) {
    console.error('[generate-roadmap] error:', error);
    return errorResponse(error, 500);
  }
});
