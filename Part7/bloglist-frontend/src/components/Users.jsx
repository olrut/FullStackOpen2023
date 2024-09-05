import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = () => {
  const blogs = useSelector((state) => state.blogs)
  const users = blogs ? blogs.map((b) => b.user) : []
  const uniqueUsers = users.filter(
    (value, index, self) => self.map((x) => x.id).indexOf(value.id) === index
  )

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {uniqueUsers
            ? uniqueUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <Link to={`/users/${u.id}`}>{u.name}</Link>
                  </td>
                  <td>{u.blogs ? u.blogs.length : 0} </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    </div>
  )
}

export default Users
