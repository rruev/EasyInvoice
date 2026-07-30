import "./Home.css";

import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceTemplates from "../InvoiceTemplates/InvoiceTemplates";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import HomeSkeleton from "./HomeSkeleton";

import { useUser } from "../../hooks/useUser";
import { useState } from "react";

function Home() {
    const { userData, isLoading } = useUser();
    const [showForm, setShowForm] = useState(false);

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <main className="main">

            <Header />

            {userData && <StatsCards />}

            <section className="workspace">
                {showForm ? (
                    <InvoiceForm />
                    /* For next version: */
                    /* <InvoicePreview /> */
                ) : (
                    <InvoiceTemplates />
                )}
            </section>
        </main>
    );
}

export default Home;