import { InjectModel } from '@nestjs/mongoose';
import { LlamaDatabasePort } from '../../port/llama.database.port';
import { LlamaRequestDocument } from './document/llama.request.document';
import { Model } from 'mongoose';
import {
    LlamaRequestDomain,
    RequestStatus,
} from '../../domain/llama.request.domain';
import { UserDomain } from '../../domain/user.domain';
import { CodesagaDomain } from '../../domain/codesaga.domain';

export class LlamaModelAdapter implements LlamaDatabasePort {
    constructor(
        @InjectModel(LlamaRequestDocument.name)
        private readonly llamaRequestModel: Model<LlamaRequestDocument>,
    ) {}

    async findLLamaRequestById(id: string): Promise<LlamaRequestDomain> {
        const result = await this.llamaRequestModel.findById(id);

        const llamaRequest = new LlamaRequestDomain({
            user: new UserDomain(result.user),
            codesaga: new CodesagaDomain(result.codesaga),
            status: result.status as RequestStatus,
        });
        llamaRequest.setId(result._id.toString());
        llamaRequest.setProcessingTime(result.processingTime);
        llamaRequest.setResponse(result.response);
        llamaRequest.setStatus(result.status as RequestStatus);

        return llamaRequest;
    }

    async createLLamaRequest(
        request: LlamaRequestDomain,
    ): Promise<LlamaRequestDomain> {
        const result = await this.llamaRequestModel.create(request);
        return this.findLLamaRequestById(result._id.toString());
    }

    async updateLLamaRequest(
        llamaRequest: LlamaRequestDomain,
    ): Promise<LlamaRequestDomain> {
        await this.llamaRequestModel.findByIdAndUpdate(
            llamaRequest.id,
            llamaRequest,
        );
        return this.findLLamaRequestById(llamaRequest.id);
    }
}
