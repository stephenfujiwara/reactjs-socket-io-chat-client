import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Chat from "./components/Chat";
import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/chat", element: <Chat /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
