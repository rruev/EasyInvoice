import "./Clients.css";
import { useUser } from "../../hooks/useUser";

function Clients() {
  const { userData } = useUser();

  return (
    <section className="customers-panel">
      <div className="customers-panel__hero">
        <div>
          <p className="customers-panel__eyebrow">Customers</p>
          <h2 className="customers-panel__title">Customer Directory</h2>
        </div>

        <span className="customers-panel__count">
          {userData?.clients?.length ?? 0} clients
        </span>
      </div>

      <div className="customers-panel__grid">
        {userData?.clients?.length ? (
          userData?.clients?.map((customer, index) => (
            <article className="customer-card" key={customer.id ?? customer.name ?? index}>
              <div className="customer-card__header">
                <div>
                  <h3 className="customer-card__name">{customer.name ?? "Unnamed customer"}</h3>
                  <p className="customer-card__meta">{customer.email ?? customer.businessEmail ?? "No email available"}</p>
                </div>

                <span className="customer-card__badge">
                  {customer.status ?? "Active"}
                </span>
              </div>

              <p className="customer-card__address">
                {customer.address ?? customer.businessAddress ?? "No address available"}
              </p>

              <div className="customer-card__footer">
                <span>{customer.phone ?? customer.phoneNumber ?? "No phone"}</span>
                <span>{customer.totalInvoices ?? 0} invoices</span>
              </div>
            </article>
          ))
        ) : (
          <div className="customers-empty">
            <h3>No customers yet</h3>
            <p>Add a customer list here when you pass data into the component.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Clients;