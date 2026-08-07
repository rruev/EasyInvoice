import "./InvoicePreview.css";
import { useEffect, useState } from "react";
import GenericTemplate from "../InvoiceTemplates/InvoicesComponents/GenericInvoice";

function InvoicePreview({ pdfData, setPdfData, onBack }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!pdfData || !(pdfData instanceof Blob)) {
      setPdfUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(pdfData);
    setPdfUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [pdfData]);

  return (
    <div className="invoice-preview">
      <h2>Preview</h2>
      <div className="invoice-preview__button-container">

      <button className="invoice-preview__clear" onClick={() => { setPdfUrl(null); setPdfData(null); }}>
        Clear preview
      </button>
      <button className="invoice-preview__choose-template" onClick={onBack}>
        Choose another template
      </button>
      </div>

      {pdfUrl ? (
        <iframe
          className="invoice-preview__frame"
          src={pdfUrl}
          title="PDF preview"
        />
      ) : (
        // <div className="invoice-preview__placeholder">
        //   <p>No PDF generated yet.</p>
        //   <span>Generate an invoice to preview it here.</span>
        // </div>
        <GenericTemplate />
      )}
    </div>
  );
}

export default InvoicePreview;