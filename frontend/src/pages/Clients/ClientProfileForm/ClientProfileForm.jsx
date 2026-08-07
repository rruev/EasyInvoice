import "./ClientProfileForm.css";
import * as z from "zod";
import clientSchema from "../../../schemas/client.schema";
import ClientProfileFormSkeleton from "./ClientProfileFormSkeleton";

import { useClient } from "../../../hooks/useClient";
import { useUser } from "../../../hooks/useUser";
import { useEffect, useState, useRef } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

function ClientProfileForm() {
  const { userData, fetchUser } = useUser();
  const { fetchClientById, updateClient, deleteClient, createClient, isLoading, error, setError } = useClient();
  const { clientId } = useParams();
  const navigate = useNavigate();
  const form = useRef(null);

  const [clientData, setClientData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!clientId) {
      return;
    }

    const fetchClientData = async () => {
      const clientData = await fetchClientById(clientId);
      setClientData(clientData);
    };

    if (userData && userData.clients) {
      setClientData(userData.clients.find(client => client.id === clientId) || null);
    }

    fetchClientData();
  }, [clientId, userData]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const data = Object.fromEntries(new FormData(form.current).entries());
    const updatedData = {
      name: data.name,
      email: data.email || null,
      address: data.address,
      phone: data.phone || null,
    };

    try {
      if (!clientId) {
        await createClient(updatedData);
      } else {
        const updatedClient = await updateClient(clientId, updatedData);
        setClientData(updatedClient);
      }
      await fetchUser();
      navigate("/clients");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteClient = async () => {
    setClientData(null);
    await deleteClient(clientId);
    await fetchUser();
    navigate("/clients");
  };

  const handleChange = (e) => {
    let data = { ...formData, [e.target.name]: e.target.value };

    if (e.target.value.length === 0) {
      data[e.target.name] = null;
    }

    try {
      data = clientSchema.parse(data);
      setError({});
    } catch (error) {
      const errors = z.flattenError(error).fieldErrors;
      console.error("Invalid form data:", errors);
      setError(errors || { general: ["Invalid form data."] });
    }
    setFormData(data);
  };

  if (!clientData && clientId) {
    return <ClientProfileFormSkeleton />;
  }

  return (
    <section className="client-profile" aria-label="Client profile form">
      <div className="client-profile__card">
        <div className="client-profile__header">
          <div>
            <h2 className="client-profile__title">{clientId ? "Edit Client" : "Add Client"}</h2>
            <p className="client-profile__subtitle">
              {clientId ? "Update the client information below." : "Fill out the form below to add a new client."}
            </p>
          </div>
        </div>

        <form className="client-profile__form" ref={form} onSubmit={handleSubmit} aria-busy={isSubmitting}>
          <div className="client-profile__field">
            <label htmlFor="client-full-name">Client name</label>
            <input
              id="client-full-name"
              type="text"
              name="name"
              defaultValue={clientData?.name}
              placeholder="Client name"
              readOnly={isSubmitting}
              onChange={handleChange}
            />
            {error?.name && <p className="client-profile__error">{error.name[0]}</p>}
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-email">Email</label>
            <input
              id="client-email"
              name="email"
              defaultValue={clientData?.email}
              placeholder="client@email.com"
              readOnly={isSubmitting}
              onChange={handleChange}
            />
            {error?.email && <p className="client-profile__error">{error.email[0]}</p>}
          </div>

          <div className="client-profile__field client-profile__field--wide">
            <label htmlFor="client-address">Address</label>
            <input
              id="client-address"
              type="text"
              name="address"
              defaultValue={clientData?.address}
              placeholder="Street and city"
              readOnly={isSubmitting}
              onChange={handleChange}
            />
            {error?.address && <p className="client-profile__error">{error.address[0]}</p>}
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-phone">Phone number</label>
            <input
              id="client-phone"
              type="tel"
              name="phone"
              defaultValue={clientData?.phone}
              placeholder="+49 000 000000"
              readOnly={isSubmitting}
              onChange={handleChange}
            />
            {error?.phone && <p className="client-profile__error">{error.phone[0]}</p>}
          </div>

          <div className="client-profile__actions">
            <NavLink to="/clients" className="client-profile__back-link">
              &larr; Back to Clients
            </NavLink>
            <button type="submit" className="client-profile__button client-profile__button--edit" disabled={isSubmitting} aria-busy={isSubmitting}>
              {isSubmitting ? (
                <span className="client-profile__loading-content">
                  <span className="client-profile__spinner" aria-hidden="true" />
                  {clientId ? "Saving..." : "Adding..."}
                </span>
              ) : (
                clientId ? "Save Changes" : "Add Client"
              )}
            </button>
            {clientId && (
              <button type="button" className="client-profile__button client-profile__button--delete" onClick={handleDeleteClient} disabled={isSubmitting || isLoading}>
                Delete Client
              </button>
            )}
          </div>
          {error?.general && <p className="client-profile__error">{error.general[0]}</p>}
        </form>
      </div>
    </section>
  );
}

export default ClientProfileForm;
