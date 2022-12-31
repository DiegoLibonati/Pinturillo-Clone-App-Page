import { useContext } from "react";
import { RoomContext } from "../../contexts/exports";
import { useForm } from "../../hooks/exports";
import { formData, formValidations, onSubmitForm } from "../exports";
import { NavBar } from "../../ui/exports";
import { logo4 } from "../../assets/exports";
import "./ChooseLobbyPage.css";

export const ChooseLobbyPage = () => {
  const { roomId, roomIdValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  const { createRoom } = useContext(RoomContext);

  return (
    <>
      <NavBar></NavBar>

      <main className="main_chooselobby_container">
        <img src={logo4} alt="logo"></img>

        <section className="section_container_chooselobby">
          <form
            className="section_container_chooselobby_form"
            onSubmit={(e) =>
              onSubmitForm(e, isFormValid, roomIdValid, createRoom, roomId)
            }
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
