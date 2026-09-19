import React, { useState } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Boxes,
  Tag,
  Star,
  FileText,
  Settings,
  ExternalLink,
  Menu,
  X,
  Bell,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { orders, products } = useAdmin();
  const location = useLocation();

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const lowStockCount = products.filter((p) => p.stockQuantity <= 12).length;

  const menuItems = [
    { label: 'نظرة عامة', path: '/admin', icon: LayoutDashboard, end: true },
    { label: 'المنتجات', path: '/admin/products', icon: Package, end: false },
    { label: 'الفئات', path: '/admin/categories', icon: Layers, end: false },
    {
      label: 'الطلبات',
      path: '/admin/orders',
      icon: ShoppingBag,
      badge: newOrdersCount > 0 ? newOrdersCount : undefined,
      end: false,
    },
    { label: 'العملاء', path: '/admin/customers', icon: Users, end: false },
    {
      label: 'إدارة المخزون',
      path: '/admin/inventory',
      icon: Boxes,
      badge: lowStockCount > 0 ? lowStockCount : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      end: false,
    },
    { label: 'كوبونات الخصم', path: '/admin/coupons', icon: Tag, end: false },
    { label: 'التقييمات', path: '/admin/reviews', icon: Star, end: false },
    { label: 'محتوى الواجهة', path: '/admin/content', icon: FileText, end: false },
    { label: 'إعدادات المتجر', path: '/admin/settings', icon: Settings, end: false },
  ];

  return (
    <div className="min-h-screen bg-nubl-obsidian text-nubl-ivory flex">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/80 lg:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 inset-y-0 right-0 z-50 w-64 bg-nubl-espresso border-l border-nubl-border/70 flex flex-col justify-between transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-nubl-border flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-light tracking-[0.2em] text-nubl-ivory">
                نُـبْـل
              </span>
              <span className="text-[10px] px-2 py-0.5 bg-nubl-gold/20 text-nubl-gold border border-nubl-gold/30 font-medium">
                لوحة الإدارة
              </span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden text-nubl-muted hover:text-nubl-ivory"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setIsSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 text-xs font-light tracking-wide transition-colors ${
                      isActive
                        ? 'bg-nubl-obsidian text-nubl-gold border-r-2 border-nubl-gold font-medium'
                        : 'text-nubl-muted hover:text-nubl-ivory hover:bg-nubl-obsidian/40'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-nubl-gold/80" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 text-[10px] font-mono border rounded-full ${
                        item.badgeColor || 'bg-red-500/20 text-red-300 border-red-500/30'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* View Storefront Link */}
        <div className="p-4 border-t border-nubl-border">
          <Link
            to="/"
            className="flex items-center justify-between px-3.5 py-2.5 bg-nubl-obsidian border border-nubl-border hover:border-nubl-gold/40 text-xs text-nubl-gold hover:text-nubl-goldSoft transition-colors"
          >
            <span>معاينة واجهة المتجر</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 h-16 bg-nubl-espresso/90 backdrop-blur-md border-b border-nubl-border px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-nubl-ivory hover:text-nubl-gold"
              aria-label="القائمة الجانبية"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-nubl-muted">
              <span>منصة إدارة التجارة الفاخرة</span>
              <span>•</span>
              <span className="text-nubl-gold">فرع دولة الكويت</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-nubl-muted hidden sm:inline">النظام متصل ونشط</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
