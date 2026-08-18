import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { InvoiceProvider } from './context/InvoiceContext.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <InvoiceProvider>
        <SidebarProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </SidebarProvider>
      </InvoiceProvider>
    </AuthProvider>
  </BrowserRouter>,
)