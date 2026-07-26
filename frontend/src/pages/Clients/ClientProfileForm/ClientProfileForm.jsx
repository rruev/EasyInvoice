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
  const { userData,fetchUser } = useUser();
  const { fetchClientById, updateClient, deleteClient, isLoading, error, setError } = useClient();
  const { clientId } = useParams();
  const navigate = useNavigate();
  const form = useRef(null);

  const [clientData, setClientData] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
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
    const data = Object.fromEntries(new FormData(form.current).entries());
    const updatedData = {
      name: data.name,
      email: data.email || null,
      address: data.address,
      phone: data.phone || null,
    };

    const updatedClient = await updateClient(clientId, updatedData);
    setClientData(updatedClient);
    navigate("/clients");
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

  if (!clientData) {
    return <ClientProfileFormSkeleton />;
  }

  return (
    <section className="client-profile" aria-label="Client profile form">
      <div className="client-profile__card">
        <div className="client-profile__header">
          <div>
            <p className="client-profile__eyebrow">Client Details</p>
            <h2 className="client-profile__title">Edit Client</h2>
            <p className="client-profile__subtitle">
              Update client information or remove the client from your directory.
            </p>
          </div>
          <span className="client-profile__status">Client</span>
        </div>

        <form className="client-profile__form" ref={form} onSubmit={handleSubmit}>
          <div className="client-profile__field">
            <label htmlFor="client-full-name">Client name</label>
            <input
              id="client-full-name"
              type="text"
              name="name"
              defaultValue={clientData?.name}
              placeholder="Client name"
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
              onChange={handleChange}
            />
            {error?.phone && <p className="client-profile__error">{error.phone[0]}</p>}
          </div>

          <div className="client-profile__actions">
            <NavLink to="/clients" className="client-profile__back-link">
              &larr; Back to Clients
            </NavLink>
            <button type="submit" className="client-profile__button client-profile__button--edit">
              Save Changes
            </button>
            <button type="button" className="client-profile__button client-profile__button--delete" onClick={handleDeleteClient}>
              Delete Client
            </button>
          </div>
          {error?.general && <p className="client-profile__error">{error.general[0]}</p>}
        </form>
      </div>
    </section>
  );
}

export default ClientProfileForm;
