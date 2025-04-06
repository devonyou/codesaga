import { Inject, OnModuleInit } from '@nestjs/common';
import { UserTransportPort } from '../../port/user.transport.port';
import { UserDomain } from '../../domain/user.domain';
import { AuthMicroService } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AUTH_SERVICE_NAME } from '@app/common/grpc/proto/auth';
import { lastValueFrom } from 'rxjs';

export class UserGrpcAdapter implements OnModuleInit, UserTransportPort {
    private authService: AuthMicroService.AuthServiceClient;

    constructor(
        @Inject(AUTH_SERVICE_NAME)
        private readonly authMicroService: ClientGrpc,
    ) {}

    async onModuleInit() {
        this.authService = this.authMicroService.getService(AUTH_SERVICE_NAME);
    }

    async findUserById(userId: string): Promise<UserDomain> {
        const stream = this.authService.findUserById({ userId });
        const response = await lastValueFrom(stream);
        return new UserDomain({
            id: response.id,
            name: response.name,
        });
    }
}
