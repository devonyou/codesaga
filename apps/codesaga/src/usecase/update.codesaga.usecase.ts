import { Injectable } from '@nestjs/common';
import { CodesagaDatabasePort } from '../port/codesaga.database.port';
import { CodesagaMicroService } from '@app/common';
import { RequestStatus } from '../domain/codesaga.request.domain';

@Injectable()
export class UpdateCodesagaUsecase {
    constructor(private readonly codesagaDatabasePort: CodesagaDatabasePort) {}

    async execute(
        request: CodesagaMicroService.UpdateCodesagaRequest,
    ): Promise<CodesagaMicroService.UpdateCodesagaResponse> {
        const { id, response, status } = request;

        const codesagaRequest =
            await this.codesagaDatabasePort.findCodesagaById(id);
        if (response) codesagaRequest.setResponse(response);
        if (status) codesagaRequest.setStatus(status as RequestStatus);

        const updatedCodesagaRequest =
            await this.codesagaDatabasePort.updateCodesaga(codesagaRequest);

        return updatedCodesagaRequest;
    }
}
