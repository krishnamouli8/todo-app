// import { List, LogOut, Settings, User } from "lucide-react";
// import SidebarProps from "../models/SidebarProps";
// import ProfilePhoto from "../images/profile_photo.jpeg";

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
//   return (
//     <>
//       {/* Overlay */}
//       <div
//         className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-20
//             ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
//         onClick={toggleSidebar}
//       />

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-[#2e1065] transform transition-transform duration-300 ease-in-out z-30
//             ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <div className="flex flex-col h-full p-4">
//           {/* Profile Section */}
//           <div className="flex flex-col items-center mb-8 mt-4">
//             <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/20">
//               <img
//                 src={ProfilePhoto}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h3 className="text-white font-medium">John Doe</h3>
//             <p className="text-white/60 text-sm">john.doe@example.com</p>
//           </div>

//           {/* Navigation Items */}
//           <nav className="flex-1">
//             <ul className="space-y-2">
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
//                 >
//                   <User className="w-5 h-5 mr-3" />
//                   Profile
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
//                 >
//                   <List className="w-5 h-5 mr-3" />
//                   Tasks
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="#"
//                   className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
//                 >
//                   <Settings className="w-5 h-5 mr-3" />
//                   Settings
//                 </a>
//               </li>
//             </ul>
//           </nav>

//           {/* Logout Button */}
//           <button className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors w-full">
//             <LogOut className="w-5 h-5 mr-3" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;






























import { List, LogOut, Settings, User } from "lucide-react";
import SidebarProps from "../models/SidebarProps";
import ProfilePhoto from "../images/profile_photo.jpeg";
import { todoApi } from "../api/todoApi";

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const handleLogout = () => {
    todoApi.logout();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ease-in-out z-20
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#2e1065] transform transition-transform duration-300 ease-in-out z-30
            ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8 mt-4">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white/20">
              <img
                src={ProfilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-white font-medium">John Doe</h3>
            <p className="text-white/60 text-sm">john.doe@example.com</p>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <User className="w-5 h-5 mr-3" />
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <List className="w-5 h-5 mr-3" />
                  Tasks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>

          {/* Logout Button */}
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-white rounded-lg hover:bg-white/10 transition-colors w-full"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;