import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
    RequestStatus,
    RequestType,
} from '../../../domain/codesaga.request.domain';
import { UserDocument } from './user.document';

@Schema({ timestamps: true })
export class CodesagaRequestDocument extends Document<ObjectId> {
    @Prop({ required: true, type: UserDocument })
    user: UserDocument;

    @Prop({
        required: true,
        enum: RequestType,
        default: RequestType.CODE_COMPLETION,
    })
    requestType: RequestType;

    @Prop({ required: true })
    language: string;

    @Prop({ required: true })
    codeContext: string;

    @Prop()
    response?: string;

    @Prop({
        required: true,
        enum: RequestStatus,
        default: RequestStatus.PENDING,
    })
    status?: RequestStatus;
}

export const CodesagaRequestSchema = SchemaFactory.createForClass(
    CodesagaRequestDocument,
);
