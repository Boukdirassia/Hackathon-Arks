import { createBrowserRouter } from "react-router";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeDashboard from "./components/ui/DashboardUser/HomeDashboard";
import LandingPageComplete from "./pages/LandingPageComplete";
import ChatPage from "./pages/ChatPage";
const router = createBrowserRouter([
  {
    // for auth users
    element: <Default />,
    children: [
      {
        path: "/",
        element: <LandingPageComplete />,
      },
      { path: "/dashboard-user", element: <HomeDashboard /> },
      { path: "/chat", element: <ChatPage /> },
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
      },
    ],
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);
export default router;
