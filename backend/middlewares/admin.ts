import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { jwtVerify } from "npm:jose@5.9.6/jwt/verify";
import { get_Nb_Conversations , get_All_chats , get_chat_participants } from "../models/Chat.ts";
import { get_Nb_Users, get_all_users, get_Nb_new_users } from "../models/User.ts";

const secret = new TextEncoder().encode("ed5a207a8e88013ab968eaf43d0017507508e5efa2129248b713a223eaf66864");

export const getKpis = async (ctx : Context) => {
    try {const token = await ctx.cookies.get("auth_token") ; 

    if (!token) {
        ctx.response.status = 401 ; 
        ctx.response.body = {message : "Not authorized"} ; 
        return ; 
    }

    const {payload} = await jwtVerify(token,secret) ; 
    const role = payload.role as string

    if (role != "admin") {
        ctx.response.status = 403 ; 
        ctx.response.body = {message : "Not authorized you are not the admin"} ; 
        return ; 
    }

    // Get the nbConversations 
    const nbConversations = await get_Nb_Conversations() ; 

    // Get the nbTotalUsers 
    const nbTotalUsers = await get_Nb_Users() ; 

    // Get the new users (users added today) 
    const nbNewUsers = await get_Nb_new_users() ; 

    const data = {nbConversations,nbTotalUsers,nbNewUsers} ; 

    ctx.response.status = 200 ; 
    ctx.response.body = data;}

    catch(error) {
        throw error ; 
    }

}

export const getAllUsers = async (ctx: Context) => {
    try {   
        const token = await ctx.cookies.get("auth_token") ; 

        if (!token) {
            ctx.response.status = 401 ; 
            ctx.response.body = {message : "Not authorized"} ; 
            return ; 
        }
    
        const {payload} = await jwtVerify(token,secret) ; 
        const role = payload.role as string
    
        if (role != "admin") {
            ctx.response.status = 403 ; 
            ctx.response.body = {message : "Not authorized you are not the admin"} ; 
            return ; 
        }

        const result = await get_all_users() ; 
        
        ctx.response.status =200 ;
        ctx.response.body = result ; 

    }catch(error) {
        throw error ; 
    }
}

export const getAllChats = async (ctx : Context) => {
    try {const token = await ctx.cookies.get("auth_token") ; 

    if (!token) {
        ctx.response.status = 401 ; 
        ctx.response.body = {message : "Not authorized"} ; 
        return ; 
    }

    const {payload} = await jwtVerify(token,secret) ; 
    const role = payload.role as string

    if (role != "admin") {
        ctx.response.status = 403 ; 
        ctx.response.body = {message : "Not authorized you are not the admin"} ; 
        return ; 
    }

    const result = await get_All_chats() ; 
    ctx.response.status =200 ;
    ctx.response.body = result ; }

    catch(error) {
        throw error ; 
    }

}   

export const getChatParticipants = async (ctx: Context) => {
    try {const token = await ctx.cookies.get("auth_token") ; 

        if (!token) {
            ctx.response.status = 401 ; 
            ctx.response.body = {message : "Not authorized"} ; 
            return ; 
        }
    
        const {payload} = await jwtVerify(token,secret) ; 
        const role = payload.role as string
    
        if (role != "admin") {
            ctx.response.status = 403 ; 
            ctx.response.body = {message : "Not authorized you are not the admin"} ; 
            return ; 
        }

        const body = await ctx.request.body().value;
        const { conversation_name } = body;


        const result = await get_chat_participants(conversation_name)  

        ctx.response.status = 200 
        ctx.response.body = result 
    }
    catch(error) {
        console.error("Error in the middlewware")
        throw(error)
    }
}