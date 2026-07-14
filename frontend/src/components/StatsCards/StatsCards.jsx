import "./StatsCards.css";
import { useUser } from "../../hooks/useUser";




function StatsCards(){
  const { userData } = useUser();
  const stats = [
  {
    title: "Total Invoices",
    value: userData ? userData.invoices.length : 0
  },
  {
    title: "Revenue",
    value: `€${userData ? userData.invoices.reduce((acc, invoice) => acc + invoice.total, 0) : 0}`
  },
  {
    title: "Pending",
    value: userData ? userData.invoices.filter(invoice => invoice.status === "pending").length : 0
  },
  {
    title: "Paid",
    value: userData ? userData.invoices.filter(invoice => invoice.status === "paid").length : 0
  }
];
  return (

    <section className="cards">

      {stats.map((stat)=>(
        
        <div 
          className="card"
          key={stat.title}
        >

          <h3>
            {stat.title}
          </h3>

          <strong>
            {stat.value}
          </strong>

        </div>

      ))}

    </section>

  );
}

export default StatsCards;