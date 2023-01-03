import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/exports";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import {
  resetUsersRound,
  setCountdown,
  setNewRoundGame,
} from "../../store/exports";
import { CountdownProps } from "../../types/types";

export const useCountdown = (): CountdownProps => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { roomId } = useParams();
  const { ws } = useContext(RoomContext);
  const { round, limitRound, countdown } = useAppSelector(
    (state) => state.game
  );
  const { usersGuessed, users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (round === limitRound) return navigate(`/pinturillo/scores/${roomId}`);

    if (countdown === 0) {
      const userPainter = users.filter((user) => user.isPainting === true)[0];

      if (userPainter) {
        dispatch(setCountdown({ countdown: 90 }));
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
        console.log("nuevo pintor");
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
    // eslint-disable-next-line
  }, [countdown, round]);

  useEffect(() => {
    if (usersGuessed.length === users.length) {
      ws.emit("all-users-guess");
    }
    // eslint-disable-next-line
  }, [usersGuessed]);

  const getCountdown = (count: { countdown: number }) => {
    dispatch(setCountdown({ countdown: count.countdown }));
  };

  useEffect(() => {
    ws.on("countdown-event", getCountdown);

    return () => {
      ws.off("countdown-event");
    };
    // eslint-disable-next-line
  }, []);

  return { countdown, setCountdown };
};
