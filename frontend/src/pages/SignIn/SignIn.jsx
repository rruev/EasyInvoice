import "./SignIn.css";

function SignIn() {
  return (
    <section className="auth-screen" aria-label="Sign in screen">
      <div className="auth-box">
        <p className="auth-eyebrow">Welcome Back</p>
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">Enter your account details to continue.</p>

        <form className="auth-form" noValidate>
          <label htmlFor="sign-in-email">Email</label>
          <input
            id="sign-in-email"
            type="email"
            name="email"
            placeholder="name@company.com"
            autoComplete="email"
          />

          <label htmlFor="sign-in-password">Password</label>
          <input
            id="sign-in-password"
            type="password"
            name="password"
            placeholder="Enter password"
            autoComplete="current-password"
          />

          <button type="submit">Sign In</button>
        </form>
      </div>
    </section>
  );
}

export default SignIn;