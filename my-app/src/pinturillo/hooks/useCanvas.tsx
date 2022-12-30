import { useRef, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/exports";

export const useCanvas = () => {
  const { ws, canvasImage } = useContext(RoomContext);
  const { roomId } = useParams();

  // Canvas Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // Canvas States
  const [isDrawing, setIsDrawing] = useState(false);
  const [size, setSize] = useState(5);
  const [color, setColor] = useState("#000000");

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    contextRef?.current?.beginPath();
    contextRef?.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef?.current?.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;

    contextRef?.current?.lineTo(offsetX, offsetY);
    contextRef?.current?.stroke();

    const base64ImageData = canvasRef.current?.toDataURL("image/png");

    ws.emit("canvas-data", roomId, base64ImageData);
  };

  const increaseSize = () => {
    if (size >= 30) return setSize(30);

    return setSize(size + 1);
  };

  const decreaseSize = () => {
    if (size <= 1) return setSize(1);

    return setSize(size - 1);
  };

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const clearCanvas = (e) => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      context!.clearRect(0, 0, canvas.width, canvas.height);

      ws.emit("clear-canvas", roomId);
    }
  };

  const clearCanvasToAll = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");

      context!.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");
      context?.scale(1, 1);
      context!.lineCap = "round";
      context!.strokeStyle = color;
      context!.lineWidth = size;
      contextRef.current = context;
    }
  }, [size, color]);

  useEffect(() => {
    const image = new Image();

    const canvas = canvasRef.current;

    if (canvas) {
      const context = canvas.getContext("2d");
      image.onload = function () {
        context?.drawImage(image, 0, 0);
      };
      image.src = canvasImage;
    }
  }, [canvasImage]);

  useEffect(() => {
    ws.on("clear-canvas", clearCanvasToAll);

    return () => {
      ws.off("clear-canvas");
    };
  }, []);

  return {
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
  };
};
