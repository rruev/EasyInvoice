import "./SignUp.css";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";


function SignUp() {
  const { signUp, isLoading, error, setError } = useUser();
  const { createClient } = useClient();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const user = await signUp(formData);
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
        <p className="auth-subtitle">Create the user account first, then add the first client details.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="sign-up-email">User Email</label>
          <input
            id="sign-up-email"
            type="email"
            name="email"
            placeholder="name@company.com"
            autoComplete="email"
          />

          <label htmlFor="sign-up-name">First Client Name</label>
          <input
            id="sign-up-name"
            type="text"
            name="name"
            placeholder="Client name"
            autoComplete="name"
          />

          <label htmlFor="sign-up-phone">First Client Phone</label>
          <input
            id="sign-up-phone"
            type="tel"
            name="phone"
            placeholder="+1 555 123 4567"
            autoComplete="tel"
          />

          <label htmlFor="sign-up-street">First Client Street</label>
          <input
            id="sign-up-street"
            type="text"
            name="street"
            placeholder="Main Street"
            autoComplete="address-line1"
          />

          <label htmlFor="sign-up-street-number">First Client Street Number</label>
          <input
            id="sign-up-street-number"
            type="text"
            name="streetNumber"
            placeholder="12"
            autoComplete="address-line2"
          />

          <label htmlFor="sign-up-postcode">First Client Postcode</label>
          <input
            id="sign-up-postcode"
            type="text"
            name="postcode"
            placeholder="10001"
            autoComplete="postal-code"
          />

          <label htmlFor="sign-up-city">First Client City</label>
          <input
            id="sign-up-city"
            type="text"
            name="city"
            placeholder="New York"
            autoComplete="address-level2"
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
        {error && <p className="auth-error">{error}</p>}
      </div>
    </section>
  );
}

export default SignUp;