import { createBrowserRouter } from "react-router";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import HomeDashboard from "./components/ui/DashboardUser/HomeDashboard";
import LandingPageComplete from './pages/LandingPageComplete';
const router = createBrowserRouter([
  {
    // for auth users
    element: <Default />,
    children: [
      {
        path: "/",
        element: <LandingPageComplete />,
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
