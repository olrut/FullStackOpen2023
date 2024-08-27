import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm.jsx'
import LogoutButton from './components/LogOutButton.jsx'
import NewBlog from './components/NewBlog.jsx'
import Notification from './components/Notification.jsx'
import Error from './components/Error.jsx'
import Toggable from './components/Toggable.jsx'
import AllBlogs from './components/AllBlogs.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setupBlogs } from './reducers/blogReducer.js'
import { login, setupUser } from './reducers/userReducer.js'

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
    <div>
      <h2>blogs</h2>
      {user && (
        <div>
          <p>
            {user.name} logged in <LogoutButton />
          </p>
        </div>
      )}
      <Notification />
      <Error message={error} />
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
  )
}

export default App
