import "./Header.css";
import { useUser } from "../../hooks/useUser";

function Header() {
  const { userData } = useUser();

  return (
    <div className="header">

      <h1>
        Create Invoice
      </h1>

      <div className="profile">
        {userData ? userData.businessName : "Guest"}
      </div>

    </div>
  );
}

export default Header;