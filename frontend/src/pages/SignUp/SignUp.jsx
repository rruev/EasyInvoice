import "./SignUp.css";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { signUp, isLoading, error, setError } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user = await signUp({ email, password, confirmPassword });
      if (user) {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to create account');
    }
  };

  return (
    <section className="auth-screen" aria-label="Sign up screen">
      <div className="auth-box">
        <p className="auth-eyebrow">Create Account</p>
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Use your email and password to get started.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
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

          <label htmlFor="sign-up-confirmPassword">Confirm Password</label>
          <input
            id="sign-up-confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
          />

          <button type="submit">Create Account</button>
        </form>
        <div>{error && <p className="auth-error">{error}</p>}</div>
      </div>
    </section>
  );
}

export default SignUp;