// @ts-ignore
import io, { Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (userId: number) => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_BASE_URL, {
      query: { userId },
    });
  }

  return socket;
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
