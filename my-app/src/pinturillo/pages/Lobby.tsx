import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../../contexts/socket/RoomContext";

export const Lobby = () => {
  const { roomid } = useParams();

  const { joinRoom } = useContext(RoomContext);

  useEffect(() => {
    joinRoom(roomid);
    // eslint-disable-next-line
  }, [roomid]);

  return <div>Room id{roomid}</div>;
};
