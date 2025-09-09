import { Star, Trash2 } from "lucide-react";
import Todo from "../models/Todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onToggleImportant: (id: string, important: boolean) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onToggleImportant,
  onDelete,
}) => {
  return (
    <div className="group flex items-center p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:border-purple-500/30 hover:bg-white/15 transition-all duration-200">
      {/* Checkbox */}
      <button
        onClick={() => todo._id && onToggle(todo._id, todo.completed)}
        className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 sm:mr-4 transition-all duration-200 ${
          todo.completed
            ? "bg-purple-500 border-purple-500"
            : "border-purple-500 hover:border-purple-400"
        }`}
      >
        {todo.completed && (
          <svg
            className="w-full h-full text-white p-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      {/* Task Text */}
      <div className="flex-1 min-w-0 mr-3">
        <span
          className={`block text-sm sm:text-base transition-all duration-200 ${
            todo.completed
              ? "line-through text-gray-500"
              : "text-gray-200"
          }`}
        >
          {todo.body}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
        {/* Important Button */}
        <button
          onClick={() => todo._id && onToggleImportant(todo._id, todo.important)}
          className={`p-1.5 sm:p-2 rounded-lg transition-all duration-200 ${
            todo.important
              ? "text-yellow-400 hover:text-yellow-300 bg-yellow-400/10"
              : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10"
          }`}
          title={todo.important ? "Remove from important" : "Mark as important"}
        >
          <Star
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill={todo.important ? "currentColor" : "none"}
          />
        </button>

        {/* Delete Button */}
        <button
          onClick={() => todo._id && onDelete(todo._id)}
          className="p-1.5 sm:p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200 group/delete"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 stroke-current group-hover/delete:stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;