import "./Header.css";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import useInvoice from "../../hooks/useInvoice";
import useSidebar from "../../hooks/useSidebar";

function Header() {
  const { userData, signOut } = useUser();
  const { setPdfData, setStats, setInvoices } = useInvoice();
  const { isSidebarOpen, setIsSidebarOpen, isMobile } = useSidebar();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    setPdfData(null);
    setStats(null);
    setInvoices([]);
    await signOut();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="container">
        {!isSidebarOpen && isMobile && (
          <button
            type="button"
            className={`mobile-sidebar-toggle ${isSidebarOpen ? "is-open" : ""}`}
            aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setIsSidebarOpen(true)}
          >
            ☰
          </button>
        )}
        <h1>
          Create Invoice
        </h1>

      </div>

      <div className="profile">
        {userData ? (userData.businessName ? userData.businessName : userData.email) : "Guest"}
        {userData && (
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        )}
      </div>

    </header>
  );
}

export default Header;