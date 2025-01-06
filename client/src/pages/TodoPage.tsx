import { useState, useEffect } from "react";
import { todoApi } from "../api/todoApi";
import TodoItem from "../components/TodoItem";
import Todo from "../models/Todo";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskTabs from "../components/TaskTabs";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"important" | "general">(
    "general"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await todoApi.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await todoApi.toggleTodo(id, !completed);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleToggleImportant = async (id: string, important: boolean) => {
    try {
      await todoApi.toggleImportant(id, !important);
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, important: !todo.important } : todo
        )
      );
    } catch (err) {
      setError("Failed to update todo importance");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const importantTodos = todos.filter((todo) => todo.important);
  const regularTodos = todos.filter((todo) => !todo.important);
  const displayedTodos =
    activeTab === "important" ? importantTodos : regularTodos;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#1a1c1e]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-[#1a1c1e] text-white relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="doodlePattern" x="0" y="0" width="150" height="150" patternUnits="userSpaceOnUse"><rect x="20" y="20" width="12" height="12" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M80,30 l12,-12 l3,3 l-12,12 l-4,1 z" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M120,40 v20 h-16 v-20 h16 M108,35 v5 M116,35 v5" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M40,100 c0,-10 15,-10 15,0 v15 c0,10 -20,10 -20,0 v-20" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><path d="M85,95 l5,5 l10,-10" fill="none" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/><circle cx="120" cy="100" r="2" fill="rgb(124,58,237)" opacity="0.15"/><path d="M15,70 h20 M15,75 h15" stroke="rgb(124,58,237)" stroke-width="1.5" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(#doodlePattern)"/></svg>`)}")`,
        backgroundRepeat: 'repeat'
    }}>
      {/* Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-40 p-3 bg-violet-600 rounded-full hover:bg-violet-700 transition-colors"
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(false)} />

      <main className="p-4">
        {/* Enhanced Centered Title */}
        <h1 className="text-6xl font-bold text-center mb-16 mt-8">
          <span className="text-violet-400">User's</span>
          <span className="ml-3">Todo List</span>
        </h1>

        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          <TaskTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onAddClick={() => setIsModalOpen(true)}
          />

          <div className="space-y-4">
            {displayedTodos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onToggle={handleToggle}
                onToggleImportant={handleToggleImportant}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </main>

      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={async (task) => {
          try {
            const todo = await todoApi.createTodo(task);
            setTodos([...todos, todo]);
          } catch (err) {
            setError("Failed to create todo");
          }
        }}
      />
      <Footer />
    </div>
  );
}
