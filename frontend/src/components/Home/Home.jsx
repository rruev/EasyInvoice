import "./Home.css";

import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import InvoicePreview from "../InvoicePreview/InvoicePreview";
import HomeSkeleton from "./HomeSkeleton";

import { useUser } from "../../hooks/useUser";
import { useState, useEffect } from "react";
import useInvoice from "../../hooks/useInvoice";

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
                <InvoiceForm/>
                <InvoicePreview />
            </section>
        </main>
    );
}

export default Home;