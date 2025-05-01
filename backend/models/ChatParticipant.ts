import db from "../config/database.ts"; 

export const kick_user_from_chat = async (conversation_id : string,user_id : string) => {
    const query = "DELETE FROM ChatParticipant WHERE user_id = ? AND chat_id = ?"

    try {
        const result = await db.prepare(query).all(user_id,conversation_id)
        return result 
    }catch (error) {
        console.error("Error while kicking the user frm the chat")
        throw error 
    }
}

export const get_users_not_in_chat = async (conversation_id : string) => {
    const query = " SELECT User.username, User.email , User.joined_at FROM User WHERE NOT EXISTS ( SELECT 1  FROM ChatParticipant  WHERE ChatParticipant.user_id = User.user_id AND ChatParticipant.chat_id = ?) AND User.username != 'admin'"

    try {
        const result = await db.prepare(query).all(conversation_id) ; 
        return result 
    }
    catch (error) {
        console.error("Error while getting the users not in the chat")
        throw error 
    }

}

export const add_user_to_chat = async (conversation_id: string, user_id: string) => {
    const query = "INSERT INTO ChatParticipant (chat_id, user_id) VALUES (?, ?)";

    try {
        const result = await db.prepare(query).run(conversation_id, user_id); 
        return result;
    } catch (error) {
        console.error("Error while adding the user to the chat:", error);
        throw error;
    }
};