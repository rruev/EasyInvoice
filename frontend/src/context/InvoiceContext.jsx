import { createContext, useMemo } from "react";
import { useState, useEffect, useCallback } from "react";
import invoiceService from "../services/invoice.service";

const InvoiceContext = createContext(null);

const InvoiceProvider = ({ children }) => {
    const [pdfData, setPdfData] = useState(null);
    const [stats, setStats] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [template, setTemplate] = useState(localStorage.getItem('invoiceTemplate') || 'generic');
    const [currentPage, setCurrentPage] = useState(1);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const getAllInvoices = useCallback(async (page = 1, deletedInvoice = null) => {
        setError(null);

        try {
            let invoices = await invoiceService.getAll(page);
            if (page === 1) {
                setInvoices(invoices);
                return;
            } 
            setCurrentPage(page);
            setInvoices((currentInvoices) => {
                if (currentInvoices.some((inv) => invoices.some((newInv) => newInv.id === inv.id))) {
                    return currentInvoices.map((inv) => {
                        const newInv = invoices.find((nInv) => nInv.id === inv.id);
                        if (deletedInvoice && inv.id === deletedInvoice.id) {
                            console.log("Removing invoice with id:", inv.id);
                            return null; 
                        }
                        return newInv || inv;
                    }).filter(inv => inv !== null);
                }
                if (invoices.length === 0 && deletedInvoice) {
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
                    return currentInvoices.filter((inv) => inv.id !== deletedInvoice.id);
                }
                return [...currentInvoices, ...invoices];
            });
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while fetching invoices."] });
        }
    }, []);

    const getInvoiceStats = useCallback(async () => {
        setError(null);

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
            setCurrentPage(1)
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


    const updateInvoiceStatus = useCallback(async (invoiceId, newStatus, page = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            await invoiceService.update(invoiceId, { status: newStatus });
            await Promise.all([
                getAllInvoices(page),
                getInvoiceStats()
            ]);
        } catch (err) {
            setError(err.errors || { general: ["An error occurred while updating the invoice status."] });
        } finally {
            setIsLoading(false);
        }
    }, [getAllInvoices, getInvoiceStats]);

    const removeInvoice = useCallback(async (invoiceId, page = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            const deletedInvoice = await invoiceService.remove(invoiceId);
            await Promise.all([
                getAllInvoices(page, deletedInvoice),
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
        setStats,
        setInvoices,
        onToggleTemplate,
        setError,
        generatePdf,
        getAllInvoices,
        updateInvoiceStatus,
        removeInvoice,
        getInvoiceStats,
        currentPage,
        setCurrentPage
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
        getInvoiceStats,
        currentPage,
        setCurrentPage
    ]);

    return (
        <InvoiceContext value={contextValue}>
            {children}
        </InvoiceContext>
    );
}

export { InvoiceContext, InvoiceProvider };