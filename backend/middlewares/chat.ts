import { error } from "node:console";
import { _getConversations } from "../models/Chat.ts";

export const getConversations = async (username : string) => {
  try {
    const result = await _getConversations(username) ; 
    return result 

  } catch (_error) {
    console.error(error);
  }
} 