import { CodesagaRequestDomain } from '../domain/codesaga.request.domain';

export abstract class CodesagaDatabasePort {
    abstract createCodesaga(
        codesaga: CodesagaRequestDomain,
    ): Promise<CodesagaRequestDomain>;

    abstract updateCodesaga(
        codesaga: CodesagaRequestDomain,
    ): Promise<CodesagaRequestDomain>;

    abstract findCodesagaById(id: string): Promise<CodesagaRequestDomain>;
}
