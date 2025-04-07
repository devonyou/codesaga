import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class ChatMessageDocument extends Document<ObjectId> {
    @Prop({ required: true })
    chatRoomId: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    response: string;
}

export const ChatMessageSchema =
    SchemaFactory.createForClass(ChatMessageDocument);
