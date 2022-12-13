import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { owner } from "../../assets/exports";
import { RoomContext } from "../../contexts/socket/RoomContext";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { NavBar } from "../../ui/components/NavBar";
import "./Lobby.css";

export const Lobby = () => {
  const { roomid } = useParams();

  const { joinRoom } = useContext(RoomContext);

  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.isAuth && user.username) {
      joinRoom({ roomId: roomid, user: user });
    }
    // eslint-disable-next-line
  }, [roomid, user]);

  return (
    <>
      <NavBar></NavBar>

      <main className="main_lobby_container">
        <section className="menu_container">
          <h2>WELCOME TO: {roomid}</h2>
          <article className="menu_container_players">
            <div className="menu_container_players_player">
              <h2>Diego</h2>
              {user.isOwner && <img src={owner} alt="owner"></img>}
            </div>

            <div className="menu_container_players_player">
              <h2>Diego</h2>
              {user.isOwner && <img src={owner} alt="owner"></img>}
            </div>

            <div className="menu_container_players_player">
              <h2>Diego</h2>
              {user.isOwner && <img src={owner} alt="owner"></img>}
            </div>
          </article>

          <Link to="/">START GAME</Link>
        </section>
      </main>
    </>
  );
};
