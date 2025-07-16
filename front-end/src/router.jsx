import { createBrowserRouter } from "react-router";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
const router = createBrowserRouter([
  {
    // for auth users
    element: <Default />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
    ],
  },

  {
    // for guests
    element: <Guest />,
    children: [
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      }
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
export default router;
