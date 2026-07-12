import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import StatsCards from "./components/StatsCards/StatsCards";
import InvoiceForm from "./components/InvoiceForm/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview/InvoicePreview";

import "./App.css";

function App() {

  return (
    <div className="app">

      <Sidebar />

      <main className="main">

        <Header />

        <StatsCards />

        <section className="workspace">

          <InvoiceForm />

          <InvoicePreview />

        </section>

      </main>

    </div>
  );
}

export default App;