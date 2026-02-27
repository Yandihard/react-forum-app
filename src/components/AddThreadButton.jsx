import { IoIosAddCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

const AddThreadButton = () => {
  return (
        <div className="homepage__action mb-5">
            <Link to="/new" className="action" title="Tambah">
                <IoIosAddCircle size={500} />
            </Link>
        </div>
  )
}

export default AddThreadButton
