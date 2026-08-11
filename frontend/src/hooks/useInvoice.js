import { use } from "react";
import { InvoiceContext } from "../context/InvoiceContext";

export const useInvoice = () => {
    const ctx = use(InvoiceContext);
    return ctx;
}

export default useInvoice;