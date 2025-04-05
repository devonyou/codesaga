import { Injectable } from '@nestjs/common';
import { UserDomain } from '../../domain/user.domain';
import { UserProfileDomain } from '../../domain/user.profile.domain';

@Injectable()
export abstract class UserRepositoryPort {
    abstract findUserById(userId: string): Promise<UserDomain>;

    abstract createUser(user: UserDomain): UserDomain | Promise<UserDomain>;

    abstract findUserByProviderId(id: string): UserDomain | Promise<UserDomain>;

    abstract createUserProfile(
        userProfile: UserProfileDomain,
    ): Promise<UserProfileDomain>;
}
