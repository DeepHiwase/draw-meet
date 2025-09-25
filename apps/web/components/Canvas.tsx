import { useEffect, useRef } from "react";
import { initDraw } from "../draw";

export default function Canvas({
  roomId,
  socket,
}: {
  roomId: string;
  socket: WebSocket;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        height={765}
        width={1500}
        className="overflow-hidden overflow-y-hidden"
      ></canvas>
      <div className="absolute bottom-0 right-0 z-20">
        <div className="bg-white px-3.5 py-2">Rectangle</div>
        <div className="bg-white px-3.5 py-2">Circle</div>
      </div>
    </div>
  );
}
