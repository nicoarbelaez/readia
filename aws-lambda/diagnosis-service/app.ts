import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { createClient } from '@supabase/supabase-js';
import { google } from '@ai-sdk/google';
import { generateObject } from 'ai';
import { z } from 'zod';

// --- Configuration & Initialization (Outside Handler) ---

// Validación de entorno
const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY!;

if (!SUPABASE_URL || !SUPABASE_KEY || !GOOGLE_API_KEY) {
    console.error('Missing Environment Variables');
}

// Inicializar clientes una sola vez (Reutilización de conexiones TCP/HTTP)
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Definición del Esquema de Salida (Zod) para la IA
const DiagnosisSchema = z.object({
    diagnosis_summary: z.string().describe('Resumen ejecutivo del diagnóstico'),
    risk_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('Nivel de riesgo detectado'),
    roadmap: z
        .array(
            z.object({
                phase: z.string(),
                actions: z.array(z.string()),
                estimated_timeline: z.string(),
            }),
        )
        .describe('Pasos a seguir detallados'),
});

/**
 * Handler Principal
 */
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Event received:', event.body);

    try {
        // 1. Parseo de entrada
        const body = JSON.parse(event.body || '{}');
        const { userId, userContext } = body;

        if (!userId || !userContext) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing userId or userContext' }),
            };
        }

        // NOTA: En una arquitectura puramente asíncrona (Event), el 'return' de abajo
        // no lo ve el usuario final HTTP, sino el destino del evento.
        // Si la invocación es síncrona (RequestResponse), el usuario esperará aquí.

        // 2. Llamada a Gemini (Heavy Logic)
        // Usamos el modelo flash para latencia baja, o pro para mayor razonamiento.
        console.log('Invoking Gemini...');
        const { object: diagnosisResult } = await generateObject({
            model: google('gemini-2.5-flash-lite'),
            schema: DiagnosisSchema,
            prompt: `Genera un diagnóstico técnico y un roadmap para el siguiente contexto: ${JSON.stringify(
                userContext,
            )}`,
        });

        // 3. Persistencia en Supabase
        console.log('Persisting to Supabase...');
        const { error: dbError } = await supabase
            .schema('public_web')
            .from('businesses')
            .insert({
                company_name: 'generalInfo.companyName',
                sector: 'generalInfo.sector',
                employee_count: 999,
                description: JSON.stringify(diagnosisResult.diagnosis_summary),
                user_owner_id: userId,
            });

        if (dbError) {
            throw new Error(`Supabase Error: ${dbError.message}`);
        }

        console.log('Success processing diagnosis for:', userId);

        return {
            statusCode: 200, // O 202 si el cliente lo maneja como tal
            body: JSON.stringify({
                message: 'Diagnosis generated and stored successfully',
                diagnosisId: diagnosisResult.risk_level, // Ejemplo de retorno
            }),
        };
    } catch (err: any) {
        console.error('Critical Error:', err);
        // Retornamos 500 para permitir que AWS Lambda reintente si es Async
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Internal Server Error',
                error: err.message,
            }),
        };
    }
};
