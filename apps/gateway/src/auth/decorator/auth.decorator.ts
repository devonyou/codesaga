import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';
import { AuthPayload } from '../dto/auth.payload';

export const Auth = createParamDecorator<AuthPayload>(
    (data: any, context: ExecutionContext): AuthPayload => {
        const req = context.switchToHttp().getRequest();
        if (!req?.user) throw new InternalServerErrorException();
        return req.user;
    },
);
