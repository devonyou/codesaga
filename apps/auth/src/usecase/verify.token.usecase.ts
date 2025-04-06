import { Injectable } from '@nestjs/common';
import { TokenOutPort } from '../port/out/token.out.port';
import { AuthMicroService } from '@app/common';
import {
    GrpcNotFoundException,
    GrpcUnauthenticatedException,
} from 'nestjs-grpc-exceptions';
import { UserRepositoryPort } from '../port/out/user.repository.port';
import { TokenType } from '../domain/user.token.domain';

@Injectable()
export class VerifyTokenUsecase {
    constructor(
        private readonly tokenOutPort: TokenOutPort,
        private readonly userRepositoryPort: UserRepositoryPort,
    ) {}

    async execute(
        request: AuthMicroService.VerifyTokenRequest,
    ): Promise<AuthMicroService.VerifyTokenResponse> {
        const { token: rawToken, isRefresh } = request;
        const { sub: userId, type: tokenType } =
            await this.tokenOutPort.verifyToken(request);

        if (isRefresh) {
            const dbToken = await this.userRepositoryPort.findUserTokenByToken(
                rawToken,
                userId,
                tokenType as TokenType,
            );
            if (!dbToken) {
                throw new GrpcUnauthenticatedException(
                    'Not valid refresh token',
                );
            }
        }

        const user = await this.userRepositoryPort.findUserById(userId);
        if (!user) {
            throw new GrpcNotFoundException('User Not Found');
        }

        return {
            sub: userId,
            type: tokenType,
            role: user.role,
        };
    }
}
