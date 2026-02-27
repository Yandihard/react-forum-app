const BASE_URL = 'https://forum-api.dicoding.dev/v1'

/**
 * Register user
 */
async function register ({ name, email, password }) {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      name,
      email,
      password
    })
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.user
}

/**
 * Login user
 */
async function login ({ email, password }) {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.token
}

/**
 * Get own profile
 */
async function getOwnProfile () {
  const response = await fetch(`${BASE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.user
}

/**
 * CREATE THREAD
 */
async function createThread ({ title, body, category }) {
  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`
    },
    body: JSON.stringify({
      title,
      body,
      category
    })
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.thread
}

/**
 * GET ALL THREADS
 */
async function getAllThreads () {
  const response = await fetch(`${BASE_URL}/threads`)

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.threads
}

/**
 * GET ALL USERS
 */
async function getAllUsers () {
  const response = await fetch(`${BASE_URL}/users`)

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.users
}

/**
 * GET DETAIL THREAD
 */
async function getDetailThread (threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`)

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.detailThread
}

async function upVoteThread (threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.vote
}

async function downVoteThread (threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.vote
}

async function neutralVoteThread (threadId) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getAccessToken()}`
    }
  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.vote
}

async function getLeaderboards () {
  const response = await fetch(`${BASE_URL}/leaderboards`)

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.leaderboards
}

async function upVoteComment ({ threadId, commentId }) {
  const token = getAccessToken()

  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const responseJson = await response.json()

  const { status } = responseJson

  if (status !== 'success') {
    throw new Error('Failed to upvote comment')
  }
}

async function downVoteComment ({ threadId, commentId }) {
  const token = getAccessToken()

  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const responseJson = await response.json()

  const { status } = responseJson

  if (status !== 'success') {
    throw new Error('Failed to downvote comment')
  }
}

async function neutralVoteComment ({ threadId, commentId }) {
  const token = getAccessToken()

  const response = await fetch(
    `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
    {
      method: 'POST',

      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  const responseJson = await response.json()

  const { status } = responseJson

  if (status !== 'success') {
    throw new Error('Failed to neutralize vote')
  }
}

async function createComment ({ threadId, content }) {
  const response = await fetch(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getAccessToken()}`
    },

    body: JSON.stringify({
      content
    })

  })

  const responseJson = await response.json()

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message)
  }

  return responseJson.data.comment
}

/**
 * Simpan token ke localStorage
 */
function putAccessToken (token) {
  localStorage.setItem('accessToken', token)
}

/**
 * Hapus token dari localStorage
 */
function clearAccessToken () {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('userProfile')
}

/**
 * Ambil token dari localStorage
 */
function getAccessToken () {
  return localStorage.getItem('accessToken')
}

function putUserProfile (user) {
  localStorage.setItem('userProfile', JSON.stringify(user))
}

function getUserProfile () {
  const user = localStorage.getItem('userProfile')
  return JSON.parse(user)
}

export {
  getLeaderboards,
  getAllUsers,
  register,
  login,
  getOwnProfile,
  putAccessToken,
  getAccessToken,
  clearAccessToken,
  putUserProfile,
  getUserProfile,
  createThread,
  getAllThreads,
  getDetailThread,
  upVoteThread,
  downVoteThread,
  neutralVoteThread,
  upVoteComment,
  downVoteComment,
  neutralVoteComment,
  createComment
}
