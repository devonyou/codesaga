import { TokenOutPort } from '../../port/out/token.out.port';
import { JwtService } from '@nestjs/jwt';
import { UserDomain } from '../../domain/user.domain';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import {
    VerifyTokenRequest,
    VerifyTokenResponse,
} from '@app/common/grpc/proto/auth';
import { GrpcUnauthenticatedException } from 'nestjs-grpc-exceptions';

export class JwtTokenAdapter implements TokenOutPort {
    private accessSecret: string;
    private refreshSecret: string;
    private accessExpireIn: number;
    private refreshExpireIn: number;

    constructor(
        private readonly jwtService: JwtService,
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {
        this.accessSecret = this.configService.get('JWT_ACCESS_SECRET');
        this.refreshSecret = this.configService.get('JWT_REFRESH_SECRET');
        this.accessExpireIn = this.configService.get<number>(
            'JWT_ACCESS_EXPIRATION_TIME',
        );
        this.refreshExpireIn = this.configService.get<number>(
            'JWT_REFRESH_EXPIRATION_TIME',
        );
    }

    async issueToken(user: UserDomain, isRefresh: boolean): Promise<string> {
        return this.jwtService.signAsync(
            {
                sub: user.id,
                type: isRefresh ? 'refresh' : 'access',
            },
            {
                secret: isRefresh ? this.refreshSecret : this.accessSecret,
                expiresIn: isRefresh
                    ? this.refreshExpireIn
                    : this.accessExpireIn,
            },
        );
    }

    async verifyToken(
        request: VerifyTokenRequest,
    ): Promise<VerifyTokenResponse> {
        const { token, isRefresh } = request;
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: isRefresh ? this.refreshSecret : this.accessSecret,
                ignoreExpiration: false,
            });
            return {
                sub: payload.sub,
                type: payload.type,
                role: payload.role,
            };
        } catch (err) {
            throw new GrpcUnauthenticatedException(err.message);
        }
    }
}
