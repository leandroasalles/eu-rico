import { createRoot } from "react-dom/client";
import "./index.css";
import "./services/i18n";
import router from "./App.tsx";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import store from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
