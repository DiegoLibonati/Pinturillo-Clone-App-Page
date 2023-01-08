import { useContext } from "react";
import { estrella } from "../../assets/exports";
import { UIContext } from "../../contexts/exports";
import "./GuessWordModal.css";

export const GuessWordModal = () => {
  const { modal } = useContext(UIContext);

  return (
    <div className="guesswordmodal_wrapper">
      <div className="guesswordmodal_container">
        <img src={estrella} alt="estrella"></img>
        <h2>{modal.message}</h2>
      </div>
    </div>
  );
};
