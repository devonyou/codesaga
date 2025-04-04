import { AuthMicroService } from '@app/common';
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { FindOrCreateUserUsecase } from '../../../usecase/findorcreate.user.usecase';

@Controller()
@AuthMicroService.AuthServiceControllerMethods()
export class AuthController implements AuthMicroService.AuthServiceController {
    constructor(
        private readonly findOrCreateUserUsecase: FindOrCreateUserUsecase,
    ) {}

    async findOrCreateUser(
        request: AuthMicroService.FindOrCreateUserRequest,
    ): Promise<AuthMicroService.FindOrCreateUserResponse> {
        return await this.findOrCreateUserUsecase.execute(request);
    }

    issueTokenByGithubId(
        request: AuthMicroService.IssueTokenByGithubIdRequest,
    ): Promise<AuthMicroService.IssueTokenByGithubIdResponse> {
        return new Promise(resolve =>
            resolve({
                accessToken: 'string',
                refreshToken: 'string',
            }),
        );
    }
}
