// import { Link } from 'react-router-dom';

// export default function Custom404Page() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center">
//       <div className="container mx-auto px-4 text-center">
//         <div className="mb-8">
//           <h1 className="text-9xl font-bold text-indigo-600">404</h1>
//           <div className="h-2 w-32 bg-indigo-600 mx-auto rounded-full mb-8" />
//         </div>
        
//         <h2 className="text-4xl font-bold text-gray-900 mb-4">
//           Page Not Found
//         </h2>
//         <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
//           Oops! It seems you've ventured into uncharted territory. 
//           Let's get you back on track.
//         </p>
        
//         <div className="space-x-4">
//           <Link
//             to="/"
//             className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           >
//             Go Home
//           </Link>
//           <Link
//             to="/todos"
//             className="inline-block px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
//           >
//             My Tasks
//           </Link>
//         </div>
        
//         <div className="mt-12 flex justify-center space-x-8 text-gray-500">
//           <Link to="/" className="hover:text-indigo-600 transition-colors">
//             Help Center
//           </Link>
//           <Link to="/" className="hover:text-indigo-600 transition-colors">
//             Contact Support
//           </Link>
//           <Link to="/" className="hover:text-indigo-600 transition-colors">
//             Report Issue
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }














import { Link } from 'react-router-dom';

export default function Custom404Page() {
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
            className="inline-block px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/todos"
            className="inline-block px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
          >
            My Tasks
          </Link>
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