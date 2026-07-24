import "./BusinessProfile.css";
import * as z from "zod";

import { useUser } from "../../hooks/useUser";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userUpdateSchema } from "../../../../backend/src/schemas/user.schema";

function BusinessProfile() {
    const { userData, fetchUser, error, setError, updateUser, deleteUser } = useUser();
    const navigate = useNavigate();

    const [readOnly, setReadOnly] = useState(true);
    const [formData, setFormData] = useState({
        fullName: userData?.fullName || undefined,
        email: userData?.email || undefined,
        businessName: userData?.businessName || undefined,
        businessAddress: userData?.businessAddress || undefined,
        businessEmail: userData?.businessEmail || undefined,
        phoneNumber: userData?.phoneNumber || undefined,
    });

    const form = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(formData);
            await fetchUser();
            setReadOnly(true);
        } catch (error) {
            console.error("Failed to update user:", error);
            setError(error || { general: ["Failed to update user."] });
        }

    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser();
            await fetchUser();
            navigate("/");
        } catch (error) {
            console.error("Failed to delete user:", error);
            setError(error.errors || { general: ["Failed to delete user."] });
        }
    };

    const handleChange = (e) => {
        let data = { ...formData, [e.target.name]: e.target.value };

        if (e.target.value.length === 0) {
            data[e.target.name] = undefined;
        }
        
        try {
            data = userUpdateSchema.parse(data);
            setError({});
        } catch (error) {
            const errors = z.flattenError(error).fieldErrors;
            console.error("Invalid form data:", errors);
            setError(errors);
        }
        setFormData(data);
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

                <form id="business-profile-form" ref={form} className="business-profile__grid" onSubmit={handleSubmit}>

                    <article className="profile-field">
                        <label className="profile-field__label">Full name</label>
                        <input className="profile-field__value" name="fullName" defaultValue={userData?.fullName} readOnly={readOnly} onChange={handleChange} />
                        {error?.fullName && <p className="profile-field__error">{error.fullName[0]}</p>}
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Email</label>
                        <input className="profile-field__value" name="email" defaultValue={userData?.email} readOnly={readOnly} onChange={handleChange} />
                        {error?.email && <p className="profile-field__error">{error.email[0]}</p>}
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Business name</label>
                        <input className="profile-field__value" name="businessName" defaultValue={userData?.businessName} readOnly={readOnly} onChange={handleChange} />
                        {error?.businessName && <p className="profile-field__error">{error.businessName[0]}</p>}
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Business email</label>
                        <input className="profile-field__value" name="businessEmail" defaultValue={userData?.businessEmail} readOnly={readOnly} onChange={handleChange} />
                        {error?.businessEmail && <p className="profile-field__error">{error.businessEmail[0]}</p>}
                    </article>

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">Business address</label>
                        <input className="profile-field__value" name="businessAddress" defaultValue={userData?.businessAddress} readOnly={readOnly} onChange={handleChange} />
                        {error?.businessAddress && <p className="profile-field__error">{error.businessAddress[0]}</p>}
                    </article>

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">Phone number</label>
                        <input className="profile-field__value" name="phoneNumber" defaultValue={userData?.phoneNumber} readOnly={readOnly} onChange={handleChange} />
                        {error?.phoneNumber && <p className="profile-field__error">{error.phoneNumber[0]}</p>}
                    </article>
                </form>
                {error?.general && <p className="business-profile__error">{error.general[0]}</p>}

                <div className="business-profile__actions">
                    {readOnly ? (
                        <button type="button" className="business-profile__button business-profile__button--edit" onClick={() => setReadOnly(!readOnly)}>
                            Edit User
                        </button>

                    ) : (
                        <>
                            <button type="submit" className="business-profile__button business-profile__button--save" disabled={readOnly} form="business-profile-form">
                                Save Changes
                            </button>
                            <button type="button" className="business-profile__button business-profile__button--cancel" onClick={() => {setReadOnly(!readOnly); setError({}); form.current.reset();} }>
                                Cancel
                            </button>
                        </>
                    )}
                    <button type="button" className="business-profile__button business-profile__button--delete" onClick={handleDeleteUser}>
                        Delete User
                    </button>
                </div>
            </div>
        </section>
    );
}

export default BusinessProfile;
