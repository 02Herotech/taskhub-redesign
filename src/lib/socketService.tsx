// @ts-ignore
import io from "socket.io-client";

class SocketService {
  private static instance: SocketService;
  // public socket: Socket;
  public socket;

  private constructor() {
    this.socket = io("https://smp.jacinthsolutions.com.au"); // Base URL without userId
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(userId: number) {
    if (!this.socket.connected) {
      this.socket.io.opts.query = { userId }; // Add userId to the query
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}

export default SocketService.getInstance();
