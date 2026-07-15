import { useState } from "react";
import invoiceService from "../services/invoice.service";

export const useInvoice = () => {
  const [pdfData, setPdfData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePdf = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
        const pdfBlob = await invoiceService.fetchPdf(formData);
        if (pdfBlob) {
            setPdfData(pdfBlob);
            return pdfBlob;
        } else {
            setError("Failed to generate PDF.");
        }
    } catch (err) {
        setError("An error occurred while generating the PDF.");
    } finally {
        setIsLoading(false);
    }
  }

  const updateInvoiceStatus = async (invoiceId, newStatus) => {
    setIsLoading(true);
    setError(null);

    try {
        const response = await invoiceService.update(invoiceId, { status: newStatus });
        if (response) {
            return response;
        } else {
            setError("Failed to update invoice status.");
        }
    } catch (err) {
        setError("An error occurred while updating the invoice status.");
    } finally {
        setIsLoading(false);
    }
  }

  const removeInvoice = async (invoiceId) => {
    setIsLoading(true);
    setError(null);

    try {
        const response = await invoiceService.remove(invoiceId);
        if (response) {
            return response;
        } else {
            setError("Failed to remove invoice.");
        }
    } catch (err) {
        setError("An error occurred while removing the invoice.");
    } finally {
        setIsLoading(false);
    }
  }

  return { pdfData, isLoading, error, generatePdf, updateInvoiceStatus, removeInvoice };
}

export default useInvoice;