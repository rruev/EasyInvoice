import "./InvoicesComponents.css";

function GenericInvoice() {
    return (
        <div className="invoice-container">
            <div className="top-meta">
                <div>Company Name</div>
                <div>Company Street</div>
                <div>Company City</div>
                <div>Company Phone</div>
                <div>Company Email</div>
            </div>

            <div className="client">
                Client Name <br />
                Client Street <br />
                Client City
            </div>

            <div className="invoice-info">
                <div className="row">Invoice No.: 12345</div>
                <div className="row">Issue date: 01.01.2020</div>
                {/* <!-- <div className="row">Leistungsdatum: {{ workedAt }}</div> --> */}
            </div>

            <div className="invoice-title">Invoice</div>

            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Description</th>
                        <th className="right">Quantity</th>
                        {/* <!-- <th>Unit</th> --> */}
                        <th className="right">Price/Unit (&euro;)</th>
                        <th className="right">Total Price (&euro;)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Sample Description</td>
                        <td className="right">1</td>
                        {/* <!-- <td>Tagessatz</td> --> */}
                        <td className="right">100 &euro;</td>
                        <td className="right">100 &euro;</td>
                    </tr>
                    <tr className="sum-row">
                        <td colSpan="3"></td>
                        <td style={{ textAlign: "right" }}>Total</td>
                        <td className="right">100 &euro;</td>
                    </tr>
                </tbody>
            </table>

            {/* <div className="note">Hinweis: Umsatzsteuerbefreit - Kleinunternehmer gem. Par. 6 Abs. 1 Z 27 UStG</div> */}

            <div className="footer">
                <div>
                    <p>Bank details</p>
                    <p>Sample Bank</p>
                    <p>BIC/SWIFT: SAMPLEBIC</p>
                    <p>IBAN: SAMPLEIBAN</p>
                </div>
                <div>
                    <p>SAMPLETAXID</p>
                </div>
            </div>
        </div>
    )
}

export default GenericInvoice;