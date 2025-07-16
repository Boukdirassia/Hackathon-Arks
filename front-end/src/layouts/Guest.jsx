import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../contexts/AuthContext';

const Guest = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}

export default Guest