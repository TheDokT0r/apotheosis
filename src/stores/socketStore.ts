import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { BACKEND_URL } from "@/helper/consts";

interface SocketStoreProps {
  socket: Socket;
  setSocket: (nweSocket: Socket) => void;
}

const token = localStorage.getItem("token");

const socketStore = create<SocketStoreProps>((set) => ({
  socket: io(BACKEND_URL, { query: { token } }),
  setSocket: (newSocket) => set({ socket: newSocket }),
}));

export default socketStore;
