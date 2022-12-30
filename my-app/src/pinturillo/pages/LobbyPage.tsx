import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { owner } from "../../assets/exports";
import { RoomContext } from "../../contexts/exports";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { NavBar } from "../../ui/exports";
import uuid from "react-uuid";
import "./LobbyPage.css";

export const LobbyPage = () => {
  const { roomId } = useParams();

  const { joinRoom, startGame } = useContext(RoomContext);

  const { user, users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.isAuth && user.username) {
      joinRoom({ roomId: roomId, user: user });
    }
    // eslint-disable-next-line
  }, [roomId, user]);

  return (
    <>
      <NavBar></NavBar>

      <main className="main_lobby_container">
        <section className="menu_container">
          <h2>WELCOME TO: {roomId}</h2>
          <article className="menu_container_players">
            {users.map((user) => {
              return (
                <div key={uuid()} className="menu_container_players_player">
                  <h2>{user.username}</h2>
                  {user.isOwner && <img src={owner} alt="owner"></img>}
                </div>
              );
            })}
          </article>

          {user.isOwner && (
            <Link
              to={`/pinturillo/game/${roomId}`}
              onClick={() => startGame(roomId)}
            >
              START GAME
            </Link>
          )}
        </section>
      </main>
    </>
  );
};
