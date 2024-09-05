const LoginForm = ({ handleSignIn }) => {
  return (
    <>
      <form onSubmit={handleSignIn}>
        <div className="mb-3">
          <h3>Sign in</h3>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            className="form-control"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-control"
          />
          <button type="submit" id="login-button" className="btn btn-primary">
            login
          </button>
        </div>
      </form>
    </>
  )
}

export default LoginForm
