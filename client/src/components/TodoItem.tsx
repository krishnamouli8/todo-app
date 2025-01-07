// import { Star, Check } from 'lucide-react';
// import Todo from '../models/Todo';

// type TodoItemProps = {
//   todo: Todo;
//   onToggle: (id: string, completed: boolean) => void;
//   onToggleImportant: (id: string, important: boolean) => void;
//   onDelete: (id: string) => void;
// };

// const TodoItem = ({ todo, onToggle, onToggleImportant, onDelete }: TodoItemProps) => {
//   // Custom star icon for filled state
//   const StarFilledIcon = () => (
//     <svg 
//       className="w-4 h-4 sm:w-5 sm:h-5"
//       viewBox="0 0 24 24" 
//       fill="currentColor"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
//     </svg>
//   );

//   // Custom trash icon for outline and filled states
//   const TrashOutlineIcon = () => (
//     <svg 
//       className="w-4 h-4 sm:w-5 sm:h-5"
//       viewBox="0 0 24 24" 
//       fill="none" 
//       stroke="currentColor" 
//       strokeWidth="2" 
//       strokeLinecap="round" 
//       strokeLinejoin="round"
//     >
//       <path d="M3 6H21" />
//       <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" />
//       <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
//     </svg>
//   );

//   const TrashFilledIcon = () => (
//     <svg 
//       className="w-4 h-4 sm:w-5 sm:h-5"
//       viewBox="0 0 24 24" 
//       fill="currentColor"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path d="M21 6H3M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
//     </svg>
//   );

//   return (
//     <div className="group flex items-center gap-2 sm:gap-4 bg-white/5 backdrop-blur-lg p-2 sm:p-4 rounded-xl hover:bg-white/10 transition-colors">
//       <button
//         onClick={() => todo._id && onToggle(todo._id, todo.completed)}
//         className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-md transition-colors ${
//           todo.completed
//             ? 'bg-green-500'
//             : 'border border-gray-600 hover:border-gray-400'
//         }`}
//       >
//         {todo.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
//       </button>
      
//       <div className="flex-1 min-w-0">
//         <p className={`text-xs sm:text-sm ${
//           todo.completed ? 'line-through text-gray-500' : 'text-gray-200'
//         }`}>
//           {todo.body}
//         </p>
//       </div>

//       <div className="flex items-center gap-1 sm:gap-3">
//         <button
//           onClick={() => todo._id && onToggleImportant(todo._id, todo.important)}
//           className={`p-1 sm:p-1.5 rounded-lg transition-all duration-200 ${
//             todo.important 
//               ? 'text-[#F7B731]'
//               : 'text-gray-400 hover:text-[#F7B731]'
//           }`}
//         >
//           {todo.important ? <StarFilledIcon /> : <Star className="w-4 h-4 sm:w-5 sm:h-5" />}
//         </button>
//         <button
//           onClick={() => todo._id && onDelete(todo._id)}
//           className="p-1 sm:p-1.5 rounded-lg text-[#FF6B6B] hover:bg-white/5 transition-all duration-200 group/delete"
//         >
//           <div className="block group-hover/delete:hidden">
//             <TrashOutlineIcon />
//           </div>
//           <div className="hidden group-hover/delete:block">
//             <TrashFilledIcon />
//           </div>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TodoItem;

















import { Star, Check } from 'lucide-react';
import Todo from '../models/Todo';

type TodoItemProps = {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
  onToggleImportant: (id: string, important: boolean) => void;
  onDelete: (id: string) => void;
};

const TodoItem = ({ todo, onToggle, onToggleImportant, onDelete }: TodoItemProps) => {
  // Custom star icon for filled state
  const StarFilledIcon = () => (
    <svg 
      className="w-4 h-4 sm:w-5 sm:h-5"
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );

  // Custom trash icon for outline and filled states
  const TrashOutlineIcon = () => (
    <svg 
      className="w-4 h-4 sm:w-5 sm:h-5"
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M3 6H21" />
      <path d="M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6" />
      <path d="M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
    </svg>
  );

  const TrashFilledIcon = () => (
    <svg 
      className="w-4 h-4 sm:w-5 sm:h-5"
      viewBox="0 0 24 24" 
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M21 6H3M19 6V20C19 21 18 22 17 22H7C6 22 5 21 5 20V6M8 6V4C8 3 9 2 10 2H14C15 2 16 3 16 4V6" />
    </svg>
  );

  return (
    <div className="group flex items-center gap-2 sm:gap-4 bg-gray-800/90 sm:bg-white/5 backdrop-blur-lg p-2 sm:p-4 rounded-xl hover:bg-white/10 transition-colors w-[calc(100%+1rem)] -ml-2 sm:w-full sm:ml-0">
      <button
        onClick={() => todo._id && onToggle(todo._id, todo.completed)}
        className={`w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-md transition-colors ${
          todo.completed
            ? 'bg-green-500'
            : 'border border-gray-600 hover:border-gray-400'
        }`}
      >
        {todo.completed && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-xs sm:text-sm ${
          todo.completed ? 'line-through text-gray-500' : 'text-gray-200'
        }`}>
          {todo.body}
        </p>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <button
          onClick={() => todo._id && onToggleImportant(todo._id, todo.important)}
          className={`p-1 sm:p-1.5 rounded-lg transition-all duration-200 ${
            todo.important 
              ? 'text-[#F7B731]'
              : 'text-gray-400 hover:text-[#F7B731]'
          }`}
        >
          {todo.important ? <StarFilledIcon /> : <Star className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <button
          onClick={() => todo._id && onDelete(todo._id)}
          className="p-1 sm:p-1.5 rounded-lg text-[#FF6B6B] hover:bg-white/5 transition-all duration-200 group/delete"
        >
          <div className="block group-hover/delete:hidden">
            <TrashOutlineIcon />
          </div>
          <div className="hidden group-hover/delete:block">
            <TrashFilledIcon />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;