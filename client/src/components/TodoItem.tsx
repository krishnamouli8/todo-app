import TodoItemProps from "../models/TodoItemProps";

const TodoItem = ({
  todo,
  onToggle,
  onToggleImportant,
  onDelete,
}: TodoItemProps) => (
  <div className="flex items-stretch bg-white p-4 rounded-lg shadow">
    {/* Left section with checkbox and text */}
    <div className="flex flex-1 min-w-0 items-center gap-4">
      <div className="flex items-center self-center">
        <button
          onClick={() => todo._id && onToggle(todo._id, todo.completed)}
          className={`w-5 h-5 border-2 rounded transition-colors duration-200 ${
            todo.completed
              ? "bg-green-500 border-green-500"
              : "border-gray-300 hover:border-gray-400"
          }`}
        >
          {todo.completed && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex-1 min-w-0">
        <p
          className={`whitespace-pre-wrap break-words ${
            todo.completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {todo.body}
        </p>
      </div>
    </div>

    {/* Right section with action buttons */}
    <div className="flex items-center gap-3 pl-4">
      <button
        onClick={() => todo._id && onToggleImportant(todo._id, todo.important)}
        className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
      >
        <svg
          className={`w-5 h-5 ${
            todo.important ? "text-yellow-400 fill-current" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      </button>
      <button
        onClick={() => todo._id && onDelete(todo._id)}
        className="text-red-500 hover:text-red-600"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  </div>
);

export default TodoItem;
