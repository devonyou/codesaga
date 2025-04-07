import { HttpService } from '@nestjs/axios';
import { LlamaAiPort } from '../../port/llama.ai.port';
import { LlamaAiDomain } from '../../domain/llama.ai.domain';
import { ConfigService } from '@nestjs/config';
import { Inject } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

export class LlamaAiAxiosAdapter implements LlamaAiPort {
    constructor(
        private readonly httpService: HttpService,
        @Inject(ConfigService) private readonly configService: ConfigService,
    ) {}

    async generateLlamaAi(request: LlamaAiDomain): Promise<LlamaAiDomain> {
        const ai_url = this.configService.get<string>('AI_URL');
        const ai_model = this.configService.get<string>('AI_MODEL');

        const stream = this.httpService.post<{ data: any }>(
            ai_url,
            {
                model: ai_model,
                prompt: request.prompt,
                max_tokens: 10,
                stream: false,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );

        const response = await lastValueFrom(stream);

        const ai = new LlamaAiDomain(request.prompt);
        ai.setResponse((response.data as any).response);
        return ai;
    }
}
