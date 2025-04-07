export class LlamaAiDomain {
    prompt: string;
    response: string;

    constructor(prompt: string) {
        this.prompt = prompt;
    }

    setResponse(response: string) {
        this.response = response;
    }
}
