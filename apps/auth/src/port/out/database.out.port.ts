import { UserDomain } from '../../domain/user.domain';

export interface DatabaseOutPort {
    findUserByProviderId(providerId: string): Promise<UserDomain>;

    createUser(user: UserDomain): Promise<UserDomain>;

    findUserById(userId: string): Promise<UserDomain>;
}
