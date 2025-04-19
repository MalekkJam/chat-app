let socket: WebSocket | null = null;

export const initWebSocket = async (): Promise<WebSocket> => {
  if (!socket) {
    socket = await new Promise<WebSocket>((resolve, reject) => {
      const ws = new WebSocket('ws://localhost:3000/ws');
      ws.onopen = () => {
        console.log('WebSocket connection established');
        resolve(ws);
      };
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(error);
      };
    });
    
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      socket = null; // Reset the socket
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }
  return socket;
};

export const sendMessage = (message: string, token : string): void => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message, token }));
    } else {
      console.error('WebSocket is not open');
    }
  };