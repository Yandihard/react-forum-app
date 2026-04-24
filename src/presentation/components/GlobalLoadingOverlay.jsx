import { useSelector } from 'react-redux'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const GlobalLoadingOverlay = () => {
  // loadingBar state: { default: 0 } or { sectionName: 0 }
  // It increments when showLoading is called and decrements when hideLoading is called.
  const loadingBar = useSelector((state) => state.loadingBar)
  
  // If default is > 0, it means something is loading
  const isLoading = loadingBar && loadingBar.default > 0

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/30 dark:bg-slate-900/30 backdrop-blur-[2px] transition-all duration-300">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl flex flex-col items-center gap-4 animate-scale-in">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-700"></div>
          <AiOutlineLoading3Quarters 
            className="absolute top-0 left-0 text-indigo-600 dark:text-indigo-400 animate-spin" 
            size={64} 
          />
        </div>
        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 animate-pulse">
          Sedang memproses...
        </p>
      </div>
    </div>
  )
}

export default GlobalLoadingOverlay
