import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppDispatch } from "../../hooks/ReduxToolkitHooks";
import {
  setDisconnectUser,
  setNewUser,
  setOwnerUser,
  setUsers,
} from "../../store/user/userSlice";
import { useState } from "react";
import { setNewMessage } from "../../store/game/gameSlice";

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
    console.log(newData);
    dispatch(setNewMessage(newData));
  };

  const setUpdateUsersScore = (users) => {
    dispatch(setUsers({ users }));
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
  return (
    <RoomContext.Provider
      value={{ ws, canvasImage, createRoom, joinRoom, startGame }}
    >
      {children}
    </RoomContext.Provider>
  );
};
