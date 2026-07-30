import "./SignUp.css";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { userRegisterSchema } from "../../schemas/user.schema";

import * as z from 'zod';
import { formatIban } from "../../utils/formatFormData";

function SignUp() {
  const { signUp, isLoading, error, setError, fetchUser } = useUser();
  const { createClient } = useClient();
  const navigate = useNavigate();

  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({});
  const isSubmitDisabled = disabled || isLoading;

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
    setFormData({ ...formData, businessEmail: userEmail });
  }

  const handleChange = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };

    if (e.target.value.length === 0) {
      data[e.target.name] = undefined;
    }

    try {
      if (e.target.name === "iban" && e.target.value.length > 0) {
        e.target.value = formatIban(e.target.value);
        data[e.target.name] = e.target.value;
      }

      data = userRegisterSchema.parse(data);
      setError({});
      setDisabled(false);
    } catch (err) {
      const fieldErrors = z.flattenError(err).fieldErrors;
      setError(fieldErrors);
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
        <p className="auth-subtitle">Create your account first. You can add business details later if you want.</p>

        <form className="auth-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="sign-up-email">User Email *</label>
          <input
            id="sign-up-email"
            type="email"
            name="email"
            placeholder="name@company.com"
            autoComplete="email"
            readOnly={isLoading}
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
            readOnly={isLoading}
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
            readOnly={isLoading}
            onChange={handleChange}
          />
          {error && error.confirmPassword && <p className="auth-error">{error.confirmPassword[0]}</p>}

          <div className="optional-details">
            <button
              type="button"
              className="optional-details__toggle"
              onClick={() => setShowOptionalDetails((prev) => !prev)}
              aria-expanded={showOptionalDetails}
            >
              {showOptionalDetails ? "Hide business details" : "Add business details (optional)"}
            </button>
            <p className="optional-details__hint">You can add this later. By adding them now you can have them already prefilled for your next invoice.</p>

            {showOptionalDetails && (
              <div className="optional-details__fields">
                <label htmlFor="sign-up-businessName">Business name</label>
                <input
                  id="sign-up-businessName"
                  type="text"
                  name="businessName"
                  placeholder="Business name"
                  autoComplete="organization"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.businessName && <p className="auth-error">{error.businessName[0]}</p>}

                <label htmlFor="sign-up-businessEmail">Business email</label>
                <input
                  id="sign-up-businessEmail"
                  type="email"
                  name="businessEmail"
                  placeholder="Business email"
                  autoComplete="email"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                <button type="button" onClick={handleClick} className="auth-secondary-button" disabled={isLoading}>
                  Use account email
                </button>
                {error && error.businessEmail && <p className="auth-error">{error.businessEmail[0]}</p>}

                <label htmlFor="sign-up-businessAddress">Business address</label>
                <input
                  id="sign-up-businessAddress"
                  type="text"
                  name="businessAddress"
                  placeholder="Business address"
                  autoComplete="street-address"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.businessAddress && <p className="auth-error">{error.businessAddress[0]}</p>}

                <label htmlFor="sign-up-phoneNumber">Phone number</label>
                <input
                  id="sign-up-phoneNumber"
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone number"
                  autoComplete="tel"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.phoneNumber && <p className="auth-error">{error.phoneNumber[0]}</p>}

                <label htmlFor="sign-up-bankName">Bank Name</label>
                <input
                  id="sign-up-bankName"
                  type="text"
                  name="bankName"
                  placeholder="Bank Name"
                  autoComplete="organization"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.bankName && <p className="auth-error">{error.bankName[0]}</p>}

                <label htmlFor="sign-up-bic">BIC/SWIFT</label>
                <input
                  id="sign-up-bic"
                  type="text"
                  name="bic"
                  placeholder="BIC/SWIFT"
                  autoComplete="off"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.bic && <p className="auth-error">{error.bic[0]}</p>}

                <label htmlFor="sign-up-iban">IBAN</label>
                <input
                  id="sign-up-iban"
                  type="text"
                  name="iban"
                  placeholder="IBAN"
                  autoComplete="off"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.iban && <p className="auth-error">{error.iban[0]}</p>}

                <label htmlFor="sign-up-taxId">TAX ID / Steuernummer</label>
                <input
                  id="sign-up-taxId"
                  type="text"
                  name="taxId"
                  placeholder="TAX ID / Steuernummer"
                  autoComplete="off"
                  readOnly={isLoading}
                  onChange={handleChange}
                />
                {error && error.taxId && <p className="auth-error">{error.taxId[0]}</p>}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={isSubmitDisabled ? "auth-button-disabled" : "auth-button"}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="auth-loading-content">
                <span className="auth-spinner" aria-hidden="true" />
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        {error && error.general && <p className="auth-error">{error.general}</p>}
      </div>
    </section>
  );
}

export default SignUp;