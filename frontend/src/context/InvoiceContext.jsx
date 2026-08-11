import { createContext, useMemo } from "react";
import { useState, useEffect, useCallback } from "react";
import invoiceService from "../services/invoice.service";

const InvoiceContext = createContext(null);

const InvoiceProvider = ({ children }) => {
    const [pdfData, setPdfData] = useState(null);
    const [stats, setStats] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [template, setTemplate] = useState(localStorage.getItem('invoiceTemplate') || 'generic');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllInvoices = useCallback(async () => {
        setError(null);
        setInvoices([]);

        try {
            const invoices = await invoiceService.getAll();
            setInvoices(invoices);
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while fetching invoices."] });
        }
    }, []);

    const getInvoiceStats = useCallback(async () => {
        setError(null);
        setStats(null);

        try {
            const statsData = await invoiceService.getStats();
            setStats(statsData);
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while fetching invoice statistics."] });
        }
    }, []);

    const generatePdf = useCallback(async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const pdfBlob = await invoiceService.fetchPdf(formData);
            setPdfData(pdfBlob);
            await Promise.all([
                getAllInvoices(),
                getInvoiceStats()
            ]);
            return pdfBlob;
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while generating the PDF."] });
        } finally {
            setIsLoading(false);
        }
    }, [getAllInvoices, getInvoiceStats]);


    const updateInvoiceStatus = useCallback(async (invoiceId, newStatus) => {
        setIsLoading(true);
        setError(null);

        try {
            await invoiceService.update(invoiceId, { status: newStatus });
            await Promise.all([
                getAllInvoices(),
                getInvoiceStats()
            ]);
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while updating the invoice status."] });
        } finally {
            setIsLoading(false);
        }
    }, [getAllInvoices, getInvoiceStats]);

    const removeInvoice = useCallback(async (invoiceId) => {
        setIsLoading(true);
        setError(null);

        try {
            await invoiceService.remove(invoiceId);
            await Promise.all([
                getAllInvoices(),
                getInvoiceStats()
            ]);
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while removing the invoice."] });
        } finally {
            setIsLoading(false);
        }
    }, [getAllInvoices, getInvoiceStats]);

    const onToggleTemplate = useCallback(() => {
        setTemplate((currentTemplate) => (currentTemplate === 'generic' ? 'routesetting' : 'generic'));
    }, []);

    useEffect(() => {
        const fetchInvoices = async () => {
            await Promise.all([
                getAllInvoices(),
                getInvoiceStats()
            ]);
        };

        fetchInvoices();
    }, [getAllInvoices, getInvoiceStats]);

    useEffect(() => {
        localStorage.setItem('invoiceTemplate', template);
    }, [template]);

    const contextValue = useMemo(() => ({
        pdfData,
        setPdfData,
        stats,
        invoices,
        template,
        isLoading,
        error,
        onToggleTemplate,
        setError,
        generatePdf,
        getAllInvoices,
        updateInvoiceStatus,
        removeInvoice,
        getInvoiceStats
    }), [
        pdfData,
        setPdfData,
        stats,
        invoices,
        template,
        isLoading,
        error,
        setError,
        generatePdf,
        getAllInvoices,
        updateInvoiceStatus,
        removeInvoice,
        onToggleTemplate,
        getInvoiceStats
    ]);

    return (
        <InvoiceContext value={contextValue}>
            {children}
        </InvoiceContext>
    );
}

export { InvoiceContext, InvoiceProvider };