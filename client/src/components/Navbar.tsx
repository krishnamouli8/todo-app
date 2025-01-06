// import { User, CheckSquare } from 'lucide-react';

// const Navbar = () => (
//   <div className="w-full p-4 pb-0">
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
//   </div>
// );

// export default Navbar;
















import { User, ArrowLeft } from 'lucide-react';

const Navbar = () => (
  <div className="w-full p-4">
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500"></div>
            <div>
              <h2 className="text-sm text-gray-400">Delpoolsummit1</h2>
              <h1 className="text-lg font-semibold">Neal Rob</h1>
            </div>
          </div>
        </div>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
          <User className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>
  </div>
);

export default Navbar;