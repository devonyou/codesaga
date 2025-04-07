import { LlamaMicroService } from '@app/common';
import { Controller } from '@nestjs/common';
import { CreateLLamaRequestUsecase } from '../../../usecase/create.llama.request.usecase';

@Controller('llama')
@LlamaMicroService.LlamaServiceControllerMethods()
export class LLaMAController
    implements LlamaMicroService.LlamaServiceController
{
    constructor(
        private readonly createLLamaRequestUsecase: CreateLLamaRequestUsecase,
    ) {}

    async createLLamaRequest(
        request: LlamaMicroService.CreateLLamaRequestRequest,
    ): Promise<LlamaMicroService.CreateLLamaRequestResponse> {
        return this.createLLamaRequestUsecase.execute(request);
    }
}
