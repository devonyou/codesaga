export class ChatMessageDomain {
    id: string;
    chatRoomId: string;
    message: string;
    response: string;

    constructor(chatRoomId: string, message: string) {
        this.chatRoomId = chatRoomId;
        this.message = message;
    }

    setId(id: string) {
        this.id = id;
    }

    setResponse(response: string) {
        this.response = response;
    }
}
