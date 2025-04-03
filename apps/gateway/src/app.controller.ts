import { Body, Controller, Get, Param } from '@nestjs/common';
import { AppRequestDto } from './dto/app.request.dto';

@Controller()
export class AppController {
    @Get('app/:id/:name')
    async test(
        @Body() body: AppRequestDto,
        @Param('id') id: string,
        @Param('name') name: string,
    ): Promise<{ a: number }> {
        return new Promise(resolve => resolve({ a: 1 }));
    }
}
