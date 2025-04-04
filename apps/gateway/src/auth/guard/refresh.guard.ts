import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class RefreshGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const rawToken = request?.headers?.authorization;
        if (!rawToken) throw new UnauthorizedException();

        const [bearer, jwtToken] = rawToken.split(' ');
        if (bearer.toLowerCase() !== 'bearer' || !jwtToken) {
            throw new UnauthorizedException();
        }

        const resp = await this.authService.verifyToken(jwtToken, true);
        if (resp.type === 'refresh') {
            request.user = resp;
            return true;
        } else {
            return false;
        }
    }
}
