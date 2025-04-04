export class UserDomain {
    id: string;
    provider: string;
    providerId: string;
    name: string;
    nodeId: string;
    avartarUrl: string;

    constructor(
        params: Pick<
            UserDomain,
            'provider' | 'providerId' | 'name' | 'nodeId' | 'avartarUrl'
        >,
    ) {
        this.provider = params.provider;
        this.providerId = params.providerId;
        this.name = params.name;
        this.nodeId = params.nodeId;
        this.avartarUrl = params.avartarUrl;
    }

    setId(id: string) {
        this.id = id;
    }
}
