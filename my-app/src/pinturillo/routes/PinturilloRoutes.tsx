import { Routes, Route, Navigate } from "react-router-dom";
import { ChooseLobbyPage } from "../pages/ChooseLobbyPage";
import { LobbyPage } from "../pages/LobbyPage";

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
          path="/*"
          element={<Navigate to="/pinturillo/index"></Navigate>}
        ></Route>
      </Routes>
    </>
  );
};
