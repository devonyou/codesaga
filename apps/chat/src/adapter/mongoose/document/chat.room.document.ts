import { Document, ObjectId } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserDocument } from './user.document';

@Schema({ timestamps: true })
export class ChatRoomDocument extends Document<ObjectId> {
    @Prop({ required: true, type: UserDocument })
    user: UserDocument;
}

export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoomDocument);
