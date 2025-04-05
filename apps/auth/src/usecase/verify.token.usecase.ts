import { Inject, Injectable } from '@nestjs/common';
import { TokenOutPort } from '../port/out/token.out.port';
import { AuthMicroService } from '@app/common';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { UserRepositoryPort } from '../port/out/user.repository.port';

@Injectable()
export class VerifyTokenUsecase {
    constructor(
        @Inject('TokenOutPort') private readonly tokenOutPort: TokenOutPort,
        @Inject('UserRepositoryPort')
        private readonly userRepositoryPort: UserRepositoryPort,
    ) {}

    async execute(
        request: AuthMicroService.VerifyTokenRequest,
    ): Promise<AuthMicroService.VerifyTokenResponse> {
        const token = await this.tokenOutPort.verifyToken(request);
        const userId = token.sub;
        const user = await this.userRepositoryPort.findUserById(userId);
        if (!user) {
            throw new GrpcNotFoundException('User Not Found');
        }

        return {
            sub: token.sub,
            type: token.type,
            role: user.role,
        };
    }
}
