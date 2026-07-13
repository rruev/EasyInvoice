import "./Home.css";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import InvoicePreview from "../InvoicePreview/InvoicePreview";

function Home() {
    return (
        <div className="app">

            <Sidebar />

            <main className="main">

                <Header />

                {/* <StatsCards /> */}

                <section className="workspace">

                    <InvoiceForm />

                    {/* For next version:}
          {/* <InvoicePreview /> */}

                </section>
            </main>

        </div>
    )
}

export default Home;