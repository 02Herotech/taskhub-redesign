// hooks/useSocket.ts
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(url);

    // Clean up on unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [url]);

  return socket.current;
};

export default useSocket;
