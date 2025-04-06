import { Injectable } from '@nestjs/common';
import { CodesagaDatabasePort } from '../port/codesaga.database.port';
import { CodesagaMicroService } from '@app/common';
import {
    CodeRequestDomain,
    RequestType,
} from '../domain/codesaga.request.domain';
import { UserTransportPort } from '../port/user.transport.port';

@Injectable()
export class CreateCodesagaUsecase {
    constructor(
        private readonly codesagaDatabasePort: CodesagaDatabasePort,
        private readonly userTransportPort: UserTransportPort,
    ) {}

    async execute(
        request: CodesagaMicroService.CreateCodesagaRequest,
    ): Promise<CodesagaMicroService.CreateCodesagaResponse> {
        const user = await this.userTransportPort.findUserById(request.userId);

        const codesaga = await this.codesagaDatabasePort.createCodesaga(
            new CodeRequestDomain({
                user: user,
                requestType: request.requestType as RequestType,
                language: request.language,
                codeContext: request.codeContext,
            }),
        );

        return codesaga;
    }
}
