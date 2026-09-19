import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountLayout: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <div className="pt-36 pb-24 text-center bg-nubl-obsidian text-nubl-ivory min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-light mb-4">يرجى تسجيل الدخول للوصول إلى حسابك</h2>
        <Link
          to="/login"
          className="px-6 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold"
        >
          تسجيل الدخول
        </Link>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { label: 'الملف الشخصي', path: '/account', icon: User, end: true },
    { label: 'طلباتي السابقة', path: '/account/orders', icon: Package, end: false },
    { label: 'دفتر العناوين', path: '/account/addresses', icon: MapPin, end: false },
  ];

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Account Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-10 border-b border-nubl-border/60 gap-4">
          <div>
            <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
              حساب العميل
            </span>
            <h1 className="text-2xl sm:text-3xl font-light text-nubl-ivory">
              أهلاً بك، {user.name}
            </h1>
            <p className="text-xs text-nubl-muted mt-1">{user.email} • {user.phone}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/shop"
              className="text-xs text-nubl-gold hover:underline flex items-center gap-1"
            >
              <span>تصفح المتجر</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-nubl-espresso border border-nubl-border hover:border-red-400/40 text-xs text-nubl-muted hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Layout Grid: Sidebar + Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Account Nav (3 cols) */}
          <div className="lg:col-span-3 bg-nubl-espresso border border-nubl-border p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-xs tracking-wider transition-colors ${
                      isActive
                        ? 'bg-nubl-obsidian text-nubl-gold border-r-2 border-nubl-gold font-medium'
                        : 'text-nubl-muted hover:text-nubl-ivory hover:bg-nubl-obsidian/40'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-nubl-gold/80" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Account Main Content Area (9 cols) */}
          <div className="lg:col-span-9 bg-nubl-espresso border border-nubl-border p-6 sm:p-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
