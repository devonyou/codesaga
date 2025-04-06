import { AuthMicroService } from '@app/common';
import { Controller } from '@nestjs/common';
import { FindOrCreateUserUsecase } from '../../../usecase/findorcreate.user.usecase';
import { IssueTokenUsecase } from 'apps/auth/src/usecase/issue.token.usecase';
import { VerifyTokenUsecase } from 'apps/auth/src/usecase/verify.token.usecase';
import { FindUserUsecase } from 'apps/auth/src/usecase/find.user.usecase';

@Controller()
@AuthMicroService.AuthServiceControllerMethods()
export class AuthController implements AuthMicroService.AuthServiceController {
    constructor(
        private readonly findOrCreateUserUsecase: FindOrCreateUserUsecase,
        private readonly issueTokenUsecase: IssueTokenUsecase,
        private readonly verifyTokenUsecase: VerifyTokenUsecase,
        private readonly findUserUsecase: FindUserUsecase,
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

    async findUserById(
        request: AuthMicroService.FindUserByIdRequest,
    ): Promise<AuthMicroService.FindUserByIdResponse> {
        const user = await this.findUserUsecase.execute(request.userId);
        return {
            id: user.id,
            name: user.userProfile.name,
        };
    }
}
