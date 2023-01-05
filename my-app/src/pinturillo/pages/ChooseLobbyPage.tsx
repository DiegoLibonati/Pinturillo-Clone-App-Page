import { useContext } from "react";
import { RoomContext, UIContext } from "../../contexts/exports";
import { useForm } from "../../hooks/exports";
import { formData, formValidations, onSubmitForm } from "../exports";
import { NavBar } from "../../ui/exports";
import { logo_blanco_y_negro } from "../../assets/exports";
import "./ChooseLobbyPage.css";

export const ChooseLobbyPage = () => {
  const { roomId, roomIdValid, onInputChange, isFormValid } = useForm(
    formData,
    formValidations
  );

  const { createRoom } = useContext(RoomContext);

  const { setModalOpen } = useContext(UIContext);

  return (
    <>
      <NavBar></NavBar>

      <main className="main_chooselobby_container">
        <img src={logo_blanco_y_negro} alt="logo"></img>

        <section className="section_container_chooselobby">
          <form
            className="section_container_chooselobby_form"
            onSubmit={(e) =>
              onSubmitForm(
                e,
                isFormValid,
                roomIdValid,
                createRoom,
                roomId,
                setModalOpen
              )
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
