import { useSelector } from 'react-redux'
import Table from 'react-bootstrap/Table'
import { Link } from 'react-router-dom'

const AllBlogs = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log(blogs)

  if (!blogs) {
    return null
  }

  return (
    <div>
      <Table striped bordered hover size="m">
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default AllBlogs
