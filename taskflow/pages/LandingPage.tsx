import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(true);
  const [isChecked3, setIsChecked3] = useState(false);

  return (
    <div className="bg-land-bg dark:bg-land-bg-dark font-display text-slate-900 dark:text-white transition-colors duration-300 min-h-screen">
      {/* Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8 lg:px-12 pointer-events-none">
        <div className="max-w-6xl mx-auto">
          <header className="pointer-events-auto flex items-center justify-between whitespace-nowrap rounded-full bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md shadow-sm border border-slate-100 dark:border-slate-700 px-6 py-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-land-primary/20 text-land-primary">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight">TaskFlow</h2>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-land-primary dark:hover:text-land-primary text-sm font-medium transition-colors">Features</a>
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-land-primary dark:hover:text-land-primary text-sm font-medium transition-colors">Pricing</a>
              <a href="#" className="text-slate-600 dark:text-slate-300 hover:text-land-primary dark:hover:text-land-primary text-sm font-medium transition-colors">About</a>
            </nav>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="hidden sm:flex text-slate-900 dark:text-white text-sm font-bold hover:text-land-primary transition-colors"
              >
                Log In
              </button>
              <button 
                onClick={() => navigate('/signup')}
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-land-primary hover:bg-sky-400 text-white text-sm font-bold shadow-land-soft transition-all transform hover:scale-105"
              >
                <span className="truncate">Sign Up</span>
              </button>
            </div>
          </header>
        </div>
      </div>

      <main className="flex flex-col w-full pt-24 pb-12 overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative w-full px-4 md:px-8 lg:px-12 py-12 md:py-20 lg:py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="flex flex-col gap-6 md:gap-8 text-center lg:text-left z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-land-pastel-purple/50 dark:bg-purple-900/30 w-fit mx-auto lg:mx-0 border border-purple-100 dark:border-purple-800">
                <span className="material-symbols-outlined text-purple-600 dark:text-purple-300 text-[16px]">verified</span>
                <span className="text-purple-900 dark:text-purple-100 text-xs font-bold uppercase tracking-wide">Voted #1 Productivity App</span>
              </div>
              <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                Organize your life,<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-land-primary to-purple-500">calmly &amp; clearly.</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
                The to-do app that helps you focus on what matters without the clutter. Simple, colorful, and deeply satisfying.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <button 
                  onClick={() => navigate('/signup')}
                  className="flex items-center justify-center rounded-xl h-12 px-8 bg-land-primary hover:bg-sky-400 text-white text-base font-bold shadow-land-soft transition-all transform hover:-translate-y-1"
                >
                  Get Started for Free
                </button>
                <button className="flex items-center justify-center rounded-xl h-12 px-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 text-base font-bold transition-all">
                  <span className="material-symbols-outlined mr-2 text-[20px]">play_circle</span>
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400 pt-4">
                <div className="flex -space-x-2">
                  <div className="size-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBaCNiF7Y4EekQuUO_vFKU1l2Tg9h3N8OfIZEXwXJWR2RMk4yBLzrd7Jd4bbab7DzH-iAr1fB64iD__Oc1pG5G3cb8JDulUFjhNkaxgnq0ajj3UEMq7MsWf5UoAGRvcvdt0CviuD3fqHh1fsuqj1QDFl7Aw6qFnugegWMVViH1XprxuOoCmdpK5Ssf3VT_9w__RhHnnHc7-g7F_ryXBOl-PwlbcNYuNL_MQGR_pvRgz_I0PCgFRDQkmYF_5KhkLCYWkKItyYnj1F_o')" }}></div>
                  <div className="size-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBU8A2NbN2--j-d-qw6q11CpJKcxJTYclpl9PYR6JSDIAsHyzFWdN_ycphjAaFIh3WBjOMNb_AE27Xxjxv26aYZtbS1voDisXiij58aqaPzmnHIQ2KbUPSQkFGnhIC7RlHpVFTSKXzbOXi2bRYzDSBiL86icyW8P7wTERqJV9QjZg0Qx8ImAfQbIgrhQV4nAVYUquhvQDh-K_wQ6HeiOD80rxBfl4zPquKlVp4Fq6lgei007ZDKk98Uo68RDqTw8BWK61_-9qonMGQ')" }}></div>
                  <div className="size-8 rounded-full border-2 border-white dark:border-slate-800 bg-gray-200 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC2wvRwOQnMkK86-EYky--uFHsVZTOGS9iXhtMXPVuyZ3O2iTyEVAQI5fFQHIHl8ao3W9nSHlpDoNGtl7259KwFkLKHimvCkvVWv-pbctSHbViZgsaxCQZtRIIPAwtV8PSvmaQ580-kXpNQDhhX6K_0XfFXaQe4hP2j32c3HSeOwPEJU6mi_viGDnx_o9k5BDHeulAnKXI2E-UaWFSHvuzdwn64XxFjsQgMtjsXT6xjL61IoptnJzG3zpUqh5B0XjC8cor9D0mj36U')" }}></div>
                </div>
                <span>Trusted by 10,000+ planners</span>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex items-center justify-center">
              {/* Abstract Background Blobs */}
              <div className="absolute top-10 right-10 w-64 h-64 bg-land-pastel-yellow dark:bg-yellow-900/20 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-normal animate-float"></div>
              <div className="absolute bottom-10 left-10 w-72 h-72 bg-land-primary/20 rounded-full blur-3xl opacity-60 mix-blend-multiply dark:mix-blend-normal animate-float-delayed"></div>
              
              {/* App Mockup Container */}
              <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                {/* Header Mockup */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                  <div className="flex gap-2">
                    <div className="size-3 rounded-full bg-red-400"></div>
                    <div className="size-3 rounded-full bg-yellow-400"></div>
                    <div className="size-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-2 w-20 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                </div>
                
                {/* Body Mockup */}
                <div className="p-6 space-y-4">
                  <div className="h-8 w-2/3 bg-slate-100 dark:bg-slate-700 rounded-lg mb-6"></div>
                  
                  {/* Task Items */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-land-pastel-green/40 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30">
                    <div className="size-5 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                    </div>
                    <div className="flex-1 h-2 bg-slate-400/20 rounded w-full"></div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 shadow-sm">
                    <div className="size-5 rounded-full border-2 border-slate-300 dark:border-slate-500"></div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-1.5 bg-red-200 dark:bg-red-900/50 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 shadow-sm opacity-60">
                    <div className="size-5 rounded-full border-2 border-slate-300 dark:border-slate-500"></div>
                    <div className="h-2 bg-slate-200 dark:bg-slate-500 rounded w-1/2"></div>
                  </div>
                </div>
                
                {/* Floating Stickers */}
                <div className="absolute -right-6 top-20 bg-white dark:bg-slate-700 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-600 animate-float-delayed transform rotate-6">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="absolute -left-4 bottom-24 bg-white dark:bg-slate-700 p-3 rounded-xl shadow-lg border border-slate-100 dark:border-slate-600 animate-float transform -rotate-6">
                  <span className="text-2xl">💪</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-10 border-y border-slate-100 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/20">
          <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Powering teams at</p>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">Acme Corp</h3>
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">GlobalBank</h3>
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">Nebula</h3>
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">FoxRun</h3>
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300">Circle.io</h3>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24 px-4 md:px-8 lg:px-12 bg-white dark:bg-land-bg-dark">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-slate-900 dark:text-white text-3xl md:text-4xl font-bold leading-tight mb-4">Features that bring peace of mind</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">We stripped away the complexity so you can focus on simply getting things done.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="group bg-land-bg dark:bg-slate-800/50 rounded-2xl p-8 transition-colors hover:bg-land-pastel-yellow/30 dark:hover:bg-slate-800 border border-transparent hover:border-yellow-200 dark:hover:border-yellow-900/30">
                <div className="size-14 rounded-xl bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">auto_awesome</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Smart Lists</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Automatically sorts your day based on deadlines, energy levels, and priority. Never wonder what to do next.
                </p>
              </div>
              {/* Feature 2 */}
              <div className="group bg-land-bg dark:bg-slate-800/50 rounded-2xl p-8 transition-colors hover:bg-land-pastel-pink/30 dark:hover:bg-slate-800 border border-transparent hover:border-pink-200 dark:hover:border-pink-900/30">
                <div className="size-14 rounded-xl bg-pink-100 dark:bg-pink-900/50 text-pink-500 dark:text-pink-300 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">group_add</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Collaborate</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Share lists with family for groceries or with your team for the next big launch. Real-time sync included.
                </p>
              </div>
              {/* Feature 3 */}
              <div className="group bg-land-bg dark:bg-slate-800/50 rounded-2xl p-8 transition-colors hover:bg-land-primary/10 dark:hover:bg-slate-800 border border-transparent hover:border-land-primary/20">
                <div className="size-14 rounded-xl bg-sky-100 dark:bg-sky-900/50 text-land-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[32px]">center_focus_strong</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Focus Mode</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Hide distractions with one click. Enter a zen-like state where only your current task exists.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="py-24 px-4 md:px-8 lg:px-12 bg-land-bg dark:bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">Try it yourself</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">Experience the satisfaction of checking things off. No sign-up required for this demo.</p>
                <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-sm font-bold text-land-primary group w-fit">
                  <span>Go ahead, click the box</span>
                  <span className="material-symbols-outlined text-[20px] animate-bounce group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 md:w-1/2 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-700 flex flex-col justify-center gap-4">
                <label className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all select-none">
                  <input type="checkbox" checked={isChecked1} onChange={() => setIsChecked1(!isChecked1)} className="w-6 h-6 rounded-md border-slate-300 text-land-primary focus:ring-land-primary/50 transition-all cursor-pointer" />
                  <span className={`text-slate-700 dark:text-slate-200 font-medium group-hover:text-land-primary transition-colors ${isChecked1 ? 'line-through text-slate-400' : ''}`}>Sign up for TaskFlow</span>
                </label>
                <label className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all select-none opacity-50">
                  <input type="checkbox" checked={isChecked2} onChange={() => setIsChecked2(!isChecked2)} disabled className="w-6 h-6 rounded-md border-slate-300 text-land-primary focus:ring-land-primary/50 transition-all cursor-pointer" />
                  <span className="text-slate-700 dark:text-slate-200 font-medium line-through">Find a better to-do app</span>
                </label>
                <label className="group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-md transition-all select-none">
                  <input type="checkbox" checked={isChecked3} onChange={() => setIsChecked3(!isChecked3)} className="w-6 h-6 rounded-md border-slate-300 text-land-primary focus:ring-land-primary/50 transition-all cursor-pointer" />
                  <span className={`text-slate-700 dark:text-slate-200 font-medium group-hover:text-land-primary transition-colors ${isChecked3 ? 'line-through text-slate-400' : ''}`}>Become productive</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4 md:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-land-primary/5 dark:bg-land-primary/10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-land-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative max-w-4xl mx-auto text-center z-10">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Ready to clear your mind?</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of people who have swapped stress for satisfaction. It takes less than a minute to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="flex items-center justify-center rounded-xl h-14 px-10 bg-land-primary hover:bg-sky-400 text-white text-lg font-bold shadow-land-soft transition-all transform hover:-translate-y-1"
              >
                Get Started for Free
              </button>
              <button className="flex items-center justify-center rounded-xl h-14 px-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 text-lg font-bold transition-all">
                View Pricing
              </button>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">No credit card required • 14-day free trial</p>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="bg-white dark:bg-land-bg-dark pt-16 pb-8 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center justify-center size-6 rounded bg-land-primary/20 text-land-primary">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-white">TaskFlow</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Making the world more organized, one checkmark at a time.</p>
                <div className="flex gap-4">
                  <a href="#" className="text-slate-400 hover:text-land-primary transition-colors"><span className="material-symbols-outlined text-[20px]">public</span></a>
                  <a href="#" className="text-slate-400 hover:text-land-primary transition-colors"><span className="material-symbols-outlined text-[20px]">alternate_email</span></a>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><a href="#" className="hover:text-land-primary transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Templates</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Integrations</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><a href="#" className="hover:text-land-primary transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li><a href="#" className="hover:text-land-primary transition-colors">Privacy</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Terms</a></li>
                  <li><a href="#" className="hover:text-land-primary transition-colors">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-400">© 2023 TaskFlow Inc. All rights reserved.</p>
              <div className="flex gap-6">
                <span className="text-xs text-slate-300 dark:text-slate-600">Designed for calm.</span>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
