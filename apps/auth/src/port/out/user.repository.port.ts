import { UserDomain } from '../../domain/user.domain';
import { UserProfileDomain } from '../../domain/user.profile.domain';

export interface UserRepositoryPort {
    findUserById(userId: string): Promise<UserDomain>;

    createUser(user: UserDomain): UserDomain | Promise<UserDomain>;

    findUserByProviderId(id: string): UserDomain | Promise<UserDomain>;

    createUserProfile(
        userProfile: UserProfileDomain,
    ): Promise<UserProfileDomain>;
}
