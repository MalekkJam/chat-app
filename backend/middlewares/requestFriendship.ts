import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { jwtVerify } from "npm:jose@5.9.6/jwt/verify";
import { find_userId_by_username } from "../models/User.ts";
import { getRequests } from "../models/RequestFriendship.ts";
const secret = new TextEncoder().encode("ed5a207a8e88013ab968eaf43d0017507508e5efa2129248b713a223eaf66864");

export const fetchFriendshipRequests = async (ctx : Context) =>  {
    try {
        const token = await ctx.cookies.get("auth_token");
        
        if (!token) {
          ctx.response.status = 401;
          ctx.response.body = { message: "Unauthorized" };
          return
        }
    
        const { payload } = await jwtVerify(token, secret);
        const username = payload.username as string 
        const user_id = await find_userId_by_username(username) ; 
       const result = await getRequests(user_id);
       
       ctx.response.status = 200;
        ctx.response.body = result;
      }catch (error) {
        throw error 
      }
}