import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/home"; // หรือ path ที่ถูกต้อง

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);