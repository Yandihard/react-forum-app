import { HiOutlineChatAlt2, HiOutlineChartBar, HiOutlineUser } from 'react-icons/hi'
import { NavLink, useLocation } from 'react-router-dom'

function Footer () {
  const location = useLocation()

  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-colors duration-300 h-16 flex items-center justify-center sm:hidden">
      <div className="w-full max-w-md mx-auto flex justify-around items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              isActive || location.pathname.startsWith('/thread')
                ? 'text-indigo-600 dark:text-indigo-400 scale-110'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300'
            }`
          }
        >
          <HiOutlineChatAlt2 size={24} />
          <span className="text-xs font-medium mt-1">Threads</span>
        </NavLink>
        
        <NavLink 
          to="/leaderboards" 
          className={({ isActive }) =>
            `flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 scale-110'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300'
            }`
          }
        >
          <HiOutlineChartBar size={24} />
          <span className="text-xs font-medium mt-1">Leaderboards</span>
        </NavLink>

        <NavLink 
          to="/profile" 
          className={({ isActive }) =>
            `flex flex-col items-center p-2 rounded-xl transition-all duration-300 ${
              isActive
                ? 'text-indigo-600 dark:text-indigo-400 scale-110'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300'
            }`
          }
        >
          <HiOutlineUser size={24} />
          <span className="text-xs font-medium mt-1">Profile</span>
        </NavLink>
      </div>
    </footer>
  )
}

export default Footer
