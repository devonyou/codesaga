import { Inject, OnModuleInit } from '@nestjs/common';
import { CodesagaTransportPort } from '../../port/codesaga.transport.port';
import { CodesagaMicroService } from '@app/common';
import { CODESAGA_SERVICE_NAME } from '@app/common/grpc/proto/codesaga';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

export class CodesagaGrpcAdapter
    implements CodesagaTransportPort, OnModuleInit
{
    private codesagaService: CodesagaMicroService.CodesagaServiceClient;

    constructor(
        @Inject(CODESAGA_SERVICE_NAME)
        private readonly codesagaMicroService: ClientGrpc,
    ) {}

    async onModuleInit() {
        this.codesagaService = this.codesagaMicroService.getService(
            CODESAGA_SERVICE_NAME,
        );
    }

    async updateCodesaga(
        request: CodesagaMicroService.UpdateCodesagaRequest,
    ): Promise<CodesagaMicroService.UpdateCodesagaResponse> {
        const stream = this.codesagaService.updateCodesaga(request);
        const response = await lastValueFrom(stream);
        return response;
    }

    async findCodesagaByIdRequest(
        request: CodesagaMicroService.FindCodesagaByIdRequest,
    ): Promise<CodesagaMicroService.FindCodesagaByIdResponse> {
        const stream = this.codesagaService.findCodesagaById(request);
        const response = await lastValueFrom(stream);
        return response;
    }
}
