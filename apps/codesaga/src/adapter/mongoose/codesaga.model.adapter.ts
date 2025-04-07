import { Injectable } from '@nestjs/common';
import { CodesagaDatabasePort } from '../../port/codesaga.database.port';
import { CodesagaRequestDomain } from '../../domain/codesaga.request.domain';
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
        codesaga: CodesagaRequestDomain,
    ): Promise<CodesagaRequestDomain> {
        const codesagaRequest =
            await this.codesagaRequestModel.create(codesaga);

        const domain = new CodesagaRequestDomain({
            user: codesagaRequest.user,
            requestType: codesagaRequest.requestType,
            language: codesagaRequest.language,
            codeContext: codesagaRequest.codeContext,
            status: codesagaRequest.status,
        });
        domain.setId(codesagaRequest._id.toString());
        domain.setStatus(codesagaRequest.status);

        return domain;
    }

    async updateCodesaga(
        codesaga: CodesagaRequestDomain,
    ): Promise<CodesagaRequestDomain> {
        const result = await this.codesagaRequestModel.findByIdAndUpdate(
            codesaga.id,
            codesaga,
        );
        return this.findCodesagaById(result._id.toString());
    }

    async findCodesagaById(id: string): Promise<CodesagaRequestDomain> {
        const result = await this.codesagaRequestModel.findById(id);

        const codesagaDomain = new CodesagaRequestDomain({
            user: result.user,
            requestType: result.requestType,
            language: result.language,
            codeContext: result.codeContext,
            status: result.status,
        });
        codesagaDomain.setId(result._id.toString());
        codesagaDomain.setResponse(result.response);
        codesagaDomain.setStatus(result.status);
        codesagaDomain.setResponse(result.response);

        return codesagaDomain;
    }
}
