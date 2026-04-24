import { IoIosAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

const AddThreadButton = () => {
  return (
    <div className="fixed bottom-24 right-8 sm:bottom-12 sm:right-12 z-40">
      <Link 
        to="/new" 
        className="flex items-center justify-center w-16 h-16 bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white rounded-full shadow-lg shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-110 active:scale-95 transition-all duration-300 group"
        title="Tambah Diskusi"
      >
        <IoIosAdd size={40} className="group-hover:rotate-90 transition-transform duration-300" />
      </Link>
    </div>
  )
}

export default AddThreadButton
