import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import AddContact from './pages/AddContact.jsx';
import EditContact from './pages/EditContact.jsx';
import ContactDetails from './pages/ContactDetails.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/AddContact" element={<AddContact />} />
        <Route path="/ContactDetails/:id" element={<ContactDetails />} />
        <Route path="/edit/:id" element={<EditContact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
