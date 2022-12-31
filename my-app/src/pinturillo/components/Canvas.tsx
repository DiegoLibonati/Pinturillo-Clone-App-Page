import { CanvasBoard } from "./CanvasBoard";
import { CanvasTitle } from "./CanvasTitle";
import { CanvasToolbox } from "./CanvasToolbox";

export const Canvas = () => {
  return (
    <section className="canvas_container">
      <CanvasTitle></CanvasTitle>
      <CanvasToolbox></CanvasToolbox>
      <CanvasBoard></CanvasBoard>
    </section>
  );
};
