import { getLeaderboards } from '../../../data/api/api'
import { showLoading, hideLoading } from '@dimasmds/react-redux-loading-bar'
import { showNotificationActionCreator } from '../notification/action'

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS'
}

function receiveLeaderboardsActionCreator (leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards
    }
  }
}

function asyncPopulateLeaderboards () {
  return async (dispatch) => {
    dispatch(showLoading())

    try {
      const leaderboards = await getLeaderboards()

      dispatch(receiveLeaderboardsActionCreator(leaderboards))
    } catch (error) {
      dispatch(showNotificationActionCreator({ message: error.message, type: 'error' }))
    }
    dispatch(hideLoading())
  }
}

export { ActionType, receiveLeaderboardsActionCreator, asyncPopulateLeaderboards }
