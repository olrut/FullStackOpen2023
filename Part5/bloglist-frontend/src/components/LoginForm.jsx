const LoginForm = ({ handleSignIn }) => {
  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSignIn}>
        <div>
          username
          <input
            id="username"
            type="text"
            name="username"
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            name="password"
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm