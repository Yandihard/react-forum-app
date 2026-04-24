import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MdEmail, MdLockOutline, MdVisibility, MdVisibilityOff, MdDarkMode, MdLightMode } from 'react-icons/md'
import useTheme from '../hooks/useTheme'

const LoginInput = ({ onLogin }) => {
  const [theme, toggleTheme] = useTheme()
  const [formLogin, setFormLogin] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)

  const changeFormhandler = (event) => {
    setFormLogin({
      ...formLogin,
      [event.target.id]: event.target.value
    })
  }

  return (
    <div className="w-full max-w-md p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1 relative">
      {/* Theme Toggle in Login Card */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        aria-label="Toggle Dark Mode"
      >
        {theme === 'dark' ? <MdLightMode size={18} /> : <MdDarkMode size={18} />}
      </button>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Selamat Datang 👋</h2>
        <p className="text-slate-500 dark:text-slate-400">Masuk ke akun Anda untuk melanjutkan</p>
      </div>

      <form onSubmit={(event) => {
        event.preventDefault()
        onLogin(formLogin)
      }} className="space-y-6">
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdEmail className="text-slate-400" size={20} />
            </div>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formLogin.email} 
              onChange={changeFormhandler}
              className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="nama@email.com" 
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MdLockOutline className="text-slate-400" size={20} />
            </div>
            <input 
              type={showPassword ? 'text' : 'password'} 
              id="password" 
              name="password" 
              value={formLogin.password} 
              onChange={changeFormhandler}
              className="block w-full pl-10 pr-12 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              placeholder="••••••••" 
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-indigo-500 transition-colors"
            >
              {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-indigo-500/30 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-[1.02] active:scale-95"
        >
          Masuk
        </button>

        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          Belum punya akun?{' '}
          <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
            Daftar di sini
          </Link>
        </p>
      </form>
    </div>
  )
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired
}

export default LoginInput
