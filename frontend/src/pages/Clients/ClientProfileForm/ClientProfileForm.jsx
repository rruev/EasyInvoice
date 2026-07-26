import "./ClientProfileForm.css";
import { useClient } from "../../../hooks/useClient";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

function ClientProfileForm() {
  const { fetchClientById, updateClient, deleteClient, isLoading, error } = useClient();
  const { clientId } = useParams();

  const form = useRef(null);

  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      const clientData = await fetchClientById(clientId);
      console.log("Fetched client data:", clientData);
      setClientData(clientData);
    };

    fetchClientData();
  }, [clientId]);


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
  };

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
          <span className="client-profile__status">Customer</span>
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
            />
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-email">Email</label>
            <input
              id="client-email"
              type="email"
              name="email"
              defaultValue={clientData?.email}
              placeholder="client@email.com"
            />
          </div>

          <div className="client-profile__field client-profile__field--wide">
            <label htmlFor="client-address">Address</label>
            <input
              id="client-address"
              type="text"
              name="address"
              defaultValue={clientData?.address}
              placeholder="Street and city"
            />
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-phone">Phone number</label>
            <input
              id="client-phone"
              type="tel"
              name="phone"
              defaultValue={clientData?.phone}
              placeholder="+49 000 000000"
            />
          </div>

          {/* <div className="client-profile__field">
            <label htmlFor="client-tax-id">Tax ID</label>
            <input
              id="client-tax-id"
              type="text"
              name="taxId"
              defaultValue={clientData?.taxId || ""}
              placeholder="Tax ID"
            />
          </div> */}

          <div className="client-profile__actions">
            <button type="submit" className="client-profile__button client-profile__button--edit">
              Save Changes
            </button>
            <button type="button" className="client-profile__button client-profile__button--delete">
              Delete Client
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default ClientProfileForm;
