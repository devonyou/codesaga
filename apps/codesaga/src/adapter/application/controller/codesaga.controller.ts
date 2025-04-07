import { CodesagaMicroService } from '@app/common';
import { Controller } from '@nestjs/common';
import { CreateCodesagaUsecase } from '../../../usecase/create.codesaga.usecase';
import { FindCodesagaUsecase } from '../../../usecase/find.codesaga.usecase';
import { UpdateCodesagaUsecase } from '../../../usecase/update.codesaga.usecase';

@Controller()
@CodesagaMicroService.CodesagaServiceControllerMethods()
export class CodesagaController
    implements CodesagaMicroService.CodesagaServiceController
{
    constructor(
        private readonly createCodesagaUsecase: CreateCodesagaUsecase,
        private readonly findCodesagaUsecase: FindCodesagaUsecase,
        private readonly updateCodesagaUsecase: UpdateCodesagaUsecase,
    ) {}

    async createCodesaga(
        request: CodesagaMicroService.CreateCodesagaRequest,
    ): Promise<CodesagaMicroService.CreateCodesagaResponse> {
        return this.createCodesagaUsecase.execute(request);
    }

    async updateCodesaga(
        request: CodesagaMicroService.UpdateCodesagaRequest,
    ): Promise<CodesagaMicroService.UpdateCodesagaResponse> {
        return this.updateCodesagaUsecase.execute(request);
    }

    async findCodesagaById(
        request: CodesagaMicroService.FindCodesagaByIdRequest,
    ): Promise<CodesagaMicroService.FindCodesagaByIdResponse> {
        return this.findCodesagaUsecase.execute(request);
    }
}
