import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer.js'

const NewBlog = (user) => {
  const dispatch = useDispatch()
  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
      user: {
        username: user.username,
      },
    }
    dispatch(addBlog(blogObject))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <form onSubmit={handleCreateBlog}>
        title:
        <input type="text" name="title" placeholder="title" id="title" />
        author:
        <input type="text" name="author" placeholder="author" id="author" />
        url:
        <input type="text" name="url" placeholder="url" id="url" />
        <button id="create-blog-submit" type="submit">
          create
        </button>
      </form>
    </div>
  )
}
export default NewBlog
