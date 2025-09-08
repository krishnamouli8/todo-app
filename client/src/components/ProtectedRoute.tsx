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
    const checkAuth = async () => {
      console.log('ProtectedRoute: Checking authentication...');
      
      try {
        // First check if token exists and is valid format/not expired
        const tokenValid = todoApi.isAuthenticated();
        
        if (!tokenValid) {
          console.log('ProtectedRoute: Token invalid or expired');
          setIsAuthenticated(false);
          setIsChecking(false);
          return;
        }

        // If token appears valid, test it with a real API call
        console.log('ProtectedRoute: Token appears valid, testing with API call...');
        await todoApi.getTodos();
        
        console.log('ProtectedRoute: API call successful, user is authenticated');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('ProtectedRoute: Authentication failed:', error);
        // Clear any invalid tokens
        todoApi.clearAuthData();
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1c1e]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    console.log('ProtectedRoute: User not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute: User authenticated, rendering protected content');
  return <>{children}</>;
};

export default ProtectedRoute;