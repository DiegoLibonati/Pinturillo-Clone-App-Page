import { useContext } from "react";
import { RoomContext } from "../../contexts/exports";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { NavBar } from "../../ui/exports";
import { handleJoinToAnotherRoom } from "../helpers/handleJoinToAnotherRoom";
import "./AnotherRooms.css";

export const AnotherRooms = () => {
  const { rooms } = useAppSelector((state) => state.game);
  const { createRoom } = useContext(RoomContext);
  return (
    <>
      <NavBar></NavBar>

      <main className="main_another_rooms">
        <section className="main_another_rooms_container">
          <h1>Available Rooms</h1>

          <article className="main_another_rooms_container_wrapper">
            {rooms.length > 0 ? (
              rooms.map((room) => {
                return (
                  <div className="main_another_rooms_container_wrapper_room">
                    <h2>{room.roomId}</h2>
                    <h3>{room.lengthParticipants} Users ON</h3>
                    <button
                      onClick={() =>
                        handleJoinToAnotherRoom(room.roomId, createRoom)
                      }
                    >
                      ¡JOIN!
                    </button>
                  </div>
                );
              })
            ) : (
              <h2>Sorry but there are no rooms where you can play</h2>
            )}
          </article>
        </section>
      </main>
    </>
  );
};
