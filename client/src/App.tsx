// import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
// import TodoPage from "./pages/TodoPage";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import LandingPage from "./pages/LandingPage";
// import Custom404Page from "./pages/Custom404Page";

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/todos" element={<TodoPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="*" element={<Custom404Page />} />
//       </Routes>
//     </Router>
//   );
// }









import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { todoApi } from './api/todoApi';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoPage from './pages/TodoPage';
import Custom404Page from './pages/Custom404Page';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize the app by checking authentication
    const initializeApp = async () => {
      // Add any initialization logic here if needed
      setIsInitialized(true);
    };

    initializeApp();
  }, []);

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1c1e]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route 
          path="/login" 
          element={
            todoApi.isAuthenticated() ? <Navigate to="/todos" replace /> : <LoginPage />
          } 
        />
        <Route 
          path="/signup" 
          element={
            todoApi.isAuthenticated() ? <Navigate to="/todos" replace /> : <SignupPage />
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/todos" 
          element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          } 
        />
        
        {/* 404 Route */}
        <Route path="*" element={<Custom404Page />} />
      </Routes>
    </Router>
  );
}

export default App;