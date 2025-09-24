"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

// this is use client so to work with websocket server that must be on client - server

export default function ChatRoomClient({
  messages,
  id,
}: {
  messages: { message: string }[];
  id: string;
}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [chats, setChats] = useState(messages);
  const { loading, socket } = useSocket();

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId: parseInt(id),
        })
      );
      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        console.log("hi");
        if (parsedData.type === "chat") {
          // TODO: check if this chat is of this room or not
          setChats((x) => [...x, { message: parsedData.message }]);
        }
      };
    }
  }, [socket, loading, id]);
  // ideally put or create socket,id seperate hook to join room

  return (
    <div>
      {chats.map((m) => (
        <div key={Math.random()}>{m.message}</div>
      ))}

      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button
        onClick={() => {
          socket?.send(
            JSON.stringify({
              type: "chat",
              roomId: parseInt(id),
              message: currentMessage,
            })
          );

          setCurrentMessage("");
        }}
      >
        Send
      </button>
    </div>
  );
}
