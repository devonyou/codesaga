import { Injectable } from '@nestjs/common';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { TokenOutPort } from '../port/out/token.out.port';
import { UserRepositoryPort } from '../port/out/user.repository.port';
import { TokenType } from '../domain/user.token.domain';

@Injectable()
export class IssueTokenUsecase {
    constructor(
        private readonly tokenOutPort: TokenOutPort,
        private readonly userRepositoryPort: UserRepositoryPort,
    ) {}

    async execute(userId: string) {
        const user = await this.userRepositoryPort.findUserById(userId);
        if (!user) {
            throw new GrpcNotFoundException('User Not Found');
        }

        const accessToken = await this.tokenOutPort.issueToken(user, false);
        const refreshToken = await this.tokenOutPort.issueToken(user, true);

        await this.userRepositoryPort.createUserToken(
            userId,
            refreshToken,
            TokenType.REFRESH,
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
