import "./InvoiceForm.css";
import InvoiceFormSkeleton from "./InvoiceFormSkeleton";
import { useState, useEffect, useRef } from "react";
import useInvoice from "../../hooks/useInvoice";
import { useUser } from "../../hooks/useUser";
import { useClient } from "../../hooks/useClient";
import { invoiceFormSchema } from "../../schemas/invoiceForm.schema";
import { previewPdf } from "../../utils/previewPdf.util";
import { 
    formatIban, 
    formatDate, 
    prepareAddress, 
    parseAddress, 
} from "../../utils/formatFormData";
import * as z from "zod";

function InvoiceForm() {
    const { userData, fetchUser } = useUser();
    const { createClient, isLoading: isClientLoading } = useClient();
    const { generatePdf, template, isLoading, error, setError } = useInvoice();

    const clients = userData?.clients ?? [];

    const [clientName, setClientName] = useState("");
    const [clientStreet, setClientStreet] = useState("");
    const [clientStreetNum, setClientStreetNum] = useState("");
    const [clientPostalCode, setClientPostalCode] = useState("");
    const [clientCity, setClientCity] = useState("");
    const [selectedClient, setSelectedClient] = useState("");
    const [addNewClient, setAddNewClient] = useState(false);
    const [updatingUserData, setUpdatingUserData] = useState(false);

    const [formData, setFormData] = useState({});
    const [showReset, setShowReset] = useState(false);
    const [items, setItems] = useState([]);

    const formRef = useRef(null);
    
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const now = `${day}.${month}.${year}`;

    useEffect(() => {
        if (template === 'routesetting') {
            setItems([{
                id: crypto.randomUUID(),
                description: 'Routenbau / Routesetting in Kletterhalle',
                quantity: "1",
                price: "",
            }]);
        } else {
            setItems([{
                id: crypto.randomUUID(),
                description: "",
                quantity: "1",
                price: "",
            }]);
        }
    }, [template]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const data = new FormData(form);
        const formData = Object.fromEntries(data.entries());

        const items = [];
        for (let i = 0; i < data.getAll("itemDescription").length; i++) {
            items.push({
                description: data.getAll("itemDescription")[i],
                quantity: data.getAll("quantity")[i],
                price: data.getAll("price")[i],
            });
        }

        formData.items = items;
        setItems(prevItems => {
            const updatedItems = items.map((item, index) => {
                return {
                    id: prevItems[index].id,
                    description: item.description,
                    quantity: item.quantity,
                    price: item.price,
                };
            });
            return updatedItems;
        });

        
        if (userData) {
            const client = clients.find(c => c.id === selectedClient);
            
            formData.clientId = client?.id;
            formData.clientName = client?.name;
            formData.clientAddress = client?.address;
        } else {
            formData.clientAddress = prepareAddress(
                formData.clientStreet, 
                formData.clientStreetNum, 
                formData.clientPostalCode, 
                formData.clientCity
            );
        }

        formData.businessAddress = prepareAddress(
            formData.businessStreet, 
            formData.businessStreetNum, 
            formData.businessPostalCode, 
            formData.businessCity
        );
        

        formData.template = template;

        const pdfData = await generatePdf(formData);
        if (pdfData) {
            setShowReset(true);
            await fetchUser();
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
        const clientAddress = prepareAddress(clientStreet, clientStreetNum, clientPostalCode, clientCity);
        const client = await createClient({ name: clientName, address: clientAddress });
        setUpdatingUserData(true);
        await fetchUser();
        setUpdatingUserData(false);
        setSelectedClient(client.id);
        setAddNewClient(false);
        setClientName("");
        setClientStreet("");
        setClientStreetNum("");
        setClientPostalCode("");
        setClientCity("");
    };

    const handleReset = () => {
        setFormData({});
        setItems([{
            id: crypto.randomUUID(),
            description: template === 'routesetting' ? 'Routenbau / Routesetting in Kletterhalle' : '',
            quantity: "1",
            price: "",
        }]);
        formRef.current.reset();
        setShowReset(false);
    };

    const handleAddItem = () => {
        const newItem = {
            id: crypto.randomUUID(),
            description: "",
            quantity: "1",
            price: "",
        }
        setItems([...items, newItem]);
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

            <div className="client-picker__details">
                <input
                    name="businessStreet"
                    defaultValue={formData?.businessStreet || parseAddress(userData?.businessAddress).street}
                    placeholder="Street"
                    onChange={handleChange}
                />
                <input
                    name="businessStreetNum"
                    defaultValue={formData?.businessStreetNum || parseAddress(userData?.businessAddress).num}
                    placeholder="No."
                    onChange={handleChange}
                />
                <input
                    name="businessPostalCode"
                    defaultValue={formData?.businessPostalCode || parseAddress(userData?.businessAddress).postal}
                    placeholder="Postal code"
                    onChange={handleChange}
                />
                <input
                    name="businessCity"
                    defaultValue={formData?.businessCity || parseAddress(userData?.businessAddress).city}
                    placeholder="City"
                    onChange={handleChange}
                />
            </div>
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
                        defaultValue={formData?.clientName}
                        onChange={handleChange}
                    />
                    {error && error.clientName && <p className="invoice-form-error">{error.clientName[0]}</p>}

                    <label>
                        Client Address
                    </label>
                    <div className="client-picker__details">
                        <input
                            name="clientStreet"
                            placeholder="Street"
                            defaultValue={formData?.clientStreet}
                            onChange={handleChange}
                        />
                        <input
                            name="clientStreetNum"
                            placeholder="No."
                            defaultValue={formData?.clientStreetNum}
                            onChange={handleChange}
                        />
                        <input
                            name="clientPostalCode"
                            placeholder="Postal code"
                            defaultValue={formData?.clientPostalCode}
                            onChange={handleChange}
                        />
                        <input
                            name="clientCity"
                            placeholder="City"
                            defaultValue={formData?.clientCity}
                            onChange={handleChange}
                        />
                    </div>
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
                                    <div className="client-picker__details">
                                        <input
                                            placeholder="Street"
                                            name="clientStreet"
                                            value={clientStreet}
                                            onChange={(e) => { setClientStreet(e.target.value); handleChange(e); }}
                                        />
                                        <input
                                            placeholder="No."
                                            name="clientStreetNum"
                                            value={clientStreetNum}
                                            onChange={(e) => { setClientStreetNum(e.target.value); handleChange(e); }}
                                        />
                                        <input
                                            placeholder="Postal code"
                                            name="clientPostalCode"
                                            value={clientPostalCode}
                                            onChange={(e) => { setClientPostalCode(e.target.value); handleChange(e); }}
                                        />
                                        <input
                                            placeholder="City"
                                            name="clientCity"
                                            value={clientCity}
                                            onChange={(e) => { setClientCity(e.target.value); handleChange(e); }}
                                        />
                                    </div>
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
                                    {isClientLoading || updatingUserData ? (
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

                {/* <div className="item">

                    <input
                        name="itemDescription"
                        defaultValue={template === 'routesetting' ? 'Routenbau / Routesetting in Kletterhalle' : items[0]?.description}
                        placeholder="Description"
                        readOnly={template === 'routesetting'}
                    />
                    <input name="quantity" placeholder="Qty" defaultValue={items[0]?.quantity || '1'} onChange={handleChange} />
                    {error && error.quantity && <p className="invoice-form-error">{error.quantity[0]}</p>}
                    <input name="price" placeholder="Price" defaultValue={items[0]?.price} onChange={handleChange} />
                    {error && error.price && <p className="invoice-form-error">{error.price[0]}</p>}

                </div> */}

                {items.map(item =>
                    <div key={item.id} className="item">
                        <input
                            name="itemDescription"
                            defaultValue={item.description}
                            placeholder="Description"
                        />
                        <input name="quantity" placeholder="Qty" defaultValue={item.quantity || '1'} onChange={handleChange} />
                        <input name="price" placeholder="Price" defaultValue={item.price} onChange={handleChange} />
                        {template === 'generic' && items.length > 1 && (
                            <button className="remove" type="button" onClick={() => {
                                setItems(items.filter(i => i.id !== item.id));
                            }}>-</button>
                        )}
                    </div>
                )}
                {error && error.quantity && <p className="invoice-form-error">{error.quantity[0]}</p>}
                {error && error.price && <p className="invoice-form-error">{error.price[0]}</p>}

                {template === 'generic' && (
                    <button className="addItem" type="button" onClick={handleAddItem}>
                        Add Item
                    </button>
                )}

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