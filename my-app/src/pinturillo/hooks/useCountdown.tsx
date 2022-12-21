import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/socket/RoomContext";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";

export const useCountdown = (time: number) => {
  const [countdown, setCountdown] = useState(time);
  const [lastPainter, setLastPainter] = useState("");
  const { roomId } = useParams();
  const { ws } = useContext(RoomContext);
  const { round, limitRound } = useAppSelector((state) => state.game);

  useEffect(() => {
    if (countdown === time && round < limitRound) {
      const timeoutCountdown = setTimeout(() => {
        setCountdown(countdown - 1);
        ws.emit("new-painter", roomId, lastPainter);
      }, 5000);

      return () => clearTimeout(timeoutCountdown);
    } else {
      if (countdown !== 0 && round < limitRound) {
        const timeoutCountdown = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);

        return () => clearTimeout(timeoutCountdown);
      }
    }
  }, [countdown]);

  return { countdown, setCountdown, setLastPainter };
};
