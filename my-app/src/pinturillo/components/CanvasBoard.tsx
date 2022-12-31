import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { useCanvas } from "../exports";

export const CanvasBoard = () => {
  const { user } = useAppSelector((state) => state.user);

  const { canvasRef, startDrawing, finishDrawing, draw } = useCanvas();
  return (
    <canvas
      id="canvas"
      onMouseDown={user.isPainting ? startDrawing : undefined}
      onMouseUp={user.isPainting ? finishDrawing : undefined}
      onMouseMove={user.isPainting ? draw : undefined}
      ref={canvasRef}
      width="800"
      height="781"
    ></canvas>
  );
};
