import { Routes, Route, Navigate } from "react-router-dom";
import { ChooseLobbyPage, GamePage, LobbyPage, ScoresPage } from "../exports";
import { AnotherRooms } from "../pages/AnotherRooms";

export const PinturilloRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/pinturillo/index"
          element={<ChooseLobbyPage></ChooseLobbyPage>}
        ></Route>

        <Route
          path="/pinturillo/rooms"
          element={<AnotherRooms></AnotherRooms>}
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
