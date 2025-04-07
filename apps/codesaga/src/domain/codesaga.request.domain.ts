import { UserDomain } from './user.domain';

export enum RequestType {
    CODE_COMPLETION = 'CODE_COMPLETION',
    REFACTORING = 'REFRACTORING',
    ERROR_FIX = 'ERROR_FIX',
    OTHER = 'OTHER',
}

export enum RequestStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export class CodesagaRequestDomain {
    id: string;
    user: UserDomain;
    requestType: RequestType;
    language: string;
    status: RequestStatus;
    filepath: string;
    codeContext: string;
    response: string;

    constructor(
        params: Pick<
            CodesagaRequestDomain,
            'user' | 'requestType' | 'language' | 'codeContext' | 'status'
        >,
    ) {
        this.user = params.user;
        this.requestType = params.requestType;
        this.language = params.language;
        this.codeContext = params.codeContext;
        this.status = params.status;
    }

    setId(id: string) {
        this.id = id;
    }

    setResponse(response: string) {
        this.response = response;
    }

    setStatus(status: RequestStatus) {
        this.status = status;
    }
}
