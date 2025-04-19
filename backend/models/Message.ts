import db from "../config/database.ts";

export interface Message {
    chat_id : number ;// foreign key
    sender_id : number;// foreign key
    content : string;
    timestamp : Date ; 
}

export const addMessage = async (message : Message) => {
    const query = `INSERT INTO Message (chat_id, sender_id, content,timestamp) VALUES (?,?,?,?)`;
    
    try {
        const result = await db.prepare(query).run(message.chat_id, message.sender_id, message.content, message.timestamp.toISOString());
        return result;
    } catch (error) {
        console.error("Error adding message:", error);
        throw error;
    }
}