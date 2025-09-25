// src/main.jsx (or index.jsx)
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TradeProvider } from "./context/TradeContext";
import "./index.css"; // tailwind etc.

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <TradeProvider>
        <App />
      </TradeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
