import "./StatsCards.css";
import { useInvoice } from "../../hooks/useInvoice";

function StatsCards() {
  const { stats, isLoading } = useInvoice();

  const statsData = [
    {
      title: "Total Invoices",
      value: stats ? stats.totalInvoices : null,
    },
    {
      title: "Revenue",
      value: stats ? `€${stats.totalRevenue}` : null,
    },
    {
      title: "Pending",
      value: stats ? stats.pendingInvoices : null,
    },
  ];

  return (
    <section className="cards">
      {statsData.map((stat) => (
        <div className="card" key={stat.title}>
          <h3>{stat.title}</h3>
          <strong>
            {!stats || isLoading ? (
              <span className="loading-dots" aria-label="Loading">
                <span />
                <span />
                <span />
              </span>
            ) : (
              stat.value
            )}
          </strong>
        </div>
      ))}
    </section>
  );
}

export default StatsCards;