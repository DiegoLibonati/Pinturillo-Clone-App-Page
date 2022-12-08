import { Routes, Route, Navigate } from "react-router-dom";
import { IndexPage } from "../../pages/IndexPage";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<IndexPage></IndexPage>}></Route>

      <Route path="/*" element={<Navigate to="/auth/login"></Navigate>}></Route>
    </Routes>
  );
};
