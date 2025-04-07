export class UserDomain {
    id: string;
    name: string;

    constructor(params: Pick<UserDomain, 'id' | 'name'>) {
        this.id = params.id;
        this.name = params.name;
    }
}
