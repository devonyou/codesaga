import { UserDomain } from './user.domain';

export class ChatRoomDomain {
    id: string;
    user: UserDomain;

    constructor(user: UserDomain) {
        this.user = user;
    }

    setId(id: string) {
        this.id = id;
    }
}
