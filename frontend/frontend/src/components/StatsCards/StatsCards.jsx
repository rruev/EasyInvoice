import "./StatsCards.css";

const stats = [
  {
    title: "Total Invoices",
    value: "124"
  },
  {
    title: "Revenue",
    value: "€18,540"
  },
  {
    title: "Pending",
    value: "12"
  }
];


function StatsCards(){

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