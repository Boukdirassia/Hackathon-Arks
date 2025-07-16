import { createBrowserRouter } from "react-router";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeDashboard from "./components/ui/DashboardUser/HomeDashboard";
const router = createBrowserRouter([
  {
    // for auth users
    element: <Default />,
    children: [
      {
        path: "/",
        element: <div  className="text-red-500">Home</div>,

      },
      {
        path: "/dashboard-user",
        element:<HomeDashboard/>,
      }
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
