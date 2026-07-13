import "./SignUp.css";

function SignUp() {
  return (
    <section className="auth-screen" aria-label="Sign up screen">
      <div className="auth-box">
        <p className="auth-eyebrow">Create Account</p>
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Use your email and password to get started.</p>

        <form className="auth-form" noValidate>
          <label htmlFor="sign-up-email">Email</label>
          <input
            id="sign-up-email"
            type="email"
            name="email"
            placeholder="name@company.com"
            autoComplete="email"
          />

          <label htmlFor="sign-up-password">Password</label>
          <input
            id="sign-up-password"
            type="password"
            name="password"
            placeholder="Create password"
            autoComplete="new-password"
          />

          <button type="submit">Create Account</button>
        </form>
      </div>
    </section>
  );
}

export default SignUp;