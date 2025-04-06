import { Module } from '@nestjs/common';
import { CodesagaService } from './codesaga.service';
import { CodesagaController } from './codesaga.controller';

@Module({
    imports: [],
    controllers: [CodesagaController],
    providers: [CodesagaService],
})
export class CodesagaModule {}
