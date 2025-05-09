import { AuthenticatedWebSocket } from "../models/Websocket.ts"
import { jwtVerify } from "npm:jose@5.9.6/jwt/verify";
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import {find_userId_by_username} from"../models/User.ts" 
import { addMessage, getMessageId, Message } from "../models/Message.ts";
import { get_chatID_by_chatName } from "../models/Chat.ts";
import { setEmoji } from "../models/MessageReactions.ts";

const secret = new TextEncoder().encode("ed5a207a8e88013ab968eaf43d0017507508e5efa2129248b713a223eaf66864");


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

export const addEmoji = async(ctx : Context) => {
    
    const token = await ctx.cookies.get("auth_token");
        
        if (!token) {
          ctx.response.status = 401;
          ctx.response.body = { message: "Unauthorized" };
          return
        }
    
        if (!token) {
          ctx.response.status = 401;
          ctx.response.body = { message: "Unauthorized" };
          return;
        }
        const { payload } = await jwtVerify(token, secret);
        const username = payload.username as string

        const {emoji , message, conversation } = await ctx.request.body().value;

        // get the user_id 
        const user_id = await find_userId_by_username(username) ; 

        // get the chat_id 
        const chat_id = await get_chatID_by_chatName(conversation) ; 
        // get the message id 

        const message_id = await getMessageId(chat_id,user_id,message) ; 

        // set the emoji 
    
        setEmoji(message_id,user_id,emoji)
    
}