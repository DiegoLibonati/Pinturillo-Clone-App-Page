import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { CanvasProps } from "../../types/types";

export const CanvasToolbox = ({
  increaseSize,
  size,
  decreaseSize,
  color,
  changeColor,
  clearCanvas,
}: CanvasProps) => {
  const { user, users } = useAppSelector((state) => state.user);

  return (
    <article className="canvas_container_toolbox">
      {user.isPainting ? (
        <>
          <button id="increase" onClick={increaseSize}>
            +
          </button>
          <span id="size">{size}</span>
          <button id="decrease" onClick={decreaseSize}>
            -
          </button>
          <input type="color" id="color" value={color} onChange={changeColor} />
          <button id="clear" onClick={clearCanvas}>
            B
          </button>
        </>
      ) : (
        <h3>
          {users &&
            users.filter((user) => user.isPainting === true)[0]?.username}{" "}
          is painting
        </h3>
      )}
    </article>
  );
};
