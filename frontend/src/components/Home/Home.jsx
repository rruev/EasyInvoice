import "./Home.css";

import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import HomeSkeleton from "./HomeSkeleton";

import { useUser } from "../../hooks/useUser";

function Home() {
    const { userData, isLoading } = useUser();

    if (isLoading) {
        return <HomeSkeleton />;
    }

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