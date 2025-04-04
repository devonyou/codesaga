import { AuthMicroService } from '@app/common';
import { Controller } from '@nestjs/common';
import { FindOrCreateUserUsecase } from '../../../usecase/findorcreate.user.usecase';
import { IssueTokenUsecase } from 'apps/auth/src/usecase/issue.token.usecase';
import { VerifyTokenUsecase } from 'apps/auth/src/usecase/verify.token.usecase';

@Controller()
@AuthMicroService.AuthServiceControllerMethods()
export class AuthController implements AuthMicroService.AuthServiceController {
    constructor(
        private readonly findOrCreateUserUsecase: FindOrCreateUserUsecase,
        private readonly issueTokenUsecase: IssueTokenUsecase,
        private readonly verifyTokenUsecase: VerifyTokenUsecase,
    ) {}

    async findOrCreateUser(
        request: AuthMicroService.FindOrCreateUserRequest,
    ): Promise<AuthMicroService.FindOrCreateUserResponse> {
        return await this.findOrCreateUserUsecase.execute(request);
    }

    issueTokenByUserId(
        request: AuthMicroService.IssueTokenByUserIdRequest,
    ): Promise<AuthMicroService.IssueTokenByUserIdResponse> {
        const { id: userId } = request;
        return this.issueTokenUsecase.execute(userId);
    }

    async verifyToken(
        request: AuthMicroService.VerifyTokenRequest,
    ): Promise<AuthMicroService.VerifyTokenResponse> {
        const payload = await this.verifyTokenUsecase.execute(request);
        return payload;
    }
}
