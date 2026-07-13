import "./InvoiceFormSkeleton.css";

function InvoiceFormSkeleton() {
    return (
        <section className="invoice-form-skeleton" aria-live="polite" aria-busy="true">
            <div className="skeleton-header">
                <div className="skeleton-line skeleton-title" />
            </div>

            <div className="skeleton-fields">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div className="skeleton-field" key={index}>
                        <div className="skeleton-line skeleton-label" />
                        <div className="skeleton-line skeleton-input" />
                    </div>
                ))}
            </div>

            <div className="skeleton-items-block">
                <div className="skeleton-line skeleton-subtitle" />
                <div className="skeleton-item-row">
                    <div className="skeleton-line skeleton-input" />
                    <div className="skeleton-line skeleton-input" />
                    <div className="skeleton-line skeleton-input" />
                </div>
            </div>

            <div className="skeleton-message-wrap">
                <div className="skeleton-pulse-dot" />
                <p className="skeleton-message">
                    Your PDF is generating. A new tab will open for preview.
                </p>
            </div>
        </section>
    );
}

export default InvoiceFormSkeleton;