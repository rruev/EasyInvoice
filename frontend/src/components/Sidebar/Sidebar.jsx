import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import SidebarSkeleton from "./SidebarSkeleton";

function Sidebar() {
  const { userData, isLoading } = useUser();

  const navigate = useNavigate();

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className="sidebar">

      <div className="logo" onClick={() => navigate("/")}>
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