import "./SignIn.css";

import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { signIn, isLoading, error, fetchUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await signIn({ email, password });

    if (user) {
      await fetchUser();
      navigate('/');
    }
  };

  return (
    <section className="auth-screen" aria-label="Sign in screen">
      <div className="auth-box">
        <p className="auth-eyebrow">Welcome Back</p>
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">Enter your account details to continue.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="sign-in-email">Email</label>
          <input
            id="sign-in-email"
            type="email"
            name="email"
            placeholder="name@company.com"
            autoComplete="email"
          />
          {error && error.email && <p className="auth-error">{error.email[0]}</p>}

          <label htmlFor="sign-in-password">Password</label>
          <input
            id="sign-in-password"
            type="password"
            name="password"
            placeholder="Enter password"
            autoComplete="current-password"
          />
          {error && error.password && <p className="auth-error">{error.password[0]}</p>}

          <button type="submit">Sign In</button>
        </form>
        {error && error.general && <p className="auth-error">{error.general}</p>}
      </div>
    </section>
  );
}

export default SignIn;