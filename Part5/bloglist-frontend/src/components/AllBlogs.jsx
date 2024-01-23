import Blog from './Blog.jsx'
import blogService from '../services/blogs.js'

const AllBlogs = ({ blogs, setError, setBlogs, loggedUser }) => {
  blogs.sort((a, b) => b.likes - a.likes)

  const handleLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, updatedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b: returnedBlog))
      }).catch(() => {
        setError('Like addition failed')
        setTimeout(() => {
          setError(null)
        }, 5000)
      }
      )
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          blogs={blogs}
          setBlogs={setBlogs}
          setError={setError}
          loggedUser={loggedUser}
          handleLike={handleLike}/>
      )}
    </div>
  )
}
export default AllBlogs