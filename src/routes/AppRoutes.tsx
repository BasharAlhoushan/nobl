import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { StorefrontLayout } from '../components/layout/StorefrontLayout';
import { HomePage } from '../pages/storefront/HomePage';
import { ShopPage } from '../pages/storefront/ShopPage';
import { CategoryPage } from '../pages/storefront/CategoryPage';
import { ProductDetailPage } from '../pages/storefront/ProductDetailPage';
import { CartPage } from '../pages/storefront/CartPage';
import { WishlistPage } from '../pages/storefront/WishlistPage';
import { CheckoutPage } from '../pages/storefront/CheckoutPage';
import { OrderSuccessPage } from '../pages/storefront/OrderSuccessPage';
import { NotFoundPage } from '../pages/storefront/NotFoundPage';

// Account Pages
import { AccountLayout } from '../pages/account/AccountLayout';
import { AccountProfilePage } from '../pages/account/AccountProfilePage';
import { AccountOrdersPage } from '../pages/account/AccountOrdersPage';
import { AccountOrderDetailPage } from '../pages/account/AccountOrderDetailPage';
import { AccountAddressesPage } from '../pages/account/AccountAddressesPage';
import { LoginPage } from '../pages/account/LoginPage';
import { RegisterPage } from '../pages/account/RegisterPage';
import { ForgotPasswordPage } from '../pages/account/ForgotPasswordPage';

// Admin Pages
import { AdminLayout } from '../pages/admin/AdminLayout';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminProductsPage } from '../pages/admin/AdminProductsPage';
import { AdminProductEditPage } from '../pages/admin/AdminProductEditPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminOrderDetailPage as AdminOrderViewPage } from '../pages/admin/AdminOrderDetailPage';
import { AdminCustomersPage } from '../pages/admin/AdminCustomersPage';
import { AdminCustomerDetailPage } from '../pages/admin/AdminCustomerDetailPage';
import { AdminInventoryPage } from '../pages/admin/AdminInventoryPage';
import { AdminCouponsPage } from '../pages/admin/AdminCouponsPage';
import { AdminReviewsPage } from '../pages/admin/AdminReviewsPage';
import { AdminContentPage } from '../pages/admin/AdminContentPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Storefront Routes wrapped with StorefrontLayout */}
      <Route element={<StorefrontLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />

        {/* Authentication Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Customer Account Routes */}
        <Route path="/account" element={<AccountLayout />}>
          <Route index element={<AccountProfilePage />} />
          <Route path="profile" element={<AccountProfilePage />} />
          <Route path="orders" element={<AccountOrdersPage />} />
          <Route path="orders/:id" element={<AccountOrderDetailPage />} />
          <Route path="addresses" element={<AccountAddressesPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* Luxury Admin Portal Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="products/new" element={<AdminProductEditPage />} />
        <Route path="products/:id/edit" element={<AdminProductEditPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="orders/:id" element={<AdminOrderViewPage />} />
        <Route path="customers" element={<AdminCustomersPage />} />
        <Route path="customers/:id" element={<AdminCustomerDetailPage />} />
        <Route path="inventory" element={<AdminInventoryPage />} />
        <Route path="coupons" element={<AdminCouponsPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
        <Route path="content" element={<AdminContentPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
