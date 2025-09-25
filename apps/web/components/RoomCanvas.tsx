"use client";

import { useEffect, useState } from "react";
import Canvas from "./Canvas";

const RoomCanvas = ({ roomId }: { roomId: string }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("draw-meet");
    if (window === undefined) {
      return;
    }
    console.log(token);
    const ws = new WebSocket(`ws://localhost:8080?token=${JSON.parse(token!)}`);

    ws.onopen = () => {
      setSocket(ws);
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: parseInt(roomId),
        })
      );
    };
  }, []);

  if (!socket) {
    return <div>Connecting to Server...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
};

export default RoomCanvas;
