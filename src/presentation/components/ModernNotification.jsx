import { useSelector, useDispatch } from 'react-redux'
import { hideNotificationActionCreator } from '../../application/store/notification/action'
import { MdErrorOutline, MdCheckCircleOutline, MdClose } from 'react-icons/md'
import { useEffect } from 'react'

const ModernNotification = () => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(hideNotificationActionCreator())
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification, dispatch])

  if (!notification) return null

  const isError = notification.type === 'error'

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-full max-w-sm px-4 animate-fade-in">
      <div className={`flex items-center gap-4 p-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
        isError 
          ? 'bg-red-50/90 dark:bg-red-900/80 border-red-200 dark:border-red-800 text-red-800 dark:text-red-100' 
          : 'bg-emerald-50/90 dark:bg-emerald-900/80 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-100'
      }`}>
        <div className="flex-shrink-0">
          {isError ? <MdErrorOutline size={28} /> : <MdCheckCircleOutline size={28} />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">
            {isError ? 'Terjadi Kesalahan' : 'Berhasil'}
          </p>
          <p className="text-xs opacity-90 truncate">
            {notification.message}
          </p>
        </div>
        <button 
          onClick={() => dispatch(hideNotificationActionCreator())}
          className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
        >
          <MdClose size={20} />
        </button>
      </div>
    </div>
  )
}

export default ModernNotification
