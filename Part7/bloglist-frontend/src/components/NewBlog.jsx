import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer.js'

const NewBlog = () => {
  const dispatch = useDispatch()
  const handleCreateBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
      likes: 0,
    }
    dispatch(addBlog(blogObject))
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <form onSubmit={handleCreateBlog}>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title:
        </label>
        <input
          type="text"
          className="form-control"
          name="title"
          placeholder="Title"
          id="title"
        />
        <label htmlFor="Author" className="form-label">
          Author:
        </label>
        <input
          type="text"
          className="form-control"
          name="author"
          placeholder="Author"
          id="author"
        />
        <label htmlFor="url" className="form-label">
          URL:
        </label>
        <input
          type="text"
          className="form-control"
          name="url"
          placeholder="URL"
          id="url"
        />
        <button
          id="create-blog-submit"
          type="submit"
          className="btn btn-primary"
        >
          Create
        </button>
      </div>
    </form>
  )
}
export default NewBlog
