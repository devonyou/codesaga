export class CodesagaDomain {
    id: string;
    language: string;
    codeContext: string;

    constructor(
        params: Pick<CodesagaDomain, 'id' | 'language' | 'codeContext'>,
    ) {
        this.id = params.id;
        this.language = params.language;
        this.codeContext = params.codeContext;
    }
}
