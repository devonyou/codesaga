import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class CodesagaDocument extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    language: string;

    @Prop({ required: true })
    codeContext: string;
}

export const CodesagaSchema = SchemaFactory.createForClass(CodesagaDocument);
