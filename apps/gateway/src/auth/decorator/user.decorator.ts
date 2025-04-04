import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';
import { JwtPayload } from '../dto/jwt.payload';

export const User = createParamDecorator<JwtPayload>(
    (data: any, context: ExecutionContext): JwtPayload => {
        const req = context.switchToHttp().getRequest();
        if (!req?.user) throw new InternalServerErrorException();
        return req.user;
    },
);
