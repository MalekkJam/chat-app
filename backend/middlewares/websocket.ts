import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";

export const connectionUpgrade = (clients : Set<WebSocket>,ctx : Context) => {
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
  }