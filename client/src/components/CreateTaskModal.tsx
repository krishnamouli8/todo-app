import { X } from "lucide-react";
import { useState } from "react";

type CreateTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: string) => void;
};

const CreateTaskModal = ({ isOpen, onClose, onSubmit }: CreateTaskModalProps) => {
  const [task, setTask] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#2a2d30] rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold text-white">Add New Task</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (task.trim()) {
              onSubmit(task);
              setTask("");
              onClose();
            }
          }}
          className="p-4"
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task..."
            className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 mb-4 text-white placeholder-gray-400"
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-gray-300 hover:bg-white/10 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 text-sm bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;