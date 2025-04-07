import { LlamaRequestDomain } from '../domain/llama.request.domain';

export abstract class LlamaDatabasePort {
    abstract createLLamaRequest(
        request: LlamaRequestDomain,
    ): Promise<LlamaRequestDomain>;

    abstract updateLLamaRequest(
        llamaRequest: LlamaRequestDomain,
    ): Promise<LlamaRequestDomain>;

    abstract findLLamaRequestById(id: string): Promise<LlamaRequestDomain>;
}
