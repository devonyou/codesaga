import { UserProfileDomain } from './user.profile.domain';

export enum Role {
    admin = 'admin',
    paidUser = 'paidUser',
    user = 'user',
}

export class UserDomain {
    id: string;
    provider: string;
    providerId: string;
    nodeId: string;
    role: Role;
    userProfile: UserProfileDomain;

    constructor(
        params: Pick<UserDomain, 'provider' | 'providerId' | 'nodeId' | 'role'>,
    ) {
        this.provider = params.provider;
        this.providerId = params.providerId;
        this.nodeId = params.nodeId;
        this.role = params.role;
    }

    setId(id: string) {
        this.id = id;
    }

    setUserProfile(userProfile: UserProfileDomain) {
        this.userProfile = userProfile;
    }
}
