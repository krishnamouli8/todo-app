import { BarChart, Sparkles, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    {
      title: "Simple & Intuitive",
      description: "Clean interface that helps you focus on what matters most",
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Priority Management",
      description: "Easily mark important tasks and organize your workflow",
      icon: <Target className="w-6 h-6 text-purple-400" />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your productivity with visual progress indicators",
      icon: <BarChart className="w-6 h-6 text-purple-400" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a1c1e]">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          {/* <div className="text-2xl font-bold text-purple-400">TaskMaster</div> */}
          <div className="text-2xl font-bold text-white bg-purple-500 px-4 py-2 rounded-lg">
            TaskMaster
          </div>
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
                Amplify your productivity
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
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 bg-[#2a2d30] rounded-xl border border-white/10 
          hover:border-purple-500/50 transition-all duration-300 
          hover:shadow-lg hover:shadow-purple-500/10 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
