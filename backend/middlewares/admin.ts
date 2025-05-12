import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { jwtVerify } from "npm:jose@5.9.6/jwt/verify";
import { get_Nb_Conversations } from "../models/Chat.ts";
import { get_Nb_Users, get_all_users } from "../models/User.ts";

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

    const data = {nbConversations,nbTotalUsers} ; 

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