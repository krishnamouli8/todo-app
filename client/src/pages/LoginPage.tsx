import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#1a1c1e]">
      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Let's get back to productivity</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="text-sm text-gray-300 mb-1 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="text-sm text-gray-300 mb-1 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-400">
                <input type="checkbox" className="mr-2 rounded border-gray-600 text-purple-500 focus:ring-purple-500/50 bg-white/5" />
                Remember me
              </label>
              <a href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors font-medium"
            >
              Sign In
            </button>

            <p className="text-center text-gray-400">
              Don't have an account?{' '}
              <a href="/signup" className="text-purple-400 hover:text-purple-300">
                Create one here
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Animation Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#2a2d30] items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* Animated elements */}
          <div className="absolute w-full h-full">
            <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-purple-500/20 rounded-lg animate-float" />
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-blue-500/20 rounded-lg animate-float-delay" />
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500/20 rounded-lg animate-float-long" />
          </div>

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center p-8">
              <h2 className="text-3xl font-bold text-white mb-4">TaskMaster</h2>
              <p className="text-gray-300 max-w-md">
                Organize your tasks efficiently and boost your productivity with our intuitive task management system.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;