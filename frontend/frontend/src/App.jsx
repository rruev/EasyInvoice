import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import StatsCards from "./components/StatsCards/StatsCards";
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview/InvoicePreview";

import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [formData, setFormData] = useState();

  useEffect(() => {
    const submitInvoice = async () => {
      if (formData) {
        try {
          const response = await fetch("http://localhost:3000/api/invoice/generate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
          });

          if (!response.ok) {
            console.error("Failed to submit invoice data");
            return;
          }

          const pdf = await response.blob();
          console.log("PDF generated:", pdf);
        } catch (error) {
          console.error("Error submitting invoice data:", error);
        }
      }
    }
    submitInvoice();
  }, [formData]);

  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <Header />

        <StatsCards />

        <section className="workspace">

          <InvoiceForm setFormData={setFormData} />

          <InvoicePreview />

        </section>

      </main>

    </div>
  );
}

export default App;