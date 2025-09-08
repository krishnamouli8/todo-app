// import { BarChart, Sparkles, Target } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { todoApi } from "../api/todoApi";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check authentication status when component mounts
//     const checkAuth = () => {
//       const authenticated = todoApi.isAuthenticated();
//       setIsAuthenticated(authenticated);
//       setIsLoading(false);
//     };

//     checkAuth();
//   }, []);

//   const handleGetStarted = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // User is logged in, go to todos page
//       navigate('/todos');
//     } else {
//       // Not logged in, go to signup page
//       navigate('/signup');
//     }
//   };

//   const features = [
//     {
//       title: "Simple & Intuitive",
//       description: "Clean interface that helps you focus on what matters most",
//       icon: <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
//     },
//     {
//       title: "Priority Management",
//       description: "Easily mark important tasks and organize your workflow",
//       icon: <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
//     },
//     {
//       title: "Progress Tracking",
//       description: "Monitor your productivity with visual progress indicators",
//       icon: <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />,
//     },
//   ];

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-[#1a1c1e]">
//         <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div 
//       className="min-h-screen bg-[#1a1c1e] text-white relative overflow-x-hidden"
//       style={{
//         backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="doodlePattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse"><rect x="20" y="20" width="12" height="12" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M80,30 l12,-12 l3,3 l-12,12 l-4,1 z" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M120,40 v20 h-16 v-20 h16 M108,35 v5 M116,35 v5" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M40,100 c0,-10 15,-10 15,0 v15 c0,10 -20,10 -20,0 v-20" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M85,95 l5,5 l10,-10" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><circle cx="120" cy="100" r="2" fill="rgb(124,58,237)" opacity="0.15"/><path d="M15,70 h20 M15,75 h15" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(#doodlePattern)"/></svg>`)}")`,
//         backgroundRepeat: 'repeat'
//     }}>
//       <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16">
//         {/* Responsive Navigation */}
//         <nav className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-8 sm:mb-16">
//           <div className="text-xl sm:text-2xl font-bold text-white bg-purple-500 px-4 py-2 rounded-lg">
//             TaskMaster
//           </div>
//           <div className="flex space-x-4">
//             <Link
//               to="/login"
//               className="px-3 sm:px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base"
//             >
//               Login
//             </Link>
//             <button
//               onClick={handleGetStarted}
//               className="px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
//             >
//               Get Started
//             </button>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
//           <div className="space-y-4 sm:space-y-6 text-center md:text-left">
//             <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
//               Organize your tasks,
//               <span className="text-purple-400 block mt-2">
//                 Amplify your productivity
//               </span>
//             </h1>
//             <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto md:mx-0">
//               TaskMaster helps you manage your daily tasks, prioritize what
//               matters, and achieve your goals with a beautifully simple
//               interface.
//             </p>
//             <div className="flex justify-center md:justify-start">
//               <button
//                 onClick={handleGetStarted}
//                 className="inline-block px-6 sm:px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm sm:text-base"
//               >
//                 Get Started - It's Free
//               </button>
//             </div>
//           </div>
          
//           {/* Task Preview */}
//           <div className="hidden md:block">
//             <div className="bg-[#2a2d30] p-4 sm:p-6 rounded-2xl border border-white/10">
//               <div className="space-y-3 sm:space-y-4">
//                 {[
//                   { completed: true, text: 'Design new landing page' },
//                   { completed: false, text: 'Review user feedback' },
//                   { completed: false, text: 'Plan next sprint' }
//                 ].map((item, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10"
//                   >
//                     <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded border-2 mr-3 sm:mr-4 ${
//                       item.completed ? 'bg-purple-500 border-purple-500' : 'border-purple-500'
//                     }`}>
//                       {item.completed && (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
//                         </div>
//                       )}
//                     </div>
//                     <div className={`text-sm flex-1 ${
//                       item.completed ? 'line-through text-gray-500' : 'text-gray-200'
//                     }`}>
//                       {item.text}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Features Grid */}
//         <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="p-6 sm:p-8 bg-[#2a2d30] rounded-xl border border-white/10 
//                 hover:border-purple-500/50 transition-all duration-300 
//                 hover:shadow-lg hover:shadow-purple-500/10 group"
//             >
//               <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
//                 <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
//                   {feature.icon}
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-semibold text-white">
//                   {feature.title}
//                 </h3>
//               </div>
//               <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
//                 {feature.description}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* Call to Action Section */}
//         <div className="mt-16 sm:mt-24 text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
//             Ready to get organized?
//           </h2>
//           <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
//             Join thousands of users who have transformed their productivity with TaskMaster.
//             Start your journey today - completely free!
//           </p>
//           <button
//             onClick={handleGetStarted}
//             className="px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-lg font-medium"
//           >
//             Start Free Today
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

































import { BarChart, Sparkles, Target, Brain, Bell, Zap, ArrowRight, CheckCircle, Clock, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { todoApi } from "../api/todoApi";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    tasks: 0,
    completed: 0
  });

  useEffect(() => {
    // Check authentication status when component mounts
    const checkAuth = () => {
      const authenticated = todoApi.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };

    checkAuth();

    // Animate stats numbers
    const targetStats = { users: 5000, tasks: 25000, completed: 18500 };
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3); // Easing function
      
      setAnimatedStats({
        users: Math.floor(targetStats.users * easeOut),
        tasks: Math.floor(targetStats.tasks * easeOut),
        completed: Math.floor(targetStats.completed * easeOut)
      });
      
      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedStats(targetStats);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
      // User is logged in, go to todos page
      navigate('/todos');
    } else {
      // Not logged in, go to signup page
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

  const upcomingFeatures = [
    {
      title: "AI Task Assistant",
      description: "Smart suggestions and automatic task prioritization powered by AI",
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      status: "Coming Soon",
      eta: "Q2 2025"
    },
    {
      title: "Mind Maps",
      description: "Visual task organization with interactive mind mapping tools",
      icon: <Zap className="w-6 h-6 text-green-400" />,
      status: "In Development",
      eta: "Q1 2025"
    },
    {
      title: "Smart Notifications",
      description: "Intelligent reminders that learn from your habits and preferences",
      icon: <Bell className="w-6 h-6 text-yellow-400" />,
      status: "Planning",
      eta: "Q3 2025"
    },
    {
      title: "Team Collaboration",
      description: "Share tasks and collaborate with team members in real-time",
      icon: <Users className="w-6 h-6 text-purple-400" />,
      status: "Coming Soon",
      eta: "Q2 2025"
    }
  ];

  const stats = [
    { label: "Active Users", value: animatedStats.users.toLocaleString(), icon: <Users className="w-5 h-5" /> },
    { label: "Tasks Created", value: animatedStats.tasks.toLocaleString(), icon: <CheckCircle className="w-5 h-5" /> },
    { label: "Tasks Completed", value: animatedStats.completed.toLocaleString(), icon: <Clock className="w-5 h-5" /> }
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
          <div className="text-xl sm:text-2xl font-bold text-white bg-purple-500 px-4 py-2 rounded-lg transform hover:scale-105 transition-transform duration-200">
            TaskMaster
          </div>
          <div className="flex space-x-4">
            <Link
              to="/login"
              className="px-3 sm:px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors text-sm sm:text-base"
            >
              Login
            </Link>
            <button
              onClick={handleGetStarted}
              className="px-3 sm:px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 text-sm sm:text-base transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 sm:mb-24">
          <div className="space-y-4 sm:space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight animate-fade-in">
              Organize your tasks,
              <span className="text-purple-400 block mt-2 animate-slide-up">
                Amplify your productivity
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto md:mx-0 animate-fade-in-delay">
              TaskMaster helps you manage your daily tasks, prioritize what
              matters, and achieve your goals with a beautifully simple
              interface.
            </p>
            <div className="flex justify-center md:justify-start">
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center px-6 sm:px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 text-sm sm:text-base transform hover:scale-105 hover:shadow-xl animate-bounce-in"
              >
                Get Started - It's Free
                <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
          
          {/* Task Preview with Enhanced Animation */}
          <div className="hidden md:block animate-float">
            <div className="bg-[#2a2d30] p-4 sm:p-6 rounded-2xl border border-white/10 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="space-y-3 sm:space-y-4">
                {[
                  { completed: true, text: 'Design new landing page', delay: '0s' },
                  { completed: false, text: 'Review user feedback', delay: '0.2s' },
                  { completed: false, text: 'Plan next sprint', delay: '0.4s' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 sm:p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 animate-slide-in"
                    style={{ animationDelay: item.delay }}
                  >
                    <div className={`h-3 w-3 sm:h-4 sm:w-4 rounded border-2 mr-3 sm:mr-4 transition-all duration-200 ${
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

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-[#2a2d30] rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-2 text-purple-400">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16 sm:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-8 sm:mb-12">
            Why Choose TaskMaster?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 bg-[#2a2d30] rounded-xl border border-white/10 
                  hover:border-purple-500/50 transition-all duration-300 
                  hover:shadow-lg hover:shadow-purple-500/10 group transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
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
        </div>

        {/* Upcoming Features Section */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Coming Soon: Next-Gen Features
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              We're constantly innovating to bring you the most advanced productivity tools. 
              Here's what's on the horizon.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {upcomingFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 bg-gradient-to-br from-[#2a2d30] to-[#1f2124] rounded-xl border border-white/10 
                  hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden transform hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {feature.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            feature.status === 'In Development' 
                              ? 'bg-green-500/20 text-green-400'
                              : feature.status === 'Coming Soon'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {feature.status}
                          </span>
                          <span className="text-xs text-gray-500">{feature.eta}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  {/* Progress indicator */}
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        feature.status === 'In Development' 
                          ? 'bg-green-500 w-3/4'
                          : feature.status === 'Coming Soon'
                          ? 'bg-blue-500 w-1/2'
                          : 'bg-yellow-500 w-1/4'
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="text-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 p-8 sm:p-12 rounded-2xl border border-purple-500/30">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 animate-pulse-slow">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have revolutionized their task management with TaskMaster.
            Start your journey today - completely free, with exciting AI-powered features coming soon!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleGetStarted}
              className="group px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-300 text-lg font-medium transform hover:scale-110 hover:shadow-2xl flex items-center"
            >
              Start Free Today
              <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
            </button>
            <Link
              to="/login"
              className="px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-all duration-300 text-lg font-medium transform hover:scale-105"
            >
              Already have an account?
            </Link>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.2s forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-in {
          animation: bounce-in 1.2s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}