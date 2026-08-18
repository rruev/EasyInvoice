import "./StatsCards.css";
import { useInvoice } from "../../hooks/useInvoice";
import useSidebar from "../../hooks/useSidebar";

function StatsCards() {
  const { stats, isLoading } = useInvoice();
  const { isMobile } = useSidebar();

  const statsData = [
    {
      title: "Total Invoices",
      value: stats ? stats.totalInvoices : null,
    },
    {
      title: "Revenue",
      value: stats ? `€${stats.totalRevenue}` : null,
    },
    !isMobile && {
      title: "Pending Invoices",
      value: stats ? stats.pendingInvoices : null,
    },
  ].filter(Boolean); // Filter out null values for mobile view

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