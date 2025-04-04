import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubGuard } from './guard/github.guard';
import { Auth } from './decorator/auth.decorator';
import { AuthPayload } from './dto/auth.payload';
import { RefreshGuard } from './guard/refresh.guard';
import { User } from './decorator/user.decorator';
import { JwtPayload } from './dto/jwt.payload';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('github')
    @UseGuards(GithubGuard)
    redirectToGithub() {}

    @Get('github/callback')
    @UseGuards(GithubGuard)
    async callbackToGithub(@Auth() auth: AuthPayload) {
        return await this.authService.issueTokenByUserId(auth.id);
    }

    @Post('refresh')
    @UseGuards(RefreshGuard)
    async issueToken(@User() user: JwtPayload) {
        return await this.authService.issueTokenByUserId(user.sub);
    }
}
