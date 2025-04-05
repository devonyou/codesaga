import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { Auth } from '../decorator/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);

    constructor(
        private readonly authService: AuthService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const auth = this.reflector.get<boolean>(
                Auth,
                context.getHandler(),
            );

            if (auth === undefined) return true;

            const request = context.switchToHttp().getRequest();
            const rawToken = request?.headers?.authorization;
            if (!rawToken) throw new UnauthorizedException();

            const [bearer, jwtToken] = rawToken.split(' ');
            if (bearer.toLowerCase() !== 'bearer' || !jwtToken) {
                throw new UnauthorizedException();
            }

            const isRefresh = auth;
            const resp = await this.authService.verifyToken(
                jwtToken,
                isRefresh,
            );
            request.user = resp;
            return true;
        } catch (err) {
            this.logger.warn(err.message);
            throw new UnauthorizedException();
        }
    }
}
