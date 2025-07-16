import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Default = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};

export default Default;