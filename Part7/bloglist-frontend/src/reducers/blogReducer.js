import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import { newNotification } from './notificationReducer.js'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const blog = state.find((b) => b.id === action.payload.id)
      if (blog) {
        blog.likes = action.payload.likes
      }
      return state.sort((a, b) => b.likes - a.likes)
    },
  },
})

export const { setBlogs, appendBlog, addLike } = blogSlice.actions

export const setupBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    } catch (error) {
      console.error('Blog fetching failed:', error)
      dispatch(newNotification('Blog fetching failed', 5))
    }
  }
}

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      dispatch(appendBlog(returnedBlog))
      dispatch(
        newNotification(
          `A new blog "${blogObject.title}" by ${blogObject.author} added`,
          5
        )
      )
    } catch (error) {
      console.error('Blog creation failed:', error)
      dispatch(newNotification('Blog creation failed', 5))
    }
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      dispatch(addLike(returnedBlog))
    } catch (error) {
      console.error('Like addition failed:', error)
      dispatch(newNotification('Like addition failed', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      await blogService.remove(id)
      dispatch(setBlogs(getState().blogs.filter((blog) => blog.id !== id)))
      dispatch(newNotification('Blog deleted', 5))
    } catch (error) {
      console.error('Blog deletion failed:', error)
      dispatch(newNotification('Blog deletion failed', 5))
    }
  }
}

export default blogSlice.reducer
