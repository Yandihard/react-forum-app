import PropTypes from 'prop-types'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { MdOutlineForum, MdLogout, MdDarkMode, MdLightMode } from 'react-icons/md'
import useTheme from '../hooks/useTheme'
import ConfirmLogoutModal from './ConfirmLogoutModal'

/**
 * Modern Navigation Bar with Glassmorphism and Theme Toggle.
 */
const Navigation = ({ authUser, onLogout }) => {
  const [theme, toggleTheme] = useTheme()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setIsLogoutModalOpen(false)
    if (onLogout) onLogout()
  }

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
              <MdOutlineForum size={32} />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                Forumify
              </h1>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center gap-6">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'}`
                }
              >
                Threads
              </NavLink>
              <NavLink 
                to="/leaderboards" 
                className={({ isActive }) => 
                  `text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'}`
                }
              >
                Leaderboards
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => 
                  `text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500'}`
                }
              >
                Profile
              </NavLink>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? <MdLightMode size={22} /> : <MdDarkMode size={22} />}
              </button>

              {/* User Profile & Logout */}
              {authUser && (
                <div className="flex items-center gap-4 border-l border-slate-200 dark:border-slate-700 pl-4">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Hai, {authUser.name}
                    </span>
                    <img
                      className="w-8 h-8 rounded-full border-2 border-indigo-500 object-cover"
                      src={authUser.avatar}
                      alt={authUser.name}
                    />
                  </div>
                  
                  <button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <MdLogout size={20} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <ConfirmLogoutModal 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </>
  )
}

Navigation.propTypes = {
  authUser: PropTypes.object,
  onLogout: PropTypes.func
}

export default Navigation
