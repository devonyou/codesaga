import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubGuard } from './guard/github.guard';
import { AuthPayload } from './dto/auth.payload';
import { User } from './decorator/user.decorator';
import { JwtPayload } from './dto/jwt.payload';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('github')
    @UseGuards(GithubGuard)
    redirectToGithub() {
        return null;
    }

    @Get('github/callback')
    @UseGuards(GithubGuard)
    async callbackToGithub(@User() auth: AuthPayload) {
        return await this.authService.issueTokenByUserId(auth.id);
    }

    @Post('refresh')
    @Auth(true)
    async issueToken(@User() user: JwtPayload) {
        return await this.authService.issueTokenByUserId(user.sub);
    }

    @Post('test')
    @Auth(false)
    test(@User() user: JwtPayload) {
        return user;
    }
}
