import { useAppSelector } from "../../hooks/ReduxToolkitHooks";

export const CanvasBoard = ({
  startDrawing,
  finishDrawing,
  draw,
  canvasRef,
}) => {
  const { user } = useAppSelector((state) => state.user);

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
