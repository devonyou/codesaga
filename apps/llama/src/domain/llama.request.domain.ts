import { CodesagaDomain } from '../domain/codesaga.domain';
import { UserDomain } from './user.domain';

export enum RequestStatus {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
}

export class LlamaRequestDomain {
    id: string;
    user: UserDomain;
    codesaga: CodesagaDomain;
    processingTime: number;
    response: string;
    status: RequestStatus;

    constructor(
        params: Pick<LlamaRequestDomain, 'user' | 'codesaga' | 'status'>,
    ) {
        this.user = params.user;
        this.codesaga = params.codesaga;
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

    setProcessingTime(processingTime: number) {
        this.processingTime = processingTime;
    }
}
