import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await todoApi.login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f8f7] dark:bg-land-bg-dark font-display text-[#111816] dark:text-white antialiased selection:bg-auth-primary selection:text-land-bg-dark min-h-screen">
      <div className="flex min-h-screen w-full flex-row overflow-hidden">
        {/* Left Side: Login Form */}
        <div className="flex w-full flex-col justify-center bg-white dark:bg-land-bg-dark px-6 py-12 md:w-1/2 lg:px-20 xl:px-32 shadow-2xl z-10 transition-colors duration-300">
          <div className="mx-auto w-full max-w-[480px] flex flex-col gap-8">
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-auth-primary text-land-bg-dark">
                <span className="material-symbols-outlined text-2xl font-bold">check_circle</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-[#111816] dark:text-white">TaskMaster</h2>
            </div>
            {/* Heading */}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-tight text-[#111816] dark:text-white">Welcome Back!</h1>
              <p className="text-base font-normal text-slate-500 dark:text-slate-400">Let's get things done today.</p>
            </div>
            {/* Form */}
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {/* Email Input */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#111816] dark:text-slate-200 ml-3">Email or Username</span>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-auth-primary">mail</span>
                  <input 
                    className="w-full rounded-full border border-slate-200 bg-[#f6f8f7] px-6 py-4 pl-14 text-base text-[#111816] placeholder:text-slate-400 focus:border-auth-primary focus:outline-none focus:ring-4 focus:ring-auth-primary/20 dark:border-slate-700 dark:bg-[#1a2c28] dark:text-white transition-all duration-300" 
                    placeholder="Enter your email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>
              {/* Password Input */}
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-[#111816] dark:text-slate-200 ml-3">Password</span>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-auth-primary">lock</span>
                  <input 
                    className="w-full rounded-full border border-slate-200 bg-[#f6f8f7] px-6 py-4 pl-14 pr-14 text-base text-[#111816] placeholder:text-slate-400 focus:border-auth-primary focus:outline-none focus:ring-4 focus:ring-auth-primary/20 dark:border-slate-700 dark:bg-[#1a2c28] dark:text-white transition-all duration-300" 
                    placeholder="Enter your password" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button className="absolute right-5 top-1/2 flex -translate-y-1/2 text-slate-400 hover:text-[#111816] dark:hover:text-white transition-colors" type="button">
                    <span className="material-symbols-outlined">visibility</span>
                  </button>
                </div>
              </label>
              {/* Remember & Forgot */}
              <div className="flex items-center justify-between px-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input className="h-5 w-5 rounded border-slate-300 text-auth-primary focus:ring-auth-primary dark:border-slate-600 dark:bg-[#1a2c28] transition-all" type="checkbox" />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-auth-primary dark:text-slate-400 transition-colors">Remember me</span>
                </label>
                <a className="text-sm font-bold text-[#111816] hover:text-auth-primary dark:text-white transition-colors" href="#">Forgot Password?</a>
              </div>
              {/* Error Display */}
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-2xl text-sm">
                  {error}
                </div>
              )}
              {/* Login Button */}
              <button 
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-auth-primary px-8 py-4 text-base font-bold text-[#11211d] shadow-lg shadow-auth-primary/30 transition-all duration-300 hover:-translate-y-1 hover:brightness-105 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>
            {/* Divider */}
            <div className="relative flex items-center py-2">
              <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="mx-4 text-xs font-medium uppercase text-slate-400">Or continue with</span>
              <div className="grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            {/* Social Login */}
            <div className="flex gap-4">
              <button className="flex flex-1 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-[#111816] shadow-sm transition-all hover:border-slate-300 hover:bg-[#f6f8f7] dark:border-slate-700 dark:bg-[#1a2c28] dark:text-white dark:hover:bg-[#233833]">
                <img alt="Google" className="h-5 w-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKfj9fyzo82iYoOeHa72105TPgF9Qnxb4jLNogOroJ5vxTxKcpI9CL4JJKmJ_JdeT0Vjyt7tqN_mCcyu-RXqlhcwgQva9-Pi_xRGX_7Dgfs-xpU1huAwRexPo4WJiVxE6qSdsLPFUVAxEykg_NsC5QzQnpgjNvsh13QVJ_CyZGTy2twLsaNzbWVUccx23wCH1vPId-5v1k3dvxtWBA1VddNMqGQ-Lo0pCRUdfzbqLhzDfXM4_BhdfQYhxcWQebJFeIGe1adAVM9fo"/>
                Google
              </button>
              <button className="flex flex-1 items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-semibold text-[#111816] shadow-sm transition-all hover:border-slate-300 hover:bg-[#f6f8f7] dark:border-slate-700 dark:bg-[#1a2c28] dark:text-white dark:hover:bg-[#233833]">
                <span className="material-symbols-outlined text-[22px]">ios</span>
                Apple
              </button>
            </div>
            {/* Footer */}
            <div className="text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Don't have an account? 
                <button onClick={() => navigate('/signup')} className="font-bold text-auth-primary hover:underline hover:text-auth-primary/80 transition-all ml-1">Sign up</button>
              </p>
            </div>
          </div>
        </div>
        {/* Right Side: Decorative Image */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center overflow-hidden bg-[#e0fbf4] dark:bg-[#0c1614] md:flex">
          {/* Decorative blobs */}
          <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-auth-primary/20 blur-[100px] dark:bg-auth-primary/10"></div>
          <div className="absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[100px] dark:bg-blue-900/20"></div>
          <div className="relative z-10 flex max-w-[500px] flex-col items-center p-10 text-center">
            <div className="aspect-square w-full bg-contain bg-center bg-no-repeat drop-shadow-2xl mb-8" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCy5v-TmR4XC2HPOFZ5zO4hs6unEiBi6xfNda6vQ_iZQWSBeYhfAWyDfyVfly2UwUvhPHkjQ7i4MO7JMLrRwrpla37X1zBoY7_VtYe3VQUbGbQy9_iSx2kmav7JPNESvZgrzrDi6zemO0iTzxtNTb8K0qCY1pCn7Y64KnAF6evK8vAczMEFvWq60PzNVgG_s0QRw5OHLOJoicXgK06A3CS2ezaIzDtZfCdCFYLQb5m5oX8wH3ZIIPeED7ffMwZ5-SSz4dcaysRJF58')", borderRadius: "3rem" }}>
            </div>
            <h3 className="mb-4 text-3xl font-extrabold text-[#11211d] dark:text-white">Organize your work and life, finally.</h3>
            <p className="max-w-md text-lg text-slate-600 dark:text-slate-400">Join millions of people who organize work and life with TaskMaster.</p>
            {/* Decorative sticker simulation */}
            <div className="absolute -right-10 top-1/4 animate-bounce duration-[3000ms]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg dark:bg-[#1a2c28] rotate-12">
                <span className="material-symbols-outlined text-4xl text-auth-primary">check_box</span>
              </div>
            </div>
            <div className="absolute -left-5 bottom-1/3 animate-bounce duration-[4000ms]">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-auth-primary shadow-lg -rotate-12">
                <span className="material-symbols-outlined text-3xl text-land-bg-dark">alarm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
