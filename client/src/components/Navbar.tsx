// import { User, CheckSquare } from 'lucide-react';

// const Navbar = () => (
//   <nav className="fixed top-0 left-0 right-0 z-10 p-4">
//     <div className="max-w-7xl mx-auto">
//       <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 px-6 py-4">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
//               User's Todo List
//             </h1>
//           </div>
//           <div className="flex items-center">
//             <button className="p-2.5 rounded-full hover:bg-gray-50 transition-colors">
//               <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   </nav>
// );

// export default Navbar;













import { User, CheckSquare } from 'lucide-react';

const Navbar = () => (
  <div className="w-full p-4 pb-0">
    <div className="max-w-7xl mx-auto">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckSquare className="w-6 h-6 sm:w-7 sm:h-7 text-blue-500" />
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800 truncate">
              User's Todo List
            </h1>
          </div>
          <div className="flex items-center">
            <button className="p-2.5 rounded-full hover:bg-gray-50 transition-colors">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Navbar;