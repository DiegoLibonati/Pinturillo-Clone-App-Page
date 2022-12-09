import { AppleStore, GooglePlay, logo4 } from "../assets/exports";
import { NavBar } from "../ui/components/NavBar";
import "./MobileView.css";

export const MobileView = () => {
  return (
    <>
      <NavBar></NavBar>
      <main className="main_mobile_container">
        <section className="mobile_section_container">
          <img
            className="mobile_section_container_logo"
            src={logo4}
            alt="logo"
          ></img>

          <article className="mobile_section_container_downloads">
            <h2>Puedes descargarlo aqui:</h2>
            <img src={GooglePlay} alt="logo"></img>
            <img src={AppleStore} alt="logo"></img>
          </article>
        </section>
      </main>
    </>
  );
};
