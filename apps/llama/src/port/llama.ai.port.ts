import { LlamaAiDomain } from '../domain/llama.ai.domain';

export abstract class LlamaAiPort {
    abstract generateLlamaAi(request: LlamaAiDomain): Promise<LlamaAiDomain>;
}
