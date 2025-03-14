import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import db from "./config/database.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { registration } from "./middlewares/user.ts";

const router = new Router();
const app = new Application();
const port = Deno.args[0] ? Number(Deno.args[0]) : 3000;

// Test route to check the database connection
router.get("/test-db", (ctx) => {
  try {
    const result = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
    ctx.response.status = 200;
    ctx.response.body = { success: true, tables: result };
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = { success: false , message : error };
  }
});

// For testing purposes
router.get("/", (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = "Hello world!";
});


router.post("/registration", registration);

app.use(
  oakCors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Oak server running on port ${port}`);
await app.listen({ port });
