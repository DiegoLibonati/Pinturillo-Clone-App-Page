import { Dispatch } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { setLoginUser } from "../../store/exports";

export const onSubmitForm = (
  e: React.FormEvent<HTMLFormElement>,
  isFormValid: boolean,
  username: string,
  usernameValid: string,
  dispatch: Dispatch,
  setModalOpen: (type: string, message: string) => void
) => {
  e.preventDefault();

  if (!isFormValid) {
    setModalOpen("error", usernameValid);
    return;
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
