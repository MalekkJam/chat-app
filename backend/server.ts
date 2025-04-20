import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { registration , login, logout, verifyToken} from "./middlewares/user.ts";
import { connectionUpgrade } from "./middlewares/websocket.ts";

const router = new Router();
const app = new Application();
const port = Deno.args[0] ? Number(Deno.args[0]) : 3000;

// Connected websockets clients 
const clients = new Set<WebSocket>();


router.post("/registration", registration);
router.post("/login",login) ; 
router.post("/logout",logout) ; 
router.post("/verifyToken",verifyToken) ; 
    
// WebSocket endpoint
router.get("/ws", (ctx) => connectionUpgrade(clients, ctx));


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
