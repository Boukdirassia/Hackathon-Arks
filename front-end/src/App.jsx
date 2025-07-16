import { RouterProvider } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import router from "./router";

const App = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-700"></div>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default App;
