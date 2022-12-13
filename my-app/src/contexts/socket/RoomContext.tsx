import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useAppDispatch } from "../../hooks/ReduxToolkitHooks";
import { setNewUser, setOwnerUser, setUsers } from "../../store/user/userSlice";

interface RoomContextProps {
  children: React.ReactNode;
}

const WS = "http://localhost:8080";

export const RoomContext = createContext<null | any>(null);

const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<RoomContextProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const createRoom = ({ roomId }) => {
    ws.emit("create-room", { roomId: roomId });

    navigate(`pinturillo/lobby/${roomId}`);
  };

  const enterRoom = ({ roomId }: { roomId: String }) => {
    console.log("hola");
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

  useEffect(() => {
    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
  }, []);

  useEffect(() => {
    ws.on("user-joined", getNewUser);
  }, []);

  return (
    <RoomContext.Provider value={{ ws, createRoom, joinRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
