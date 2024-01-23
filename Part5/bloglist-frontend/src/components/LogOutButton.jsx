const LogoutButton = (props) => {

  const handleLogout = () => {
    window.localStorage.clear()
    props.setUser(null)
  }
  return (
    <button onClick={handleLogout}>
            Logout
    </button>
  )
}
export default LogoutButton
