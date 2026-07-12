import "./InvoiceForm.css";

function InvoiceForm({ setFormData, isLoading }) {
    const now = new Date().toISOString().split('T')[0];

    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        const formData = Object.fromEntries(data.entries());
        setFormData(formData);
        form.reset();
    };

    const handleLoading = () => {
        if (isLoading) {
            return (
                <div className="loading-overlay">
                    <div className="loading-spinner">Loading...</div>
                </div>
            );
        } else {
            return (
                <button type="submit">
                    Generate PDF
                </button>
            )
        }
    }

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
                placeholder="123 Main Street, Innsbruck, Austria"
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
                Address
            </label>

            <input
                name="clientAddress"
                placeholder="123 Main Street, Innsbruck, Austria"
            />


            <label>
                Invoice Number
            </label>

            <input
                name="invoiceNumber"
                value="INV-001"
                readOnly
            />

            <label>
                Issue Date
            </label>

            <input
                name="issueDate"
                defaultValue={now}
            />

            <label>
                Performed Date
            </label>

            <input
                name="performedDate"
                placeholder="YYYY-MM-DD"
            />

            <div className="items">

                <h3>
                    Items
                </h3>

                <div className="item">

                    <input name="itemDescription" defaultValue="Routenbau / Routesetting in Kletterhalle" placeholder="Description" readOnly />
                    <input name="itemQuantity" placeholder="Qty" />
                    <input name="itemPrice" placeholder="Price" />

                </div>


            </div>


            {handleLoading()}


        </form>

    );
}


export default InvoiceForm;