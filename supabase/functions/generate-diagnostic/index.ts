import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';
import { authenticateUser } from '../_shared/auth.ts';
import { generateSharedObject } from '../_shared/ai.ts';
import { z } from 'npm:zod';

const DiagnosticPillarSchema = z.object({
  title: z.string(),
  description: z.string(),
  data: z.array(z.object({
    subject: z.string(),
    a: z.number(),
    fullMark: z.number(),
  })),
});

const DiagnosticRecommendationSchema = z.object({
  text: z.string(),
  priority: z.enum(["Alta", "Media", "Baja"]),
  category: z.string(),
});

const DiagnosticDistributionSchema = z.object({
  name: z.string(),
  value: z.number(),
  color: z.string(),
});

const DiagnosticResultSchema = z.object({
  overallScore: z.number(),
  scoreLabel: z.string(),
  scoreDescription: z.string(),
  conclusionsMarkdown: z.string(),
  pillars: z.array(DiagnosticPillarSchema),
  recommendations: z.array(DiagnosticRecommendationSchema),
  distributions: z.array(DiagnosticDistributionSchema),
});

Deno.serve(async (req: Request) => {
  const preflight = handleCors(req);
  if (preflight) return preflight;

  console.log(`[generate-diagnostic] Received request: ${req.method} ${req.url}`);

  try {
    const authHeader = req.headers.get('Authorization');
    const { supabase, userId } = await authenticateUser(authHeader, { request: req });
    console.log(`[generate-diagnostic] User authenticated: ${userId}`);

    if (req.method !== 'POST') {
      console.warn(`[generate-diagnostic] Method not allowed: ${req.method}`);
      return errorResponse(new Error('Method not allowed'), 405);
    }

    const { businessId } = await req.json();
    if (!businessId) {
      console.warn(`[generate-diagnostic] businessId missing in request`);
      return errorResponse(new Error('businessId is required'), 400);
    }

    console.log(`[generate-diagnostic] Fetching business info for businessId: ${businessId}`);
    // Check ownership
    const { data: business, error: bizError } = await supabase
      .schema('public_web')
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .eq('user_owner_id', userId)
      .single();

    if (bizError || !business) {
      console.error(`[generate-diagnostic] Business check failed:`, bizError);
      return errorResponse(new Error('Business not found or unauthorized'), 404);
    }

    console.log(`[generate-diagnostic] Fetching user responses for businessId: ${businessId}`);
    // Get responses and questions
    const { data: responses, error: respError } = await supabase
      .schema('public_web')
      .from('responses')
      .select('response_text, questions(question_text, question_type)')
      .eq('business_id', businessId);

    if (respError) {
      console.error(`[generate-diagnostic] Error fetching responses:`, respError);
      throw respError;
    }

    const qaPairs = (responses || []).map((r: any) => ({
      question: r.questions?.question_text,
      response: r.response_text,
    }));

    console.log(`[generate-diagnostic] Fetched ${qaPairs.length} responses. Prompting AI for assessment...`);

    const systemInstruction = `You are a world-class IT and artificial intelligence consultant. Your role is to assess companies and generate detailed digital maturity diagnostics based on their questionnaire responses.`;

    const prompt = `
Generate a comprehensive IT and AI maturity diagnostic for the following company.

### Company Profile:
${JSON.stringify(business, null, 2)}

### Questionnaire Responses:
${JSON.stringify(qaPairs, null, 2)}

### Guidelines for Assessment:
1. Overall Score: Assign a score from 0 to 100 indicating their overall AI readiness/maturity.
2. Score Label & Description: Label their level (e.g. "Inicial", "Básico", "Intermedio", "Avanzado") and describe what this means for their sector.
3. Conclusions: Provide deep, actionable conclusions in Markdown format summarizing strengths and key gap areas.
4. Pillars: Identify 3 to 4 key pillars (e.g. Infrastructure, Talent, Strategy, Governance) and rate them for the radar chart.
5. Actionable Recommendations: Create specific, prioritized recommendations categorized by impact/difficulty. Use priority levels: "Alta", "Media", or "Baja".
6. Distributions: Provide distribution values showing the estimated resource or attention allocation across key areas (e.g. Talent, Infrastructure, Budget). Ensure color strings are valid HEX colors.
7. Language Requirement: The final output (labels, descriptions, texts, pillar titles) MUST be entirely in Spanish, as the client ONLY speaks Spanish.
`;

    const { object, meta } = await generateSharedObject({
      prompt,
      system: systemInstruction,
      schema: DiagnosticResultSchema,
    });

    console.log(`[generate-diagnostic] Assessment generated successfully using model ${meta.modelUsed} after ${meta.attemptsCount} attempts.`);
    console.log(`[generate-diagnostic] Attempts log: ${JSON.stringify(meta.attemptsLog)}`);

    // 1. Insert Diagnostic
    console.log(`[generate-diagnostic] Inserting diagnostic record...`);
    const { data: diag, error: diagError } = await supabase
      .schema('public_web')
      .from('diagnostics')
      .insert({
        business_id: businessId,
        overall_score: object.overallScore,
        score_label: object.scoreLabel,
        score_description: object.scoreDescription,
        conclusions_markdown: object.conclusionsMarkdown
      })
      .select()
      .single();

    if (diagError) {
      console.error(`[generate-diagnostic] Error inserting diagnostic:`, diagError);
      throw diagError;
    }
    const diagnosticId = diag.id;
    console.log(`[generate-diagnostic] Diagnostic inserted. ID: ${diagnosticId}`);

    // 2. Insert Distributions
    if (object.distributions.length > 0) {
      console.log(`[generate-diagnostic] Inserting ${object.distributions.length} distributions...`);
      const { error: distError } = await supabase
        .schema('public_web')
        .from('diagnostic_distributions')
        .insert(object.distributions.map(d => ({
          diagnostic_id: diagnosticId,
          name: d.name,
          value: Math.round(d.value),   // DB column is integer
          color: d.color,
        })));
      if (distError) {
        console.error(`[generate-diagnostic] Error inserting distributions:`, distError);
        throw distError;
      }
    }

    // 3. Insert Recommendations
    if (object.recommendations.length > 0) {
      console.log(`[generate-diagnostic] Inserting ${object.recommendations.length} recommendations...`);
      const { error: recError } = await supabase
        .schema('public_web')
        .from('diagnostic_recommendations')
        .insert(object.recommendations.map(r => ({
          diagnostic_id: diagnosticId,
          ...r
        })));
      if (recError) {
        console.error(`[generate-diagnostic] Error inserting recommendations:`, recError);
        throw recError;
      }
    }

    // 4. Insert Pillars and Pillar Data
    console.log(`[generate-diagnostic] Inserting ${object.pillars.length} pillars...`);
    for (const pillar of object.pillars) {
      console.log(`[generate-diagnostic] Inserting pillar: "${pillar.title}"...`);
      const { data: p, error: pError } = await supabase
        .schema('public_web')
        .from('diagnostic_pillars')
        .insert({
          diagnostic_id: diagnosticId,
          title: pillar.title,
          description: pillar.description
        })
        .select()
        .single();

      if (pError) {
        console.error(`[generate-diagnostic] Error inserting pillar:`, pError);
        throw pError;
      }

      if (pillar.data.length > 0) {
        console.log(`[generate-diagnostic] Inserting ${pillar.data.length} data rows for pillar: "${pillar.title}"`);
        const { error: pDataError } = await supabase
          .schema('public_web')
          .from('diagnostic_pillar_data')
          .insert(pillar.data.map(d => ({
            pillar_id: p.id,
            subject: d.subject,
            a_value: d.a,
            full_mark: d.fullMark
          })));
        if (pDataError) {
          console.error(`[generate-diagnostic] Error inserting pillar data:`, pDataError);
          throw pDataError;
        }
      }
    }

    console.log(`[generate-diagnostic] Diagnostic fully saved. Returning success to client.`);
    return jsonResponse({ success: true, diagnosticId });
  } catch (error) {
    console.error('[generate-diagnostic] error:', error);
    return errorResponse(error, 500);
  }
});
