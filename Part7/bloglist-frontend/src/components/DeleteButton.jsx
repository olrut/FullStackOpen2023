import { deleteBlog } from '../reducers/blogReducer.js'
import { useDispatch } from 'react-redux'

const DeleteButton = ({ blog }) => {
  const dispatch = useDispatch()

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div>
      <button onClick={handleDelete}>remove</button>
    </div>
  )
}

export default DeleteButton
