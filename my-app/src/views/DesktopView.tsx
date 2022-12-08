import Swal from "sweetalert2";
import { logo4 } from "../assets/exports";
import { useForm, useAppDispatch } from "../hooks/exports";
import { setLoginUser } from "../store/user/userSlice";
import "./DesktopView.css";

const formData = {
  username: "",
  usernameValid: false,
  lang: "ESPAÑOL",
};

const formValidations = {
  username: [
    [
      (value: String) => value.length >= 3,
      "The username must have at least 3 characters",
    ],
  ],
};

export const DesktopView = () => {
  const { username, usernameValid, lang, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  const dispatch = useAppDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: usernameValid,
      });
    }

    dispatch(
      setLoginUser({
        username: username,
        lang: lang,
      })
    );
  };

  return (
    <main className="main_desktop_container">
      <img src={logo4} alt="logo"></img>

      <section className="section_container_desktop">
        <form
          className="section_container_desktop_form"
          onSubmit={onSubmitForm}
        >
          <label htmlFor="nick">Nick:</label>
          <input
            type="text"
            id="nick"
            name="username"
            value={username}
            onChange={(e) => onInputChange(e)}
          />
          <label htmlFor="lang">Idioma:</label>
          <select
            id="lang"
            name="lang"
            value={lang}
            onChange={(e) => onInputChange(e)}
          >
            <option value="ESPAÑOL">ESPAÑOL</option>
          </select>
          <button type="submit">¡A JUGAR!</button>
        </form>
      </section>
    </main>
  );
};
