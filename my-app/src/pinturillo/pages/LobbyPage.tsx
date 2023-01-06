import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { owner } from "../../assets/exports";
import { RoomContext, UIContext } from "../../contexts/exports";
import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { NavBar } from "../../ui/exports";
import uuid from "react-uuid";
import "./LobbyPage.css";
import { useDispatch } from "react-redux";
import { resetGame, resetUser } from "../../store/exports";

export const LobbyPage = () => {
  const { roomId } = useParams();

  const { joinRoom, startGame, ws } = useContext(RoomContext);
  const { setModalOpen } = useContext(UIContext);

  const { user, users } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user.isAuth && user.username) {
      joinRoom({ roomId: roomId, user: user });
    }
    // eslint-disable-next-line
  }, [roomId, user]);

  const dispatch = useDispatch();

  const setUserNotJoined = () => {
    dispatch(resetUser());
    dispatch(resetGame());
    setModalOpen(
      "error",
      `Room: ${roomId} already started, try to join later or try to join to another room`
    );
  };

  useEffect(() => {
    ws.on("user-not-joined", setUserNotJoined);

    return () => {
      ws.off("user-not-joined");
    };
    // eslint-disable-next-line
  }, []);
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

          {user.isOwner && users.length > 1 && (
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
