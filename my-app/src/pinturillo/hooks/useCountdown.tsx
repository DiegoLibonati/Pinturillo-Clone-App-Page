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
  const { usersGuessed, users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (countdown === 0) {
      const userPainter = users.filter((user) => user.isPainting === true)[0]
        .userId;
      setCountdown(90);
      setLastPainter(userPainter);
    }

    if (countdown === 90 && round < limitRound) {
      const timeoutCountdown = setTimeout(() => {
        ws.emit("new-painter", roomId, lastPainter);
        ws.emit("countdown-event", roomId);
      }, 5000);
      return () => clearTimeout(timeoutCountdown);
    }
  }, [countdown]);

  useEffect(() => {
    if (usersGuessed.length === users.length) {
      ws.emit("all-users-guess");
      const userPainter = users.filter((user) => user.isPainting === true)[0]
        .userId;
      setLastPainter(userPainter);
    }
  }, [usersGuessed]);

  const getCountdown = (count) => {
    setCountdown(count.countdown);
  };

  useEffect(() => {
    ws.on("countdown-event", getCountdown);

    return () => ws.off("countdown-event");
  }, []);

  return { countdown, setCountdown, setLastPainter };
};
