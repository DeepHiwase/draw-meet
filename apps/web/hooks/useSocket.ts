import { useEffect, useState } from "react";

export const useSocket = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<WebSocket | null>();

  useEffect(() => {
    const token = localStorage.getItem("draw-meet");
    // console.log(JSON.parse(token!))

    const ws = new WebSocket(`ws://localhost:8080?token=${JSON.parse(token!)}`);

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };

    return () => {
      ws.close = () => {
        setSocket(null);
      };
    };
  }, []);

  return {
    socket,
    loading,
  };
};
