import { CodesagaMicroService } from '@app/common';

export abstract class CodesagaTransportPort {
    abstract updateCodesaga(
        request: CodesagaMicroService.UpdateCodesagaRequest,
    ): Promise<CodesagaMicroService.UpdateCodesagaResponse>;

    abstract findCodesagaByIdRequest(
        request: CodesagaMicroService.FindCodesagaByIdRequest,
    ): Promise<CodesagaMicroService.FindCodesagaByIdResponse>;
}
