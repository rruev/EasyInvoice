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
      <Route path="/invoices" element={<></>} />
      <Route path="/customers" element={<></>} />
      <Route path="/business-profile" element={<></>} />
      <Route path="/settings" element={<></>} />
    </Routes>
  );
}

export default App;