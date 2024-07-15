// import { io, Socket } from "socket.io-client";

// const socket: Socket = io(`https://smp.jacinthsolutions.com.au/ws`, {
//   autoConnect: false,
//   reconnectionAttempts: 10, // Number of reconnection attempts before giving up
//   reconnectionDelay: 1000, // Time between reconnection attempts
//   reconnectionDelayMax: 5000, // Maximum delay between reconnections
// });

// export default socket;

// socket.ts
import { io, Socket } from "socket.io-client";

const URL_LINK = "https://smp.jacinthsolutions.com.au";
const socket: Socket = io(URL_LINK, {
  path: "/ws", // Adjust the path if your backend uses a specific path for WebSocket
  transports: ["websocket"], // Use WebSocket transport only to avoid fallback to polling
  reconnectionDelay: 5000, // Delay between reconnection attempts
  reconnectionAttempts: 5, // Maximum number of reconnection attempts
  withCredentials: true, // Include credentials
});

export default socket;
