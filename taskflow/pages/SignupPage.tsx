import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';

export function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await todoApi.signup(formData.name, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign up');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const passwordStrength = formData.password.length >= 8 ? 'strong' : formData.password.length >= 6 ? 'medium' : 'weak';

  return (
    <div className="bg-land-bg dark:bg-land-bg-dark font-display text-[#111518] dark:text-white overflow-x-hidden antialiased min-h-screen">
        <div className="flex min-h-screen w-full flex-row">
            {/* Left Side: Form Section */}
            <div className="flex w-full lg:w-1/2 flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 bg-white dark:bg-land-bg-dark transition-colors duration-300">
            {/* Logo Mobile/Desktop */}
            <div className="mb-10 flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
                <div className="flex size-10 items-center justify-center rounded-xl bg-auth-blue/20 text-auth-blue">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-[#111518] dark:text-white">TaskMaster</h2>
            </div>
            <div className="w-full max-w-[480px] mx-auto lg:mx-0">
                <div className="mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-[#111518] dark:text-white mb-3">Let's get productive!</h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">Join thousands of users organizing their life today.</p>
                </div>
                {/* Social Sign Up */}
                <div className="flex gap-4 mb-8">
                <button className="flex-1 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark py-3 px-4 text-base font-semibold text-[#111518] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">
                    <img alt="Google Logo" className="size-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkukn7WCyg3MlzTYjnGqBWpP3PN5_78WIV05EEp3KKDioGR5eJN5f8akQ4GxySlsUxFJ3MnCqmBSYGYES5EN97rE6JGKP40CRqrbq-9TxiA7a48kj5TqwAuU7DVgocMTZKACz6zmWeI3YlPcu2DzpLs04ufhwiKRfO2iliKTPFywaH119ueAblonVdPZ4r9jQ8xhdqu4LYc5t9gE-q-5iUP1X5S_Nlj_QD9xITIevw7pYBCYD06vRSCkgPGNxeZpU-STUWonkHN9Y"/>
                    <span>Google</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dark py-3 px-4 text-base font-semibold text-[#111518] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200">
                    <img alt="Apple Logo" className="size-5 dark:invert" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBm7vldhWg5pPszyJB6qs3_7EPTyCl--2JcCXIN30iZo0fsEj49Sj0JpAn2lz6LE7-dxTcAv10-3jGvj9KLYDEKeZ0YsyiI-v9d0JCZROId5xSH-EB15GLa2pyoclFNn45Jnc9ij3qWz_Uq4RLLXC6cK54hokeGsIf6yditMA2-Yi-TbKW6MJgkZbjnYOpEoAFYYge0FJT-cWmOjVTP_bhR3tt7VpdKqjtLUTuwG0kHOGGfHeg-Qk1Vszn_gOJ--VdGtxY3wJtgXw"/>
                    <span>Apple</span>
                </button>
                </div>
                <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-white dark:bg-land-bg-dark px-4 text-slate-500">Or sign up with email</span>
                </div>
                </div>
                {/* Form */}
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111518] dark:text-slate-200 ml-1">Full Name</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <input 
                      className="block w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark pl-11 pr-4 py-4 text-base text-[#111518] dark:text-white placeholder:text-slate-400 focus:border-auth-blue focus:ring-auth-blue/20 transition-all duration-200" 
                      placeholder="John Doe" 
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    </div>
                </div>
                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111518] dark:text-slate-200 ml-1">Email Address</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">mail</span>
                    </div>
                    <input 
                      className="block w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark pl-11 pr-4 py-4 text-base text-[#111518] dark:text-white placeholder:text-slate-400 focus:border-auth-blue focus:ring-auth-blue/20 transition-all duration-200" 
                      placeholder="name@example.com" 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    </div>
                </div>
                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111518] dark:text-slate-200 ml-1">Password</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">lock</span>
                    </div>
                    <input 
                      className="block w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark pl-11 pr-12 py-4 text-base text-[#111518] dark:text-white placeholder:text-slate-400 focus:border-auth-blue focus:ring-auth-blue/20 transition-all duration-200" 
                      placeholder="Create a password" 
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    </div>
                    {/* Password Strength Indicator */}
                    {formData.password && (
                      <div className="flex gap-2 mt-2 px-1">
                      <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${passwordStrength === 'weak' ? 'bg-red-200 dark:bg-red-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <div className={`h-full rounded-full transition-all ${passwordStrength === 'weak' ? 'bg-red-400 w-full' : 'w-0'}`}></div>
                      </div>
                      <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${passwordStrength === 'medium' ? 'bg-yellow-200 dark:bg-yellow-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <div className={`h-full rounded-full transition-all ${passwordStrength === 'medium' ? 'bg-yellow-400 w-full' : 'w-0'}`}></div>
                      </div>
                      <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${passwordStrength === 'strong' ? 'bg-green-200 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'}`}>
                        <div className={`h-full rounded-full transition-all ${passwordStrength === 'strong' ? 'bg-green-400 w-full' : 'w-0'}`}></div>
                      </div>
                      </div>
                    )}
                    {formData.password && formData.password.length >= 8 && (
                      <p className="text-xs text-green-600 dark:text-green-400 px-1 font-medium mt-1">Password looks good!</p>
                    )}
                </div>
                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-[#111518] dark:text-slate-200 ml-1">Confirm Password</label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                    </div>
                    <input 
                      className="block w-full rounded-2xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dark pl-11 pr-12 py-4 text-base text-[#111518] dark:text-white placeholder:text-slate-400 focus:border-auth-blue focus:ring-auth-blue/20 transition-all duration-200" 
                      placeholder="Confirm your password" 
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    </div>
                </div>
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl text-sm">
                    {error}
                  </div>
                )}
                <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="group relative flex w-full justify-center rounded-2xl bg-auth-blue py-4 px-4 text-base font-bold text-white hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-auth-blue focus:ring-offset-2 dark:focus:ring-offset-background-dark shadow-soft hover:shadow-glow transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing up...' : 'Sign Up'}
                        <span className="absolute right-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                        </span>
                    </button>
                </div>
                <p className="text-center text-base text-slate-500 dark:text-slate-400 mt-2">
                    Already have an account? 
                    <button type="button" onClick={() => navigate('/login')} className="font-bold text-auth-blue hover:text-sky-500 hover:underline transition-colors ml-1">Log In</button>
                </p>
                </form>
            </div>
            </div>
            {/* Right Side: Visual Section - keeping exact TaskFlow design */}
            <div className="hidden lg:flex w-1/2 relative bg-[#eef8fd] dark:bg-[#15232b] items-center justify-center overflow-hidden">
            {/* Decorative Blobs */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-auth-blue/20 dark:bg-auth-blue/10 rounded-full blur-3xl"></div>
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
           {/* Main Content Container in Right Side */}
            <div className="relative z-10 flex flex-col items-center justify-center max-w-[500px] text-center p-8">
                {/* Floating Elements Container */}
                <div className="relative w-full aspect-square max-w-[400px] mb-8">
                {/* Main Card */}
                <div className="absolute inset-0 m-auto w-[80%] h-[80%] bg-white dark:bg-surface-dark rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 border border-white/50 dark:border-white/5 z-10 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 ease-out">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-500">
                    <span className="material-symbols-outlined text-3xl">done_all</span>
                    </div>
                    <div className="h-3 w-3/4 bg-slate-100 dark:bg-slate-700 rounded-full mb-3"></div>
                    <div className="h-3 w-1/2 bg-slate-100 dark:bg-slate-700 rounded-full mb-3"></div>
                    <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-700 rounded-full"></div>
                </div>
                {/* Floating Sticker 1 */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD6E0] dark:bg-[#582e38] rounded-2xl shadow-lg flex items-center justify-center rotate-[12deg] z-20 animate-bounce" style={{animationDuration: '3s'}}>
                    <span className="material-symbols-outlined text-4xl text-[#FF5C8D] dark:text-[#ff9ab9]">favorite</span>
                </div>
                {/* Floating Sticker 2 */}
                <div className="absolute bottom-10 left-[-20px] w-20 h-20 bg-[#FFF4C3] dark:bg-[#5c542e] rounded-full shadow-lg flex items-center justify-center rotate-[-15deg] z-20 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                    <span className="material-symbols-outlined text-4xl text-[#FDB022] dark:text-[#fde292]">light_mode</span>
                </div>
                {/* Floating Sticker 3 */}
                <div className="absolute bottom-[-20px] right-[20px] w-auto px-4 py-2 bg-white dark:bg-surface-dark rounded-xl shadow-xl flex items-center gap-2 rotate-[5deg] z-20">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Task Completed</span>
                </div>
                </div>
                <h3 className="text-3xl font-bold text-[#111518] dark:text-white mb-4">Focus on what matters</h3>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                    Our pastel-themed interface is designed to keep you calm and focused while you conquer your day.
                </p>
                {/* Pagination Dots */}
                <div className="flex gap-2 mt-8">
                <div className="w-8 h-2 bg-auth-blue rounded-full"></div>
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}
