import { configureStore } from '@reduxjs/toolkit'
import authUserReducer from './authUser/reducer'
import isPreloadReducer from './isPreload/reducer'
import threadsReducer from './threads/reducer'
import usersReducer from './users/reducer'
import leaderboardsReducer from './leaderboards/reducer'
import detailThreadReducer from './threadDetail/reducer'
import { loadingBarReducer } from '@dimasmds/react-redux-loading-bar'
import { notificationReducer } from './notification/action'

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadsReducer,
    users: usersReducer,
    leaderboards: leaderboardsReducer,
    detailThread: detailThreadReducer,
    loadingBar: loadingBarReducer,
    notification: notificationReducer
  }
})

export default store
