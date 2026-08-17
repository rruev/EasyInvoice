import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";
import Invoices from "./pages/Invoices/Invoices";
import Clients from "./pages/Clients/Clients";
import ClientProfileForm from "./pages/Clients/ClientProfileForm/ClientProfileForm";
import BusinessProfile from "./pages/BusinessProfile/BusinessProfile";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import NotFound from "./pages/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* //protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/clients/editBusinessClient/:clientId" element={<ClientProfileForm />} />
              <Route path="/clients/addBusinessClient" element={<ClientProfileForm />} />
              <Route path="/business-profile" element={<BusinessProfile />} />
              {/* <Route path="/settings" element={<></>} /> */}
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;