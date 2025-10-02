import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PrDetailsProvider } from "./context/PrDetailsContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import Modal from "./components/home/Modal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrDetailsProvider>
      <ModalProvider>
        <App />

        <Modal />
      </ModalProvider>
    </PrDetailsProvider>
  </StrictMode>
);
