import { logo4 } from "../assets/exports";
import "./DesktopView.css";

export const DesktopView = () => {
  return (
    <main className="main_desktop_container">
      <img src={logo4} alt="logo"></img>

      <section className="section_container_desktop">
        <form className="section_container_desktop_form">
          <label htmlFor="nick">Nick:</label>
          <input type="text" id="nick" name="nick" value="" />
          <label htmlFor="lang">Idioma:</label>
          <select id="lang" name="lang" value="">
            <option>ESPAÑOL</option>
          </select>
          <button type="submit">¡A JUGAR!</button>
        </form>
      </section>
    </main>
  );
};
