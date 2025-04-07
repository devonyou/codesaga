import { LlamaMicroService } from '@app/common';

export abstract class LlamaTransportPort {
    abstract createLLamaRequest(
        request: LlamaMicroService.CreateLLamaRequestRequest,
    ): Promise<LlamaMicroService.CreateLLamaRequestResponse>;
}
