import { Plus } from 'lucide-react';

type TaskTabsProps = {
  activeTab: 'important' | 'general';
  onTabChange: (tab: 'important' | 'general') => void;
  onAddClick: () => void;
};

const TaskTabs = ({ activeTab, onTabChange, onAddClick }: TaskTabsProps) => (
  <div className="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 p-3 sm:p-4 mb-6">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
      <div className="flex w-full sm:w-auto">
        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => onTabChange('important')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              activeTab === 'important'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Important
          </button>
          <button
            onClick={() => onTabChange('general')}
            className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-colors ${
              activeTab === 'general'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            General
          </button>
        </div>
      </div>
      <button
        onClick={onAddClick}
        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
      >
        <Plus className="w-5 h-5" />
        <span>Add Task</span>
      </button>
    </div>
  </div>
);

export default TaskTabs;