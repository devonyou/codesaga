import { Injectable } from '@nestjs/common';
import { LlamaMicroService } from '@app/common';
import { LlamaDatabasePort } from '../port/llama.database.port';
import { UserTransportPort } from '../port/user.transport.port';
import { CodesagaTransportPort } from '../port/codesaga.transport.port';
import { UserDomain } from '../domain/user.domain';
import {
    LlamaRequestDomain,
    RequestStatus,
} from '../domain/llama.request.domain';
import { LlamaAiPort } from '../port/llama.ai.port';
import { LlamaAiDomain } from '../domain/llama.ai.domain';
import { CodesagaDomain } from '../domain/codesaga.domain';

@Injectable()
export class CreateLLamaRequestUsecase {
    constructor(
        private readonly llamaDatabasePort: LlamaDatabasePort,
        private readonly userTransportPort: UserTransportPort,
        private readonly codesagaTransportPort: CodesagaTransportPort,
        private readonly llamaAiPort: LlamaAiPort,
    ) {}

    async execute(
        request: LlamaMicroService.CreateLLamaRequestRequest,
    ): Promise<LlamaMicroService.CreateLLamaRequestResponse> {
        const startTime = Date.now();
        const { userId, codesagaRequestId, requestType, codeContext } = request;

        const user = await this.userTransportPort.findUserById(request.userId);

        // codesaga 조회
        const codesaga =
            await this.codesagaTransportPort.findCodesagaByIdRequest({
                id: codesagaRequestId,
            });

        // codesaga 상태 업데이트
        await this.codesagaTransportPort.updateCodesaga({
            id: codesagaRequestId,
            status: 'IN_PROGRESS',
        });

        let llamaRequest = await this.llamaDatabasePort.createLLamaRequest(
            new LlamaRequestDomain({
                user: new UserDomain({
                    id: user.id,
                    name: user.name,
                }),
                codesaga: new CodesagaDomain({
                    id: codesaga.id,
                    language: codesaga.language,
                    codeContext: codesaga.codeContext,
                }),
                status: RequestStatus.PENDING,
            }),
        );

        // llama server 요청
        const llamaAi = await this.llamaAiPort.generateLlamaAi(
            new LlamaAiDomain(codeContext),
        );

        // llamaRequest 응답 저장
        const processTime = Date.now() - startTime;
        llamaRequest.setResponse(llamaAi.response);
        llamaRequest.setStatus(RequestStatus.COMPLETED);
        llamaRequest.setProcessingTime(processTime);
        llamaRequest =
            await this.llamaDatabasePort.updateLLamaRequest(llamaRequest);

        // codesaga 상태업데이트
        await this.codesagaTransportPort.updateCodesaga({
            id: codesaga.id,
            status: 'COMPLETED',
            response: llamaAi.response,
        });

        // 응답 반환
        return {
            id: llamaRequest.id,
            response: llamaRequest.response,
        };
    }
}
