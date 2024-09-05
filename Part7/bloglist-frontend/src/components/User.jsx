import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const blogs = useSelector((state) => state.blogs)
  const users = blogs ? blogs.map((b) => b.user) : []
  const uniqueUsers = users.filter(
    (value, index, self) => self.map((x) => x.id).indexOf(value.id) === index
  )

  const id = useParams().id
  const user = uniqueUsers.find((n) => n.id === String(id))
  const userBlogs = blogs.filter((b) => b.user.id === String(id))

  return (
    <div>
      <h1>{user ? user.name : null}</h1>
      <h2>added blogs</h2>
      <ul>
        {userBlogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default User
