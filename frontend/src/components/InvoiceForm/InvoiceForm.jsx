import "./InvoiceForm.css";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";
import { useState } from "react";
import useInvoice from "../../hooks/useInvoice";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { invoiceFormSchema } from "../../schemas/invoiceForm.schema";
import { previewPdf } from "../../utils/previewPdf.util";
import * as z from "zod";

function InvoiceForm() {
    const { isLoading, error, setError, generatePdf } = useInvoice();
    const { userData, fetchUser } = useUser();
    const { createClient, isLoading: isClientLoading } = useClient();

    const clients = userData?.clients ?? [];

    const [addNewClient, setAddNewClient] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [selectedClient, setSelectedClient] = useState(clients.length > 0 ? clients[0].name : "");
    const [formData, setFormData] = useState({});

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

        const pdfData = await generatePdf(formData);
        await previewPdf(pdfData);
        await fetchUser();
        form.reset();
    };

    const handleChange = (e) => {
        let data = { ...formData, [e.target.name]: e.target.value };

        if (e.target.value.length === 0) {
            data[e.target.name] = undefined;
        }

        try {
            data = invoiceFormSchema.parse(data);
            setError({});
        } catch (err) {
            const errors = z.flattenError(err).fieldErrors;
            setError(errors);
        }
        setFormData(data);
    };

    const handleAddClient = async () => {
        if (isClientLoading) {
            return;
        }
        await createClient({ name: clientName, address: clientAddress });
        setClientName("");
        setClientAddress("");
        setAddNewClient(false);
        await fetchUser();
    }

    if (isLoading) {
        return <InvoiceFormSkeleton />;
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
                defaultValue={userData ? userData.businessName : ''}
                placeholder="Business / Person"
                onChange={handleChange}
            />
            {error && error.businessName && <p className="invoice-form-error">{error.businessName[0]}</p>}

            <label>
                Business Address
            </label>

            <input
                name="businessAddress"
                defaultValue={userData ? userData.businessAddress : ''}
                placeholder="Format: Mainstraße, 123 6020 Innsbruck"
                onChange={handleChange}
            />
            {error && error.businessAddress && <p className="invoice-form-error">{error.businessAddress[0]}</p>}

            <label>
                Business Phone
            </label>

            <input
                name="businessPhone"
                defaultValue={userData ? userData.phoneNumber : ''}
                placeholder="+43 123 456789"
                onChange={handleChange}
            />
            {error && error.businessPhone && <p className="invoice-form-error">{error.businessPhone[0]}</p>}


            <label>
                Email
            </label>

            <input
                name="businessEmail"
                defaultValue={userData ? userData.businessEmail : ''}
                placeholder="company@email.com"
                onChange={handleChange}
            />
            {error && error.businessEmail && <p className="invoice-form-error">{error.businessEmail[0]}</p>}

            {!userData ? (
                <>
                    <label>
                        Client Name
                    </label>

                    <input
                        name="clientName"
                        placeholder="Company / Person"
                        onChange={handleChange}
                    />
                    {error && error.clientName && <p className="invoice-form-error">{error.clientName[0]}</p>}

                    <label>
                        Client Address
                    </label>
                    <input
                        name="clientAddress"
                        placeholder="Format: Mainstraße 123, 6020 Innsbruck"
                        onChange={handleChange}
                    />
                    {error && error.clientAddress && <p className="invoice-form-error">{error.clientAddress[0]}</p>}
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
                                        name="clientName"
                                        onChange={(e) => { setClientName(e.target.value); handleChange(e); }}
                                    />
                                    {error && error.clientName && <p className="invoice-form-error">{error.clientName[0]}</p>}
                                </div>

                                <div className="client-picker__field">
                                    <label>
                                        Client Address
                                    </label>
                                    <input
                                        placeholder="Format: Mainstraße 123, 6020 Innsbruck"
                                        name="clientAddress"
                                        onChange={(e) => { setClientAddress(e.target.value); handleChange(e); }}
                                    />
                                    {error && error.clientAddress && <p className="invoice-form-error">{error.clientAddress[0]}</p>}
                                </div>

                            </div>
                            <div className="buttons_safe_cancel">
                                <button
                                    className="client-picker__button"
                                    type="button"
                                    onClick={handleAddClient}
                                    disabled={isClientLoading}
                                    aria-busy={isClientLoading}
                                >
                                    {isClientLoading ? (
                                        <span className="client-picker__loading-content">
                                            <span className="client-picker__spinner" aria-hidden="true" />
                                            Saving...
                                        </span>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                                <button className="client-picker__button" type="button" onClick={() => setAddNewClient(false)} disabled={isClientLoading}>
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
                onChange={handleChange}
            />
            {error && error.invoiceNum && <p className="invoice-form-error">{error.invoiceNum[0]}</p>}

            <label>
                Issue Date
            </label>

            <input
                name="issuedAt"
                defaultValue={now}
                onChange={handleChange}
            />
            {error && error.issuedAt && <p className="invoice-form-error">{error.issuedAt[0]}</p>}

            <label>
                Performed Date
            </label>

            <input
                name="workedAt"
                placeholder="DD.MM.YYYY"
                onChange={handleChange}
            />
            {error && error.workedAt && <p className="invoice-form-error">{error.workedAt[0]}</p>}

            <div className="items">

                <h3>
                    Items
                </h3>

                <div className="item">

                    <input name="itemDescription" defaultValue="Routenbau / Routesetting in Kletterhalle" placeholder="Description" readOnly />
                    <input name="quantity" placeholder="Qty" defaultValue="1" onChange={handleChange} />
                    {error && error.quantity && <p className="invoice-form-error">{error.quantity[0]}</p>}
                    <input name="price" placeholder="Price" onChange={handleChange} />
                    {error && error.price && <p className="invoice-form-error">{error.price[0]}</p>}

                </div>


            </div>

            <button type="submit">
                Generate PDF
            </button>

            {error && error.general && <p className="invoice-form-error">{error.general}</p>}

        </form>

    );
}

export default InvoiceForm;