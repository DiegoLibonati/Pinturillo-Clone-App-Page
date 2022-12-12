import Swal from "sweetalert2";
import "./LoginPage.css";
import { useForm } from "../../hooks/useForm";
import { logo4 } from "../../assets/exports";
import { NavBar } from "../../ui/components/NavBar";
import { useAppDispatch } from "../../hooks/ReduxToolkitHooks";
import { setLoginUser } from "../../store/user/userSlice";
import uuid from "react-uuid";

const formData = {
  username: "",
  usernameValid: false,
};

const formValidations = {
  username: [
    [
      (value: String) => value.length >= 3,
      "The username must have at least 3 characters",
    ],
  ],
};

export const LoginPage = () => {
  const { username, usernameValid, onInputChange, isFormValid } = useForm(
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
        userId: uuid(),
        username: username,
        isAuth: true,
      })
    );
  };

  return (
    <>
      <NavBar></NavBar>
      <main className="main_login_container">
        <img src={logo4} alt="logo"></img>

        <section className="section_container_login">
          <form
            className="section_container_login_form"
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
            <button type="submit">¡GO PLAY!</button>
          </form>
        </section>
      </main>
    </>
  );
};
