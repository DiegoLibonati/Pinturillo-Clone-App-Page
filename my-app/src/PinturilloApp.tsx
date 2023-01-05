import { BrowserRouter } from "react-router-dom";
import { PinturilloRouter } from "./router/exports";
import { RoomProvider, UIProvider } from "./contexts/exports";
import "./PinturilloApp.css";

export const PinturilloApp = () => {
  return (
    <BrowserRouter>
      <RoomProvider>
        <UIProvider>
          <PinturilloRouter></PinturilloRouter>
        </UIProvider>
      </RoomProvider>
    </BrowserRouter>
  );
};
