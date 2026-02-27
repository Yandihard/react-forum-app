import Navigation from './components/Navigation'
import Footer from './components/Footer'
import LoginPage from './page/LoginPage'
import RegisterPage from './page/RegisterPage'
import LeaderboardsPage from './page/LeaderboardsPage'
import ThreadsPage from './page/ThreadsPage'
import AddThreadPage from './page/AddThreadPage'
import ThreadDetailPage from './page/ThreadDetailPage'
import ProfilePage from './page/ProfilePage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { asyncPreloadProcess } from './states/isPreload/action'
import { asyncUnsetAuthUser } from './states/authUser/action'
import Loading from './components/Loading'

function App () {
  const navigate = useNavigate()

  const {
    authUser = null,
    isPreload = false
  } = useSelector((states) => states)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(asyncPreloadProcess())
  }, [dispatch])

  const onLogout = () => {
    // @TODO: dispatch async action to sign out
    dispatch(asyncUnsetAuthUser())
    navigate('/')
  }

  if (isPreload) {
    return <Loading />
  }
  if (authUser === null) {
    return (
    <>
    <Loading />
      <Navigation />
      <section className="container-page">
        <Routes>
          <Route path="/*" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </section>
    </>
    )
  }

  return (
    <>
    <Loading />
      <Navigation
        authUser={authUser}
        onLogout={onLogout} />
      <section className="container-page">
        <Routes>
          <Route path="/" element={<ThreadsPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="/new" element={<AddThreadPage />} />
          <Route path="/threads/:id" element={<ThreadDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </section>
      <Footer />
    </>
  )
}

export default App
