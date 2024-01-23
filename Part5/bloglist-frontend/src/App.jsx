import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/loginService.js'
import LoginForm from './components/LoginForm.jsx'
import LogoutButton from './components/LogOutButton.jsx'
import NewBlog from './components/NewBlog.jsx'
import Notification from './components/Notification.jsx'
import Error from './components/Error.jsx'
import Toggable from './components/Toggable.jsx'
import AllBlogs from './components/AllBlogs.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleSignIn = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (exception) {
      setError('Wrong credentials')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const createBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
      user: {
        username: user.username,
      }
    }
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        event.target.title.value = ''
        event.target.author.value = ''
        event.target.url.value = ''
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }).catch(() => {
        setNotification('Blog creation failed')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  return (
    <div>
      <h2>blogs</h2>
      {user && <div>
        <p>{user.name} logged in <LogoutButton setUser={setUser}/></p>
      </div>}
      <Notification message={notification}/>
      <Error message={error}/>
      {!user && <LoginForm handleSignIn={handleSignIn}/>}
      {user && <div>
        <Toggable buttonLabel='new blog'>
          <NewBlog blogs={blogs} setBlogs={setBlogs} setNotification={setNotification}
            user={user.username} createBlog={createBlog}/>
        </Toggable>
      </div>
      }
      <div>
        <AllBlogs blogs={blogs} setError={setError} setBlogs={setBlogs} loggedUser={user}/>
      </div>
    </div>
  )
}

export default App