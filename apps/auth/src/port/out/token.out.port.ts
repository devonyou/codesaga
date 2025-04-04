import {
    VerifyTokenRequest,
    VerifyTokenResponse,
} from '@app/common/grpc/proto/auth';
import { UserDomain } from '../../domain/user.domain';

export interface TokenOutPort {
    verifyToken(request: VerifyTokenRequest): Promise<VerifyTokenResponse>;
    issueToken(payload: UserDomain, isRefresh: boolean): Promise<string>;
}
