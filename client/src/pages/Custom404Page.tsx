// import { Link } from 'react-router-dom';
// import { Home, ArrowLeft } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function Custom404Page() {
//   const navigate = useNavigate();

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   return (
//     <div 
//       className="min-h-screen bg-[#1a1c1e] flex items-center py-8 sm:py-0"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="doodlePattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse"><rect x="20" y="20" width="12" height="12" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M80,30 l12,-12 l3,3 l-12,12 l-4,1 z" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M120,40 v20 h-16 v-20 h16 M108,35 v5 M116,35 v5" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M40,100 c0,-10 15,-10 15,0 v15 c0,10 -20,10 -20,0 v-20" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M85,95 l5,5 l10,-10" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><circle cx="120" cy="100" r="2" fill="rgb(124,58,237)" opacity="0.15"/><path d="M15,70 h20 M15,75 h15" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(#doodlePattern)"/></svg>`)}")`,
//         backgroundRepeat: 'repeat'
//     }}>
//       <div className="container mx-auto px-4 text-center">
//         <div className="mb-6 sm:mb-8">
//           <h1 className="text-7xl sm:text-9xl font-bold text-purple-400">404</h1>
//           <div className="h-1.5 sm:h-2 w-24 sm:w-32 bg-purple-500 mx-auto rounded-full mb-6 sm:mb-8" />
//         </div>
        
//         <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
//           Page Not Found
//         </h2>
//         <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4 sm:px-0">
//           Oops! It seems you've ventured into uncharted territory. 
//           Let's get you back on track.
//         </p>
        
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
//           <Link
//             to="/"
//             className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//           >
//             <Home className="w-5 h-5 mr-2" />
//             Go Home
//           </Link>
//           <button
//             onClick={handleGoBack}
//             className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 mr-2" />
//             Go Back
//           </button>
//         </div>
        
//         <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-gray-400 px-4 sm:px-0">
//           <Link to="/" className="hover:text-purple-400 transition-colors">
//             Help Center
//           </Link>
//           <Link to="/" className="hover:text-purple-400 transition-colors">
//             Contact Support
//           </Link>
//           <Link to="/" className="hover:text-purple-400 transition-colors">
//             Report Issue
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


























import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';

export default function Custom404Page() {
  const navigate = useNavigate();
  const isAuthenticated = todoApi.isAuthenticated();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div 
      className="min-h-screen bg-[#1a1c1e] flex items-center py-8 sm:py-0"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="doodlePattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse"><rect x="20" y="20" width="12" height="12" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M80,30 l12,-12 l3,3 l-12,12 l-4,1 z" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M120,40 v20 h-16 v-20 h16 M108,35 v5 M116,35 v5" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M40,100 c0,-10 15,-10 15,0 v15 c0,10 -20,10 -20,0 v-20" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M85,95 l5,5 l10,-10" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><circle cx="120" cy="100" r="2" fill="rgb(124,58,237)" opacity="0.15"/><path d="M15,70 h20 M15,75 h15" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(#doodlePattern)"/></svg>`)}")`,
        backgroundRepeat: 'repeat'
    }}>
      <div className="container mx-auto px-4 text-center">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-7xl sm:text-9xl font-bold text-purple-400">404</h1>
          <div className="h-1.5 sm:h-2 w-24 sm:w-32 bg-purple-500 mx-auto rounded-full mb-6 sm:mb-8" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
          Page Not Found
        </h2>
        <p className="text-lg sm:text-xl text-gray-400 mb-6 sm:mb-8 max-w-md mx-auto px-4 sm:px-0">
          Oops! It seems you've ventured into uncharted territory. 
          Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
          <Link
            to={isAuthenticated ? "/todos" : "/"}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            {isAuthenticated ? 'Go to Todos' : 'Go Home'}
          </Link>
          <button
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>
        
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-gray-400 px-4 sm:px-0">
          <Link to="/" className="hover:text-purple-400 transition-colors">
            Home
          </Link>
          {!isAuthenticated && (
            <Link to="/login" className="hover:text-purple-400 transition-colors">
              Login
            </Link>
          )}
          {isAuthenticated && (
            <button
              onClick={() => todoApi.logout()}
              className="hover:text-purple-400 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}