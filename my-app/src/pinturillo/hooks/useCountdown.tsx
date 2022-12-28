import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/socket/RoomContext";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { setNewRoundGame } from "../../store/game/gameSlice";
import { resetUsersRound } from "../../store/user/userSlice";

export const useCountdown = (time: number) => {
  const [countdown, setCountdown] = useState(time);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roomId } = useParams();
  const { ws } = useContext(RoomContext);
  const { round, limitRound } = useAppSelector((state) => state.game);
  const { usersGuessed, users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (round === limitRound) return navigate(`/pinturillo/scores/${roomId}`);

    if (countdown === 0) {
      const userPainter = users.filter((user) => user.isPainting === true)[0];

      if (userPainter) {
        setCountdown(90);
      }
    }

    const allUsersWasPainters = users.filter(
      (user) => user.wasPainter === true || user.isPainting === true
    );

    if (countdown === 90 && allUsersWasPainters.length === users.length) {
      dispatch(setNewRoundGame());
      dispatch(resetUsersRound());
      ws.emit("reset-users-round", roomId);
      const timeoutCountdown = setTimeout(() => {
        ws.emit("new-painter", roomId);
        ws.emit("countdown-event", roomId);
      }, 5000);
      return () => clearTimeout(timeoutCountdown);
    }

    if (countdown === 90 && round < limitRound) {
      const timeoutCountdown = setTimeout(() => {
        ws.emit("new-painter", roomId);
        ws.emit("countdown-event", roomId);
      }, 5000);
      return () => clearTimeout(timeoutCountdown);
    }
  }, [countdown, round]);

  useEffect(() => {
    if (usersGuessed.length === users.length) {
      ws.emit("all-users-guess");
    }
  }, [usersGuessed]);

  const getCountdown = (count) => {
    setCountdown(count.countdown);
  };

  useEffect(() => {
    ws.on("countdown-event", getCountdown);

    return () => {
      ws.off("countdown-event");
    };
  }, []);

  return { countdown, setCountdown };
};
