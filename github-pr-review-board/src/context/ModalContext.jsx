import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModal = () => {
    setShowModal((open) => !open);
  };

  return (
    <ModalContext.Provider value={{ showModal, setShowModal, handleModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
