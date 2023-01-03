import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import {
  setCleanChat,
  setDisconnectUser,
  setNewMessage,
  setNewUser,
  setOwnerUser,
  setUsers,
  updateScores,
  usersUpdatePainter,
} from "../../store/exports";
import { Message, User } from "../../types/types";

interface RoomContextProps {
  children: React.ReactNode;
}

const WS = "http://localhost:3001";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<RoomContextProps> = ({
  children,
}) => {
  const [canvasImage, setCanvasImage] = useState(null);
  const { round, limitRound } = useAppSelector((state) => state.game);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createRoom = ({ roomId }: { roomId: number }) => {
    ws.emit("create-room", roomId);

    navigate(`pinturillo/lobby/${roomId}`);
  };

  const enterRoom = () => {
    dispatch(setOwnerUser());
  };

  const joinRoom = ({ roomId, user }: { roomId: number; user: User }) => {
    ws.emit("join-room", roomId, user);
  };

  const getUsers = ({ participants }: { participants: Array<User> }) => {
    dispatch(setUsers({ participants }));
  };

  const getNewUser = ({ user }: { user: User }) => {
    dispatch(setNewUser(user));
  };

  const getUserDisconnect = ({ user }: { user: User }) => {
    dispatch(setDisconnectUser(user));
  };

  const startGame = (roomId: string) => {
    ws.emit("start-game", roomId);
  };

  const startGameRoom = (roomId: string) => {
    navigate(`/pinturillo/game/${roomId}`);
  };

  const getNewMessage = (newData: Message) => {
    dispatch(setNewMessage(newData));
  };

  const setNewPainter = (
    roomId: string,
    users: Array<User>,
    user: User,
    userWasPainter: User
  ) => {
    if (round < limitRound) {
      ws.emit("clear-canvas", roomId);
      dispatch(usersUpdatePainter({ users, user, userWasPainter }));
      dispatch(setCleanChat());
    }
  };

  const setScores = (users: Array<User>, userId: string, score: number) => {
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
    // eslint-disable-next-line
  }, []);

  return (
    <RoomContext.Provider
      value={{ ws, canvasImage, createRoom, joinRoom, startGame }}
    >
      {children}
    </RoomContext.Provider>
  );
};
