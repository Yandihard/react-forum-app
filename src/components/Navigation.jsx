import PropTypes from 'prop-types'
import { MdOutlineForum, MdLogout } from 'react-icons/md'

const Navigation = ({ authUser, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
      <div className="container-fluid">

        <header className="navbar-brand">
          <MdOutlineForum size={45} className="me-2" />
          <h1 className="mb-0">Forum App</h1>
        </header>

        {authUser && (

          <header className="navbar-brand">

            <p style={{ marginBottom: '0px' }}>
              Halo, {authUser.name}

              <img
                className="img-user mx-2"
                src={authUser.avatar}
                alt={authUser.name}
              />

            </p>

            <button
              className="button-logout"
              onClick={onLogout}
            >

              <MdLogout size={30}/>Logout

            </button>

          </header>

        )}

      </div>
    </nav>
  )
}

Navigation.propTypes = {

  authUser: PropTypes.object,

  onLogout: PropTypes.func

}

export default Navigation
