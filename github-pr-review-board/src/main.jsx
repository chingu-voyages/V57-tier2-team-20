import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PrDetailsProvider } from "./context/PrDetailsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PrDetailsProvider>
      <App />
    </PrDetailsProvider>
  </StrictMode>
);
