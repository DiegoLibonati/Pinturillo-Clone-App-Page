import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks/ReduxToolkitHooks";
import {
  setDisconnectUser,
  setNewUser,
  setOwnerUser,
  setUsers,
  updateScoreToAllUsers,
  updateUsersFinalRound,
  usersUpdatePainter,
} from "../../store/user/userSlice";
import { useState } from "react";
import {
  setCleanChat,
  setNewMessage,
  setNewRoundGame,
} from "../../store/game/gameSlice";

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

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { round, limitRound } = useAppSelector((state) => state.game);

  const createRoom = ({ roomId }) => {
    ws.emit("create-room", { roomId: roomId });

    navigate(`pinturillo/lobby/${roomId}`);
  };

  const enterRoom = ({ roomId }: { roomId: String }) => {
    dispatch(setOwnerUser());
  };

  const joinRoom = ({ roomId, user }) => {
    ws.emit("join-room", { roomId: roomId, user: user });
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

  const setUpdateUsersScore = (users, user) => {
    dispatch(updateScoreToAllUsers({ users, user }));
  };

  const setNewPainter = (users, user, userWasPainter) => {
    if (round < limitRound) {
      dispatch(usersUpdatePainter({ users, user, userWasPainter }));
      dispatch(setCleanChat());
    }
  };

  const setNewRound = (users) => {
    dispatch(updateUsersFinalRound({ users }));
    dispatch(setNewRoundGame());
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    ws.on("user-joined", getNewUser);
  }, []);

  useEffect(() => {
    ws.on("user-disconnect", getUserDisconnect);
  }, []);

  useEffect(() => {
    ws.on("start-game-room", startGameRoom);
  }, []);

  useEffect(() => {
    ws.on("canvas-data", (data) => setCanvasImage(data));
  }, []);

  useEffect(() => {
    ws.on("new-message", getNewMessage);
  }, []);

  useEffect(() => {
    ws.on("update-score-user", setUpdateUsersScore);
  }, []);

  useEffect(() => {
    ws.on("new-painter", setNewPainter);
  }, []);

  useEffect(() => {
    ws.on("final-round", setNewRound);
  }, []);
  return (
    <RoomContext.Provider
      value={{ ws, canvasImage, createRoom, joinRoom, startGame }}
    >
      {children}
    </RoomContext.Provider>
  );
};
