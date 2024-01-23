import blogService from '../services/blogs'

const DeleteButton = ({ blog, setBlogs, blogs, setError }) => {
  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      blogService.remove(blog.id)
        .then(() => {
          const copy = [...blogs]
          const updatedBlogs = copy.filter((b) => b.id !== blog.id)
          setBlogs(updatedBlogs)
        }
        ).catch(() => {
          setError('Like addition failed')
          setTimeout(() => {
            setError(null)
          }, 5000)
        }
        )
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>remove</button>
    </div>
  )
}

export default DeleteButton