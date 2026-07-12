import "./InvoicePreview.css";

function InvoicePreview(){

  return (

    <div className="invoice-preview">

      <h2>
        Preview
      </h2>


      <div className="invoice">


        <div className="invoice-header">


          <div>

            <h2>
              My Company
            </h2>

            <p>
              info@company.com
            </p>

          </div>


          <div>

            <strong>
              Invoice #001
            </strong>

            <p>
              11 July 2026
            </p>

          </div>


        </div>


        <h3>
          Bill To
        </h3>


        <p>
          Customer Name
          <br/>
          customer@email.com
        </p>


        <table>

          <tbody>

          <tr>
            <th>
              Description
            </th>

            <th>
              Qty
            </th>

            <th>
              Price
            </th>

          </tr>


          <tr>

            <td>
              Website Design
            </td>

            <td>
              1
            </td>

            <td>
              €500
            </td>

          </tr>


          </tbody>

        </table>


        <div className="total">

          Total: €550

        </div>


      </div>


    </div>

  );
}


export default InvoicePreview;