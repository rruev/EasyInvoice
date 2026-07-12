import "./InvoiceForm.css";

function InvoiceForm(){

  return (

    <div className="invoice-form">

      <h2>
        Invoice Details
      </h2>


      <label>
        Customer Name
      </label>

      <input 
        placeholder="Company / Person"
      />


      <label>
        Email
      </label>

      <input 
        placeholder="customer@email.com"
      />


      <label>
        Invoice Number
      </label>

      <input 
        value="INV-001"
        readOnly
      />


      <label>
        Notes
      </label>

      <textarea 
        placeholder="Payment details..."
      />


      <div className="items">

        <h3>
          Items
        </h3>


        <div className="item">

          <input placeholder="Description"/>
          <input placeholder="Qty"/>
          <input placeholder="Price"/>

        </div>


      </div>


      <button>
        Generate PDF
      </button>


    </div>

  );

}


export default InvoiceForm;