import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

document.title = "ExpenseFlow Pro";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);