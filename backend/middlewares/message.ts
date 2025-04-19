import { AuthenticatedWebSocket } from "../models/Websocket.ts"
import {find_userId_by_username} from"../models/User.ts" 
import { addMessage, Message } from "../models/Message.ts";

export const _addMessage = async (socket : AuthenticatedWebSocket ,message : string,chat_id : number) => {
    
    try{
        const userID = await find_userId_by_username(socket.username); 
        const _message: Message = {
            chat_id: chat_id, 
            sender_id: Number(userID),
            content: message,
            timestamp: new Date()
        };

        await addMessage(_message) 

    }
    catch(error) {
        console.log("Error while adding the message to the database", error)
    }
} 