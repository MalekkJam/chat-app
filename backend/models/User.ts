import db from "../config/database.ts";

export interface User {
    username : string;
    email : string;
    password : string;
}


export const registerUser = async (user: User) => {
    const query = `INSERT INTO User (username, email, password_hash) VALUES (?,?,?)`;
    
    try {
        const result = await db.prepare(query).run(user.username, user.email, user.password)
        return result;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
}

export const find_username_by_email = async (email : string ) : Promise<string>=> {
    const query = `SELECT username FROM User WHERE email = ?` ; 
    try {
        const result = await db.prepare(query).get(email) as {username : string}; 
        return result.username ;
    }catch(error) {
        console.error("Error while searching for user :",error) ; 
        throw error  ; 
    }
}

// this function is used only in the login function in order to compare the password and the hashed password
export const find_user_by_email = async (email: string): Promise<string | null> => {
    const query = `SELECT password_hash FROM User WHERE email = ?`;

    try {
        const result = await db.prepare(query).get(email) as { password_hash: string } | undefined;
        return result ? result.password_hash : null; 
    } catch (error) {
        throw error;
    }
};

const find_userId_by_username = async (username: string): Promise<string> => {
    const query = "SELECT user_id FROM User WHERE username = ?";

    try {
        const result = await db.prepare(query).get(username) as { user_id: string };
        return result.user_id;
    } catch (error) {
        throw error;
    }
};

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







