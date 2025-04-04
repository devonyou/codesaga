import { Inject, Injectable } from '@nestjs/common';
import { DatabaseOutPort } from '../port/out/database.out.port';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';
import { TokenOutPort } from '../port/out/token.out.port';

@Injectable()
export class IssueTokenUsecase {
    constructor(
        @Inject('DatabaseOutPort')
        private readonly databaseOutPort: DatabaseOutPort,
        @Inject('TokenOutPort')
        private readonly tokenOutPort: TokenOutPort,
    ) {}

    async execute(userId: string) {
        const user = await this.databaseOutPort.findUserById(userId);
        if (!user) {
            throw new GrpcNotFoundException('Use Not Found');
        }

        return {
            accessToken: await this.tokenOutPort.issueToken(user, false),
            refreshToken: await this.tokenOutPort.issueToken(user, true),
        };
    }
}
