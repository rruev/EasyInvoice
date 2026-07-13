import "./Sidebar.css";

function Sidebar() {

  return (
    <aside className="sidebar">

      <div className="logo">
        EasyInvoice 
        <img src="/favicon.png" alt="EasyInvoice Logo" />
      </div>

      <nav className="menu">

        <a className="active" href="#">
          Create New Invoice +
        </a>

        {/* For later versions: */}
        {/* <a href="#">
          Invoices
        </a>

        <a href="#">
          Customers
        </a>

        <a href="#">
          Business Profile
        </a>

        <a href="#">
          Settings
        </a> */}

      </nav>

    </aside>
  );
}

export default Sidebar;