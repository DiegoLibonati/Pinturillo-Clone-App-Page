import { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

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

  const createRoom = (roomId) => {
    ws.emit("create-room", roomId);
    navigate(`pinturillo/lobby/${roomId}`);
  };

  const enterRoom = ({ roomId }: { roomId: String }) => {
    console.log(roomId);
  };

  const joinRoom = (roomid) => {
    ws.emit("join-room", roomid);
  };

  useEffect(() => {
    ws.on("room-created", enterRoom);
  }, []);

  return (
    <RoomContext.Provider value={{ ws, createRoom, joinRoom }}>
      {children}
    </RoomContext.Provider>
  );
};
