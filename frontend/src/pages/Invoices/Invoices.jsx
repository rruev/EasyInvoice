import "./Invoices.css";
import { useUser } from "../../hooks/useUser";
import { useInvoice } from "../../hooks/useInvoice";
import { useState } from "react";

const DELETE_ANIMATION_MS = 320;

function Invoices() {
  const { userData, fetchUser } = useUser();
  const { updateInvoiceStatus, removeInvoice } = useInvoice();
  const [deletingInvoiceIds, setDeletingInvoiceIds] = useState([]);

  const handleOnChange = async (e, invoiceId) => {
    await updateInvoiceStatus(invoiceId, e.target.value);
    await fetchUser();
  };

  const handleClickDelete = async (id) => {
    if (deletingInvoiceIds.includes(id)) {
      return;
    }

    setDeletingInvoiceIds((prev) => [...prev, id]);
    await new Promise((resolve) => setTimeout(resolve, DELETE_ANIMATION_MS));

    try {
      await removeInvoice(id);
      await fetchUser();
    } finally {
      setDeletingInvoiceIds((prev) => prev.filter((invoiceId) => invoiceId !== id));
    }
  };

  return (
    <section className="invoices-panel">
      <div className="invoices-panel__header">
        <div>
          <p className="invoices-panel__eyebrow">Invoices</p>
          <h2 className="invoices-panel__title">Invoice Register</h2>
        </div>

        <span className="invoices-panel__count">
          {userData?.invoices?.length ?? 0} records
        </span>
      </div>

      {userData?.invoices?.length ? (
        <div className="invoices-table-wrap">
          <table className="invoices-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Issue Date</th>
                <th>Status</th>
                <th>Total</th>
                <th className="invoices-table__action">Action</th>
              </tr>
            </thead>

            <tbody>
              {userData?.invoices?.map((invoice, index) => (
                <tr
                  key={invoice.id ?? invoice.invoiceNum ?? index}
                  className={`invoices-table__row ${deletingInvoiceIds.includes(invoice.id) ? "invoices-table__row--deleting" : ""}`}
                  aria-busy={deletingInvoiceIds.includes(invoice.id)}
                >
                  <td>
                    <strong>{invoice.invoiceNum ?? "-"}</strong>
                  </td>
                  <td>
                    <div className="invoices-table__primary">{invoice.client.name ?? "-"}</div>
                    <div className="invoices-table__secondary">{invoice.client.address ?? ""}</div>
                  </td>
                  <td>{invoice.issuedAt ?? invoice.date ?? "-"}</td>
                  <td>
                    <select
                      className={`invoice-status invoice-status--${invoice.status ?? "draft"}`}
                      value={invoice.status ?? "pending"}
                      onChange={(e) => handleOnChange(e, invoice.id)}
                      disabled={deletingInvoiceIds.includes(invoice.id)}
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                    </select>
                  </td>
                  <td>{invoice.total ?? "-"} &euro;</td>
                  <td className="invoices-table__action">
                    <button
                      type="button"
                      className="invoices-table__delete"
                      onClick={() => handleClickDelete(invoice.id)}
                      disabled={deletingInvoiceIds.includes(invoice.id)}
                      aria-label={`Delete invoice ${invoice.invoiceNum ?? invoice.number ?? index + 1}`}
                    >
                      {deletingInvoiceIds.includes(invoice.id) ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="invoices-empty">
          <h3>No invoices yet</h3>
          <p>Your invoice list will appear here once data is passed into the component.</p>
        </div>
      )}
    </section>
  );
}

export default Invoices;