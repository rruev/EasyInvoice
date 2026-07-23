import "./ClientProfileForm.css";

function ClientProfileForm() {
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

        <form className="client-profile__form">
          <div className="client-profile__field">
            <label htmlFor="client-full-name">Client name</label>
            <input
              id="client-full-name"
              type="text"
              name="name"
              defaultValue="North Ridge Trading"
              placeholder="Client name"
            />
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-email">Email</label>
            <input
              id="client-email"
              type="email"
              name="email"
              defaultValue="accounts@northridge.com"
              placeholder="client@email.com"
            />
          </div>

          <div className="client-profile__field client-profile__field--wide">
            <label htmlFor="client-address">Address</label>
            <input
              id="client-address"
              type="text"
              name="address"
              defaultValue="Baker Street 221B, 10115 Berlin"
              placeholder="Street and city"
            />
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-phone">Phone number</label>
            <input
              id="client-phone"
              type="tel"
              name="phone"
              defaultValue="+49 151 23456789"
              placeholder="+49 000 000000"
            />
          </div>

          <div className="client-profile__field">
            <label htmlFor="client-tax-id">Tax ID</label>
            <input
              id="client-tax-id"
              type="text"
              name="taxId"
              defaultValue="DE-394-882-114"
              placeholder="Tax ID"
            />
          </div>

          <div className="client-profile__actions">
            <button type="button" className="client-profile__button client-profile__button--edit">
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
