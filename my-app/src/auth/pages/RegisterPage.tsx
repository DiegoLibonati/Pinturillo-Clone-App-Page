import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import pinturilloApi from "../../api/pinturilloApi";
import { logo4 } from "../../assets/exports";
import { NavBar } from "../../ui/components/NavBar";
import { setLoginUser } from "../../store/user/userSlice";
import { useAppDispatch } from "../../hooks/ReduxToolkitHooks";

const formData = {
  username: "",
  usernameValid: false,
  password: "",
  passwordValid: false,
};

const formValidations = {
  username: [
    [
      (value: String) => value.length >= 3,
      "The username must have at least 3 characters",
    ],
  ],
  password: [
    [
      (value: String) => value.length >= 6,
      "The password must have at least 6 characters",
    ],
  ],
};

export const RegisterPage = () => {
  const cookies = new Cookies();
  const {
    username,
    usernameValid,
    password,
    passwordValid,
    onInputChange,
    isFormValid,
  } = useForm(formData, formValidations);
  const dispath = useAppDispatch();
  const onSubmitForm = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: usernameValid || passwordValid,
      });
    }

    pinturilloApi
      .post("/signup", {
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          const { token, username, userId } = res.data;

          cookies.set("token", token);
          cookies.set("username", username);
          cookies.set("userId", userId);

          dispath(
            setLoginUser({
              userId: cookies.get("userId"),
              username: cookies.get("username"),
              token: token,
              isAuth: true,
            })
          );
        }
      });
  };

  return (
    <>
      <NavBar></NavBar>
      <main className="main_register_container">
        <img src={logo4} alt="logo"></img>

        <section className="section_container_register">
          <form
            className="section_container_register_form"
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
            <button type="submit">¡REGISTER!</button>
          </form>
          <Link to="/auth/login">Login</Link>
        </section>
      </main>
    </>
  );
};
