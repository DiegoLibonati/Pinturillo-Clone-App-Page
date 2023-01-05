import { useContext } from "react";
import { useAppDispatch, useForm } from "../../hooks/exports";
import { formData, formValidations, onSubmitForm } from "../exports";
import { NavBar } from "../../ui/exports";
import { logo_blanco_y_negro } from "../../assets/exports";
import { UIContext } from "../../contexts/exports";
import "./LoginPage.css";

export const LoginPage = () => {
  const { username, usernameValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  const dispatch = useAppDispatch();
  const { setModalOpen } = useContext(UIContext);

  return (
    <>
      <NavBar></NavBar>
      <main className="main_login_container">
        <img src={logo_blanco_y_negro} alt="logo"></img>

        <section className="section_container_login">
          <form
            className="section_container_login_form"
            onSubmit={(e) =>
              onSubmitForm(
                e,
                isFormValid,
                username,
                usernameValid,
                dispatch,
                setModalOpen
              )
            }
          >
            <label htmlFor="nick">Nick:</label>
            <input
              type="text"
              id="nick"
              name="username"
              value={username}
              onChange={(e) => onInputChange(e)}
            />
            <button type="submit">¡GO PLAY!</button>
          </form>
        </section>
      </main>
    </>
  );
};
