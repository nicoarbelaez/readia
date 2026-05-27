import { handleCors } from '../_shared/cors.ts';
import { jsonResponse, errorResponse } from '../_shared/response.ts';
import { authenticateUser } from '../_shared/auth.ts';
import { generateSharedObject } from '../_shared/ai.ts';
import { z } from 'npm:zod';

// A robust schema that accepts options as either strings or objects to handle model variation
const QuestionOptionSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const QuestionSchema = z.object({
  id: z.string(),
  type: z.enum(["open", "multiple", "single"]),
  label: z.string(),
  options: z.array(
    z.union([
      z.string(),
      QuestionOptionSchema
    ])
  ).optional()
});

const QuestionsListSchema = z.array(QuestionSchema);

Deno.serve(async (req: Request) => {
  const preflight = handleCors(req);
  if (preflight) return preflight;

  console.log(`[generate-questions] Received request: ${req.method} ${req.url}`);

  try {
    const authHeader = req.headers.get('Authorization');
    const { supabase, userId } = await authenticateUser(authHeader, { request: req });
    console.log(`[generate-questions] User authenticated: ${userId}`);

    if (req.method !== 'POST') {
      console.warn(`[generate-questions] Method not allowed: ${req.method}`);
      return errorResponse(new Error('Method not allowed'), 405);
    }

    const body = await req.json();
    const { questionsAnswered, generalInfo, existingQuestions } = body;
    console.log(`[generate-questions] Request body parsed. Questions answered: ${questionsAnswered?.length ?? 0}, Existing: ${existingQuestions?.length ?? 0}`);

    console.log(`[generate-questions] Sending prompt to AI...`);

    const systemInstruction = `You are an expert enterprise IT and AI consultant. Your role is to generate follow-up assessment questions to evaluate a company's readiness and capabilities for adopting artificial intelligence.`;

    const prompt = `
Generate up to 10 additional follow-up questions for a company based on their previous responses and general business context.

### Company Context:
${JSON.stringify(generalInfo, null, 2)}

### Previously Answered Questions & Responses:
${JSON.stringify(questionsAnswered, null, 2)}

### Existing Questions Schema Reference:
${JSON.stringify(existingQuestions, null, 2)}

### Guidelines for Question Generation:
1. Relevancy: The new questions must explore deeper into topics touched upon in their previous responses, identifying gaps or opportunities.
2. Question Types: Each question must have a type of "open", "multiple", or "single".
3. Options: If the type is "multiple" or "single", you must include an "options" list.
4. Spanish Language Output: Since the UI is strictly in Spanish for the final users, all string contents (labels, options, values) MUST be written in Spanish.
`;

    const { object, meta } = await generateSharedObject({
      prompt,
      system: systemInstruction,
      schema: QuestionsListSchema,
      output: "array",
    });

    console.log(`[generate-questions] Questions generated successfully using model ${meta.modelUsed} after ${meta.attemptsCount} attempts.`);
    console.log(`[generate-questions] Attempts log: ${JSON.stringify(meta.attemptsLog)}`);

    console.log(`[generate-questions] Received raw object array with ${object?.flat()?.length ?? 0} questions.`);

    // Map questions to ensure standard option objects (value/label)
    const validatedQuestions = object.flat().map((q) => {
      if ((q.type === 'multiple' || q.type === 'single') && Array.isArray(q.options)) {
        return {
          ...q,
          options: q.options.map(opt => {
            if (typeof opt === 'string') {
              // Convert simple string to object
              const val = opt.toLowerCase()
                .trim()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "") // remove accents
                .replace(/[^a-z0-9]/g, "_")      // replace non-alphanumeric with _
                .replace(/_+/g, "_")             // collapse multiple underscores
                .replace(/^_+|_+$/g, "");        // trim leading/trailing underscores
              return { value: val || 'opt', label: opt };
            }
            return opt;
          })
        };
      }
      return q;
    });

    console.log(`[generate-questions] Mapping completed successfully. Returning ${validatedQuestions.length} conforming questions.`);
    return jsonResponse(validatedQuestions);
  } catch (error) {
    console.error('[generate-questions] error:', error);
    return errorResponse(error, 500);
  }
});
