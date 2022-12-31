import uuid from "react-uuid";
import Swal from "sweetalert2";
import { setLoginUser } from "../../store/exports";

export const onSubmitForm = (
  e,
  isFormValid,
  username,
  usernameValid,
  dispatch
) => {
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
      score: 0,
      wordRoundZero: "",
      wordRoundOne: "",
    })
  );
};
