import Swal from "sweetalert2";

export const onSubmitForm = (
  e,
  isFormValid,
  roomIdValid,
  createRoom,
  roomId
) => {
  e.preventDefault();

  if (!isFormValid) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: roomIdValid,
    });
  }

  createRoom({ roomId: roomId });
};
