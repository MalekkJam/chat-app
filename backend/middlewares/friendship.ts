
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import {jwtVerify } from "npm:jose@5.9.6";  
import { find_userId_by_username } from "../models/User.ts";
import { getMyFriends } from "../models/Frienship.ts";
import "jsr:@std/dotenv/load"; 

// JWT Secret
const secretStr = Deno.env.get("SECRET");
if (!secretStr) {
  throw new Error("JWT_SECRET environment variable is required");
}
const secret = new TextEncoder().encode(secretStr);

export const fetchMyFriends = async(ctx : Context) => {
     try {
        const token = await ctx.cookies.get("auth_token");
        
        if (!token) {
          ctx.response.status = 401;
          ctx.response.body = { message: "Unauthorized" };
          return
        }
    
        const {payload} = await jwtVerify(token,secret) ; 
        const username = payload.username as string
    

        const my_id = await find_userId_by_username(username)
        const result = await getMyFriends(my_id) ; 
        ctx.response.status = 200 ; 
        ctx.response.body = result ; 
    
    
      } catch (_error) {
          ctx.response.status = 500;
          ctx.response.body = { message: "Internal server error" };    
      }
}