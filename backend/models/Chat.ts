import db from "../config/database.ts";
import { find_userId_by_username } from "./User.ts";

export const _getConversations = async (username : string) : Promise<string[]> => {
    const query = "SELECT chat_name FROM Chat, ChatParticipant WHERE Chat.chat_id = ChatParticipant.chat_id AND ChatParticipant.user_id = ?" ; 
    
    try {
        const user_id = await find_userId_by_username(username) ; 
        const result = await db.prepare(query).all(user_id) as { chat_name: string }[]; ; 
        return result.map(row => row.chat_name);
    } 
    catch (error) {
    throw error ; 
    }
}   

export const get_chatID_by_chatName = async (chat_name : string ) =>  {
    const query = "SELECT chat_id FROM Chat WHERE chat_name = ?"

    try {
        const result = await db.prepare(query).all(chat_name) as { chat_id: string }[];    
        return result[0].chat_id;
    }catch(error) {
        throw error 
    }
}