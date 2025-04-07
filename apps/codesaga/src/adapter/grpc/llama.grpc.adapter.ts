import { ClientGrpc } from '@nestjs/microservices';
import { LlamaTransportPort } from '../../port/llama.transport.port';
import { LlamaMicroService } from '@app/common';
import { Inject, OnModuleInit } from '@nestjs/common';
import { LLAMA_SERVICE_NAME } from '@app/common/grpc/proto/llama';
import { lastValueFrom } from 'rxjs';

export class LlamaGrpcAdapter implements LlamaTransportPort, OnModuleInit {
    private llamaService: LlamaMicroService.LlamaServiceClient;

    constructor(
        @Inject(LLAMA_SERVICE_NAME)
        private readonly llamaMicroService: ClientGrpc,
    ) {}

    onModuleInit() {
        this.llamaService =
            this.llamaMicroService.getService(LLAMA_SERVICE_NAME);
    }

    async createLLamaRequest(
        request: LlamaMicroService.CreateLLamaRequestRequest,
    ): Promise<LlamaMicroService.CreateLLamaRequestResponse> {
        const stream = this.llamaService.createLLamaRequest(request);
        const response = await lastValueFrom(stream);
        return response;
    }
}
