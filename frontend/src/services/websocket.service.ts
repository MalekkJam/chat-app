let socket: WebSocket | null = null;
let connectionPromise: Promise<WebSocket> | null = null; // Shared promise

export const initWebSocket = async (): Promise<WebSocket> => {
  if (socket?.readyState === WebSocket.OPEN) {
    console.log("Reusing existing WebSocket connection");
    return socket;
  }

  if (connectionPromise) {
    console.log("Waiting for existing WebSocket connection to establish");
    return connectionPromise;
  }

  console.log("Creating a new WebSocket connection");
  connectionPromise = new Promise((resolve, reject) => {
    socket = new WebSocket("ws://localhost:3000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
      resolve(socket!);
    };

    socket.onerror = (event) => {
      if (socket.readyState !== WebSocket.CLOSED) { // Stop lauching an error when the connection is closed from the back
      console.error("WebSocket connection failed:", event);
      socket = null;
      connectionPromise = null;
      reject(new Error("WebSocket connection failed")); // Reject the promise
    }
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", event.reason);
      if (event.reason == "Account deleted" || event.reason == "Logged out") {
        window.location.href = "/login" 
      }
      socket = null;
      connectionPromise = null;
    };

  });

  return connectionPromise;
};

export const sendMessage = (message: string): void => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error("WebSocket is not open");
  }
};

export const isWebSocketConnected = (): boolean => {
  return socket?.readyState === WebSocket.OPEN;
};