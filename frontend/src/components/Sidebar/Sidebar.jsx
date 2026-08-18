import "./Sidebar.css";

import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import useSidebar from "../../hooks/useSidebar";

import SidebarSkeleton from "./SidebarSkeleton";

function Sidebar({ isMobileOpen, onClose }) {
  const { userData, isLoading } = useUser();
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();

  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  if (isLoading) {
    return <SidebarSkeleton />;
  }

  return (
    <aside className={`sidebar ${isSidebarOpen ? "sidebar--open" : ""}`}>
      <div className="logo">
        EasyInvoice
        <img src="/favicon.png" alt="EasyInvoice Logo"  onClick={() => handleNavigate("/")}/>
        {isMobile && <button className="close" onClick={() => setIsSidebarOpen(false)}>X</button>}
      </div>

      <nav className="menu">
        <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/" onClick={() => setIsSidebarOpen(false)}>New Invoice</NavLink>
        {userData ? (
          <>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/invoices" onClick={() => setIsSidebarOpen(false)}>Invoices</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/clients" onClick={() => setIsSidebarOpen(false)}>Clients</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/business-profile" onClick={() => setIsSidebarOpen(false)}>Business Profile</NavLink>
            {/* <NavLink to="/settings">Settings</NavLink> */}
          </>
        ) : (
          <>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/signin" onClick={() => setIsSidebarOpen(false)}>Sign In</NavLink>
            <NavLink className={({ isActive }) => isActive ? "active" : ""} to="/signup" onClick={() => setIsSidebarOpen(false)}>Sign Up</NavLink>
          </>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;