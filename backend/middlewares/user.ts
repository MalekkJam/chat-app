import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { User, registerUser , find_username_by_email, find_user_by_email, find_info_by_username, update_User_Data, find_password_by_username, delete_Account_From_User_Table, test_data_authenticity , find_userId_by_username} from "../models/User.ts";
import { delete_User_From_ChatParticipant } from "../models/ChatParticipant.ts"
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { JWTPayload, SignJWT, jwtVerify } from "npm:jose@5.9.6";
import { AuthenticatedWebSocket } from "../models/Websocket.ts";

// JWT Secret
const secret = new TextEncoder().encode("ed5a207a8e88013ab968eaf43d0017507508e5efa2129248b713a223eaf66864");

// Create JWT Token
function createJWT(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

// Encryption salt 
const salt = bcrypt.genSaltSync(8);

// Registration Handler
export const registration = async (ctx : Context) => {
  try {
    
    // Parse Request Body
    const { username, email, password } = await ctx.request.body().value;

    // Validate Username
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Username can only contain letters and numbers" };
      return;
    }

    // Add a unicity username and email tests 
    const test_username = await test_data_authenticity("username",username) ; 

    if (test_username) {
      ctx.response.status = 400 ; 
      ctx.response.body = {message : "Username already used choose another one"}
      return 
    }

    const test_email = await test_data_authenticity("email",email) ; 

    if (test_email) {
      ctx.response.status = 400 ; 
      ctx.response.body = {message : "Email already used choose another one"}
      return 
    }

    // Validate Password Length
    if (password.length < 4 || password.length > 20) {
      ctx.response.status = 400;
      ctx.response.body = { message: "Password must be between 4 and 20 characters long" };
      return;
    }

    // Hash the Password
    const hash = await bcrypt.hashSync(password,salt);

    // Create User Object
    const user: User = { username, email, password: hash };

    // Insert User into Database
    await registerUser(user);

    // Success Response
    ctx.response.status = 201;
    ctx.response.body = { message: "User registered successfully!" };

  } catch (error) {
    console.error("Registration Error:", error);
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal Server Error" };
  }
};

// Login Handler 
export const login = async(ctx : Context) => {
  try {
    
    const {email , password} = await ctx.request.body().value ; 

    const hashed_password = await find_user_by_email(email) ; 
    

    if (!hashed_password) {
      ctx.response.status = 400 ; 
      ctx.response.body = { message: "User not found" };
      return;
    }

    const compare_passwords = bcrypt.compareSync(password,hashed_password) ;

    if (!compare_passwords) {
      ctx.response.status = 400 ; 
      ctx.response.body = { message: "Please enter the correct password" };
      return;
    }

    const username : string = await find_username_by_email(email) ; 

    let payload;
    if (username == "admin") {
      payload = { username: username, role: "admin" };
    } else {
      payload = { username: username, role: "user" };
    }

    // Generating the token
    const token = await createJWT(payload);
    
    // Generating the cookie 
    ctx.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60,
      secure: false,
    });

    ctx.response.status = 200;   
    
  } catch (error) {
    console.error("Login error:", error);  // Log dans la console Deno
    ctx.response.status = 500;
    ctx.response.body = { message: "Internal server error" };
}
}

// Logout handler 
export const logout = async (ctx : Context, clients : Set<WebSocket>) => {
  const token = await ctx.cookies.get("auth_token")

    if (!token) {
      ctx.response.status = 401
      ctx.response.body = {message : "Unathorized"}
      return 
    }
    const {payload} = await jwtVerify(token,secret)
    const username = payload.username as string
  
  const result = await ctx.cookies.delete("auth_token");
  
  for (const client of clients) {
    const authSocket = client as AuthenticatedWebSocket;
    if (authSocket.username === username) {
      console.log(`Closing WebSocket connection for user: ${username}`);
      client.close(1000, "Logged out");
      clients.delete(client); // Remove the client from the set
      break;
    }
  }
  result ? ctx.response.status = 200 : ctx.response.status = 400 ;  
}

// Verify token presence 
export const verifyToken = async (ctx: Context) => {
  const token = await ctx.cookies.get("auth_token");
  if (!token) {
    ctx.response.status = 401 ; 
    ctx.response.body = {message : "Invalid token please sign in"}
    return ; 
  }
  else {ctx.response.status = 200  
  }
}; 

export const getUsername = async (ctx: Context) => {
  try {
    const token = await ctx.cookies.get("auth_token");
    
    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = { message: "Unauthorized" };
      return
    }

    if (!token) {
      ctx.response.status = 401;
      ctx.response.body = { message: "Unauthorized" };
      return;
    }
    const { payload } = await jwtVerify(token, secret);
    const username = payload.username as string

    ctx.response.status = 302 ; 
    ctx.response.body = { username };


  } catch (_error) {
      ctx.response.status = 500;
      ctx.response.body = { message: "Internal server error" };    
  }
} 

export const getUserInfo = async(ctx : Context) => {
  try {
    const token = await ctx.cookies.get("auth_token")

    if (!token) {
      ctx.response.status = 401
      ctx.response.body = { message : "Unauthorized"}
      return
    }

    const {payload} = await jwtVerify(token,secret) 
    const username = payload.username as string ; 

    const result = await find_info_by_username(username) ; 
    ctx.response.status = 200
    ctx.response.body = result[0] 

  }catch (error) {
    ctx.response.status = 500
    ctx.response.body = { message : "Internal server error"}
  }
} 

export const updateUserData = async (ctx : Context) => {
  try {
    const token = await ctx.cookies.get("auth_token")

    if (!token) {
      ctx.response.status = 401
      ctx.response.body = {message : "Unathorized"}
      return 
    }



    const {payload} = await jwtVerify(token,secret)
    const username = payload.username as string

    const {data} = await ctx.request.body().value ; 

    if (data == "username") {
      const { new_username } = await ctx.request.body().value
      const result = await update_User_Data("username",username,new_username)
      
      if (result == undefined) {
        ctx.response.status = 401 
        ctx.response.body = {message : "Username already exists, try new one !"}
        return
      }
  
      // Delete the old token to maintain connection 
      await ctx.cookies.delete("auth_token");
      // Generating the new token
      const _payload = { username : new_username, role: "user" };
      const new_token = await createJWT(_payload);
      // Generating the cookie 
      ctx.cookies.set("auth_token", new_token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60,
        secure: false,
      });
    }

    if (data == "password") {
      const {current_password , new_password , confirm_new_password} = await ctx.request.body().value ; 


      
      if (new_password != confirm_new_password) {
        ctx.response.status = 400 
        ctx.response.body = {message : "Not the same password !"}
        return 
      }

      if (new_password.length < 4 || new_password.length > 20) {
        ctx.response.status = 400;
        ctx.response.body = { message: "New password must be between 4 and 20 characters long" };
        return;
      }

      const hashed_password = await find_password_by_username(username) ;

  
 
      const compare_passwords = bcrypt.compareSync(current_password,hashed_password) ;
  
      if (!compare_passwords) {
        ctx.response.status = 400 ; 
        ctx.response.body = { message: "Please enter the correct password" };
        return;
      }

      const hash = await bcrypt.hashSync(new_password,salt);
      await update_User_Data("password_hash",username,hash) ; 

    }


    ctx.response.status = 200 
    ctx.response.body = {message : "Your information has been succesfully saved !"}

  }
  catch (error) {
    ctx.response.status = 500 
    ctx.response.body = {message : "Internal server error"}
  }
}

export const deleteAccount = async (ctx : Context, clients :Set<WebSocket>) => {
  try {
    const token = await ctx.cookies.get("auth_token")

    if (!token) {
      ctx.response.status = 401
      ctx.response.body = {message : "Unathorized"}
      return 
    }
    const {payload} = await jwtVerify(token,secret)
    const username = payload.username as string;
    if (username === "admin") { // The admin will himself delete the user 
      const { username } = await ctx.request.body().value;
      const user_id = await find_userId_by_username(username) 
      await delete_User_From_ChatParticipant(user_id) ; 
      await delete_Account_From_User_Table(username) ; 
    }else { // the user deletes his account from the settings page 
      const user_id = await find_userId_by_username(username) 
      await delete_User_From_ChatParticipant(user_id) ; 
      await delete_Account_From_User_Table(username) ; 

          // Close the WebSocket connection for the user
    for (const client of clients) {
      const authSocket = client as AuthenticatedWebSocket;
      if (authSocket.username === username) {
        console.log(`Closing WebSocket connection for user: ${username}`);
        client.close(1000, "Account deleted");
        clients.delete(client); // Remove the client from the set
        break;
      }
    }
 // Remove the cookie for the user
      ctx.cookies.delete("auth_token")
    }

   ctx.response.status = 200 
   ctx.response.body = {message : "Account deleted !"}

  }catch (error) {
    ctx.response.status = 500 
    ctx.response.body = {message : "Internal server error"}
    throw error 
  }
}