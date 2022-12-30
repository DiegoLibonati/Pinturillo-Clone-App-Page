import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/exports";
import { useAuth, useMediaMatch } from "../hooks/exports";
import { PinturilloRoutes } from "../pinturillo/exports";
import { MobileView } from "../views/exports";

export const PinturilloRouter = () => {
  const { auth } = useAuth();

  const { matchMediaQuery } = useMediaMatch();

  if (!matchMediaQuery) {
    return <MobileView></MobileView>;
  } else {
    return (
      <Routes>
        {auth ? (
          <Route
            path="/*"
            element={<PinturilloRoutes></PinturilloRoutes>}
          ></Route>
        ) : (
          <Route path="/auth/*" element={<AuthRoutes></AuthRoutes>}></Route>
        )}

        <Route
          path="/*"
          element={<Navigate to="/auth/login"></Navigate>}
        ></Route>
      </Routes>
    );
  }
};
