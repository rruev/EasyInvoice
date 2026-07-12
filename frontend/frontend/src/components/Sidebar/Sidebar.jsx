import "./Sidebar.css";

function Sidebar() {

  return (
    <aside className="sidebar">

      <div className="logo">
        InvoiceFlow
      </div>

      <nav className="menu">

        <a className="active" href="#">
          Dashboard
        </a>

        <a href="#">
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
        </a>

      </nav>

    </aside>
  );
}

export default Sidebar;