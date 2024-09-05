import DeleteButton from './DeleteButton.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, likeBlog } from '../reducers/blogReducer.js'
import { Link, useParams } from 'react-router-dom'

const Blog = (setError, setBlogs, loggedUser) => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id

  const blog = blogs ? blogs.find((blog) => blog.id === id) : null
  if (!blog) {
    return null
  }

  const handleLike = async () => {
    dispatch(likeBlog(blog.id))
  }

  const handleComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    dispatch(commentBlog(blog.id, comment))
    console.log(comment)
  }

  return (
    <div className={'blog'}>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <Link to={blog.url}>{blog.url}</Link>
      <br />
      {blog.likes} likes <button onClick={() => handleLike()}>like</button>
      <br />
      Added by {blog.user.name}
      {loggedUser && blog.user.username === loggedUser.username ? (
        <DeleteButton blog={blog} />
      ) : null}
      <form onSubmit={handleComment}>
        <h2>comments</h2>
        <input type="text" id="comment" />
        <button type="submit">add comment</button>
      </form>
      <div>
        {blog.comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  )
}

export default Blog
