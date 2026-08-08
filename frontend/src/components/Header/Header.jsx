import "./Header.css";
import { useUser } from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

function Header({ setPdfData }) {
  const { userData, signOut } = useUser();
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    setPdfData(null);
    await signOut();
    navigate("/");
  };

  return (
    <div className="header">

      <h1>
        Create Invoice
      </h1>

      <div className="profile">
        {userData ? (userData.businessName ? userData.businessName : userData.email) : "Guest"}
        {userData && (
          <button className="signout-button" onClick={handleSignOut}>
            Sign Out
          </button>
        )}
      </div>

    </div>
  );
}

export default Header;