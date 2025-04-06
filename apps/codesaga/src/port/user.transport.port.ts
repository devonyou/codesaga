import { UserDomain } from '../domain/user.domain';

export abstract class UserTransportPort {
    abstract findUserById(id: string): Promise<UserDomain>;
}
