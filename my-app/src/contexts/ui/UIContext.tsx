import { createContext, useEffect, useState } from "react";

interface UIContextProps {
  children: React.ReactNode;
}

export const UIContext = createContext<null | any>(null);

export const UIProvider: React.FunctionComponent<UIContextProps> = ({
  children,
}) => {
  const [modal, setModal] = useState({
    isOpen: false,
    type: "",
    message: "",
    component: "",
  });

  const setModalClose = (): void => {
    setModal({ ...modal, isOpen: false, type: "", message: "", component: "" });
  };

  const setModalOpen = (
    type: string,
    message: string,
    component: string
  ): void => {
    if (component === "guesswordmodal")
      return setModal({
        ...modal,
        isOpen: true,
        type: type,
        message: message,
        component: component,
      });

    setModal({
      ...modal,
      isOpen: true,
      type: type,
      message: message,
      component: component,
    });
  };

  useEffect(() => {
    if (modal.component === "guesswordmodal") {
      const timeout = setTimeout(() => {
        setModalClose();
      }, 2000);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, [modal]);

  return (
    <UIContext.Provider value={{ modal, setModalClose, setModalOpen }}>
      {children}
    </UIContext.Provider>
  );
};
