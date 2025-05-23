// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.7.0
//   protoc               v5.29.3
// source: proto/codesaga.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "codesaga";

export interface CreateCodesagaRequest {
  userId: string;
  requestType: string;
  language: string;
  codeContext: string;
  filepath: string;
  lineNumber: number;
}

export interface CreateCodesagaResponse {
  id: string;
  requestType: string;
  language: string;
  codeContext: string;
  user: CreateCodesagaResponse_User | undefined;
  response: string;
}

export interface CreateCodesagaResponse_User {
  id: string;
  name: string;
}

export interface UpdateCodesagaRequest {
  id: string;
  response?: string | undefined;
  status?: string | undefined;
}

export interface UpdateCodesagaResponse {
  id: string;
  response: string;
  status: string;
  codeContext: string;
}

export interface FindCodesagaByIdRequest {
  id: string;
}

export interface FindCodesagaByIdResponse {
  id: string;
  language: string;
  codeContext: string;
  status: string;
  response: string;
}

export const CODESAGA_PACKAGE_NAME = "codesaga";

export interface CodesagaServiceClient {
  createCodesaga(request: CreateCodesagaRequest, metadata?: Metadata): Observable<CreateCodesagaResponse>;

  updateCodesaga(request: UpdateCodesagaRequest, metadata?: Metadata): Observable<UpdateCodesagaResponse>;

  findCodesagaById(request: FindCodesagaByIdRequest, metadata?: Metadata): Observable<FindCodesagaByIdResponse>;
}

export interface CodesagaServiceController {
  createCodesaga(
    request: CreateCodesagaRequest,
    metadata?: Metadata,
  ): Promise<CreateCodesagaResponse> | Observable<CreateCodesagaResponse> | CreateCodesagaResponse;

  updateCodesaga(
    request: UpdateCodesagaRequest,
    metadata?: Metadata,
  ): Promise<UpdateCodesagaResponse> | Observable<UpdateCodesagaResponse> | UpdateCodesagaResponse;

  findCodesagaById(
    request: FindCodesagaByIdRequest,
    metadata?: Metadata,
  ): Promise<FindCodesagaByIdResponse> | Observable<FindCodesagaByIdResponse> | FindCodesagaByIdResponse;
}

export function CodesagaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createCodesaga", "updateCodesaga", "findCodesagaById"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CodesagaService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CodesagaService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CODESAGA_SERVICE_NAME = "CodesagaService";
