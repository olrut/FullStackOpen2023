import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import loginService from '../services/loginService.js'
import { setNotification } from './notificationReducer.js'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const setupUser = () => (dispatch) => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    dispatch(setUser(user))
    blogService.setToken(user.token)
  }
}

export const login =
  ({ username, password }) =>
  async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } catch (exception) {
      setNotification('Wrong username or password')
      setTimeout(() => {}, 5000)
    }
  }

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  dispatch(setUser(null))
}

export default userSlice.reducer
