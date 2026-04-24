import Navigation from './presentation/components/Navigation'
import Footer from './presentation/components/Footer'
import LoginPage from './presentation/pages/LoginPage'
import RegisterPage from './presentation/pages/RegisterPage'
import LeaderboardsPage from './presentation/pages/LeaderboardsPage'
import ThreadsPage from './presentation/pages/ThreadsPage'
import AddThreadPage from './presentation/pages/AddThreadPage'
import ThreadDetailPage from './presentation/pages/ThreadDetailPage'
import ProfilePage from './presentation/pages/ProfilePage'
import NotFoundPage from './presentation/pages/NotFoundPage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { asyncPreloadProcess } from './application/store/isPreload/action'
import { asyncUnsetAuthUser } from './application/store/authUser/action'
import Loading from './presentation/components/Loading'
import GlobalLoadingOverlay from './presentation/components/GlobalLoadingOverlay'
import ModernNotification from './presentation/components/ModernNotification'

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
    dispatch(asyncUnsetAuthUser())
    navigate('/')
  }

  if (isPreload) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans transition-colors duration-300">
      {/* Top gradient line loading indicator */}
      <Loading />
      
      {/* Global loading popup for async actions */}
      <GlobalLoadingOverlay />

      {/* Global modern notification popup */}
      <ModernNotification />

      {/* Navigation bar - only shown when logged in */}
      {authUser !== null && (
        <Navigation authUser={authUser} onLogout={onLogout} />
      )}

      {/* Main content area */}
      <main className={`w-full flex justify-center items-start min-h-screen ${
        authUser !== null 
          ? 'pt-20 pb-20 sm:pb-8' 
          : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900'
      }`}>
        {authUser === null ? (
          /* Auth pages: centered vertically and horizontally */
          <div className="w-full flex items-center justify-center min-h-screen px-4">
            <Routes>
              <Route path="/*" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<ThreadsPage />} />
            <Route path="/leaderboards" element={<LeaderboardsPage />} />
            <Route path="/new" element={<AddThreadPage />} />
            <Route path="/threads/:id" element={<ThreadDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>

      {/* Bottom footer navigation - only shown when logged in */}
      {authUser !== null && <Footer />}
    </div>
  )
}

export default App
