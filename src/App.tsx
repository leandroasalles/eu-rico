import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
