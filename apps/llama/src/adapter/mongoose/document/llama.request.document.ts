import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from './user.document';
import { CodesagaDocument } from './codesaga.document';

@Schema({ timestamps: true })
export class LlamaRequestDocument extends Document<ObjectId> {
    @Prop({ required: true, type: UserDocument })
    user: UserDocument;

    @Prop({ required: true, type: CodesagaDocument })
    codesaga: CodesagaDocument;

    @Prop()
    output: string;

    @Prop()
    processingTime: number;

    @Prop()
    response: string;

    @Prop({ required: true })
    status: string;
}

export const LlamaRequestSchema =
    SchemaFactory.createForClass(LlamaRequestDocument);
