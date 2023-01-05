import { error } from "../../assets/exports";
import { UIContext } from "../../contexts/exports";
import { useContext, useEffect, useState } from "react";
import "./Modal.css";

export const Modal = () => {
  const { modal, setModalClose } = useContext(UIContext);
  const [className, setclassName] = useState(false);
  useEffect(() => {
    if (modal.isOpen) {
      const timeoutClassName = setTimeout(() => {
        setclassName(true);
      }, 50);
      return () => clearTimeout(timeoutClassName);
    }
  }, [modal.isOpen]);

  return (
    <div className={className ? "modal_wrapper open" : "modal_wrapper"}>
      <div className="modal_container">
        {modal.type === "error" && <img src={error} alt="error"></img>}

        <p>{modal.message}</p>

        <button onClick={setModalClose}>Close</button>
      </div>
    </div>
  );
};
