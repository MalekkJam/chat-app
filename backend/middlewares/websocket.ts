import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getUsername } from "./user.ts";
import { _addMessage } from "./message.ts";
import { AuthenticatedWebSocket } from "../models/Websocket.ts";
import { getConversations } from "./chat.ts";

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

    socket.onmessage = async (event) => {

      const { type,action } = JSON.parse(event.data.toString()); 
      const authSocket = socket as AuthenticatedWebSocket;
        if (type == "message") {
          _addMessage(authSocket,action,1)
        }
        else if (type === "request") {
          let actionType: string;
          
          if (action.includes("/")) {
              actionType = action.substring(0, action.indexOf("/"));
          } else {
              actionType = action;
          }
      
          switch (actionType) {
              case "getConversations": {
                  const conversations = await getConversations(username);
                  socket.send(JSON.stringify({
                      type: "response",
                      action: "getConversations",
                      data: conversations,
                  }));
                  break;
              }
      
              case "getUsername": {
                  socket.send(JSON.stringify({
                      type: "response",
                      action: "getUsername",
                      data: username
                  }));
                  break;  // Don't forget break statement
              }
      
              case "loadMessages": {
                  // Implement your message loading logic here
                  break;
              }
      
              default: {
                  console.warn(`Unknown action type: ${actionType}`);
                  socket.send(JSON.stringify({
                      type: "error",
                      message: `Unknown action: ${actionType}`
                  }));
                  break;
              }
          }
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