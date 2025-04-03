import {
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    Logger,
} from '@nestjs/common';
import { Response } from 'express';

export class HttpExceptionFilter implements ExceptionFilter {
    private logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        const httpCtx = host.switchToHttp();
        const response = httpCtx.getResponse<Response>();
        const statusCode = exception.getStatus();
        const error = exception.getResponse() as string | Error;
        const message = typeof error === 'string' ? error : error.message;

        this.logger.error('❌', message);

        return response.status(statusCode).json({
            error: message,
            statusCode: statusCode,
        });
    }
}
