import "./SignUp.css";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function SignUp() {
  const { signUp, isLoading, error, setError } = useUser();
  const { createClient } = useClient();
  const navigate = useNavigate();

  const [showBusinessName, setShowBusinessName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showBusinessAddress, setShowBusinessAddress] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [disabled, setDisabled] = useState(false);

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

  const handleClick = (e) => {
    e.preventDefault();
    const form = e.target.form;
    const userEmail = form.elements['email'].value;
    form.elements['businessEmail'].value = userEmail;
    setShowBusinessAddress(true);
  }

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
            onChange={(e) => setShowBusinessName(e.target.value.length > 0)}
          />
          {showBusinessName && (
            <>
              <label htmlFor="sign-up-confirmPassword">Business name</label>
              <input
                id="sign-up-confirmPassword"
                type="text"
                name="businessName"
                placeholder="Business name"
                autoComplete="organization"
                onChange={(e) => setShowEmail(e.target.value.length > 0)}
              />
            </>
          )}

          {showEmail && (
            <>
              <label htmlFor="sign-up-businessEmail">Business email</label>
              <input
                id="sign-up-businessEmail"
                type="email"
                name="businessEmail"
                placeholder="Business email"
                autoComplete="email"
                onChange={(e) => setShowBusinessAddress(e.target.value.length > 0)}
              />
              <button type="button" onClick={handleClick}>Same as user email</button>
            </>
          )}

          {showBusinessAddress && (
            <>
              <label htmlFor="sign-up-businessAddress">Business address</label>
              <input
                id="sign-up-businessAddress"
                type="text"
                name="businessAddress"
                placeholder="Business address"
                autoComplete="street-address"
                onChange={(e) => setShowPhoneNumber(e.target.value.length > 0)}
              />
            </>
          )}

          {showPhoneNumber && (
            <>
              <label htmlFor="sign-up-phoneNumber">Phone number</label>
              <input
                id="sign-up-phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                autoComplete="tel"
              />
            </>
          )}
          <button type="submit">Create Account</button>
        </form>
        {error && <p className="auth-error">{error}</p>}
      </div>
    </section>
  );
}

export default SignUp;