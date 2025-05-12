import db from "../config/database.ts";

export const setReaction = (message_id : string ,user_id : string,reaction : string) => {
    const query = "INSERT INTO MessageReactions(message_id,user_id,emoji) VALUES (?,?,?)"

    try {
        const result = db.prepare(query).all(message_id,user_id,reaction)
        return result
    }
    catch (error) {
        console.error("Error while inserting the the emoji in the table")
        throw error 
    }
}