import "./InvoicePreview.css";
import { useEffect, useState } from "react";
import GenericTemplate from "../InvoiceTemplates/InvoicesComponents/GenericInvoice";
import RoutesettingTemplate from "../InvoiceTemplates/InvoicesComponents/RoutesettingInvoice";
import useInvoice from "../../hooks/useInvoice";
import { previewPdf } from "../../utils/previewPdf.util";

function InvoicePreview() {
  const { pdfData, setPdfData, onToggleTemplate, template } = useInvoice();

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
        <button
          type="button"
          className="invoice-preview__template-toggle"
          onClick={onToggleTemplate}
          role="switch"
          aria-checked={template === "routesetting"}
          aria-label="Toggle invoice template"
        >
          <span className="invoice-preview__toggle-label">Generic</span>
          <span className="invoice-preview__toggle-track" aria-hidden="true">
            <span className={`invoice-preview__toggle-thumb ${template === "routesetting" ? "invoice-preview__toggle-thumb--right" : ""}`} />
          </span>
          <span className="invoice-preview__toggle-label">Routesetting</span>
        </button>
      </div>

      {pdfUrl ? (
        <>
          <iframe
            className="invoice-preview__frame"
            src={pdfUrl}
            title="PDF preview"
          />
          <button className="invoice-preview__clear" onClick={() => previewPdf(pdfData)}>
            Open PDF preview in new tab
          </button>
        </>
      ) : (
        template === 'routesetting' ? <RoutesettingTemplate /> : <GenericTemplate />
      )}
    </div>
  );
}

export default InvoicePreview;