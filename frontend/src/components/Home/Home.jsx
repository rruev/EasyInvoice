import "./Home.css";

import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import InvoicePreview from "../InvoicePreview/InvoicePreview";

import { useUser } from "../../hooks/useUser";

function Home() {
    const { userData } = useUser();
    return (
        <main className="main">

            <Header />

            {userData && <StatsCards />}

            <section className="workspace">

                <InvoiceForm />

                {/* For next version:}
          {/* <InvoicePreview /> */}

            </section>
        </main>
    );
}

export default Home;