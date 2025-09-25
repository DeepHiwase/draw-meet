import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      centerX: number;
      centerY: number;
      radius: number;
    };

export const initDraw = async (
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket
) => {
  // const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  let existingShapes: Shape[] = await getExistingShapes(roomId);

  if (!ctx) {
    return;
  }

  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);

    if (message.type === "chat") {
      const parsedShape = JSON.parse(message.message);
      existingShapes.push(parsedShape.shape);
      clearCanvas(existingShapes, canvas, ctx);
    }
  }; // TODO: edge case: when one is drawing and someone from another canvas open draws something then our shape will be gone, if doing at same time

  // TODO: fix imediate rendering/refreshing when values changes here as now i have to refresh the page
  // ctx.strokeRect(25, 0, 100, 100);

  ctx.fillStyle = "rgb(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  clearCanvas(existingShapes, canvas, ctx);

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
    // console.log(event.clientX);
    // console.log(event.clientY);

    let width = event.clientX - startX;
    let height = event.clientY - startY;
    const shape: Shape = {
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    };
    existingShapes.push(shape);

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId: parseInt(roomId),
      })
    );
  });

  canvas.addEventListener("mousemove", function (event) {
    if (clicked) {
      let width = event.clientX - startX;
      let height = event.clientY - startY;
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
      // ctx.fillStyle = "rgba(0,0,0)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      clearCanvas(existingShapes, canvas, ctx);
      ctx.strokeStyle = "rgb(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};

function clearCanvas(
  existingShapes: Shape[],
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  existingShapes.map((shape) => {
    if (shape.type === "rect") {
      ctx.strokeStyle = "rgb(255,255,255)";
      ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

const getExistingShapes = async (roomId: string) => {
  const { data } = await axios.get(
    `http://localhost:4004/api/v1/chats/${roomId}`
  );

  const messages = data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);

    return messageData.shape;
  });

  return shapes;
};
