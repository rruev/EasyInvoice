import "./InvoiceForm.css";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";

import useInvoice from "../../hooks/useInvoice";
import { previewPdf } from "../../utils/previewPdf.util";

function InvoiceForm() {
    const { isLoading, error, generatePdf } = useInvoice();

    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const now = `${day}.${month}.${year}`;

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        const formData = Object.fromEntries(data.entries());
        const pdfData = await generatePdf(formData);
        await previewPdf(pdfData);
        form.reset();
    };

    if (isLoading) {
        return <InvoiceFormSkeleton />;
    } else {
        return (

            <form className="invoice-form" onSubmit={handleSubmit}>

                <h2>
                    Invoice Details
                </h2>


                <label>
                    Business Name
                </label>

                <input
                    name="businessName"
                    placeholder="Bussiness / Person"
                />

                <label>
                    Business Address
                </label>

                <input
                    name="businessAddress"
                    placeholder="Format: Mainstraße, 123 6020 Innsbruck"
                />

                <label>
                    Business Phone
                </label>

                <input
                    name="businessPhone"
                    placeholder="+43 123 456789"
                />


                <label>
                    Email
                </label>

                <input
                    name="businessEmail"
                    placeholder="company@email.com"
                />

                <label>
                    Client Name
                </label>

                <input
                    name="clientName"
                    placeholder="Company / Person"
                />

                <label>
                    Client Address
                </label>

                <input
                    name="clientAddress"
                    placeholder="Format: Mainstraße, 123 6020 Innsbruck"
                />


                <label>
                    Invoice Number
                </label>

                <input
                    name="invoiceNum"
                    // value="INV-001"
                    placeholder="Format: YYYY-001"
                    // readOnly
                />

                <label>
                    Issue Date
                </label>

                <input
                    name="issuedAt"
                    defaultValue={now}
                />

                <label>
                    Performed Date
                </label>

                <input
                    name="workedAt"
                    placeholder="DD.MM.YYYY"
                />

                <div className="items">

                    <h3>
                        Items
                    </h3>

                    <div className="item">

                        <input name="itemDescription" defaultValue="Routenbau / Routesetting in Kletterhalle" placeholder="Description" readOnly />
                        <input name="quantity" placeholder="Qty" />
                        <input name="price" placeholder="Price" />

                    </div>


                </div>

                <button type="submit">
                    Generate PDF
                </button>

            </form>

        );
    }
}

export default InvoiceForm;