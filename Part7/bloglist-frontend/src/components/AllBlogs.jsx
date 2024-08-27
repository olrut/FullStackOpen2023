import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer.js'

const AllBlogs = ({ setError, loggedUser }) => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const handleLike = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        dispatch(
          setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)))
        )
      })
      .catch(() => {
        setError('Like addition failed')
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }
  if (!blogs) {
    return null
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setError={setError}
          loggedUser={loggedUser}
          handleLike={handleLike}
        />
      ))}
    </div>
  )
}
export default AllBlogs
