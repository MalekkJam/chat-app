let socket: WebSocket | null = null;
let connectionPromise: Promise<WebSocket> | null = null; // Shared promise

export const initWebSocket = async (): Promise<WebSocket> => {
  // Return existing connection if OPEN
  if (socket?.readyState === WebSocket.OPEN) {
    return socket;
  }

  // Return pending promise if connecting
  if (connectionPromise) {
    return connectionPromise;
  }

  // Start new connection
  connectionPromise = new Promise((resolve, reject) => {
    socket = new WebSocket("ws://localhost:3000/ws");

    socket.onopen = () => {
      console.log("WebSocket connected");
      resolve(socket!);
    };

    socket.onerror = (error) => {
      console.error("Connection failed:", error);
      socket = null;
      connectionPromise = null;
      reject(error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
      socket = null;
      connectionPromise = null;
    };
  });

  return connectionPromise;
};

// Now works reliably across components
export const isWebSocketConnected = (): boolean => {
  return socket?.readyState === WebSocket.OPEN;
};

export const sendMessage = (message: string): void => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.error("WebSocket is not open");
  }
};