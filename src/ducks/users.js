import axios from 'axios'

export const FETCH_USERS = 'FETCH_USERS'
export const SET_LOCATION = 'SET_LOCATION'
export const START_LOADING = 'START_LOADING'
export const END_LOADING = 'END_LOADING'
export const ERROR = 'ERROR'

const baseUrl = `https://api.github.com/`

export function setLocation(location) {
  return {
    type: SET_LOCATION,
    payload: {
      location
    }
  }
}

const prepareUser = (user, { data: repos }) => {
  user.data.stars = repos.reduce((acc, repo) => {
    return (acc += repo.stargazers_count)
  }, 0)

  return user.data
}

export const fetchUsers = location => async dispatch => {
  dispatch({
    type: START_LOADING
  })

  const apiUrl = `${baseUrl}search/users?q=location%3A${location}&sort=stars`

  try {
    const usersData = await axios(apiUrl)

    const promises = usersData.data.items
      .slice(0, 10)
      .map(item => axios(`${baseUrl}users/${item.login}`))
    const users = await Promise.all(promises)

    const repoPromises = users.map(user =>
      axios(`${baseUrl}users/${user.data.login}/repos`)
    )
    const repos = await Promise.all(repoPromises)
    const usersWithStars = users.map((user, i) => prepareUser(user, repos[i]))

    dispatch({
      type: FETCH_USERS,
      payload: {
        users: usersWithStars
      }
    })
  } catch (e) {
    dispatch({
      type: ERROR,
      payload: {
        error: e
      }
    })
  }

  dispatch({
    type: END_LOADING
  })
}

const defaultState = {
  location: 'biysk',
  users: null,
  loading: false,
  error: null
}

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    case SET_LOCATION:
      return { ...state, location: payload.location }
    case START_LOADING:
      return { ...state, loading: true }
    case END_LOADING:
      return { ...state, loading: false }
    case FETCH_USERS:
      return { ...state, users: payload.users, error: null }
    case ERROR:
      return { ...state, error: payload.error }
    default:
      return state
  }

  return state
}
