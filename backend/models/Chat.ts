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