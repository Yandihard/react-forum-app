import { useSelector } from 'react-redux'

function ProfilePage () {
  const authUser = useSelector((state) => state.authUser)

  return (
        <div className="form-container shadow">
            <h2>Informasi Profil</h2>
            <div className="profile mt-3">
                <img className="img-user"
                src={authUser.avatar}
                alt={authUser.name}
                />
                <p style={{ marginBottom: '0' }}>@{authUser.id}<br />{authUser.name}<br />{authUser.email}<br /></p>
            </div>
        </div>
  )
}

export default ProfilePage
