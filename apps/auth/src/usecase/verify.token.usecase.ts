import { Inject, Injectable } from '@nestjs/common';
import { TokenOutPort } from '../port/out/token.out.port';
import { AuthMicroService } from '@app/common';

@Injectable()
export class VerifyTokenUsecase {
    constructor(
        @Inject('TokenOutPort') private readonly tokenOutPort: TokenOutPort,
    ) {}

    async execute(
        request: AuthMicroService.VerifyTokenRequest,
    ): Promise<AuthMicroService.VerifyTokenResponse> {
        return await this.tokenOutPort.verifyToken(request);
    }
}
