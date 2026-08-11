import "./Invoices.css";
import ConfirmDeleteMessage from "../../components/ConfirmDelete/ConfirmDeleteMessage";

import { useUser } from "../../hooks/useUser";
import { useInvoice } from "../../hooks/useInvoice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DELETE_ANIMATION_MS = 320;

function Invoices() {
  const { userData, fetchUser } = useUser();
  const { invoices, stats, updateInvoiceStatus, removeInvoice } = useInvoice();

  const [deletingInvoiceId, setDeletingInvoiceId] = useState(null); // for passing the delete id to the confirm modal
  const [deletingInvoiceIdList, setDeletingInvoiceIdList] = useState([]); // for the delete animation not to delete something twice
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [updatingInvoiceId, setUpdatingInvoiceId] = useState(null);

  const navigate = useNavigate();

  const handleOnChange = async (e, invoiceId) => {
    setUpdatingInvoiceId(invoiceId);

    try {
      await updateInvoiceStatus(invoiceId, e.target.value);
    } finally {
      setUpdatingInvoiceId(null);
    }
  };


  const handleClickDelete = (id) => {
    setDeletingInvoiceId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async (id) => {
    if (deletingInvoiceIdList.includes(id)) {
      return;
    }

    setDeletingInvoiceIdList((prev) => [...prev, id]);
    await new Promise((resolve) => setTimeout(resolve, DELETE_ANIMATION_MS));

    try {
      await removeInvoice(id);
    } finally {
      setDeletingInvoiceIdList((prev) => prev.filter((invoiceId) => invoiceId !== id));
    }
  };

  return (
    <section className="invoices-panel">
      <div className="invoices-panel__header">
        <div>
          <p className="invoices-panel__eyebrow">Invoices</p>
          <h2 className="invoices-panel__title">Invoice Register</h2>
        </div>

        <button className="invoices-panel__new-button" type="button" onClick={() => navigate("/")}>New Invoice</button>
        <span className="invoices-panel__count">
          {stats?.totalInvoices ?? 0} records
        </span>
      </div>

      {invoices?.length ? (
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
              {invoices?.map((invoice, index) => (
                <tr
                  key={invoice.id ?? invoice.invoiceNum ?? index}
                  className={`invoices-table__row ${deletingInvoiceIdList.includes(invoice.id) ? "invoices-table__row--deleting" : ""}`}
                  aria-busy={deletingInvoiceIdList.includes(invoice.id)}
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
                    <div className="invoices-table__status-cell">
                      <select
                        className={`invoice-status invoice-status--${invoice.status ?? "draft"}`}
                        value={invoice.status ?? "pending"}
                        onChange={(e) => handleOnChange(e, invoice.id)}
                        disabled={deletingInvoiceIdList.includes(invoice.id) || updatingInvoiceId === invoice.id}
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                      </select>
                      {updatingInvoiceId === invoice.id && <span className="invoices-table__status-loading">Updating...</span>}
                    </div>
                  </td>
                  <td>{invoice.total ?? "-"} &euro;</td>
                  <td className="invoices-table__action">
                    <button
                      type="button"
                      className="invoices-table__delete"
                      onClick={() => handleClickDelete(invoice.id)}
                      disabled={deletingInvoiceIdList.includes(invoice.id)}
                      aria-label={`Delete invoice ${invoice.invoiceNum ?? invoice.number ?? index + 1}`}
                    >
                      {deletingInvoiceIdList.includes(invoice.id) ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="invoices-table__summary-row" aria-label="invoice summary row">
                <td className="invoices-table__summary-label-cell">
                  <strong>Summary</strong>
                </td>
                <td colSpan={3}>
                  <div className="invoices-table__summary-meta">
                    <span className="invoices-table__summary-pill">Total clients {userData.clients.length ?? 0} </span>
                    <span className="invoices-table__summary-pill">Total pending invoices {stats?.pendingInvoices ?? 0} </span>
                  </div>
                </td>
                <td className="invoices-table__summary-total">{stats?.totalRevenue ?? "--"} &euro;</td>
                <td className="invoices-table__action">&nbsp;</td>
              </tr>
              <tr className="invoices-table__add-more-row" aria-label="add more invoices row">
                <td colSpan={6}>
                  <button type="button" className="invoices-table__add-more-button">
                    Add More Invoices
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="invoices-empty">
          <h3>No invoices yet</h3>
          <p>Your invoice list will appear here once data is passed into the component.</p>
        </div>
      )}

      {showDeleteModal && (
        <ConfirmDeleteMessage
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
          isLoading={deletingInvoiceIdList.length > 0}
          target={"Invoice"}
          id={deletingInvoiceId}
        />
      )}
    </section>
  );
}

export default Invoices;