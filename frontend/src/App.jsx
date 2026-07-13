import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./components/Home/Home";

import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {

  return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/invoices" element={<Link to="/invoices">Invoices</Link>} />
            <Route path="/customers" element={<Link to="/customers">Customers</Link>} />
            <Route path="/business-profile" element={<Link to="/business-profile">Business Profile</Link>} />
            <Route path="/settings" element={<Link to="/settings">Settings</Link>} /> */}
        </Routes>
  );
}

export default App;