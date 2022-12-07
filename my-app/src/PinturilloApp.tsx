import { BrowserRouter } from "react-router-dom";
import { PinturilloRouter } from "./router/exports";
import "./PinturilloApp.css";

export const PinturilloApp = () => {
  return (
    <BrowserRouter>
      <PinturilloRouter></PinturilloRouter>
    </BrowserRouter>
  );
};
