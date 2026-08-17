import "./BusinessProfile.css";
import * as z from "zod";

import ConfirmDeleteMessage from "../../components/ConfirmDelete/ConfirmDeleteMessage";
import { formatIban } from "../../utils/formatFormData";
import { parseAddress, prepareAddress  } from "../../utils/formatFormData";

import { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userUpdateSchema } from "../../schemas/user.schema";

function BusinessProfile() {
    const { userData, fetchUser, error, setError, updateUser, deleteUser, isLoading } = useUser();
    const navigate = useNavigate();

    const [readOnly, setReadOnly] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({});

    const [street, setStreet] = useState("");
    const [streetNum, setStreetNum] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");

    const form = useRef(null);
    const iban = useRef(null);

    useEffect(() => {
        const parsedAddress = parseAddress(userData?.businessAddress);
        setStreet(parsedAddress.street);
        setStreetNum(parsedAddress.num);
        setPostalCode(parsedAddress.postal);
        setCity(parsedAddress.city);
    }, [userData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form.current).entries());
        const businessAddress = prepareAddress(
            street, streetNum, postalCode, city
        );
        const updatedData = {
            fullName: data.fullName || null,
            email: data.email || null,
            businessName: data.businessName || null,
            businessAddress: businessAddress || null,
            businessEmail: data.businessEmail || null,
            phoneNumber: data.phoneNumber || null,
            bankName: data.bankName || null,
            bic: data.bic || null,
            iban: data.iban || null,
            taxId: data.taxId || null,
        };

        if (updatedData.iban === iban.current.defaultValue) {
            updatedData.iban = undefined;
        }

        try {
            setIsSaving(true);
            await updateUser(updatedData);
            await fetchUser();
            setReadOnly(true);
        } catch (error) {
            console.error("Failed to update user:", error);
            setError(error || { general: ["Failed to update user."] });
        } finally {
            iban.current.value = userData?.iban || "";
            setIsSaving(false);
        }

    };

    const handleDeleteUser = async () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteUser = async () => {
        await deleteUser();
        navigate("/");
    };

    const handleChange = (e) => {
        let data = { ...formData, [e.target.name]: e.target.value };

        if (e.target.value.length === 0) {
            data[e.target.name] = null;
        }

        try {
            if (e.target.name === "iban") {
                e.target.value = formatIban(e.target.value);
                data[e.target.name] = e.target.value;
            }

            data = userUpdateSchema.parse(data);
            setError({});
        } catch (error) {
            const errors = z.flattenError(error).fieldErrors;
            console.error("Invalid form data:", errors);
            setError(errors || { general: ["Invalid form data."] });
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

                    {readOnly ? (
                        <article className="profile-field profile-field--wide">
                            <label className="profile-field__label">Business address</label>
                            <input className="profile-field__value" name="businessAddress" defaultValue={userData?.businessAddress} readOnly={readOnly} onChange={handleChange} />
                            {error?.businessAddress && <p className="profile-field__error">{error.businessAddress[0]}</p>}
                        </article>
                    ) : (
                        <article className="client-profile__field client-profile__field--wide">
                            <label htmlFor="client-address">Address</label>
                            <div className="client-profile__address-grid">
                                <input
                                    id="client-address-street"
                                    type="text"
                                    name="street"
                                    value={street}
                                    placeholder="Street"
                                    readOnly={readOnly}
                                    onChange={(e) => {
                                        setStreet(e.target.value);
                                        handleChange(e);
                                    }}
                                />
                                <input
                                    id="client-address-streetNum"
                                    type="text"
                                    name="streetNum"
                                    value={streetNum}
                                    placeholder="No."
                                    readOnly={readOnly}
                                    onChange={(e) => {
                                        setStreetNum(e.target.value);
                                        handleChange(e);
                                    }}
                                />
                                <input
                                    id="client-address-postalCode"
                                    type="text"
                                    name="postalCode"
                                    value={postalCode}
                                    placeholder="Postal code"
                                    readOnly={readOnly}
                                    onChange={(e) => {
                                        setPostalCode(e.target.value);
                                        handleChange(e);
                                    }}
                                />
                                <input
                                    id="client-address-city"
                                    type="text"
                                    name="city"
                                    value={city}
                                    placeholder="City"
                                    readOnly={readOnly}
                                    onChange={(e) => {
                                        setCity(e.target.value);
                                        handleChange(e);
                                    }}
                                />
                            </div>
                            {error?.address && <p className="client-profile__error">{error.address[0]}</p>}
                        </article>
                    )}

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">Phone number</label>
                        <input className="profile-field__value" name="phoneNumber" defaultValue={userData?.phoneNumber} readOnly={readOnly} onChange={handleChange} />
                        {error?.phoneNumber && <p className="profile-field__error">{error.phoneNumber[0]}</p>}
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">Bank name</label>
                        <input className="profile-field__value" name="bankName" defaultValue={userData?.bankName} readOnly={readOnly} onChange={handleChange} />
                        {error?.bankName && <p className="profile-field__error">{error.bankName[0]}</p>}
                    </article>

                    <article className="profile-field">
                        <label className="profile-field__label">SWIFT / BIC</label>
                        <input className="profile-field__value" name="bic" defaultValue={userData?.bic} readOnly={readOnly} onChange={handleChange} />
                        {error?.bic && <p className="profile-field__error">{error.bic[0]}</p>}
                    </article>

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">IBAN</label>
                        <input className="profile-field__value" ref={iban} name="iban" defaultValue={userData?.iban} readOnly={readOnly} onChange={handleChange} />
                        {error?.iban && <p className="profile-field__error">{error.iban[0]}</p>}
                    </article>

                    <article className="profile-field profile-field--wide">
                        <label className="profile-field__label">Steuernummer / Tax ID</label>
                        <input className="profile-field__value" name="taxId" defaultValue={userData?.taxId} readOnly={readOnly} onChange={handleChange} />
                        {error?.taxId && <p className="profile-field__error">{error.taxId[0]}</p>}
                    </article>
                </form>
                {error?.general && <p className="business-profile__error">{error.general[0]}</p>}

                <div className="business-profile__actions">
                    {readOnly ? (
                        <button type="button" className="business-profile__button business-profile__button--edit" onClick={() => setReadOnly(!readOnly)}>
                            Edit Account Information
                        </button>

                    ) : (
                        <>
                            <button
                                type="submit"
                                className="business-profile__button business-profile__button--save"
                                disabled={readOnly || isSaving}
                                form="business-profile-form"
                                aria-busy={isSaving}
                            >
                                {isSaving ? (
                                    <span className="business-profile__loading-content">
                                        <span className="business-profile__spinner" aria-hidden="true" />
                                        Saving...
                                    </span>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>
                            <button type="button" className="business-profile__button business-profile__button--cancel" onClick={() => { setReadOnly(!readOnly); setError({}); form.current.reset(); }} disabled={isSaving}>
                                Cancel
                            </button>
                        </>
                    )}
                    <button type="button" className="business-profile__button business-profile__button--delete" onClick={handleDeleteUser} disabled={isLoading || isSaving}>
                        Delete Account
                    </button>
                </div>

                {showDeleteModal && (
                    <ConfirmDeleteMessage
                        onConfirm={confirmDeleteUser}
                        onCancel={() => setShowDeleteModal(false)}
                        isLoading={isLoading}
                        target={"Account"}
                    />
                )}
            </div>
        </section>
    );
}

export default BusinessProfile;
