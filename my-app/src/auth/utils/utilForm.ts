export const formData = {
  username: "",
  usernameValid: false,
};

export const formValidations = {
  username: [
    [
      (value: String) => value.length >= 3,
      "The username must have at least 3 characters",
    ],
  ],
};
