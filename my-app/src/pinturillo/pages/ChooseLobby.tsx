import Swal from "sweetalert2";
import { logo4 } from "../../assets/exports";
import { RoomContext } from "../../contexts/socket/RoomContext";
//import { useAppDispatch } from "../../hooks/ReduxToolkitHooks";
import { useForm } from "../../hooks/useForm";
import { NavBar } from "../../ui/components/NavBar";
import "./ChooseLobby.css";
import { useContext } from "react";

const formData = {
  roomId: "",
  roomIdValid: false,
};

const formValidations = {
  roomId: [
    [
      (value: String) => value.length >= 3,
      "The room must have at least 3 characters",
    ],
  ],
};

export const ChooseLobby = () => {
  const { roomId, roomIdValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  //const dispatch = useAppDispatch();

  const { createRoom } = useContext(RoomContext);

  const onSubmitForm = (e) => {
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

  return (
    <>
      <NavBar></NavBar>

      <main className="main_chooselobby_container">
        <img src={logo4} alt="logo"></img>

        <section className="section_container_chooselobby">
          <form
            className="section_container_chooselobby_form"
            onSubmit={onSubmitForm}
          >
            <label htmlFor="name">Room Name:</label>
            <input
              type="text"
              id="name"
              name="roomId"
              value={roomId}
              onChange={(e) => onInputChange(e)}
            />
            <button type="submit">¡GO LOBBY!</button>
          </form>
        </section>
      </main>
    </>
  );
};
