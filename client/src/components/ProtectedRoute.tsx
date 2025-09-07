import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = todoApi.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1c1e]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;