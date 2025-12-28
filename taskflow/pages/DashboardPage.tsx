import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';
import Todo from '../models/Todo';

export function DashboardPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed'>('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await todoApi.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
   }
  };

  const toggleTask = async (id: string) => {
    const task = todos.find(t => t._id === id);
    if (!task) return;
    try {
      await todoApi.toggleTodo(id, task.completed);
      setTodos(todos.map(t => t._id === id ? {...t, completed: !t.completed} : t));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = todos.filter(todo => {
    if (activeTab === 'Active') return !todo.completed;
    if (activeTab === 'Completed') return todo.completed;
    return true;
  });

  return (
    <div className="bg-dash-bg dark:bg-dash-bg-dark text-dash-text-main font-display min-h-screen overflow-hidden flex flex-col transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="h-20 bg-dash-surface dark:bg-dash-surface-dark border-b border-gray-100 dark:border-gray-800 px-6 lg:px-10 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="size-10 bg-dash-primary/10 rounded-xl flex items-center justify-center text-dash-primary">
              <span className="material-symbols-outlined text-3xl">check_circle</span>
            </div>
            <h2 className="text-dash-text-main dark:text-white text-xl font-extrabold tracking-tight">Do.it</h2>
          </div>
          {/* Search Bar */}
          <div className="hidden md:flex items-center bg-dash-bg dark:bg-dash-bg-dark h-12 rounded-xl px-4 w-96 transition-all focus-within:ring-2 focus-within:ring-dash-primary/20">
            <span className="material-symbols-outlined text-dash-text-sub">search</span>
            <input className="bg-transparent border-none focus:ring-0 w-full text-sm text-dash-text-main dark:text-white placeholder:text-dash-text-sub" placeholder="Search for tasks..." type="text" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2.5 bg-red-400 rounded-full border-2 border-dash-surface dark:border-dash-surface-dark"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-gray-800 cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-dash-text-main dark:text-white">Alex Smith</p>
              <p className="text-xs text-dash-text-sub">Pro Member</p>
            </div>
            <div className="size-10 rounded-full bg-cover bg-center border-2 border-white dark:border-gray-700 shadow-sm" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCOu78hoGNFkGlfdHx2hNMk0v9jUF8iq1kKvVLpm9ByjPnD1llOZR4Do12-oac6aZ-_1LlHSDGs4c6Bsk0XmuwQso1ZohSO7TVQVdlEl14bmWijnQYt4zMXgYv5Hl2QGRWbGOWwk4-2jvE92QU7Xvp3aJ8HNFhfoUFAwtgNldowe98qnv9Wh7qoLUBCtWNjjKFfwZd1EOBbtH7s93kNuxkt68q17sqLQheRuXxctTImxdOMJjqfSBg3wt9_ydB4j6FojiFY9dSNhYU')" }}></div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-72 bg-dash-surface dark:bg-dash-surface-dark border-r border-gray-100 dark:border-gray-800 hidden lg:flex flex-col py-8 px-6 gap-8 overflow-y-auto">
          {/* Main Actions */}
          <button className="w-full h-12 bg-dash-primary hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95">
            <span className="material-symbols-outlined">add</span>
            New Task
          </button>
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <p className="px-4 text-xs font-bold text-dash-text-sub uppercase tracking-wider mb-2">Menu</p>
            <a className="flex items-center gap-4 px-4 py-3 rounded-xl bg-dash-primary/10 text-dash-primary font-bold transition-colors" href="#">
              <span className="material-symbols-outlined filled">wb_sunny</span>
              My Day
            </a>
            <a className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors group" href="#">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">star</span>
              Important
            </a>
            <a className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors group" href="#">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">calendar_month</span>
              Planned
            </a>
            <a className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors group" href="#">
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">done_all</span>
              Completed
            </a>
          </nav>
          {/* Categories */}
          <div className="flex flex-col gap-2">
            <p className="px-4 text-xs font-bold text-dash-text-sub uppercase tracking-wider mb-2">Lists</p>
            <a className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors" href="#">
              <div className="flex items-center gap-4">
                <span className="size-3 rounded-full bg-pastel-purple border-2 border-purple-200"></span>
                Design Work
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">8</span>
            </a>
            <a className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors" href="#">
              <div className="flex items-center gap-4">
                <span className="size-3 rounded-full bg-pastel-green border-2 border-green-200"></span>
                Groceries
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">3</span>
            </a>
            <a className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors" href="#">
              <div className="flex items-center gap-4">
                <span className="size-3 rounded-full bg-pastel-yellow border-2 border-yellow-200"></span>
                Personal
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">5</span>
            </a>
          </div>
          {/* Ad / Promo area */}
          <div className="mt-auto bg-gradient-to-br from-dash-primary/20 to-pastel-purple p-5 rounded-2xl relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-dash-primary/10">
              <span className="material-symbols-outlined text-[100px]">rocket_launch</span>
            </div>
            <h4 className="font-bold text-dash-text-main dark:text-gray-800 mb-1 relative z-10">Go Pro Today!</h4>
            <p className="text-xs text-dash-text-sub dark:text-gray-600 mb-3 relative z-10">Unlock unlimited lists and team collaboration.</p>
            <button className="bg-dash-surface dark:bg-dash-surface-dark text-xs font-bold py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-shadow relative z-10 dark:text-white">Upgrade</button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-6 lg:p-10 pb-24">
            <div className="max-w-4xl mx-auto flex flex-col gap-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-dash-text-main dark:text-white tracking-tight mb-2">Good Morning, Alex! ☀️</h1>
                  <p className="text-dash-text-sub dark:text-gray-400 font-medium">Here's your plan for today.</p>
                </div>
                <div className="text-right hidden md:block">
                  <h2 className="text-xl font-bold text-dash-text-main dark:text-white">Tuesday</h2>
                  <p className="text-dash-primary font-medium">October 24, 2023</p>
                </div>
              </div>
              {/* Progress Bar Card */}
              <div className="bg-dash-surface dark:bg-dash-surface-dark p-6 rounded-2xl shadow-soft flex flex-col md:flex-row gap-6 items-center">
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-end mb-3">
                    <div>
                      <p className="text-lg font-bold text-dash-text-main dark:text-white">Daily Goal</p>
                      <p className="text-sm text-dash-text-sub dark:text-gray-400">You're doing great! Keep it up.</p>
                    </div>
                    <span className="text-2xl font-black text-dash-primary">65%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-dash-primary rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                {/* Decoration */}
                <div className="hidden md:flex items-center justify-center bg-pastel-blue dark:bg-blue-900/30 size-16 rounded-2xl text-dash-primary shrink-0">
                  <span className="material-symbols-outlined text-4xl">emoji_events</span>
                </div>
              </div>
              {/* Tabs Filter */}
              <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {(['All Tasks', 'Active', 'Completed'] as const).map(tab => {
                   const tabKey = tab === 'All Tasks' ? 'All' : tab;
                   const isActive = activeTab === tabKey;
                   return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tabKey)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all active:scale-95 ${
                        isActive
                          ? 'bg-dash-text-main dark:bg-white text-white dark:text-dash-text-main shadow-lg shadow-gray-200 dark:shadow-none'
                          : 'bg-dash-surface dark:bg-dash-surface-dark hover:bg-gray-50 dark:hover:bg-gray-800 text-dash-text-sub dark:text-gray-400 border border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                      }`}
                    >
                      {tab}
                    </button>
                   );
                })}
              </div>
              {/* Task List */}
              <div className="flex flex-col gap-4">
                {filteredTasks.map(todo => (
                  <div 
                    key={todo._id} 
                    className={`group bg-dash-surface dark:bg-dash-surface-dark p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-dash-primary/20 flex items-center gap-4 cursor-pointer relative overflow-hidden ${todo.completed ? 'opacity-60 hover:opacity-100' : ''}`}
                    onClick={() => toggleTask(todo._id)}
                  >
                    {todo.important && <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400"></div>}
                    <label className="relative flex items-center justify-center cursor-pointer size-6 shrink-0 ml-1">
                      <input 
                        type="checkbox" 
                        checked={todo.completed} 
                        readOnly
                        className="peer appearance-none size-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg checked:bg-dash-primary checked:border-dash-primary transition-colors focus:ring-0" 
                      />
                      <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 text-sm pointer-events-none transition-opacity">check</span>
                    </label>
                    <div className="flex-1">
                      <h3 className={`text-dash-text-main dark:text-white font-bold text-base group-hover:text-dash-primary transition-colors ${todo.completed ? 'line-through decoration-2 decoration-gray-300 dark:decoration-gray-600' : ''}`}>
                        {todo.body}
                      </h3>
                      {(todo.time || todo.important) && (
                        <div className="flex items-center gap-2 mt-1">
                          {todo.important ? (
                             <>
                              <span className="material-symbols-outlined text-red-400 text-xs">error</span>
                              <p className="text-xs text-red-400 font-bold">Priority High</p>
                             </>
                          ) : (
                             <>
                              <span className="material-symbols-outlined text-gray-400 text-xs">schedule</span>
                              <p className="text-xs text-dash-text-sub dark:text-gray-500 font-medium">{todo.time}</p>
                             </>
                          )}
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap 
                        ${todo.completed 
                            ? 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400' 
                            : todo.tagColor === 'pastel-purple' ? 'bg-pastel-purple text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                            : todo.tagColor === 'pastel-green' ? 'bg-pastel-green text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-pastel-yellow text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                      {todo.tag}
                    </span>
                    {!todo.completed && (
                        <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-dash-text-main dark:hover:text-white transition-all">
                        <span className="material-symbols-outlined">more_vert</span>
                        </button>
                    )}
                  </div>
                ))}
                
                {/* Static Completed Section Example */}
                <div className="flex items-center justify-between mt-4">
                  <h4 className="text-sm font-bold text-dash-text-sub uppercase tracking-wider">Completed - 1</h4>
                  <button className="text-sm text-dash-primary font-bold hover:underline">Clear</button>
                </div>
                <div className="group bg-dash-surface/60 dark:bg-dash-surface-dark/60 p-4 rounded-2xl border border-transparent flex items-center gap-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity">
                  <label className="relative flex items-center justify-center cursor-pointer size-6 shrink-0">
                    <input type="checkbox" checked readOnly className="peer appearance-none size-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg checked:bg-dash-primary checked:border-dash-primary transition-colors focus:ring-0" />
                    <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 text-sm pointer-events-none transition-opacity">check</span>
                  </label>
                  <div className="flex-1">
                    <h3 className="text-dash-text-main dark:text-white font-bold text-base line-through decoration-2 decoration-gray-300 dark:decoration-gray-600">Morning Standup</h3>
                  </div>
                  <span className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">Work</span>
                </div>
              </div>
            </div>
          </div>
          {/* Floating Action Button for Mobile/Responsive */}
          <button className="absolute bottom-6 right-6 lg:hidden size-14 bg-dash-primary text-white rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center active:scale-95 transition-transform z-30">
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </main>
        {/* Right Sidebar (Widgets) */}
        <aside className="w-80 bg-dash-surface dark:bg-dash-surface-dark border-l border-gray-100 dark:border-gray-800 hidden xl:flex flex-col py-8 px-6 gap-6 overflow-y-auto">
          {/* Calendar Widget */}
          <div className="bg-dash-bg dark:bg-dash-bg-dark p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-dash-text-main dark:text-white">October 2023</h3>
              <div className="flex gap-1">
                <button className="size-6 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-dash-text-sub"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                <button className="size-6 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-dash-text-sub"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-dash-text-sub mb-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
                {/* Simple hardcoded calendar grid based on design */}
              <span className="text-gray-300 py-1">28</span><span className="text-gray-300 py-1">29</span><span className="text-gray-300 py-1">30</span>
              <span className="text-dash-text-main dark:text-gray-400 py-1">1</span><span className="text-dash-text-main dark:text-gray-400 py-1">2</span><span className="text-dash-text-main dark:text-gray-400 py-1">3</span><span className="text-dash-text-main dark:text-gray-400 py-1">4</span>
              <span className="text-dash-text-main dark:text-gray-400 py-1">5</span><span className="text-dash-text-main dark:text-gray-400 py-1">6</span><span className="text-dash-text-main dark:text-gray-400 py-1">7</span><span className="text-dash-text-main dark:text-gray-400 py-1">8</span><span className="text-dash-text-main dark:text-gray-400 py-1">9</span><span className="text-dash-text-main dark:text-gray-400 py-1">10</span><span className="text-dash-text-main dark:text-gray-400 py-1">11</span>
              <span className="text-dash-text-main dark:text-gray-400 py-1">12</span><span className="text-dash-text-main dark:text-gray-400 py-1">13</span><span className="text-dash-text-main dark:text-gray-400 py-1">14</span><span className="text-dash-text-main dark:text-gray-400 py-1">15</span><span className="text-dash-text-main dark:text-gray-400 py-1">16</span><span className="text-dash-text-main dark:text-gray-400 py-1">17</span><span className="text-dash-text-main dark:text-gray-400 py-1">18</span>
              <span className="text-dash-text-main dark:text-gray-400 py-1">19</span><span className="text-dash-text-main dark:text-gray-400 py-1">20</span><span className="text-dash-text-main dark:text-gray-400 py-1">21</span><span className="text-dash-text-main dark:text-gray-400 py-1">22</span><span className="text-dash-text-main dark:text-gray-400 py-1">23</span>
              <span className="bg-dash-primary text-white rounded-lg shadow-md shadow-dash-primary/30 py-1">24</span>
              <span className="text-dash-text-main dark:text-gray-400 py-1">25</span>
              <span className="text-dash-text-main dark:text-gray-400 py-1">26</span><span className="text-dash-text-main dark:text-gray-400 py-1">27</span><span className="text-dash-text-main dark:text-gray-400 py-1">28</span><span className="text-dash-text-main dark:text-gray-400 py-1">29</span><span className="text-dash-text-main dark:text-gray-400 py-1">30</span><span className="text-dash-text-main dark:text-gray-400 py-1">31</span>
            </div>
          </div>
          {/* Stickers / Achievements */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-dash-text-main dark:text-white">Achievements</h3>
              <a className="text-xs font-bold text-dash-primary hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-pastel-yellow dark:bg-yellow-900/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square text-center">
                <div className="bg-cover bg-center size-12" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCcUkbqNmfwBqcxlccmR0sFJBrhlbkaYiJFtXSBEpz4VhX5mzGUazqS1WdevKPPXMQjMeebMkyzgtqt787X_RWYJRTe1-3_cDaXkpwUefFbBe1ENDnKe-053l3SBtIRL6J9zkhOjrZWhifZvicm5fvv5irCVrWP6lzCo6_ClQnh2oHJX8M1GBNKP8UVs4i2aXss0wsHat5iY8FjndGGZf7mbskjOwtcUV1o_cw_Kwl4LD5Vz42KiXwtbA_XdNh9MpjMzVgMubQ99Qc')" }}></div>
                <div>
                  <p className="font-bold text-xs text-dash-text-main dark:text-white">Task Master</p>
                  <p className="text-[10px] text-dash-text-sub dark:text-gray-400">50 tasks done</p>
                </div>
              </div>
              <div className="bg-pastel-red dark:bg-red-900/20 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square text-center grayscale opacity-60">
                <div className="bg-cover bg-center size-12" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbPDnj1hx4Y2GYAMtEp4Psx0lBnHzvcmU58_h-nNMd6AUX6vAKtjuoNn7ppFkmLwl3YzSdabnFcRRdd-NcOhIQLPkmRDeJs58BRkpMax4y8XoVBjiykMUPvJh0_z-ZEfakxnYhuIyLiDjhKlwvI5y__cIGVbQy6jc9IEYRvr-5D_yTm4QLhcVmzOK34mpxRBXEEOY1YOH5WhXTZUjzXU4v1YZemiz6slYHLQTTN071UfL2lWRLnZHPM31daluHwB0Ok8mFY3BPlkg')" }}></div>
                <div>
                  <p className="font-bold text-xs text-dash-text-main dark:text-white">On Fire</p>
                  <p className="text-[10px] text-dash-text-sub dark:text-gray-400">7 day streak</p>
                </div>
              </div>
            </div>
          </div>
          {/* Focus Timer Widget (Mini) */}
          <div className="bg-dash-text-main dark:bg-gray-800 text-white p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 size-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-2 p-3 bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-2xl">timer</span>
              </div>
              <p className="font-bold text-lg">Focus Mode</p>
              <p className="text-gray-400 text-xs text-center mb-4">Stay productive without distractions.</p>
              <button className="w-full py-2 bg-dash-primary rounded-xl font-bold text-sm hover:bg-blue-400 transition-colors">Start Timer</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
