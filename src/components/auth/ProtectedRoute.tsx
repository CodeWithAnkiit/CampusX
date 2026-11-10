import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import SessionLoader from '@/components/auth/SessionLoader';
import AmbientBackground from '@/components/layout/AmbientBackground';
import { useAuth } from '@/hooks/useAuth';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <AmbientBackground />
        <SessionLoader />
      </>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{children}</>;
}
