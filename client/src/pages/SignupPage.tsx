// SignupPage.tsx
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#1a1c1e]">
      {/* Left Animation Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#2a2d30] items-center justify-center overflow-hidden">
        <div className="relative w-full h-full">
          {/* Animated circles in the background */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full animate-pulse delay-300" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/20 rounded-full animate-pulse delay-700" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
            <div className="text-center p-8">
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to TaskMaster</h2>
              <p className="text-gray-300 max-w-md">
                Join our community and experience a new way to manage your tasks efficiently and elegantly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Start your journey with us today</p>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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

              <div>
                <label htmlFor="confirmPassword" className="text-sm text-gray-300 mb-1 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors font-medium"
            >
              Create Account
            </button>

            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <a href="/login" className="text-purple-400 hover:text-purple-300">
                Login here
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;