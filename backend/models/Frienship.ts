import db from "../config/database.ts";

export const addFriendship = (sender_id : string, target_id : string) => {
    const query = "INSERT INTO Friendship (user_id1, user_id2) VALUES (?,?);"

    try {
        const result = db.prepare(query).all(sender_id,target_id) 
        return result
    }catch (error) {
        console.error("Error while inserting in the friendship table");
        throw error 
    }
}