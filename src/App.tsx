import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Private from "./components/Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <Private>
        <Home />
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
