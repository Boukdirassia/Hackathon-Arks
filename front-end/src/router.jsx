import { createBrowserRouter } from "react-router";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomeDashboard from "./components/ui/DashboardUser/HomeDashboard";
import LandingPageComplete from './pages/LandingPageComplete';
import MoviesDiscovery from './pages/MoviesDiscovery';
import MovieDetails from './pages/MovieDetails';
import Watchlist from './pages/Watchlist';
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
        path: "/movies",
        element: <MoviesDiscovery />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/watchlist",
        element: <Watchlist />,
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
