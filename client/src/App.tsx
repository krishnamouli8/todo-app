import { useState, useEffect } from "react";
import { todoApi } from "./api/todoApi";
import TodoItem from "./components/TodoItem";
import Todo from "./models/Todo";
import Navbar from "./components/Navbar";
import CreateTaskModal from "./func/CreateTaskModal";
import TaskTabs from "./components/TaskTabs";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'important' | 'general'>('general');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const displayedTodos = activeTab === 'important' ? importantTodos : regularTodos;

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="p-4">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
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
    </div>
  );
}

