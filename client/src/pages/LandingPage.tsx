// import { Link } from "react-router-dom";

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
//       <div className="container mx-auto px-4 py-16">
//         <nav className="flex justify-between items-center mb-16">
//           <div className="text-2xl font-bold text-indigo-600">TaskFlow</div>
//           <div className="space-x-4">
//             <Link
//               to="/login"
//               className="px-4 py-2 text-indigo-600 hover:text-indigo-700"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </nav>

//         <div className="grid md:grid-cols-2 gap-12 items-center">
//           <div className="space-y-6">
//             <h1 className="text-5xl font-bold text-gray-900">
//               Organize your tasks,
//               <span className="text-indigo-600 block">
//                 amplify your productivity
//               </span>
//             </h1>
//             <p className="text-xl text-gray-600">
//               TaskFlow helps you manage your daily tasks, prioritize what
//               matters, and achieve your goals with a beautifully simple
//               interface.
//             </p>
//             <div className="space-x-4">
//               <Link
//                 to="/signup"
//                 className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//               >
//                 Get Started - It's Free
//               </Link>
//               <Link
//                 to="/todos"
//                 className="inline-block px-8 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors"
//               >
//                 View Demo
//               </Link>
//             </div>
//           </div>
//           <div className="hidden md:block">
//             <div className="bg-white p-6 rounded-2xl shadow-xl">
//               <div className="space-y-4">
//                 {[1, 2, 3].map((item) => (
//                   <div
//                     key={item}
//                     className="flex items-center p-4 bg-gray-50 rounded-lg"
//                   >
//                     <div className="h-4 w-4 rounded border-2 border-indigo-600 mr-4" />
//                     <div className="h-4 bg-gray-200 rounded w-3/4" />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-24 grid md:grid-cols-3 gap-8">
//           {[
//             {
//               title: "Simple & Intuitive",
//               description:
//                 "Clean interface that helps you focus on what matters most",
//             },
//             {
//               title: "Priority Management",
//               description:
//                 "Easily mark important tasks and organize your workflow",
//             },
//             {
//               title: "Progress Tracking",
//               description:
//                 "Monitor your productivity with visual progress indicators",
//             },
//           ].map((feature, index) => (
//             <div key={index} className="p-6 bg-white rounded-xl shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {feature.title}
//               </h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
















import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#1a1c1e]">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-purple-400">TaskMaster</div>
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-4 py-2 text-gray-300 hover:text-purple-400 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-white">
              Organize your tasks,
              <span className="text-purple-400 block">
                amplify your productivity
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              TaskMaster helps you manage your daily tasks, prioritize what
              matters, and achieve your goals with a beautifully simple
              interface.
            </p>
            <div className="space-x-4">
              <Link
                to="/signup"
                className="inline-block px-8 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Get Started - It's Free
              </Link>
              <Link
                to="/todos"
                className="inline-block px-8 py-3 border border-purple-500 text-purple-400 rounded-lg hover:bg-purple-500/10 transition-colors"
              >
                View Demo
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="bg-[#2a2d30] p-6 rounded-2xl border border-white/10">
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="h-4 w-4 rounded border-2 border-purple-500 mr-4" />
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Simple & Intuitive",
              description:
                "Clean interface that helps you focus on what matters most",
            },
            {
              title: "Priority Management",
              description:
                "Easily mark important tasks and organize your workflow",
            },
            {
              title: "Progress Tracking",
              description:
                "Monitor your productivity with visual progress indicators",
            },
          ].map((feature, index) => (
            <div key={index} className="p-6 bg-[#2a2d30] rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}