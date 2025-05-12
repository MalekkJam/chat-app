import { AuthenticatedWebSocket } from "../models/Websocket.ts"
import {find_userId_by_username} from"../models/User.ts" 
import { addMessage, Message } from "../models/Message.ts";
import { get_chatID_by_chatName } from "../models/Chat.ts";

export const _addMessage = async (socket : AuthenticatedWebSocket ,message : string,chat : string ) => {
    
    try{
        const userID = await find_userId_by_username(socket.username); 
        console.log("chat =",chat)
        const chat_id = await get_chatID_by_chatName(chat)  ; 
        console.log("chat_id =",chat_id)
        const _message: Message = {
            chat_id: Number(chat_id), 
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