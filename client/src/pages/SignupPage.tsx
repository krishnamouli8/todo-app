// import { useState, FormEvent } from 'react';
// import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
// import { todoApi } from '../api/todoApi';
// import { useNavigate } from 'react-router-dom';

// const SignupPage = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError('');

//     // Basic validation
//     if (!name || !email || !password || !confirmPassword) {
//       setError('Please fill in all fields');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const result = await todoApi.signup(name, email, password);
//       // Store user info for display
//       localStorage.setItem('user', JSON.stringify({ name, email }));
//       // Redirect to dashboard or todos page after successful signup
//       navigate('/todos');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Signup failed');
//     }
//   };

//   return (
//     <div className="min-h-screen relative flex bg-[#1a1c1e]">
//       {/* Mobile Animation Background */}
//       <div className="lg:hidden absolute inset-0 overflow-hidden bg-[#2a2d30]/50">
//         <div className="absolute w-full h-full">
//           <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse" />
//           <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-blue-500/20 rounded-full animate-pulse delay-300" />
//           <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500/20 rounded-full animate-pulse delay-700" />
//         </div>
//         <div className="absolute inset-0 backdrop-blur-md bg-[#1a1c1e]/40" />
//       </div>

//       {/* Left Animation Section - Desktop Only */}
//       <div className="hidden lg:flex lg:w-1/2 relative bg-[#2a2d30] items-center justify-center overflow-hidden">
//         <div className="relative w-full h-full">
//           {/* Animated circles in the background */}
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full animate-pulse" />
//           <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/20 rounded-full animate-pulse delay-300" />
//           <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-pink-500/20 rounded-full animate-pulse delay-700" />

//           {/* Content overlay */}
//           <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
//             <div className="text-center p-8">
//               <h2 className="text-3xl font-bold text-white mb-4">Welcome to TaskMaster</h2>
//               <p className="text-gray-300 max-w-md">
//                 Join our community and experience a new way to manage your tasks efficiently and elegantly.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Form Section */}
//       <div className="relative w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
//         <div className="w-full max-w-md">
//           <div className="text-center mb-8">
//             <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
//             <p className="text-gray-400">Start your journey with us today</p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg text-center">
//                 {error}
//               </div>
//             )}
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">Full Name</label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     id="name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
//                     placeholder="John Doe"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="email" className="text-sm text-gray-300 mb-1 block">Email Address</label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="email"
//                     id="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
//                     placeholder="johndoe@example.com"
//                     required
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="password" className="text-sm text-gray-300 mb-1 block">Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     id="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label htmlFor="confirmPassword" className="text-sm text-gray-300 mb-1 block">Confirm Password</label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     id="confirmPassword"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
//                     placeholder="••••••••"
//                     required
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
//                   >
//                     {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors font-medium"
//             >
//               Create Account
//             </button>

//             <p className="text-center text-gray-400">
//               Already have an account?{' '}
//               <a href="/login" className="text-purple-400 hover:text-purple-300">
//                 Login here
//               </a>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;






























import { useState, FormEvent } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { todoApi } from '../api/todoApi';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    try {
      await todoApi.signup(name, email, password);
      // Redirect to dashboard or todos page after successful signup
      navigate('/todos', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex bg-[#1a1c1e]">
      {/* Mobile Animation Background */}
      <div className="lg:hidden absolute inset-0 overflow-hidden bg-[#2a2d30]/50">
        <div className="absolute w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-500/20 rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-28 h-28 bg-blue-500/20 rounded-full animate-pulse delay-300" />
          <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500/20 rounded-full animate-pulse delay-700" />
        </div>
        <div className="absolute inset-0 backdrop-blur-md bg-[#1a1c1e]/40" />
      </div>

      {/* Left Animation Section - Desktop Only */}
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
      <div className="relative w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block text-2xl font-bold text-white bg-purple-500 px-4 py-2 rounded-lg mb-4">
              TaskMaster
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-gray-400">Start your journey with us today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-lg text-center">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm text-gray-300 mb-1 block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="John Doe"
                    required
                    disabled={isLoading}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="johndoe@example.com"
                    required
                    disabled={isLoading}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    disabled={isLoading}
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
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 placeholder-gray-500"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-purple-500/50 disabled:cursor-not-allowed text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-center text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-400 hover:text-purple-300">
                Login here
              </Link>
            </p>

            <p className="text-center">
              <Link to="/" className="text-gray-400 hover:text-purple-400 text-sm">
                ← Back to Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;