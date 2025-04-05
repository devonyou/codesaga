import { FindOrCreateUserRequest } from '@app/common/grpc/proto/auth';
import { Role, UserDomain } from '../domain/user.domain';
import { Inject, Injectable } from '@nestjs/common';
import { UserProfileDomain } from '../domain/user.profile.domain';
import { UserRepositoryPort } from '../port/out/user.repository.port';

@Injectable()
export class FindOrCreateUserUsecase {
    constructor(
        @Inject('UserRepositoryPort')
        private readonly userRepositoryPort: UserRepositoryPort,
    ) {}

    async execute(dto: FindOrCreateUserRequest): Promise<UserDomain> {
        const user = await this.userRepositoryPort.findUserByProviderId(dto.id);

        if (user) {
            return user;
        } else {
            const newUser = await this.userRepositoryPort.createUser(
                new UserDomain({
                    providerId: dto.id,
                    provider: 'github',
                    nodeId: dto.nodeId,
                    role: dto.role as Role,
                }),
            );

            const newUserProfile =
                await this.userRepositoryPort.createUserProfile(
                    new UserProfileDomain({
                        name: dto.name,
                        avartarUrl: dto.avatarUrl,
                        userId: newUser.id,
                    }),
                );

            newUser.setUserProfile(newUserProfile);
            return newUser;
        }
    }
}
