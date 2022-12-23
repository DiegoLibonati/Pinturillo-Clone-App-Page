export const formData = {
  roomId: "",
  roomIdValid: false,
};

export const formValidations = {
  roomId: [
    [
      (value: String) => value.length >= 3,
      "The room must have at least 3 characters",
    ],
  ],
};
