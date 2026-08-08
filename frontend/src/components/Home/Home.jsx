import "./Home.css";

import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import InvoicePreview from "../InvoicePreview/InvoicePreview";
import HomeSkeleton from "./HomeSkeleton";

import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import useInvoice from "../../hooks/useInvoice";

function Home() {
    const { userData, isLoading } = useUser();
    const { pdfData, setPdfData, isLoading: invoiceLoading, error, setError, generatePdf } = useInvoice();

    const [template, setTemplate] = useState('generic');

    const onToggleTemplate = () => {
        setTemplate((currentTemplate) => (currentTemplate === 'generic' ? 'routesetting' : 'generic'));
        setError(null);
    };

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <main className="main">

            <Header setPdfData={setPdfData} />

            {userData && <StatsCards />}

            <section className="workspace">
                <InvoiceForm
                    generatePdf={generatePdf}
                    isLoading={invoiceLoading}
                    error={error}
                    setError={setError}
                    template={template}
                />
                <InvoicePreview pdfData={pdfData} setPdfData={setPdfData} onToggleTemplate={onToggleTemplate} template={template} />
            </section>
        </main>
    );
}

export default Home;