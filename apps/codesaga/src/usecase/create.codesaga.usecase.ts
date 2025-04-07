import { Injectable } from '@nestjs/common';
import { CodesagaDatabasePort } from '../port/codesaga.database.port';
import { CodesagaMicroService } from '@app/common';
import {
    CodesagaRequestDomain,
    RequestStatus,
    RequestType,
} from '../domain/codesaga.request.domain';
import { UserTransportPort } from '../port/user.transport.port';
import { LlamaTransportPort } from '../port/llama.transport.port';

@Injectable()
export class CreateCodesagaUsecase {
    constructor(
        private readonly codesagaDatabasePort: CodesagaDatabasePort,
        private readonly userTransportPort: UserTransportPort,
        private readonly llamaTransportPort: LlamaTransportPort,
    ) {}

    async execute(
        request: CodesagaMicroService.CreateCodesagaRequest,
    ): Promise<CodesagaMicroService.CreateCodesagaResponse> {
        const user = await this.userTransportPort.findUserById(request.userId);

        const codesaga = await this.codesagaDatabasePort.createCodesaga(
            new CodesagaRequestDomain({
                user: user,
                requestType: request.requestType as RequestType,
                language: request.language,
                codeContext: request.codeContext,
                status: RequestStatus.PENDING,
            }),
        );

        await this.llamaTransportPort.createLLamaRequest({
            userId: user.id,
            codesagaRequestId: codesaga.id,
            requestType: codesaga.requestType,
            codeContext: codesaga.codeContext,
        });

        return await this.codesagaDatabasePort.findCodesagaById(codesaga.id);
    }
}
