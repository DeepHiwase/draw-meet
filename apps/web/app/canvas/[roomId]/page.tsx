"use client";

import { useEffect, useRef } from "react";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }
      // TODO: fix imediate rendering/refreshing when values changes here as now i have to refresh the page
      // ctx.strokeRect(25, 0, 100, 100);

      let clicked = false;
      let startX = 0;
      let startY = 0;

      canvas.addEventListener("mousedown", function (event) {
        clicked = true;
        startX = event.clientX;
        startY = event.clientY;
      });

      canvas.addEventListener("mouseup", function (event) {
        clicked = false;
        console.log(event.clientX);
        console.log(event.clientY);
      });

      canvas.addEventListener("mousemove", function (event) {
        if (clicked) {
          let width = event.clientX - startX;
          let height = event.clientY - startY;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.strokeRect(startX, startY, width, height);
        }
      });
    }
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} height={700} width={400}></canvas>
    </div>
  );
}
