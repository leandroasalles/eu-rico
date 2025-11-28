import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Private from "./components/Private";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <Private>
        <Provider store={store}>
          <Home />
        </Provider>
      </Private>
    ),
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
