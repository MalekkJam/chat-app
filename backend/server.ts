import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { JWTPayload, SignJWT } from "npm:jose@5.9.6";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
const app = new Application();
const port = Deno.args[0] ? Number(Deno.args[0]) : 3000;


// JWT secrets
const secret = new TextEncoder().encode("ed5a207a8e88013ab968eaf43d0017507508e5efa2129248b713a223eaf66864");

// Create JWT
async function createJWT(payload: JWTPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
}

// For testing purposes
router.get("/", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = "Hello world!";
});


router.post("/login", async (ctx) => {
  const body = await ctx.request.body({ type: "json" }).value;
  const { username, password } = body;

  // Simulated password hash check
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash("123", salt); // Replace with real user password check
  const result = await bcrypt.compare(password, hash);

  if (result) {
    const payload = { username, role: "user" };
    const token = await createJWT(payload);

    ctx.cookies.set("auth_token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60,
      secure: false,
    });

    ctx.response.status = 200;
    ctx.response.body = { username: username };



  } else {
    ctx.response.status = 401;
    ctx.response.body = { message: "Unauthorized" };
  }
});

app.use(oakCors({
  origin: "http://localhost:5173", 
  credentials: true,              
}));

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Oak server running on port ${port}`);
await app.listen({ port });
