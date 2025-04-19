import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getUsername } from "./user.ts";
import { _addMessage } from "./message.ts";
import { AuthenticatedWebSocket } from "../models/Websocket.ts";

export const connectionUpgrade = async (clients: Set<WebSocket>, ctx: Context) => {
  if (!ctx.isUpgradable) return;

  try {
    // 1. Call your getUsername function
    await getUsername(ctx); // This sets ctx.response
    
    // 2. Check if response is valid
    if (ctx.response.status !== 302 || !ctx.response.body) {
      ctx.response.status = 401;
      ctx.response.body = 'Unauthorized';
      return;
    }

    // 3. Extract username
    const { username } = ctx.response.body as { username: string };

    // 4. Proceed with WebSocket upgrade
    const socket = ctx.upgrade();
    clients.add(socket);

    // 5. Attach username to socket
    (socket as AuthenticatedWebSocket).username = username;


    // 6. Setup event handlers
    socket.onopen = () => {
      console.log(`${username} connected`);
      socket.send(JSON.stringify({ status: 'connected' }));
    };

    socket.onmessage = (event) => {

      const { type,action } = JSON.parse(event.data.toString()); 
        if (type == "message") {
          const authSocket = socket as AuthenticatedWebSocket;
          _addMessage(authSocket,action,1)
        }
        else if (type == "request") {
          const authSocket = socket as AuthenticatedWebSocket;
          // We have to extract the schema etc.. 
        }
      

    };

    socket.onclose = () => {
      clients.delete(socket);
      console.log(`${username} disconnected`);
    };

    socket.onerror = (error) => {
      clients.delete(socket);
      console.error(`${username} error:`, error);
    };

  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = 'Internal Server Error';
    console.error('WebSocket upgrade failed:', error);
  }
};

  export const broadcastMessage = (clients: Set<WebSocket>, message: string) => {
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  };