import { CodeRequestDomain } from '../domain/codesaga.request.domain';

export abstract class CodesagaDatabasePort {
    abstract createCodesaga(
        codesaga: CodeRequestDomain,
    ): Promise<CodeRequestDomain>;
}
