import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { todoApi } from '../api/todoApi';
import Todo from '../models/Todo';

export function DashboardPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Completed'>('All');
  const [loading, setLoading] = useState(true);
  const [dailyStats, setDailyStats] = useState({ total: 0, completed: 0, percentage: 0 });
  const [achievements, setAchievements] = useState<any>(null);
  const [categoryStats, setCategoryStats] = useState<Record<string, number>>({});
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFilter, setCurrentFilter] = useState<string>('myDay');
  
  // New Task Form State
  const [newTaskBody, setNewTaskBody] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newTaskImportant, setNewTaskImportant] = useState(false);

  // Focus Timer State
  const [timerMinutes, setTimerMinutes] = useState(25);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    fetchTodos();
    fetchDailyStats();
    fetchAchievements();
    fetchCategoryStats();
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [currentFilter, searchQuery]);

  // Focus Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (timerActive) {
      interval = setInterval(() => {
        if (timerSeconds === 0) {
          if (timerMinutes === 0) {
            setTimerActive(false);
            alert('Focus session complete! Great work!');
          } else {
            setTimerMinutes(timerMinutes - 1);
            setTimerSeconds(59);
          }
        } else {
          setTimerSeconds(timerSeconds - 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timerMinutes, timerSeconds]);

  const fetchTodos = async () => {
    try {
      if (currentFilter === 'myDay') {
        const fetchedTodos = await todoApi.getTodos();
        // Filter for today's tasks on client side
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const filtered = fetchedTodos.filter((todo: Todo) => {
          const createdDate = new Date(todo.created_at || '');
          createdDate.setHours(0, 0, 0,0);
          return createdDate.getTime() === today.getTime() || 
                 (todo.dueDate && new Date(todo.dueDate).setHours(0,0,0,0) === today.getTime());
        });
        setTodos(filtered);
      } else if (currentFilter === 'important') {
        const fetchedTodos = await todoApi.getTodos();
        setTodos(fetchedTodos.filter((todo: Todo) => todo.important));
      } else if (currentFilter === 'planned') {
        const fetchedTodos = await todoApi.getTodos();
        setTodos(fetchedTodos.filter((todo: Todo) => todo.dueDate));
      } else if (currentFilter === 'completed') {
        const fetchedTodos = await todoApi.getTodos();
        setTodos(fetchedTodos.filter((todo: Todo) => todo.completed));
      } else {
        const fetchedTodos = await todoApi.getTodos();
        setTodos(fetchedTodos);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyStats = async () => {
    try {
      const stats = await todoApi.getDailyStats();
      setDailyStats(stats);
    } catch (err) {
      console.error('Error fetching daily stats:', err);
    }
  };

  const fetchAchievements = async () => {
    try {
      const data = await todoApi.getAchievements();
      setAchievements(data);
    } catch (err) {
      console.error('Error fetching achievements:', err);
    }
  };

  const fetchCategoryStats = async () => {
    try {
      const data = await todoApi.getCategoryStats();
      setCategoryStats(data.categories || {});
    } catch (err) {
      console.error('Error fetching category stats:', err);
    }
  };

  const toggleTask = async (id: string) => {
    const task = todos.find(t => t._id === id);
    if (!task) return;
    try {
      await todoApi.toggleTodo(id, task.completed);
      setTodos(todos.map(t => t._id === id ? {...t, completed: !t.completed} : t));
      await fetchDailyStats();
      await fetchAchievements();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTask = async () => {
    if (!newTaskBody.trim()) return;
    
    try {
      await todoApi.createTodo(newTaskBody, newTaskCategory, newTaskDueDate, newTaskImportant);
      setShowNewTaskModal(false);
      setNewTaskBody('');
      setNewTaskCategory('');
      setNewTaskDueDate('');
      setNewTaskImportant(false);
      await fetchTodos();
      await fetchDailyStats();
      await fetchCategoryStats();
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearCompleted = async () => {
    if (!window.confirm('Are you sure you want to clear all completed tasks?')) return;
    
    try {
      await todoApi.clearCompletedTodos();
      await fetchTodos();
      await fetchDailyStats();
      await fetchCategoryStats();
    } catch (err) {
      console.error(err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getUserName = () => {
    const userData = todoApi.getUserData();
    return userData?.full_name?.split(' ')[0] || 'User';
  };

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    const days = [];
    
    // Previous month days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === year
      });
    }
    
    return days;
  };

  const changeMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const formatTime = (mins: number, secs: number) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const filteredTasks = todos.filter(todo => {
    // Apply tab filter
    if (activeTab === 'Active' && todo.completed) return false;
    if (activeTab === 'Completed' && !todo.completed) return false;
    
    // Apply search filter
    if (searchQuery && !todo.body.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const completedCount = todos.filter(t => t.completed).length;

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
            <input 
              className="bg-transparent border-none focus:ring-0 w-full text-sm text-dash-text-main dark:text-white placeholder:text-dash-text-sub" 
              placeholder="Search for tasks..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="relative p-2 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-main dark:text-white transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-2 right-2 size-2.5 bg-red-400 rounded-full border-2 border-dash-surface dark:border-dash-surface-dark"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-gray-100 dark:border-gray-800 cursor-pointer" onClick={() => navigate('/')}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-dash-text-main dark:text-white">{getUserName()}</p>
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
          <button 
            onClick={() => setShowNewTaskModal(true)}
            className="w-full h-12 bg-dash-primary hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            New Task
          </button>
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <p className="px-4 text-xs font-bold text-dash-text-sub uppercase tracking-wider mb-2">Menu</p>
            <button 
              onClick={() => setCurrentFilter('myDay')}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors text-left ${
                currentFilter === 'myDay' 
                  ? 'bg-dash-primary/10 text-dash-primary' 
                  : 'hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium'
              }`}
            >
              <span className={`material-symbols-outlined ${currentFilter === 'myDay' ? 'filled' : ''}`}>wb_sunny</span>
              My Day
            </button>
            <button 
              onClick={() => setCurrentFilter('important')}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors text-left ${
                currentFilter === 'important' 
                  ? 'bg-dash-primary/10 text-dash-primary' 
                  : 'hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">star</span>
              Important
            </button>
            <button 
              onClick={() => setCurrentFilter('planned')}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors text-left ${
                currentFilter === 'planned' 
                  ? 'bg-dash-primary/10 text-dash-primary' 
                  : 'hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">calendar_month</span>
              Planned
            </button>
            <button 
              onClick={() => setCurrentFilter('completed')}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-colors text-left ${
                currentFilter === 'completed' 
                  ? 'bg-dash-primary/10 text-dash-primary' 
                  : 'hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium'
              }`}
            >
              <span className="material-symbols-outlined group-hover:scale-110 transition-transform">done_all</span>
              Completed
            </button>
          </nav>
          {/* Categories */}
          <div className="flex flex-col gap-2">
            <p className="px-4 text-xs font-bold text-dash-text-sub uppercase tracking-wider mb-2">Lists</p>
            <a className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors" href="#">
              <div className="flex items-center gap-4">
                <span className="size-3 rounded-full bg-pastel-purple border-2 border-purple-200"></span>
                Design Work
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">{categoryStats['Design Work'] || 0}</span>
            </a>
            <a className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors" href="#">
              <div className="flex items-center gap-4">
                <span className="size-3 rounded-full bg-pastel-green border-2 border-green-200"></span>
                Groceries
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">{categoryStats['Groceries'] || 0}</span>
            </a>
            <a className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-dash-bg dark:hover:bg-gray-800 text-dash-text-sub hover:text-dash-text-main dark:text-gray-400 dark:hover:text-white font-medium transition-colors" href="#">
              <div className="flex items-center gap-4">
                <span className="size-3 rounded-full bg-pastel-yellow border-2 border-yellow-200"></span>
                Personal
              </div>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-gray-500">{categoryStats['Personal'] || 0}</span>
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
                  <h1 className="text-3xl md:text-4xl font-extrabold text-dash-text-main dark:text-white tracking-tight mb-2">
                    {getGreeting()}, {getUserName()}! {new Date().getHours() < 12 ? '☀️' : new Date().getHours() < 17 ? '⛅' : '🌙'}
                  </h1>
                  <p className="text-dash-text-sub dark:text-gray-400 font-medium">Here's your plan for today.</p>
                </div>
                <div className="text-right hidden md:block">
                  <h2 className="text-xl font-bold text-dash-text-main dark:text-white">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </h2>
                  <p className="text-dash-primary font-medium">
                    {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
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
                    <span className="text-2xl font-black text-dash-primary">{dailyStats.percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-dash-primary rounded-full transition-all duration-500" style={{ width: `${dailyStats.percentage}%` }}></div>
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
                {filteredTasks.filter(t => !t.completed).map(todo => (
                  <div 
                    key={todo._id} 
                    className="group bg-dash-surface dark:bg-dash-surface-dark p-4 rounded-2xl shadow-sm hover:shadow-md transition-all border border-transparent hover:border-dash-primary/20 flex items-center gap-4 cursor-pointer relative overflow-hidden"
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
                      <h3 className="text-dash-text-main dark:text-white font-bold text-base group-hover:text-dash-primary transition-colors">
                        {todo.body}
                      </h3>
                      {(todo.time || todo.important || todo.category) && (
                        <div className="flex items-center gap-2 mt-1">
                          {todo.important ? (
                             <>
                              <span className="material-symbols-outlined text-red-400 text-xs">error</span>
                              <p className="text-xs text-red-400 font-bold">Priority High</p>
                             </>
                          ) : todo.time ? (
                             <>
                              <span className="material-symbols-outlined text-gray-400 text-xs">schedule</span>
                              <p className="text-xs text-dash-text-sub dark:text-gray-500 font-medium">{todo.time}</p>
                             </>
                          ) : null}
                          {todo.category && (
                            <span className="text-xs text-dash-text-sub dark:text-gray-500 font-medium">• {todo.category}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap 
                        ${todo.tagColor === 'pastel-purple' ? 'bg-pastel-purple text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                          : todo.tagColor === 'pastel-green' ? 'bg-pastel-green text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : todo.category === 'Design Work' ? 'bg-pastel-purple text-purple-700 dark:bg-purple-900/30 dark:text-purple-300'
                          : todo.category === 'Groceries' ? 'bg-pastel-green text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : todo.category === 'Personal' ? 'bg-pastel-yellow text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-pastel-yellow text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                      {todo.tag || todo.category || 'Work'}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-dash-text-main dark:hover:text-white transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                ))}
                
                {/* Completed Section */}
                {completedCount > 0 && (
                  <>
                    <div className="flex items-center justify-between mt-4">
                      <h4 className="text-sm font-bold text-dash-text-sub uppercase tracking-wider">Completed - {completedCount}</h4>
                      <button 
                        onClick={handleClearCompleted}
                        className="text-sm text-dash-primary font-bold hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                    {filteredTasks.filter(t => t.completed).map(todo => (
                      <div 
                        key={todo._id}
                        className="group bg-dash-surface/60 dark:bg-dash-surface-dark/60 p-4 rounded-2xl border border-transparent flex items-center gap-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
                        onClick={() => toggleTask(todo._id)}
                      >
                        <label className="relative flex items-center justify-center cursor-pointer size-6 shrink-0">
                          <input type="checkbox" checked readOnly className="peer appearance-none size-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg checked:bg-dash-primary checked:border-dash-primary transition-colors focus:ring-0" />
                          <span className="material-symbols-outlined absolute text-white opacity-0 peer-checked:opacity-100 text-sm pointer-events-none transition-opacity">check</span>
                        </label>
                        <div className="flex-1">
                          <h3 className="text-dash-text-main dark:text-white font-bold text-base line-through decoration-2 decoration-gray-300 dark:decoration-gray-600">{todo.body}</h3>
                        </div>
                        <span className="bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap">{todo.tag || todo.category || 'Work'}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
          {/* Floating Action Button for Mobile/Responsive */}
          <button 
            onClick={() => setShowNewTaskModal(true)}
            className="absolute bottom-6 right-6 lg:hidden size-14 bg-dash-primary text-white rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center active:scale-95 transition-transform z-30"
          >
            <span className="material-symbols-outlined text-3xl">add</span>
          </button>
        </main>

        {/* Right Sidebar (Widgets) */}
        <aside className="w-80 bg-dash-surface dark:bg-dash-surface-dark border-l border-gray-100 dark:border-gray-800 hidden xl:flex flex-col py-8 px-6 gap-6 overflow-y-auto">
          {/* Calendar Widget */}
          <div className="bg-dash-bg dark:bg-dash-bg-dark p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-dash-text-main dark:text-white">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h3>
              <div className="flex gap-1">
                <button 
                  onClick={() => changeMonth(-1)}
                  className="size-6 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-dash-text-sub"
                >
                  <span className="material-symbols-outlined text-sm">chevron_left</span>
                </button>
                <button 
                  onClick={() => changeMonth(1)}
                  className="size-6 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-dash-text-sub"
                >
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-dash-text-sub mb-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium">
              {generateCalendar().map((day, idx) => (
                <span 
                  key={idx}
                  className={`py-1 ${
                    day.isToday 
                      ? 'bg-dash-primary text-white rounded-lg shadow-md shadow-dash-primary/30' 
                      : day.isCurrentMonth 
                        ? 'text-dash-text-main dark:text-gray-400' 
                        : 'text-gray-300'
                  }`}
                >
                  {day.day}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-dash-text-main dark:text-white">Achievements</h3>
              <a className="text-xs font-bold text-dash-primary hover:underline" href="#">View All</a>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {achievements?.achievements?.map((achievement: any) => (
                <div 
                  key={achievement.id}
                  className={`${
                    achievement.id === 'task_master' ? 'bg-pastel-yellow dark:bg-yellow-900/20' : 'bg-pastel-red dark:bg-red-900/20'
                  } p-4 rounded-2xl flex flex-col items-center justify-center gap-2 aspect-square text-center ${
                    !achievement.unlocked ? 'grayscale opacity-60' : ''
                  }`}
                >
                  <div className="bg-cover bg-center size-12" style={{ backgroundImage: `url('${achievement.icon}')` }}></div>
                  <div>
                    <p className="font-bold text-xs text-dash-text-main dark:text-white">{achievement.name}</p>
                    <p className="text-[10px] text-dash-text-sub dark:text-gray-400">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Focus Timer Widget */}
          <div className="bg-dash-primary text-white p-5 rounded-2xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 size-24 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="mb-2 p-3 bg-white/10 rounded-full">
                <span className="material-symbols-outlined text-2xl">timer</span>
              </div>
              <p className="font-bold text-lg">Focus Mode</p>
              {timerActive ? (
                <p className="text-3xl font-black my-3">{formatTime(timerMinutes, timerSeconds)}</p>
              ) : (
                <p className="text-gray-300 text-xs text-center mb-4">Stay productive without distractions.</p>
              )}
              <button 
                onClick={() => {
                  if (timerActive) {
                    setTimerActive(false);
                  } else {
                    setTimerActive(true);
                  }
                }}
                className="w-full py-2 bg-white text-dash-primary rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors"
              >
                {timerActive ? 'Pause Timer' : 'Start Timer'}
              </button>
              {timerActive && (
                <button 
                  onClick={() => {
                    setTimerActive(false);
                    setTimerMinutes(25);
                    setTimerSeconds(0);
                  }}
                  className="w-full py-2 mt-2 bg-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-dash-surface dark:bg-dash-surface-dark rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-dash-text-main dark:text-white mb-4">New Task</h2>
            
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold text-dash-text-sub mb-2">Task</label>
                <input
                  type="text"
                  value={newTaskBody}
                  onChange={(e) => setNewTaskBody(e.target.value)}
                  placeholder="What do you need to do?"
                  className="w-full px-4 py-3 rounded-xl bg-dash-bg dark:bg-dash-bg-dark border-2 border-transparent focus:border-dash-primary text-dash-text-main dark:text-white placeholder:text-dash-text-sub transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-dash-text-sub mb-2">Category</label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dash-bg dark:bg-dash-bg-dark border-2 border-transparent focus:border-dash-primary text-dash-text-main dark:text-white transition-colors"
                >
                  <option value="">Select category...</option>
                  <option value="Design Work">Design Work</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-dash-text-sub mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-dash-bg dark:bg-dash-bg-dark border-2 border-transparent focus:border-dash-primary text-dash-text-main dark:text-white transition-colors"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="important"
                  checked={newTaskImportant}
                  onChange={(e) => setNewTaskImportant(e.target.checked)}
                  className="size-5 rounded border-2 border-gray-300 dark:border-gray-600 checked:bg-dash-primary checked:border-dash-primary"
                />
                <label htmlFor="important" className="text-sm font-bold text-dash-text-main dark:text-white cursor-pointer">
                  Mark as Important
                </label>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setShowNewTaskModal(false);
                    setNewTaskBody('');
                    setNewTaskCategory('');
                    setNewTaskDueDate('');
                    setNewTaskImportant(false);
                  }}
                  className="flex-1 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-dash-text-main dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateTask}
                  className="flex-1 py-3 rounded-xl bg-dash-primary text-white font-bold hover:bg-blue-500 transition-colors"
                >
                  Create Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
