import PropTypes from 'prop-types'
import { MdLogout, MdClose } from 'react-icons/md'

export default function ConfirmLogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-all duration-300">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform scale-100 transition-transform duration-300">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <MdLogout className="text-red-500" />
            Konfirmasi Logout
          </h3>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-600 dark:text-slate-300">
            Apakah Anda yakin ingin keluar dari sesi ini?
          </p>
        </div>
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-white font-medium bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            Ya, Keluar
          </button>
        </div>
      </div>
    </div>
  )
}

ConfirmLogoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}
