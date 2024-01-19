import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

/**
 * Entry point for the React application.
 * - Renders the main application component (App).
 * - Wraps the application in React Strict Mode for additional development warnings.
 * - Utilizes BrowserRouter for client-side routing.
 * - Renders the application into the HTML element with the id "root".
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
