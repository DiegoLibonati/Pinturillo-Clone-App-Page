import React from "react";
import ReactDOM from "react-dom/client";
import { PinturilloApp } from "./PinturilloApp";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <PinturilloApp />
  </React.StrictMode>
);
