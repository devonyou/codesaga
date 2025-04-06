import { Role } from '../decorator/rbac.decorator';

export interface JwtPayload {
    sub: string;
    type: string;
    role: Role;
}
