import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { User, registerUser , find_username_by_email, find_user_by_email} from "../models/User.ts";
import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { JWTPayload, SignJWT } from "npm:jose@5.9.6";

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

    // Generating the token
    const payload = { username, role: "user" };
    const token = await createJWT(payload);

    // Generating the cookie 
    ctx.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60,
      secure: false,
    });
    
    
  }catch (error) {
    throw error ; 
  }
}