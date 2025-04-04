import { AuthMicroService } from '@app/common/grpc';
import { AUTH_SERVICE_NAME } from '@app/common/grpc/proto/auth';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Profile } from 'passport';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
    private authService: AuthMicroService.AuthServiceClient;

    constructor(
        @Inject(AUTH_SERVICE_NAME)
        private readonly authMicroService: ClientGrpc,
    ) {}

    onModuleInit() {
        this.authService = this.authMicroService.getService('AuthService');
    }

    async findOrCreateUser(githubProfile) {
        const stream = this.authService.findOrCreateUser({
            id: githubProfile.id,
            name: githubProfile.name,
            nodeId: githubProfile.node_id,
            avatarUrl: githubProfile.avatar_url,
            login: githubProfile.login,
        });
        const resp = await lastValueFrom(stream);
        return resp;
    }

    async issueTokenByGithubId(profile: Profile) {
        const stream = this.authService.issueTokenByGithubId({
            id: profile.id,
        });

        const resp = await lastValueFrom(stream);
        return resp;
    }
}
