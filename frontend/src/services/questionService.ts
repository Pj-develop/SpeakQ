// src/services/questionService.ts

import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport';
import { QuestionServiceClient } from '../proto/question.client';

const transport = new GrpcWebFetchTransport({
  baseUrl:
    import.meta.env.MODE === 'development'
      ? 'https://speakq.onrender.com'
      : 'https://speakq.onrender.com',
});

const client = new QuestionServiceClient(transport);

interface SearchRequest {
  query: string;
  limit: number;
  page: number;
  type: string;
}

export const questionService = {
  getQuestions: async (params: SearchRequest) => {
    try {
      const { response } = await client.getQuestions(params);
      return response;
    } catch (err) {
      console.error('gRPC Error:', err);
      throw new Error('Failed to fetch questions 🥲');
    }
  },
};