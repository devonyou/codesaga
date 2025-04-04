import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const httpCtx = host.switchToHttp();
        const response = httpCtx.getResponse<Response>();
        const statusCode = exception.getStatus();
        const error = exception.getResponse() as string | Error;
        const message = typeof error === 'string' ? error : error.message;

        return response.status(statusCode).json({
            error: message,
            statusCode: statusCode,
        });
    }
}
