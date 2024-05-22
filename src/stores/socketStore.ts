import { create } from "zustand";
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";

interface SocketStoreProps {
  socket: Socket;
  setSocket: (URL: string) => void;
}

const socketStore = create<SocketStoreProps>((set) => ({
  socket: io(""),
  setSocket: (URL) => set({ socket: io(URL) }),
}));

export default function useSocket(
  URL?: string
): [Socket, (URL: string) => void] {
  const socket = socketStore((state) => state.socket);
  const setSocket = socketStore((state) => state.setSocket);

  useEffect(() => {
    if (URL) setSocket(URL);
  }, [URL, setSocket]);

  return [socket, setSocket];
}
