import { userInfo } from "node:os";
import db from "../config/database.ts";
import test from "node:test";

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

export const find_userId_by_username = async (username: string): Promise<string> => {
    const query = "SELECT user_id FROM User WHERE username = ?";

    try {
        const result = await db.prepare(query).get(username) as { user_id: string };
        return result.user_id;
    } catch (error) {
        throw error;
    }
};

export const find_username_by_id = async (id : number) => {
    const query = "SELECT username FROM User WHERE user_id = ? "

    try {
        const result = await db.prepare(query).all(id) as {username : string}[]
        return result 
    }
    catch (error) {
        throw error 
    }
}

export const find_info_by_username = async (username : string) => {
    const query = "SELECT username, email FROM User WHERE username = ?"

    try {
        const result = db.prepare(query).all(username) as {username : string} [] 
        return result 
    }
    catch (error) {
        throw error 
    }
}

export const update_User_Data = async(username : string, new_username : string) => {
    // Test username and returns true if it exists already 
    const test_username = await testDataBeforeUpdate("username",new_username) ;  
    const query = "UPDATE User SET username = ? WHERE username = ?";

    try{
        if (test_username) {
            return 
        }else {
            const result = db.prepare(query).all(new_username,username)
            return result 
        }
    }catch (error) {
        throw error 
    }
}

const testDataBeforeUpdate = async (category : string, data: string): Promise<boolean> => {
    const query = `SELECT * FROM User WHERE ${category} = ?`;

    try {
        const result = await db.prepare(query).all(data);
        console.log(result)
        return result.length > 0; // Return true if username exists, false otherwise
    } catch (error) {
        console.error("Error checking username:", error);
        throw error;
    }
};






