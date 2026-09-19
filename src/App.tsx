import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AdminProvider } from './context/AdminContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AppRoutes } from './routes/AppRoutes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AdminProvider>
          <AuthProvider>
            <WishlistProvider>
              <CartProvider>
                <AppRoutes />
              </CartProvider>
            </WishlistProvider>
          </AuthProvider>
        </AdminProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;
