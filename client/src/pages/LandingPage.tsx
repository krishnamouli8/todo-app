// import { BarChart, Sparkles, Target } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function LandingPage() {
//   const features = [
//     {
//       title: "Simple & Intuitive",
//       description: "Clean interface that helps you focus on what matters most",
//       icon: <Sparkles className="w-6 h-6 text-purple-400" />,
//     },
//     {
//       title: "Priority Management",
//       description: "Easily mark important tasks and organize your workflow",
//       icon: <Target className="w-6 h-6 text-purple-400" />,
//     },
//     {
//       title: "Progress Tracking",
//       description: "Monitor your productivity with visual progress indicators",
//       icon: <BarChart className="w-6 h-6 text-purple-400" />,
//     },
//   ];

//   return (
//     // <div className="min-h-screen bg-[#1a1c1e]">
//     <div 
//       className="min-h-screen bg-[#1a1c1e] text-white relative"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="doodlePattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse"><rect x="20" y="20" width="12" height="12" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M80,30 l12,-12 l3,3 l-12,12 l-4,1 z" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M120,40 v20 h-16 v-20 h16 M108,35 v5 M116,35 v5" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M40,100 c0,-10 15,-10 15,0 v15 c0,10 -20,10 -20,0 v-20" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M85,95 l5,5 l10,-10" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><circle cx="120" cy="100" r="2" fill="rgb(124,58,237)" opacity="0.15"/><path d="M15,70 h20 M15,75 h15" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(#doodlePattern)"/></svg>`)}")`,
//         backgroundRepeat: 'repeat'
//     }}>
//       <div className="container mx-auto px-4 py-16">
//         <nav className="flex justify-between items-center mb-16">
//           {/* <div className="text-2xl font-bold text-purple-400">TaskMaster</div> */}
//           <div className="text-2xl font-bold text-white bg-purple-500 px-4 py-2 rounded-lg">
//             TaskMaster
//           </div>
//           <div className="space-x-4">
//             <Link
//               to="/login"
//               className="px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//             >
//               Get Started
//             </Link>
//           </div>
//         </nav>

//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6">
//             <h1 className="text-5xl font-bold text-white">
//               Organize your tasks,
//               <span className="text-purple-400 block">
//                 Amplify your productivity
//               </span>
//             </h1>
//             <p className="text-xl text-gray-400">
//               TaskMaster helps you manage your daily tasks, prioritize what
//               matters, and achieve your goals with a beautifully simple
//               interface.
//             </p>
//             <div className="space-x-4">
//               <Link
//                 to="/signup"
//                 className="inline-block px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
//               >
//                 Get Started - It's Free
//               </Link>
//             </div>
//           </div>
//           <div className="hidden md:block">
//             <div className="bg-[#2a2d30] p-6 rounded-2xl border border-white/10">
//               <div className="space-y-4">
//                 {[1, 2, 3].map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10"
//                   >
//                     <div className="h-4 w-4 rounded border-2 border-purple-500 mr-4" />
//                     <div className="h-4 bg-white/10 rounded w-3/4" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-24 grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="p-8 bg-[#2a2d30] rounded-xl border border-white/10 
//           hover:border-purple-500/50 transition-all duration-300 
//           hover:shadow-lg hover:shadow-purple-500/10 group"
//             >
//               <div className="flex items-center gap-4 mb-4">
//                 <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold text-white">
//                   {feature.title}
//                 </h3>
//               </div>
//               <p className="text-gray-400 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }


























import { BarChart, Sparkles, Target } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { todoApi } from "../api/todoApi";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = () => {
      const authenticated = todoApi.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/todos');
    } else {
      navigate('/signup');
    }
  };

  const features = [
    {
      title: "Simple & Intuitive",
      description: "Clean interface that helps you focus on what matters most",
      icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    },
    {
      title: "Priority Management",
      description: "Easily mark important tasks and organize your workflow",
      icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your productivity with visual progress indicators",
      icon: <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1c1e]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#1a1c1e] text-white relative overflow-x-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="doodlePattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse"><rect x="20" y="20" width="12" height="12" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M80,30 l12,-12 l3,3 l-12,12 l-4,1 z" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M120,40 v20 h-16 v-20 h16 M108,35 v5 M116,35 v5" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M40,100 c0,-10 15,-10 15,0 v15 c0,10 -20,10 -20,0 v-20" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M85,95 l5,5 l10,-10" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><circle cx="120" cy="100" r="2" fill="rgb(124,58,237)" opacity="0.15"/><path d="M15,70 h20 M15,75 h15" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(#doodlePattern)"/></svg>`)}")`,
        backgroundRepeat: 'repeat'
    }}>
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Responsive Navigation */}
        <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-16">
          <div className="text-xl sm:text-2xl font-bold text-white bg-purple-500 px-4 py-2 rounded-lg">
            TaskMaster
          </div>
          <div className="flex space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/todos')}
                  className="px-3 sm:px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base"
                >
                  My Todos
                </button>
                <button
                  onClick={() => todoApi.logout()}
                  className="px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Organize your tasks,
              <span className="text-purple-400 block mt-2">
                Amplify your productivity
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto md:mx-0">
              TaskMaster helps you manage your daily tasks, prioritize what
              matters, and achieve your goals with a beautifully simple
              interface.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={handleGetStarted}
                className="inline-block px-6 sm:px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
              >
                {isAuthenticated ? 'Go to My Todos' : 'Get Started - It\'s Free'}
              </button>
            </div>
          </div>
          
          {/* Task Preview */}
          <div className="hidden md:block">
            <div className="bg-[#2a2d30] p-4 sm:p-6 rounded-2xl border border-white/10">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { completed: true, text: 'Design new landing page' },
                  { completed: false, text: 'Review user feedback' },
                  { completed: false, text: 'Plan next sprint' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded border-2 mr-3 sm:mr-4 ${
                      item.completed ? 'bg-purple-500 border-purple-500' : 'border-purple-500'
                    }`}>
                      {item.completed && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div className={`text-sm flex-1 ${
                      item.completed ? 'line-through text-gray-500' : 'text-gray-200'
                    }`}>
                      {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 sm:p-8 bg-[#2a2d30] rounded-xl border border-white/10 
                hover:border-purple-500/50 transition-all duration-300 
                hover:shadow-lg hover:shadow-purple-500/10 group"
            >
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 sm:mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Ready to get organized?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their productivity with TaskMaster.
            Start your journey today - completely free!
          </p>
          <button
            onClick={handleGetStarted}
            className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-lg font-medium"
          >
            {isAuthenticated ? 'Access My Dashboard' : 'Start Free Today'}
          </button>
        </div>
      </div>
    </div>
  );
}