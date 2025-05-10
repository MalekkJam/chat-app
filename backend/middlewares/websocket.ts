import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getUsername } from "./user.ts";
import { _addMessage , addReaction } from "./message.ts";
import { AuthenticatedWebSocket } from "../models/Websocket.ts";
import { getMessages } from "../models/Message.ts";
import { find_username_by_id } from "../models/User.ts";

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
    
    // 5. Attach username to socket
    (socket as AuthenticatedWebSocket).username = username;
    clients.add(socket);


    // 6. Setup event handlers
    socket.onopen = () => {
      console.log(`${username} connected`);
      socket.send(JSON.stringify({ status: 'connected' }));
    };

    socket.onmessage = async (event) => {

      const { type,action } = JSON.parse(event.data.toString()); 
      const authSocket = socket as AuthenticatedWebSocket;
        if (type == "message") {
          const {conversation } = JSON.parse(event.data.toString())
          _addMessage(authSocket,action,conversation)
          broadcastMessage(clients,authSocket.username,action,conversation)
        }
        else if (type =="reaction") {
          const {message , reaction, conversation } = JSON.parse(event.data.toString()) ; 
          addReaction(authSocket,message,reaction,conversation)  ; 
        }
        else if (type === "request") {
              
          switch (action) {
     
              case "loadMessages": {
                console.log("Loading messages")
                  const {conversation} = JSON.parse(event.data.toString())
                  const messages = await getMessages(conversation) 
                  // join the two tables to get a table containing usernames and messages
                  const fullMessages = await Promise.all(
                    messages.map(async (message) => {
                      let username = "unknown";
                      try {
                        const result = await find_username_by_id(message.sender_id);
                        if (result && result.length > 0) {
                          username = result[0].username;
                        }
                      } catch (_error) {
                        // Handle error silently, username remains "unknown"
                      }
                      return {
                        username: username,
                        content: message.content,
                        date: message.timestamp,
                      };
                    })
                  );
                  socket.send(JSON.stringify({
                    type : "response" , 
                    action : "loadMessages", 
                    conversation : conversation, 
                    data : fullMessages
                  }))
                  break;
              }

      
              default: {
                  console.warn(`Unknown action type: ${action}`);
                  socket.send(JSON.stringify({
                      type: "error",
                      message: `Unknown action: ${action}`
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

export const broadcastMessage = (clients : Set<WebSocket>,username : string ,  message : string , conversation : string) => {
  const broadcastData  =JSON.stringify({
    username: username, 
    type  : "broadcast",
    action : "newMessages",
    conversation : conversation,
    data : message
  }); 

  for (const client of clients) {
    if(client.readyState === WebSocket.OPEN) {
      client.send(broadcastData)
    }
  }
}

