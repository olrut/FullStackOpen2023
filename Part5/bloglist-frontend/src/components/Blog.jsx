import { useState } from 'react'
import DeleteButton from './DeleteButton.jsx'

const Blog = ({ blog, setError, blogs, setBlogs, loggedUser, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)
  const show = () => {
    setShowDetails(!showDetails)
  }

  return (
    <div className={'blog'}>
      {blog.title} {blog.author}
      {showDetails &&
                <div>
                  {blog.url}<br/>
                  Likes {blog.likes}
                  <button onClick={() => handleLike(blog.id)}>like</button>
                  {blog.user.name}
                  {loggedUser && blog.user.username === loggedUser.user ? (
                    <DeleteButton
                      blog={blog}
                      blogs={blogs}
                      setBlogs={setBlogs}
                      setError={setError}/>
                  ) : null}
                </div>
      }
      {showDetails ?
        <button onClick={show}>hide</button>
        :
        <button onClick={show}>view</button>}
    </div>
  )
}

export default Blog