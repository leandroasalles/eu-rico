import { createRoot } from "react-dom/client";
import "./index.css";
import "./services/i18n";
import router from "./App.tsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
