import { APIGatewayProxyEvent } from 'aws-lambda';
import { lambdaHandler } from '../../app';
import { expect, describe, it, jest, beforeEach } from '@jest/globals';

// --- Mocks ---

// 1. Mock Supabase
const mockInsert = jest.fn().mockReturnValue({ error: null });
const mockFrom = jest.fn().mockReturnValue({ insert: mockInsert });
jest.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        from: mockFrom
    })
}));

// 2. Mock Vercel AI SDK
jest.mock('ai', () => ({
    generateObject: jest.fn().mockResolvedValue({
        object: {
            diagnosis_summary: "Test Summary",
            risk_level: "LOW",
            roadmap: [] 
        }
    } as never)
}));

// 3. Mock Google Provider (es una factory function)
jest.mock('@ai-sdk/google', () => ({
    google: jest.fn()
}));

describe('GenerateDiagnosisFunction', function () {
    
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.SUPABASE_URL = 'https://mock.supabase.co';
        process.env.SUPABASE_KEY = 'mock-key';
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = 'mock-google-key';
    });

    it('should process input, call AI, save to DB and return 200', async () => {
        const event: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify({
                userId: "user-123",
                userContext: "My server is crashing"
            })
        };

        const result = await lambdaHandler(event as APIGatewayProxyEvent);

        expect(result.statusCode).toEqual(200);
        // Verificar que se llamó a Supabase
        expect(mockFrom).toHaveBeenCalledWith('diagnoses');
        expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
            user_id: "user-123",
            ai_result: expect.any(Object) // Verificamos que guarda el objeto
        }));
    });

    it('should return 400 if body is invalid', async () => {
        const event: Partial<APIGatewayProxyEvent> = {
            body: JSON.stringify({ missing: "fields" })
        };

        const result = await lambdaHandler(event as APIGatewayProxyEvent);
        expect(result.statusCode).toEqual(400);
    });
});