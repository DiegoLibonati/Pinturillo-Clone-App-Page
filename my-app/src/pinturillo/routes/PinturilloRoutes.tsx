import { Routes, Route, Navigate } from "react-router-dom";
import { ChooseLobby } from "../pages/ChooseLobby";
import { Lobby } from "../pages/Lobby";

export const PinturilloRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/pinturillo/index"
          element={<ChooseLobby></ChooseLobby>}
        ></Route>

        <Route path="/pinturillo/lobby" element={<Lobby></Lobby>}></Route>

        <Route
          path="/*"
          element={<Navigate to="/pinturillo/index"></Navigate>}
        ></Route>
      </Routes>
    </>
  );
};
