import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubGuard } from './guard/github.guard';
import { GithubStrategy } from './strategy/github.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [PassportModule.register({ defaultStrategy: 'github' })],
    controllers: [AuthController],
    providers: [AuthService, GithubStrategy, GithubGuard],
})
export class AuthModule {}
