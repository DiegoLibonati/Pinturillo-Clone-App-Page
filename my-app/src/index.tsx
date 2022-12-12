import ReactDOM from "react-dom/client";
import { PinturilloApp } from "./PinturilloApp";
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PinturilloApp />
  </Provider>
);
