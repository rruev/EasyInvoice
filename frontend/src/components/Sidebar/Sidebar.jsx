import "./Sidebar.css";

import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";

function Sidebar() {
  const { userData } = useUser();


  return (
    <aside className="sidebar">

      <div className="logo">
        EasyInvoice
        <img src="/favicon.png" alt="EasyInvoice Logo" />
      </div>


      <nav className="menu">
        <Link className="active" to="/">Create New Invoice +</Link>
        {userData ? (
          <>
            <div>{userData.email}</div>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {/* For later versions: */}
        {/* <Link to="/invoices">Invoices</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/business-profile">Business Profile</Link>
        <Link to="/settings">Settings</Link> */}
      </nav>

    </aside>
  );
}

export default Sidebar;