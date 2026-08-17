import "./Clients.css";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { useNavigate } from "react-router-dom";

function Clients() {
  const { userData } = useUser();
  const { clients } = useClient(); // Assuming useClient is imported and provides the clients state

  const navigate = useNavigate();
  const hasClients = (userData?.clients?.length ?? 0) > 0;

  return (
    <section className="customers-panel">
      <div className="customers-panel__hero">
        <div>
          <p className="customers-panel__eyebrow">Clients</p>
          <h2 className="customers-panel__title">Client Manager</h2>
        </div>

        <span className="customers-panel__count">
          {userData?.clients?.length ?? 0} clients
        </span>
      </div>

      <div className={`customers-panel__grid${hasClients ? "" : " customers-panel__grid--empty"}`}>

        <article
          className={`add-client-card${hasClients ? "" : " add-client-card--empty"}`}
          onClick={() => navigate("/clients/addBusinessClient")}
        >
          <div className="add-client-card__header">
            <div>
              <h3 className="add-client-card__name">+ Add Client</h3>
              <p className="add-client-card__meta">Create a new client profile</p>
            </div>
          </div>


        </article>
        {hasClients ? (
          userData?.clients?.map((customer, index) => (
            <article className="customer-card" key={customer.id ?? customer.name ?? index} onClick={() => navigate(`/clients/editBusinessClient/${customer.id}`)}>
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
                {/* <span>{clients?.find(c => c.id === customer.id)?.invoices?.length ?? 0} invoices</span> */}
              </div>
            </article>
          ))
        ) : (
          <div className="customers-empty customers-empty--compact">
            <h3>No clients yet</h3>
            <p>Your client list will appear here.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Clients;