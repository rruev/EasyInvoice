function RoutesettingInvoice() {
    return (
        <div className="invoice-container">
            <div className="top-meta">
                <div>HUBER Max</div>
                <div>MainStraße 1</div>
                <div>4020 Innsbruck</div>
                <div>+49 123 456789</div>
                <div>max.huber@example.com</div>
            </div>

            <div className="client">Kletterhalle GmbH <br />
                MainStraße 1 <br />
                4020 Innsbruck</div>

            <div className="invoice-info">
                <div className="row">RechnungNr.: 2020-001</div>
                <div className="row">Rechnungsdatum: 01.01.2020</div>
                <div className="row">Leistungsdatum: 01.01.2020</div>
            </div>

            <div className="invoice-title">Rechnung</div>

            <table>
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Bezeichnung</th>
                        <th className="right">Menge</th>
                        <th>Einheit</th>
                        <th className="right">Preis/Einh. (&euro;)</th>
                        <th className="right">Gesamtpreis (&euro;)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Routenbau / Routesetting in Kletterhalle</td>
                        <td className="right">1</td>
                        <td>Tagessatz</td>
                        <td className="right">300 &euro;</td>
                        <td className="right">300 &euro;</td>
                    </tr>
                    <tr className="sum-row">
                        <td colSpan="4"></td>
                        <td style={{ textAlign: "right" }}>Summe</td>
                        <td className="right">300 &euro;</td>
                    </tr>
                </tbody>
            </table>

            <div className="note">Hinweis: Umsatzsteuerbefreit - Kleinunternehmer gem. Par. 6 Abs. 1 Z 27 UStG</div>

            <div className="footer">
                <div>
                    <p>Bankverbindung</p>
                    <p>Sample Bank</p>
                    <p>BIC/SWIFT: SAMPLEBIC</p>
                    <p>IBAN: SAMPLEIBAN</p>
                </div>
                <div>
                    <p>Steuernummer: 12 456/7894</p>
                </div>
            </div>
        </div>
    );
}

export default RoutesettingInvoice;