import { useAppDispatch, useForm } from "../../hooks/exports";
import { formData, formValidations, onSubmitForm } from "../exports";
import { NavBar } from "../../ui/exports";
import { logo4 } from "../../assets/exports";
import "./LoginPage.css";

export const LoginPage = () => {
  const { username, usernameValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  const dispatch = useAppDispatch();

  return (
    <>
      <NavBar></NavBar>
      <main className="main_login_container">
        <img src={logo4} alt="logo"></img>

        <section className="section_container_login">
          <form
            className="section_container_login_form"
            onSubmit={(e) =>
              onSubmitForm(e, isFormValid, username, usernameValid, dispatch)
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
