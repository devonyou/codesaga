import { Inject, Injectable } from '@nestjs/common';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { TokenOutPort } from '../port/out/token.out.port';
import { UserRepositoryPort } from '../port/out/user.repository.port';

@Injectable()
export class IssueTokenUsecase {
    constructor(
        @Inject('TokenOutPort')
        private readonly tokenOutPort: TokenOutPort,
        @Inject('UserRepositoryPort')
        private readonly userRepositoryPort: UserRepositoryPort,
    ) {}

    async execute(userId: string) {
        const user = await this.userRepositoryPort.findUserById(userId);
        if (!user) {
            throw new GrpcNotFoundException('User Not Found');
        }

        return {
            accessToken: await this.tokenOutPort.issueToken(user, false),
            refreshToken: await this.tokenOutPort.issueToken(user, true),
        };
    }
}
