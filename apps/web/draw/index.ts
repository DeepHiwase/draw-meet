export const initDraw = (canvas: HTMLCanvasElement) => {
  // const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    return;
  }

  // TODO: fix imediate rendering/refreshing when values changes here as now i have to refresh the page
  // ctx.strokeRect(25, 0, 100, 100);

  ctx.fillStyle = "rgba(0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

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
      ctx.fillStyle = "rgba(0,0,0)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(255,255,255)";
      ctx.strokeRect(startX, startY, width, height);
    }
  });
};
