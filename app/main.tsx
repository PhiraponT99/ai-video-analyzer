import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Home from "./routes/home";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  </React.StrictMode>
);