import { Injectable } from '@nestjs/common';
import { CodesagaDatabasePort } from '../../port/codesaga.database.port';
import { CodeRequestDomain } from '../../domain/codesaga.request.domain';
import { InjectModel } from '@nestjs/mongoose';
import { CodesagaRequestDocument } from './document/codesaga.request.document';
import { Model } from 'mongoose';

@Injectable()
export class CodesagaModelAdapter implements CodesagaDatabasePort {
    constructor(
        @InjectModel(CodesagaRequestDocument.name)
        private readonly codesagaRequestModel: Model<CodesagaRequestDocument>,
    ) {}

    async createCodesaga(
        codesaga: CodeRequestDomain,
    ): Promise<CodeRequestDomain> {
        const codesagaRequest =
            await this.codesagaRequestModel.create(codesaga);

        const domain = new CodeRequestDomain(codesagaRequest);
        domain.setId(codesagaRequest._id.toString());
        domain.setStatus(codesagaRequest.status);
        domain.setResponse(codesagaRequest.response);

        return domain;
    }
}
