import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "../exports";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<LoginPage></LoginPage>}></Route>

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
