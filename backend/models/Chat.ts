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

export const get_Nb_Conversations = async () => {
    const query = "SELECT COUNT(*) as nbConversation FROM Chat" ; 

    try {
        const result = await db.prepare(query).all() as {nbConversation  : number} [] ;
        return result[0].nbConversation ; 
    }
    catch (error) {
        console.log("Error while counting the Chat")
        throw error 
    }
}

export const get_All_chats = async () => {
    const query = "SELECT chat_name, chat_type, created_at FROM Chat"

    try {
        const result = await db.prepare(query).all()  ; 
        return result 
    }catch (error) {
        console.error("Error fetching all chats")
        throw error 
    }
}

export const get_chat_participants = async (chat_name : string) => {
    const query = "SELECT User.username, User.email, User.joined_at FROM User INNER JOIN ChatParticipant ON User.user_id = ChatParticipant.user_id INNER JOIN Chat ON ChatParticipant.chat_id = Chat.chat_id WHERE Chat.chat_name = ? AND User.username != 'admin'"

    try {
        const result = await db.prepare(query).all(chat_name) ; 
        return result 
    }catch(error) {
        console.error("Error while joining the tables")
        throw error
    }


}

export const delete_Conversation = async (chat_id : string) => {
    const query = "DELETE FROM Chat WHERE chat_id = ?"

    try {
        const result = await db.prepare(query).all(chat_id)
        return result
    }catch(error) {
        console.error("Error deleting the conv in Chat table")
        throw error 
    }
}

export const add_chat = async(chat_name : string , chat_type : string) => {
    const query = "INSERT INTO Chat(chat_name,chat_type) VALUES (?,?)"

    try {
        const result = await db.prepare(query).all(chat_name,chat_type)
        return result
    }catch (error) {
        console.error("Error while adding chat to db")
        throw error 
    }
}
