import { Plus } from 'lucide-react';

type TaskTabsProps = {
  activeTab: 'important' | 'general';
  onTabChange: (tab: 'important' | 'general') => void;
  onAddClick: () => void;
};

const TaskTabs = ({ activeTab, onTabChange, onAddClick }: TaskTabsProps) => (
  <div className="mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex w-full sm:w-auto">
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <button
            onClick={() => onTabChange('important')}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'important'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            Important
          </button>
          <button
            onClick={() => onTabChange('general')}
            className={`px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
              activeTab === 'general'
                ? 'bg-purple-500/20 text-purple-400'
                : 'text-gray-400 hover:bg-white/5'
            }`}
          >
            General
          </button>
        </div>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors w-full sm:w-auto"
      >
        <Plus className="w-5 h-5" />
        <span>Add Task</span>
      </button>
    </div>
  </div>
);

export default TaskTabs;