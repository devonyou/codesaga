import { CodesagaMicroService } from '@app/common';
import { CODESAGA_SERVICE_NAME } from '@app/common/grpc/proto/codesaga';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateCodesagaRequestDto } from './dto/create.codesaga.dto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CodesagaService implements OnModuleInit {
    private codesagaService: CodesagaMicroService.CodesagaServiceClient;

    constructor(
        @Inject(CODESAGA_SERVICE_NAME)
        private readonly codesagaMicroService: ClientGrpc,
    ) {}

    onModuleInit() {
        this.codesagaService = this.codesagaMicroService.getService(
            CODESAGA_SERVICE_NAME,
        );
    }

    async createCodesaga(userId: string, body: CreateCodesagaRequestDto) {
        const stream = this.codesagaService.createCodesaga({
            userId: userId,
            requestType: body.requestType,
            language: body.language,
            codeContext: body.codeContext,
            filepath: body.filepath,
            lineNumber: body.lineNumber,
        });
        const resp = await lastValueFrom(stream);
        return resp;
    }
}
