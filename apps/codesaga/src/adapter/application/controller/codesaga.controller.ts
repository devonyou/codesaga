import { CodesagaMicroService } from '@app/common';
import { Controller } from '@nestjs/common';
import { CreateCodesagaUsecase } from 'apps/codesaga/src/usecase/create.codesaga.usecase';

@Controller()
@CodesagaMicroService.CodesagaServiceControllerMethods()
export class CodesagaController
    implements CodesagaMicroService.CodesagaServiceController
{
    constructor(
        private readonly createCodesagaUsecase: CreateCodesagaUsecase,
    ) {}

    async createCodesaga(
        request: CodesagaMicroService.CreateCodesagaRequest,
    ): Promise<CodesagaMicroService.CreateCodesagaResponse> {
        return this.createCodesagaUsecase.execute(request);
    }
}
