import { Body, Controller, Post } from '@nestjs/common';
import { CodesagaService } from './codesaga.service';
import { Auth } from '../auth/decorator/auth.decorator';
import { CreateCodesagaRequestDto } from './dto/create.codesaga.dto';
import { User } from '../auth/decorator/user.decorator';
import { JwtPayload } from '../auth/dto/jwt.payload';

@Controller('codesaga')
export class CodesagaController {
    constructor(private readonly codesagaService: CodesagaService) {}

    @Post()
    @Auth(false)
    async createCodesaga(
        @Body() body: CreateCodesagaRequestDto,
        @User() user: JwtPayload,
    ) {
        return this.codesagaService.createCodesaga(user.sub, body);
    }
}
