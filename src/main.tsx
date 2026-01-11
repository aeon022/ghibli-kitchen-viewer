// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom"; // <-- Statt BrowserRouter
import App from "./App";
import "./styles/app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* HashRouter braucht kein basename, er regelt das via Hash */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);