import { useCanvas } from "../exports";
import { CanvasBoard } from "./CanvasBoard";
import { CanvasTitle } from "./CanvasTitle";
import { CanvasToolbox } from "./CanvasToolbox";

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
