import "./Home.css";

import Header from "../Header/Header";
import StatsCards from "../StatsCards/StatsCards";
import InvoiceTemplates from "../InvoiceTemplates/InvoiceTemplates";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import InvoicePreview from "../InvoicePreview/InvoicePreview";
import HomeSkeleton from "./HomeSkeleton";

import { useUser } from "../../hooks/useUser";
import useInvoice from "../../hooks/useInvoice";
import { useState } from "react";

function Home() {
    const { userData, isLoading } = useUser();
    const { pdfData, setPdfData, isLoading: invoiceLoading, error, setError, generatePdf } = useInvoice();
    const [showForm, setShowForm] = useState(false);
    const [template, setTemplate] = useState('generic');

    const onChooseForm = () => {
        setShowForm(true);
    };

    const onBackToTemplates = () => {
        setShowForm(false);
        setError(null);
    };

    if (isLoading) {
        return <HomeSkeleton />;
    }

    return (
        <main className="main">

            <Header />

            {userData && <StatsCards />}

            <section className="workspace">
                {showForm ? (
                    <>
                        <InvoiceForm
                            generatePdf={generatePdf}
                            isLoading={invoiceLoading}
                            error={error}
                            setError={setError}
                            template={template}
                        />
                        <InvoicePreview pdfData={pdfData} setPdfData={setPdfData} onBack={onBackToTemplates} />
                    </>
                ) : (
                    <InvoiceTemplates onClickTemplate={onChooseForm} setTemplate={setTemplate} />
                )}
            </section>
        </main>
    );
}

export default Home;