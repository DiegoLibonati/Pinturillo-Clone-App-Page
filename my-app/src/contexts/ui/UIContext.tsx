import { createContext, useState } from "react";

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
  });

  const setModalClose = (): void => {
    setModal({ ...modal, isOpen: false, type: "", message: "" });
  };

  const setModalOpen = (type: string, message: string): void => {
    setModal({ ...modal, isOpen: true, type: type, message: message });
  };

  return (
    <UIContext.Provider value={{ modal, setModalClose, setModalOpen }}>
      {children}
    </UIContext.Provider>
  );
};
