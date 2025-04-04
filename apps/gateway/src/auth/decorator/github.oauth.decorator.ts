import {
    createParamDecorator,
    ExecutionContext,
    InternalServerErrorException,
} from '@nestjs/common';
import { Profile } from 'passport-github';
import { GithubOAuthDto } from '../dto/github.oauth.dto';

export const GithubOAuth = createParamDecorator<GithubOAuthDto>(
    (data: any, context: ExecutionContext): GithubOAuthDto => {
        const req = context.switchToHttp().getRequest();
        if (!req?.user) throw new InternalServerErrorException();
        return req.user;
    },
);
