/**
 * @fileoverview gRPC-Web generated client stub for questions
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.29.3
// source: questions.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as questions_pb from './questions_pb'; // proto import: "questions.proto"


export class QuestionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorSearchQuestions = new grpcWeb.MethodDescriptor(
    '/questions.QuestionService/SearchQuestions',
    grpcWeb.MethodType.UNARY,
    questions_pb.SearchRequest,
    questions_pb.SearchResponse,
    (request: questions_pb.SearchRequest) => {
      return request.serializeBinary();
    },
    questions_pb.SearchResponse.deserializeBinary
  );

  searchQuestions(
    request: questions_pb.SearchRequest,
    metadata?: grpcWeb.Metadata | null): Promise<questions_pb.SearchResponse>;

  searchQuestions(
    request: questions_pb.SearchRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: questions_pb.SearchResponse) => void): grpcWeb.ClientReadableStream<questions_pb.SearchResponse>;

  searchQuestions(
    request: questions_pb.SearchRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: questions_pb.SearchResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/questions.QuestionService/SearchQuestions',
        request,
        metadata || {},
        this.methodDescriptorSearchQuestions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/questions.QuestionService/SearchQuestions',
    request,
    metadata || {},
    this.methodDescriptorSearchQuestions);
  }

}

