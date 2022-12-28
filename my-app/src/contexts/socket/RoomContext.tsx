import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import {
  setDisconnectUser,
  setNewUser,
  setOwnerUser,
  setUsers,
  updateScores,
  usersUpdatePainter,
} from "../../store/user/userSlice";
import { useState } from "react";
import { setCleanChat, setNewMessage } from "../../store/game/gameSlice";

interface RoomContextProps {
  children: React.ReactNode;
}

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<RoomContextProps> = ({
  children,
}) => {
  const [canvasImage, setCanvasImage] = useState(null);
  const { round, limitRound } = useAppSelector((state) => state.game);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createRoom = ({ roomId }) => {
    ws.emit("create-room", roomId);

    navigate(`pinturillo/lobby/${roomId}`);
  };

  const enterRoom = ({ roomId }: { roomId: String }) => {
    dispatch(setOwnerUser());
  };

  const joinRoom = ({ roomId, user }) => {
    ws.emit("join-room", roomId, user);
  };

  const getUsers = ({ participants }) => {
    dispatch(setUsers({ users: participants }));
  };

  const getNewUser = ({ user }) => {
    dispatch(setNewUser(user));
  };

  const getUserDisconnect = ({ user }) => {
    dispatch(setDisconnectUser(user));
  };

  const startGame = (roomId) => {
    ws.emit("start-game", roomId);
  };

  const startGameRoom = (roomId) => {
    navigate(`/pinturillo/game/${roomId}`);
  };

  const getNewMessage = (newData) => {
    dispatch(setNewMessage(newData));
  };

  const setNewPainter = (roomId, users, user, userWasPainter) => {
    if (round < limitRound) {
      ws.emit("clear-canvas", roomId);
      dispatch(usersUpdatePainter({ users, user, userWasPainter }));
      dispatch(setCleanChat());
    }
  };

  const setScores = (users, userId, score) => {
    dispatch(updateScores({ users, userId, score }));
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-joined", getNewUser);
    ws.on("user-disconnect", getUserDisconnect);
    ws.on("start-game-room", startGameRoom);
    ws.on("canvas-data", (data) => setCanvasImage(data));
    ws.on("new-message", getNewMessage);
    ws.on("new-painter", setNewPainter);
    ws.on("user-guess-word", setScores);

    return () => {
      ws.off("room-created");
      ws.off("get-users");
      ws.off("user-joined");
      ws.off("user-disconnect");
      ws.off("start-game-room");
      ws.off("canvas-data");
      ws.off("new-message");
      ws.off("new-painter");
      ws.off("user-guess-word");
    };
  }, []);

  return (
    <RoomContext.Provider
      value={{ ws, canvasImage, createRoom, joinRoom, startGame }}
    >
      {children}
    </RoomContext.Provider>
  );
};
