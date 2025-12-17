import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { AuthProvider } from '../hooks/useAuth';
import { Toaster } from 'react-hot-toast';  
import '../index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-right" /> 
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
