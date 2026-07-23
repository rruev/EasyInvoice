import "./BusinessProfile.css";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";

function BusinessProfile() {
    const { userData } = useUser();

    const [readOnly, setReadOnly] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Handle form submission logic here

        setReadOnly(true);
    };

    return (
        <section className="business-profile" aria-label="Business profile page">
            <div className="business-profile__card">
                <div className="business-profile__header">
                    <div>
                        <p className="business-profile__eyebrow">Business Profile</p>
                        <h2 className="business-profile__title">User Information</h2>
                        <p className="business-profile__subtitle">
                            Review your account details and manage your profile.
                        </p>
                    </div>

                    <span className="business-profile__status">Active account</span>
                </div>

                <form className="business-profile__grid" onSubmit={handleSubmit}>
                    <article className="profile-field">
                        <label className="profile-field__label">Full name</label>
                        <input className="profile-field__value" value={userData?.fullName || "-"} readOnly={readOnly} />
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Email</label>
                        <input className="profile-field__value" value={userData?.email || "-"} readOnly={readOnly} />
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Business name</label>
                        <input className="profile-field__value" value={userData?.businessName || "-"} readOnly={readOnly} />
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Business email</label>
                        <input className="profile-field__value" value={userData?.businessEmail || "-"} readOnly={readOnly} />
                    </article>

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">Business address</label>
                        <input className="profile-field__value" value={userData?.businessAddress || "-"} readOnly={readOnly} />
                    </article>

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">Phone number</label>
                        <input className="profile-field__value" value={userData?.phoneNumber || "-"} readOnly={readOnly} />
                    </article>
                </form>

                <div className="business-profile__actions">
                    {readOnly ? (
                        <button type="button" className="business-profile__button business-profile__button--edit" onClick={() => setReadOnly(!readOnly)}>
                            Edit User
                        </button>

                    ) : (
                        <button type="submit" className="business-profile__button business-profile__button--save" disabled={readOnly}>
                            Save Changes
                        </button>
                    )}
                    <button type="button" className="business-profile__button business-profile__button--delete">
                        Delete User
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BusinessProfile;
