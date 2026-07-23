import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Invoices from "./pages/Invoices/Invoices";
import Clients from "./pages/Clients/Clients";
import ClientProfileForm from "./pages/Clients/ClientProfileForm/ClientProfileForm";
import BusinessProfile from "./pages/BusinessProfile/BusinessProfile";

import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <div className="app">

        <Sidebar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/editBusinessClient/:id" element={<ClientProfileForm />} />
          <Route path="/business-profile" element={<BusinessProfile />} />
          <Route path="/settings" element={<></>} />
        </Routes>
      </div>
    </>
  );
}

export default App;