import {
    VerifyTokenRequest,
    VerifyTokenResponse,
} from '@app/common/grpc/proto/auth';
import { UserDomain } from '../../domain/user.domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class TokenOutPort {
    abstract verifyToken(
        request: VerifyTokenRequest,
    ): Promise<VerifyTokenResponse>;
    abstract issueToken(
        payload: UserDomain,
        isRefresh: boolean,
    ): Promise<string>;
}
