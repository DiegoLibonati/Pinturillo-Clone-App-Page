import { logo_blanco_y_negro } from "../../assets/exports";
import "./NavBar.css";

export const NavBar = () => {
  return (
    <header className="header_container">
      <img
        className="header_container_logo"
        src={logo_blanco_y_negro}
        alt="logo"
      ></img>
    </header>
  );
};
