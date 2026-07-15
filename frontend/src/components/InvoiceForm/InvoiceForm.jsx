import "./InvoiceForm.css";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";
import { useState } from "react";
import useInvoice from "../../hooks/useInvoice";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";

function InvoiceForm() {
    const { isLoading, generatePdf } = useInvoice();
    const { userData, fetchUser } = useUser();
    const { createClient } = useClient();

    const clients = userData?.clients ?? [];

    const [addNewClient, setAddNewClient] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [selectedClient, setSelectedClient] = useState(clients.length > 0 ? clients[0].name : "");

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

        if (userData) {
            const client = clients.find(c => c.name === selectedClient);
            if (client) {
                formData.clientName = client.name;
                formData.clientAddress = client.address;
            } else {
                console.log('Selected client not found.');
                return;
            }
        }

        await generatePdf(formData);
        // await previewPdf(pdfData);
        await fetchUser();
        form.reset();
    };

    const handleAddClient = async () => {
        await createClient({ name: clientName, address: clientAddress });
        setClientName("");
        setClientAddress("");
        setAddNewClient(false);
        await fetchUser();
    }

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
                    defaultValue={userData ? userData.businessName : ''}
                    placeholder="Business / Person"
                />

                <label>
                    Business Address
                </label>

                <input
                    name="businessAddress"
                    defaultValue={userData ? userData.businessAddress : ''}
                    placeholder="Format: Mainstraße, 123 6020 Innsbruck"
                />

                <label>
                    Business Phone
                </label>

                <input
                    name="businessPhone"
                    defaultValue={userData ? userData.phoneNumber : ''}
                    placeholder="+43 123 456789"
                />


                <label>
                    Email
                </label>

                <input
                    name="businessEmail"
                    defaultValue={userData ? userData.businessEmail : ''}
                    placeholder="company@email.com"
                />

                {!userData ? (
                    <>
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
                            placeholder="Format: Mainstraße 123, 6020 Innsbruck"
                        />
                    </>
                ) : (
                    <section className="client-picker">


                        <div className="client-picker__header">
                            <div>
                                <label htmlFor="client-select">
                                    Select Client
                                </label>
                                <p className="client-picker__hint">
                                    Choose an existing client.
                                </p>
                            </div>
                        </div>

                        <select
                            id="client-select"
                            className="client-picker__select"
                            value={selectedClient}
                            onChange={(e) => setSelectedClient(e.target.value)}
                        >   
                            <option value="">Select a client...</option>
                            {clients.length ? (
                                clients.map((client, index) => (
                                    <option key={client.id ?? `${client.name}-${index}`} value={client.name}>
                                        {client.name}
                                    </option>
                                ))
                            ) : (
                                <option value="">No clients available</option>
                            )}
                        </select>
                        <p className="client-picker__hint">
                            or add new:
                        </p>

                        {addNewClient ? (
                            <>
                                <div className="client-picker__details">
                                    <div className="client-picker__field">
                                        <label>
                                            Client Name
                                        </label>
                                        <input
                                            placeholder="Company / Person"
                                            onChange={(e) => setClientName(e.target.value)}
                                        />
                                    </div>

                                    <div className="client-picker__field">
                                        <label>
                                            Client Address
                                        </label>
                                        <input
                                            placeholder="Format: Mainstraße 123, 6020 Innsbruck"
                                            onChange={(e) => setClientAddress(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="buttons_safe_cancel">
                                    <button className="client-picker__button" type="button" onClick={handleAddClient}>
                                        Save
                                    </button>
                                    <button className="client-picker__button" type="button" onClick={() => setAddNewClient(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </>
                        ) : (
                            <button className="client-picker__button" type="button" onClick={() => setAddNewClient(true)}>
                                Add New Client
                            </button>

                        )}

                    </section>
                )}




                <label>
                    Invoice Number
                </label>

                <input
                    key={userData ? userData.nextInvoiceNum : 'invoice-number'}
                    name="invoiceNum"
                    defaultValue={userData ? userData.nextInvoiceNum : ''}
                    placeholder="Format: YYYY-001"
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