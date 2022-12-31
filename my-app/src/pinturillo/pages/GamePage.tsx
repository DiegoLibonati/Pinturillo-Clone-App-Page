import { useAppSelector } from "../../hooks/ReduxToolkitHooks";
import { Loader } from "../../ui/exports";
import { Canvas, ChatGame, PlayerScores } from "../exports";
import "./GamePage.css";

export const GamePage = () => {
  const { countdown } = useAppSelector((state) => state.game);

  return (
    <>
      {countdown === 90 && <Loader></Loader>}
      <main className="main_game_container">
        <PlayerScores></PlayerScores>

        <Canvas></Canvas>

        <ChatGame></ChatGame>
      </main>
    </>
  );
};
