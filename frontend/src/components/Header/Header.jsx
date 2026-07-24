import "./Header.css";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Header() {
  const { userData, signOut } = useUser();
  const navigate = useNavigate();

  return (
    <div className="header">

      <h1>
        Create Invoice
      </h1>

      <div className="profile">
        {userData ? (userData.businessName ? userData.businessName : userData.email) : "Guest"}
        {userData && (
          <button className="signout-button" onClick={async (e) => { e.preventDefault(); await signOut(); navigate("/"); }}>
            Sign Out
          </button>
        )}
      </div>

    </div>
  );
}

export default Header;