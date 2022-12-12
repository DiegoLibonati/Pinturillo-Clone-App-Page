import { BrowserRouter } from "react-router-dom";
import { PinturilloRouter } from "./router/exports";
import { RoomProvider } from "./contexts/socket/RoomContext";
import "./PinturilloApp.css";

export const PinturilloApp = () => {
  return (
    <BrowserRouter>
      <RoomProvider>
        <PinturilloRouter></PinturilloRouter>
      </RoomProvider>
    </BrowserRouter>
  );
};
