import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

enum RequestType {
    CODE_COMPLETION = 'CODE_COMPLETION',
    REFACTORING = 'REFRACTORING',
    ERROR_FIX = 'ERROR_FIX',
    OTHER = 'OTHER',
}

export class CreateCodesagaRequestDto {
    @IsNotEmpty()
    @IsEnum(RequestType)
    requestType: RequestType;

    @IsNotEmpty()
    @IsString()
    language: string;

    @IsNotEmpty()
    @IsString()
    codeContext: string;

    @IsNotEmpty()
    @IsString()
    filepath: string;

    @IsNotEmpty()
    @IsNumber()
    lineNumber: number;
}
