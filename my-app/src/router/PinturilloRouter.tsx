import { Routes, Route, Navigate } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { useAuth } from "../hooks/exports";
import { PinturilloRoutes } from "../pinturillo/routes/PinturilloRoutes";

export const PinturilloRouter = () => {
  const { auth } = useAuth();
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

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
