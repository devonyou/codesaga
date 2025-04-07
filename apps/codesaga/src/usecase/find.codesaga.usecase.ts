import { Injectable } from '@nestjs/common';
import { CodesagaDatabasePort } from '../port/codesaga.database.port';
import { CodesagaMicroService } from '@app/common';

@Injectable()
export class FindCodesagaUsecase {
    constructor(private readonly codesagaDatabasePort: CodesagaDatabasePort) {}

    async execute(
        request: CodesagaMicroService.FindCodesagaByIdRequest,
    ): Promise<CodesagaMicroService.FindCodesagaByIdResponse> {
        const codesaga = await this.codesagaDatabasePort.findCodesagaById(
            request.id,
        );
        return codesaga;
    }
}
