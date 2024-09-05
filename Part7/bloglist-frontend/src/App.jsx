import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import NewBlog from './components/NewBlog.jsx'
import Notification from './components/Notification.jsx'
import Error from './components/Error.jsx'
import Toggable from './components/Toggable.jsx'
import AllBlogs from './components/AllBlogs.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setupBlogs } from './reducers/blogReducer.js'
import { login, setupUser } from './reducers/userReducer.js'
import { Route, Routes } from 'react-router-dom'
import Users from './components/Users.jsx'
import User from './components/User.jsx'
import Blog from './components/Blog.jsx'
import NavBar from './components/NavBar.jsx'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [error, setError] = useState(null)

  useEffect(() => {
    dispatch(setupUser())
    dispatch(setupBlogs())
  }, [])

  const handleSignIn = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(login({ username, password }))
  }

  return (
    <div className="container">
      <NavBar />
      <h2>Blog app</h2>
      <Routes>
        <Route path="/users" element={<Users></Users>} />
        <Route path="/users/:id" element={<User />} />
        <Route
          path="/"
          element={
            <div>
              {!user && <LoginForm handleSignIn={handleSignIn} />}
              {user && (
                <div>
                  <Toggable buttonLabel="new blog">
                    <NewBlog user={user} />
                  </Toggable>
                </div>
              )}
              <div>
                <AllBlogs setError={setError} loggedUser={user} />
              </div>
            </div>
          }
        />
        <Route
          path="/blogs/:id"
          element={<Blog setError={setError} loggedUser={user} />}
        />
      </Routes>
      <Notification />
      <Error message={error} />
    </div>
  )
}

export default App
