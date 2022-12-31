import { useCanvas, CanvasBoard, CanvasTitle, CanvasToolbox } from "../exports";

export const Canvas = () => {
  const {
    color,
    size,
    canvasRef,
    startDrawing,
    finishDrawing,
    draw,
    increaseSize,
    decreaseSize,
    changeColor,
    clearCanvas,
  } = useCanvas();
  return (
    <section className="canvas_container">
      <CanvasTitle></CanvasTitle>
      <CanvasToolbox
        increaseSize={increaseSize}
        size={size}
        decreaseSize={decreaseSize}
        color={color}
        changeColor={changeColor}
        clearCanvas={clearCanvas}
      ></CanvasToolbox>
      <CanvasBoard
        startDrawing={startDrawing}
        finishDrawing={finishDrawing}
        draw={draw}
        canvasRef={canvasRef}
      ></CanvasBoard>
    </section>
  );
};
