import "./SignUp.css";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRegisterSchema } from "../../schemas/user.schema";

import * as z from 'zod';


function SignUp() {
  const { signUp, isLoading, error, setError, fetchUser } = useUser();
  const { createClient } = useClient();
  const navigate = useNavigate();

  const [showBusinessName, setShowBusinessName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showBusinessAddress, setShowBusinessAddress] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signUp(formData);
    if (user) {
      await fetchUser();
      navigate('/');
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const form = e.target.form;
    const userEmail = form.elements['email'].value;
    form.elements['businessEmail'].value = userEmail;
    setShowBusinessAddress(true);
  }

  const handleChange = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };

    if (e.target.value.length === 0) {
      data[e.target.name] = undefined;
    }

    try {
      data = userRegisterSchema.parse(data);
      setError({ ...error, [e.target.name]: undefined });
      setDisabled(false);
    } catch (err) {
      const error = z.flattenError(err).fieldErrors;
      setError(error);
      setDisabled(true);
    }

    setFormData(data);
  };

  useEffect(() => {
    setError(null);
  }, []);

  return (
    <section className="auth-screen" aria-label="Sign up screen">
      <div className="auth-box">
        <p className="auth-eyebrow">Create Account</p>
        <h1 className="auth-title">Sign Up</h1>
        <p className="auth-subtitle">Create the user account first, then add the first client details.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="sign-up-email">User Email *</label>
          <input
            id="sign-up-email"
            type="email"
            name="email"
            placeholder="name@company.com"
            autoComplete="email"
            onChange={handleChange}
          />
          {error && error.email && <p className="auth-error">{error.email[0]}</p>}

          <label htmlFor="sign-up-password">Password *</label>
          <input
            id="sign-up-password"
            type="password"
            name="password"
            placeholder="Create password"
            autoComplete="new-password"
            onChange={handleChange}
          />
          {error && error.password && <p className="auth-error">{error.password[0]}</p>}

          <label htmlFor="sign-up-confirmPassword">Confirm Password *</label>
          <input
            id="sign-up-confirmPassword"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
            onChange={(e) => {
              setShowBusinessName(true); handleChange(e);
            }}
          />
          {error && error.confirmPassword && <p className="auth-error">{error.confirmPassword[0]}</p>}

          {showBusinessName && (
            <>
              <label htmlFor="sign-up-businessName">Business name</label>
              <input
                id="sign-up-businessName"
                type="text"
                name="businessName"
                placeholder="Business name"
                autoComplete="organization"
                onChange={(e) => { setShowEmail(true); handleChange(e); }}
              />
            </>
          )}
          {error && error.businessName && <p className="auth-error">{error.businessName[0]}</p>}

          {showEmail && (
            <>
              <label htmlFor="sign-up-businessEmail">Business email</label>
              <input
                id="sign-up-businessEmail"
                type="email"
                name="businessEmail"
                placeholder="Business email"
                autoComplete="email"
                onChange={(e) => { setShowBusinessAddress(true); handleChange(e); }}
              />
              <button type="button" onClick={handleClick} className="auth-button">Same as user email</button>
            </>
          )}
          {error && error.businessEmail && <p className="auth-error">{error.businessEmail[0]}</p>}

          {showBusinessAddress && (
            <>
              <label htmlFor="sign-up-businessAddress">Business address</label>
              <input
                id="sign-up-businessAddress"
                type="text"
                name="businessAddress"
                placeholder="Business address"
                autoComplete="street-address"
                onChange={(e) => { setShowPhoneNumber(true); handleChange(e); }}
              />
            </>
          )}
          {error && error.businessAddress && <p className="auth-error">{error.businessAddress[0]}</p>}

          {showPhoneNumber && (
            <>
              <label htmlFor="sign-up-phoneNumber">Phone number</label>
              <input
                id="sign-up-phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Phone number"
                autoComplete="tel"
                onChange={handleChange}
              />
            </>
          )}
          {error && error.phoneNumber && <p className="auth-error">{error.phoneNumber[0]}</p>}

          <button type="submit" disabled={disabled} className={disabled ? 'auth-button-disabled' : 'auth-button'}>Create Account</button>
        </form>
        {error && error.general && <p className="auth-error">{error.general}</p>}
      </div>
    </section>
  );
}

export default SignUp;