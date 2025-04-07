import { UserDomain } from '../domain/user.domain';

export abstract class UserTransportPort {
    abstract findUserById(userId: string): Promise<UserDomain>;
}
