import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserDocument extends Document {
    @Prop({ required: true })
    id: string;

    @Prop({ required: true })
    name: string;
}

export const UserSchema = SchemaFactory.createForClass(UserDocument);
