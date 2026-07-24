import "./Sidebar.css";

import { NavLink } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const { userData } = useUser();
  const navigate = useNavigate();

  return (
    <aside className="sidebar">

      <div className="logo">
        EasyInvoice
        <img src="/favicon.png" alt="EasyInvoice Logo" />
      </div>


      <nav className="menu">
        <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/">New Invoice</NavLink>
        {userData ? (
          <>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/invoices">Invoices</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/clients">Clients</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/business-profile">Business Profile</NavLink>
            {/* <NavLink to="/settings">Settings</NavLink> */}
          </>
        ) : (
          <>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/signin">Sign In</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/signup">Sign Up</NavLink>
          </>
        )}
      </nav>

    </aside>
  );
}

export default Sidebar;