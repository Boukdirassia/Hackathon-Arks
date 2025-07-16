import { createBrowserRouter } from "react-router";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
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
        path: "/hello",
        element: <div className="bg-red-500">hello</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
export default router;
