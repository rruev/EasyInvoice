import "./InvoiceForm.css";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";
import { useState, useRef } from "react";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { invoiceFormSchema } from "../../schemas/invoiceForm.schema";
import { previewPdf } from "../../utils/previewPdf.util";
import { formatIban, formatDate } from "../../utils/formatFormData";
import * as z from "zod";

function InvoiceForm({ generatePdf, isLoading, error, setError, template }) {
    const { userData, fetchUser } = useUser();
    const { createClient, isLoading: isClientLoading } = useClient();

    const clients = userData?.clients ?? [];

    const [addNewClient, setAddNewClient] = useState(false);
    const [clientName, setClientName] = useState("");
    const [clientAddress, setClientAddress] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [formData, setFormData] = useState({});
    const [showReset, setShowReset] = useState(false);

    const formRef = useRef(null);

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
            const client = clients.find(c => c.id === selectedClient);

            formData.clientId = client?.id;
            formData.clientName = client?.name;
            formData.clientAddress = client?.address;
        }

        formData.template = template;

        const pdfData = await generatePdf(formData);
        await fetchUser();
        if (pdfData) {
            setShowReset(true);
        }
    };

    const handleChange = (e) => {
        let data = { ...formData, [e.target.name]: e.target.value };

        if (e.target.value.length === 0) {
            data[e.target.name] = undefined;
        }

        try {
            if (e.target.name === "iban" && e.target.value.length > 0) {
                e.target.value = formatIban(e.target.value);
                data[e.target.name] = e.target.value;
            }

            if (e.target.name === "workedAt" && e.target.value.length > 0) {
                e.target.value = formatDate(e.target.value);
                data[e.target.name] = e.target.value;
            }

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
        const client = await createClient({ name: clientName, address: clientAddress });
        setSelectedClient(client.id);
        setClientName("");
        setClientAddress("");
        setAddNewClient(false);
        await fetchUser();
    };

    const handleReset = () => {
        setFormData({});
        formRef.current.reset();
        setShowReset(false);
    };

    if (isLoading) {
        return <InvoiceFormSkeleton />;
    }
    return (

        <form ref={formRef} className="invoice-form" onSubmit={handleSubmit}>

            <h2>
                Invoice Details
            </h2>
            <button
                type="button"
                className="invoice-form__button"
                onClick={handleReset}
                style={{ display: showReset ? 'inline-block' : 'none' }}
            >
                Reset
            </button>

            <label>
                Business Name
            </label>

            <input
                name="businessName"
                defaultValue={formData?.businessName || userData?.businessName}
                placeholder="Business / Person"
                onChange={handleChange}
            />
            {error && error.businessName && <p className="invoice-form-error">{error.businessName[0]}</p>}

            <label>
                Business Address
            </label>

            <input
                name="businessAddress"
                defaultValue={formData?.businessAddress || userData?.businessAddress}
                placeholder="Format: Mainstraße, 123 6020 Innsbruck"
                onChange={handleChange}
            />
            {error && error.businessAddress && <p className="invoice-form-error">{error.businessAddress[0]}</p>}

            <label>
                Business Phone
            </label>

            <input
                name="businessPhone"
                defaultValue={formData?.businessPhone || userData?.phoneNumber}
                placeholder="+43 123 456789"
                onChange={handleChange}
            />
            {error && error.businessPhone && <p className="invoice-form-error">{error.businessPhone[0]}</p>}


            <label>
                Email
            </label>

            <input
                name="businessEmail"
                defaultValue={formData?.businessEmail || userData?.businessEmail}
                placeholder="company@email.com"
                onChange={handleChange}
            />
            {error && error.businessEmail && <p className="invoice-form-error">{error.businessEmail[0]}</p>}

            <label>
                Bank Name
            </label>

            <input
                name="bankName"
                defaultValue={formData?.bankName || userData?.bankName}
                placeholder="Revolut Bank UAB"
                onChange={handleChange}
            />
            {error && error.bankName && <p className="invoice-form-error">{error.bankName[0]}</p>}

            <label>
                BIC/SWIFT
            </label>

            <input
                name="bic"
                defaultValue={formData?.bic || userData?.bic}
                placeholder="REVOLT21"
                onChange={handleChange}
            />
            {error && error.bic && <p className="invoice-form-error">{error.bic[0]}</p>}

            <label>
                IBAN
            </label>

            <input
                name="iban"
                defaultValue={userData?.iban}
                placeholder="LT15 5289 8043 9331 7202"
                onChange={handleChange}
            />
            {error && error.iban && <p className="invoice-form-error">{error.iban[0]}</p>}

            <label>
                Steuernummer / Tax ID
            </label>

            <input
                name="taxId"
                defaultValue={formData?.taxId || userData?.taxId}
                placeholder="Steuernummer"
                onChange={handleChange}
            />
            {error && error.taxId && <p className="invoice-form-error">{error.taxId[0]}</p>}

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
                        value={formData?.clientId || selectedClient}
                        onChange={(e) => { setSelectedClient(e.target.value); handleChange(e); }}
                    >
                        <option value="">Select a client...</option>
                        {clients.length ? (
                            clients.map((client, index) => (
                                <option key={client.id} value={client.id}>
                                    {client.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No clients available</option>
                        )}
                    </select>
                    {error && error.clientName && <p className="invoice-form-error">{error.clientName[0]}</p>}
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
                                    className="invoice-form__button"
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
                                <button className="invoice-form__button" type="button" onClick={() => setAddNewClient(false)} disabled={isClientLoading}>
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <button className="invoice-form__button" type="button" onClick={() => setAddNewClient(true)}>
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
                defaultValue={formData?.invoiceNum || userData?.nextInvoiceNum}
                placeholder="Format: YYYY-001"
                onChange={handleChange}
            />
            {error && error.invoiceNum && <p className="invoice-form-error">{error.invoiceNum[0]}</p>}

            <label>
                Issue Date
            </label>

            <input
                name="issuedAt"
                defaultValue={formData?.issuedAt || now}
                onChange={handleChange}
            />
            {error && error.issuedAt && <p className="invoice-form-error">{error.issuedAt[0]}</p>}

            {template === 'routesetting' &&
                <>
                    <label>
                        Service Date
                    </label>

                    <input
                        name="workedAt"
                        placeholder="DD.MM.YYYY"
                        defaultValue={formData?.workedAt}
                        onChange={handleChange}
                    />
                    {error && error.workedAt && <p className="invoice-form-error">{error.workedAt[0]}</p>}
                </>
            }


            <div className="items">

                <h3>
                    Items
                </h3>

                <div className="item">

                    <input
                        name="itemDescription"
                        defaultValue={template === 'routesetting' ? 'Routenbau / Routesetting in Kletterhalle' : formData?.itemDescription}
                        placeholder="Description"
                        readOnly={template === 'routesetting'}
                    />
                    <input name="quantity" placeholder="Qty" defaultValue={formData?.quantity || '1'} onChange={handleChange} />
                    {error && error.quantity && <p className="invoice-form-error">{error.quantity[0]}</p>}
                    <input name="price" placeholder="Price" defaultValue={formData?.price} onChange={handleChange} />
                    {error && error.price && <p className="invoice-form-error">{error.price[0]}</p>}

                </div>


            </div>

            <button
                type="submit"
                disabled={isLoading || isClientLoading || Object.keys(error || {}).length > 0}
                aria-busy={isLoading || isClientLoading}
                className={isLoading || isClientLoading || Object.keys(error || {}).length > 0 ? "invoice-form__button-disabled" : "invoice-form__button"}
            >
                Generate PDF
            </button>

            {error && error.general && <p className="invoice-form-error">{error.general[0]}</p>}

        </form>

    );
}

export default InvoiceForm;