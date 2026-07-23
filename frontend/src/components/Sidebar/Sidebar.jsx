import "./Sidebar.css";

import { Link } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { userData, signOut } = useUser();
  const navigate = useNavigate();

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
            <Link to="#" onClick={async (e) => { e.preventDefault(); await signOut(); navigate("/"); }}>SignOut</Link>
            {/* For later versions: */}
            <Link to="/invoices">Invoices</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/business-profile">Business Profile</Link>
            {/* <Link to="/settings">Settings</Link> */}
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </nav>

    </aside>
  );
}

export default Sidebar;