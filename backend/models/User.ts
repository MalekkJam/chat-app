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
