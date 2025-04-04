import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GithubGuard } from './guard/github.guard';
import { GithubOAuth } from './decorator/github.oauth.decorator';
import { GithubOAuthDto } from './dto/github.oauth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('github')
    @UseGuards(GithubGuard)
    redirectToGithub() {}

    @Get('github/callback')
    @UseGuards(GithubGuard)
    async callbackToGithub(@GithubOAuth() oauth: GithubOAuthDto) {
        return await this.authService.issueTokenByGithubId(oauth.profile);
    }
}
