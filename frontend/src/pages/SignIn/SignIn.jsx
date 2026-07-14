import "./SignIn.css";

import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const { signIn, isLoading, error, setError, fetchUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const user = await signIn({ email, password });
      if (user) {
        await fetchUser();
        navigate('/');
      }
    } catch (err) {
      setError('Failed to sign in');
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
        {error && <p className="auth-error">{error}</p>}
      </div>
    </section>
  );
}

export default SignIn;