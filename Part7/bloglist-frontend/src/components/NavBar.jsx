import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/userReducer.js'
import { Container, Nav, Navbar } from 'react-bootstrap'

const NavBar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand to="/">Blog App</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Blogs
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            Users
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link onClick={handleLogout}>logout</Nav.Link>
              <Nav.Link className="nav-link disabled">
                {user.name} logged in{' '}
              </Nav.Link>
            </>
          ) : (
            <Nav.Link as={Link} className="nav-link" to="/">
              Login
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavBar
