import "./InvoiceTemplates.css";
import GenericInvoice from "./InvoicesComponents/GenericInvoice";
import RoutesettingInvoice from "./InvoicesComponents/RoutesettingInvoice";

function InvoiceTemplates({ onClickTemplate, setTemplate }) {
    return (
        <>
            <article className="invoice-template-card" onClick={() => { setTemplate('generic'); onClickTemplate(); }}>
                <div className="invoice-template-card__preview">
                    <p className="invoice-template-card__footer">Generic template</p>
                    <GenericInvoice />
                </div>
            </article>
            <article className="invoice-template-card" onClick={() => { setTemplate('routesetting'); onClickTemplate(); }}>
                <div className="invoice-template-card__preview">
                    <p className="invoice-template-card__footer">Template for routesetters in Austria/Germany</p>
                    <RoutesettingInvoice />
                </div>
            </article>
        </>
    );
}

export default InvoiceTemplates;