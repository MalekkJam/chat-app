import { Context } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getUsername } from "./user.ts";
import { _addMessage , addReaction } from "./message.ts";
import { AuthenticatedWebSocket } from "../models/Websocket.ts";
import { addMessage, getMessages, Message } from "../models/Message.ts";
import { find_userId_by_username, find_username_by_id } from "../models/User.ts";
import { sendRequest , acceptRequest , rejectRequest} from "../models/RequestFriendship.ts";
import {addFriendship} from "../models/Frienship.ts"
import { add_chat , get_private_chatid, get_chatID_by_chatName } from "../models/Chat.ts";
import { add_user_to_chat } from "../models/ChatParticipant.ts";
import { UserAgent } from "https://deno.land/x/oak@v12.6.1/deps.ts";

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

      // Get the type and the action before anything 
      const { type,action } = JSON.parse(event.data.toString()); 

      // Convert the websocket to authWebsocket interface to associate with each websocket the username 
      const authSocket = socket as AuthenticatedWebSocket;

      switch (type) {
        case "message" : { 
          // Adding a message to the DB
          const {conversation , chatType} = JSON.parse(event.data.toString())
          let _chat_id;
          if (chatType == "private" ) {
            // Searching for the chat id at first 
            const my_id =  await find_userId_by_username(username) 
            const friend_id = await find_userId_by_username(conversation) 
            _chat_id = await get_private_chatid(my_id,friend_id)

            // No need for the message middleware because we already have all the data 
            const message : Message =  {
              chat_id : Number(_chat_id) , 
              sender_id : Number(my_id) , 
              content : action , 
              timestamp : new Date() 
            } ; 


            await addMessage(message)
             broadcastPrivateMessage(
              clients,
              socket,
              username,
              conversation,
              action
            );
          }
          else {
            _addMessage(authSocket,action,conversation)
            broadcastGroupMessage(clients,authSocket.username,action,conversation)
          }
          break;
        }
        case "reaction" :  {
          const {message , reaction, conversation } = JSON.parse(event.data.toString()) ; 
          addReaction(authSocket,message,reaction,conversation)  ; 
          break;
        }
        case "request" : {
          switch (action) {
     
              case "loadMessages": {
                  const {conversation , chatType} = JSON.parse(event.data.toString())
                  let chat_id
                  if (chatType == "private" ) {
                     // Searching for the chat id at first 
                    const my_id =  await find_userId_by_username(username) 
                    const friend_id = await find_userId_by_username(conversation) 

                    chat_id = await get_private_chatid(my_id,friend_id)
                    console.log("private chat id :",chat_id);
                  }
                  else {
                    chat_id = await get_chatID_by_chatName(conversation) ; 
                  }

                    const messages = await getMessages(chat_id!) 

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
                  
                 
              case "sendRequest": {
                try {const { target } = JSON.parse(event.data.toString());
                const sender_id = await find_userId_by_username(username) ; 
                const target_id = await find_userId_by_username(target) ; 

                await sendRequest(sender_id,target_id) ; 
                }
                catch(_error) {}
                socket.send(JSON.stringify({
                    type : "response" , 
                    action : "sendRequest", 
                    status : 200,
                  }))
                break;
              }

              case  "manageRequest" : {
                try {
                  const { target } = JSON.parse(event.data.toString());
                  const target_id = await find_userId_by_username(username) ; 
                  const sender_id = await find_userId_by_username(target) ;  

                  await acceptRequest(sender_id,target_id) ; 
                  await addFriendship(sender_id,target_id) ; 
                  const newChatId = await add_chat("conversation","private") ; 
                  await add_user_to_chat(newChatId,target_id) ; 
                  await add_user_to_chat(newChatId,sender_id) ; 
                }catch (error) {/* Silently managing the errors */}
                socket.send(JSON.stringify({
                  type : "response" , 
                  action : "manageRequest" , 
                  status : 200 
                }))
                break ; 
              }

              case "rejectRequest" : {
               try{ const {sender} = JSON.parse(event.data.toString()) ; 
                const sender_id = await find_userId_by_username(sender) ; 
                const user_id = await find_userId_by_username(username) ; 
                await rejectRequest(sender_id,user_id) ; 
                }
                catch(error) {}
                socket.send(JSON.stringify({
                  type : "response" , 
                  action : "rejectRequest",
                  status : 200
                }))
                break ; 
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
       
             
        break ; 
        }
        case 'updateUsernames' : {
              broadcastUpdateUsernames(clients)
              break ; 
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

export const broadcastGroupMessage = (clients : Set<WebSocket>,username : string ,  message : string , conversation : string) => {
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



// Add this function to your websocket.ts
export const broadcastPrivateMessage = (
  clients: Set<WebSocket>,
  senderSocket: WebSocket,
  senderUsername: string,
  receiverUsername: string,
  messageContent: string
) => {
  // Prepare message for sender (conversation shows receiver's username)
  const senderData = JSON.stringify({
    username: senderUsername,
    type: "broadcast",
    action: "newMessages",
    conversation: receiverUsername,
    data: messageContent
  });

  // Send to sender
  if (senderSocket.readyState === WebSocket.OPEN) {
    senderSocket.send(senderData);
  }

  // Prepare message for receiver (conversation shows sender's username)
  const receiverData = JSON.stringify({
    username: senderUsername,
    type: "broadcast",
    action: "newMessages",
    conversation: senderUsername,
    data: messageContent
  });

  // Find and send to receiver
  for (const client of clients) {
    const authClient = client as AuthenticatedWebSocket;
    if (authClient.username === receiverUsername && client.readyState === WebSocket.OPEN) {
      client.send(receiverData);
    }
  }
};


export function broadcastUpdateUsernames(clients: Set<WebSocket>) {
  const data = JSON.stringify({
    type: "updateUsernames"
  });
  for (const client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  }
}