import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Custom404Page() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#1a1c1e] flex items-center">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-purple-400">404</h1>
          <div className="h-2 w-32 bg-purple-500 mx-auto rounded-full mb-8" />
        </div>
        
        <h2 className="text-4xl font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-400 mb-8 max-w-md mx-auto">
          Oops! It seems you've ventured into uncharted territory. 
          Let's get you back on track.
        </p>
        
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          <button
            onClick={handleGoBack}
            className="inline-flex items-center px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="mt-12 flex justify-center space-x-8 text-gray-400">
          <Link to="/" className="hover:text-purple-400 transition-colors">
            Help Center
          </Link>
          <Link to="/" className="hover:text-purple-400 transition-colors">
            Contact Support
          </Link>
          <Link to="/" className="hover:text-purple-400 transition-colors">
            Report Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
