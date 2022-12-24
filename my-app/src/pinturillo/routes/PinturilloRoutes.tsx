import { Routes, Route, Navigate } from "react-router-dom";
import { ChooseLobbyPage } from "../pages/ChooseLobbyPage";
import { GamePage } from "../pages/GamePage";
import { LobbyPage } from "../pages/LobbyPage";
import { ScoresPage } from "../pages/ScoresPage";

export const PinturilloRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/pinturillo/index"
          element={<ChooseLobbyPage></ChooseLobbyPage>}
        ></Route>

        <Route
          path="/pinturillo/lobby/:roomId"
          element={<LobbyPage></LobbyPage>}
        ></Route>

        <Route
          path="/pinturillo/game/:roomId"
          element={<GamePage></GamePage>}
        ></Route>

        <Route
          path="/pinturillo/scores/:roomId"
          element={<ScoresPage></ScoresPage>}
        ></Route>

        <Route
          path="/*"
          element={<Navigate to="/pinturillo/index"></Navigate>}
        ></Route>
      </Routes>
    </>
  );
};
