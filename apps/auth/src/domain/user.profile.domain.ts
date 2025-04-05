import { UserDomain } from './user.domain';

export class UserProfileDomain {
    id: string;
    name: string;
    avartarUrl: string;
    userId: string;
    user: UserDomain;

    constructor(
        params: Pick<UserProfileDomain, 'name' | 'avartarUrl' | 'userId'>,
    ) {
        this.name = params.name;
        this.avartarUrl = params.avartarUrl;
        this.userId = params.userId;
    }

    setId(id: string) {
        this.id = id;
    }

    setUser(user: UserDomain) {
        this.user = user;
    }
}
