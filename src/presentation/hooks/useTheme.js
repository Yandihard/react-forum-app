import { useEffect, useState } from 'react'

/**
 * Custom hook to manage Dark/Light mode theme.
 * Uses localStorage to persist the theme and toggles the 'dark' class on the HTML element.
 * @returns {Array} [theme, toggleTheme]
 */
export default function useTheme() {
  const [theme, setTheme] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
  )

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return [theme, toggleTheme]
}
