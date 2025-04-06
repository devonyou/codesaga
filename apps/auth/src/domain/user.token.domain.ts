import { UserDomain } from './user.domain';

export enum TokenType {
    ACCESS = 'access',
    REFRESH = 'refresh',
}

export class UserTokenDomain {
    id: string;
    token: string;
    type: TokenType;
    user: UserDomain;
    userId: string;

    constructor(params: Pick<UserTokenDomain, 'token' | 'type' | 'userId'>) {
        this.token = params.token;
        this.type = params.type;
        this.userId = params.userId;
    }

    setId(id: string) {
        this.id = id;
    }

    setUser(user: UserDomain) {
        this.user = user;
    }
}
