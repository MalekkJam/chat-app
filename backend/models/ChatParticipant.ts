import db from "../config/database.ts"; 

export const kick_user_from_chat = async (conversation_id : string,user_id : string) => {
    const query = "DELETE FROM ChatParticipant WHERE user_id = ? AND chat_id = ?"

    try {
        const result = db.prepare(query).all(user_id,conversation_id)
        return result 
    }catch (error) {
        console.error("Error while kicking the user frm the chat")
        throw error 
    }
}