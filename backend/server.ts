import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { registration , login, logout, verifyToken, getConversations} from "./middlewares/user.ts";

const router = new Router();
const app = new Application();
const port = Deno.args[0] ? Number(Deno.args[0]) : 3000;

// Connected websockets clients 
const clients = new Set<WebSocket>();


router.post("/registration", registration);
router.post("/login",login) ; 
router.post("/logout",logout) ; 
router.post("/verifyToken",verifyToken) ; 
router.get("/getConversations",getConversations) ; 
    
// WebSocket endpoint
router.get("/ws", (ctx) => {
  if (ctx.isUpgradable) {
    const socket = ctx.upgrade();
    clients.add(socket);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      console.log("Message received:", event.data);

      // Broadcast the message to all connected clients
      for (const client of clients) {
        if (client !== socket && client.readyState === WebSocket.OPEN) {
          client.send(`Broadcast: ${event.data}`);
        }
      }
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      clients.delete(socket);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      clients.delete(socket);
    };
  }
});


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
