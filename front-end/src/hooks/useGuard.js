import { useAuth } from './contexts/AuthContext';

export function useGuard() {
  const { user, loading } = useAuth();
  return { user, loading };
}
