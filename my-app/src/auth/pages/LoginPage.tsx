import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import pinturilloApi from "../../api/pinturilloApi";
import { logo4 } from "../../assets/exports";
import { NavBar } from "../../ui/components/NavBar";
import { useAppDispatch } from "../../hooks/ReduxToolkitHooks";
import { setLoginUser } from "../../store/user/userSlice";

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

export const LoginPage = () => {
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const {
    username,
    usernameValid,
    password,
    passwordValid,
    onInputChange,
    isFormValid,
  } = useForm(formData, formValidations);
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
      .post("/login", {
        username,
        password,
      })
      .then((res) => {
        if (res.status === 200) {
          const { token, username, userId } = res.data;

          cookies.set("token", token);
          cookies.set("username", username);
          cookies.set("userId", userId);

          dispatch(
            setLoginUser({
              userId: cookies.get("userId"),
              username: cookies.get("username"),
              token: token,
              isAuth: true,
            })
          );
        }
      })
      .catch((e) => {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.response.data.message,
        });
      });
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
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => onInputChange(e)}
            />
            <button type="submit">¡GO PLAY!</button>
          </form>
          <Link to="/auth/register">Register</Link>
        </section>
      </main>
    </>
  );
};
