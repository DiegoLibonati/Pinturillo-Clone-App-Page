import { Routes, Route, Navigate } from "react-router-dom";
import { IndexPage } from "../pages/exports";

export const PinturilloRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage></IndexPage>}></Route>

      <Route path="/*" element={<Navigate to="/"></Navigate>}></Route>
    </Routes>
  );
};
