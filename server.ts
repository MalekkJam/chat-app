import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { JWTPayload, SignJWT } from "npm:jose@5.9.6";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const router = new Router();
const app = new Application();
const port = Deno.args[0] ? Number(Deno.args[0]) : 3000;

app.use(oakCors({
  origin: "http://localhost:5500", 
  credentials: true,              
}));

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Oak server running on port ${port}`);
await app.listen({ port });
