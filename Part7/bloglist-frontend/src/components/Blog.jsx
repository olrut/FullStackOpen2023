import { useState } from 'react'
import DeleteButton from './DeleteButton.jsx'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer.js'

const Blog = ({ blog, setError, blogs, setBlogs, loggedUser }) => {
  const dispatch = useDispatch()

  const [showDetails, setShowDetails] = useState(false)
  const show = () => {
    setShowDetails(!showDetails)
  }

  const handleLike = async (id) => {
    dispatch(likeBlog(id))
  }
  console.log(blog)
  console.log(loggedUser)
  return (
    <div className={'blog'}>
      {blog.title} {blog.author}
      {showDetails && (
        <div>
          {blog.url}
          <br />
          Likes {blog.likes}
          <br />
          <button onClick={() => handleLike(blog.id)}>like</button>
          <br />
          {blog.user.name}
          {loggedUser && blog.user.username === loggedUser.username ? (
            <DeleteButton
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              setError={setError}
            />
          ) : null}
        </div>
      )}
      {showDetails ? (
        <button onClick={show}>hide</button>
      ) : (
        <button onClick={show}>view</button>
      )}
    </div>
  )
}

export default Blog
