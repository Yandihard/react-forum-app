const ActionType = {
  SHOW_NOTIFICATION: 'SHOW_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION'
}

function showNotificationActionCreator ({ message, type = 'error' }) {
  return {
    type: ActionType.SHOW_NOTIFICATION,
    payload: {
      message,
      type
    }
  }
}

function hideNotificationActionCreator () {
  return {
    type: ActionType.HIDE_NOTIFICATION
  }
}

function notificationReducer (notification = null, action = {}) {
  switch (action.type) {
    case ActionType.SHOW_NOTIFICATION:
      return action.payload
    case ActionType.HIDE_NOTIFICATION:
      return null
    default:
      return notification
  }
}

export { ActionType, showNotificationActionCreator, hideNotificationActionCreator, notificationReducer }
