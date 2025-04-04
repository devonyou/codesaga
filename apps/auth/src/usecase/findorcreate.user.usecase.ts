import { FindOrCreateUserRequest } from '@app/common/grpc/proto/auth';
import { DatabaseOutPort } from '../port/out/database.out.port';
import { UserDomain } from '../domain/user.domain';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FindOrCreateUserUsecase {
    constructor(
        @Inject('DatabaseOutPort')
        private readonly databaseOutPort: DatabaseOutPort,
    ) {}

    async execute(dto: FindOrCreateUserRequest): Promise<UserDomain> {
        let user: UserDomain;

        user = await this.databaseOutPort.findUserByProviderId(dto.id);

        if (user) {
            return user;
        } else {
            user = new UserDomain({
                providerId: dto.id,
                provider: 'github',
                avartarUrl: dto.avatarUrl,
                name: dto.name,
                nodeId: dto.nodeId,
            });

            return await this.databaseOutPort.createUser(user);
        }
    }
}
