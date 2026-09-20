import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, Shield, Sun, Moon, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'الرئيسية', path: '/' },
    { label: 'المتجر', path: '/shop' },
    { label: 'البخور والعود', path: '/category/incense' },
    { label: 'المباخر الفاخرة', path: '/category/burners' },
    { label: 'العطور الحصرية', path: '/category/perfumes' },
    { label: 'أطقم الهدايا', path: '/category/gifts' },
  ];

  const isHomePage = location.pathname === '/';
  const isOverDarkHero = isHomePage && !isScrolled;

  const textColorClass = isOverDarkHero
    ? '!text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
    : 'text-[#14110F] dark:!text-white';

  const subtextColorClass = isOverDarkHero
    ? '!text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'
    : 'text-[#635B52] dark:!text-white/80';

  const headerBgClass = isOverDarkHero
    ? 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5'
    : 'bg-white/95 dark:bg-[#0B0A09]/95 backdrop-blur-md border-b border-[#E6E0D6] dark:border-nubl-border shadow-md py-3.5';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${headerBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between relative">
          {/* Start (Right in RTL): Mobile Menu & Search */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-2 rounded-lg lg:hidden ${textColorClass} hover:text-nubl-gold hover:bg-white/10 transition-all cursor-pointer`}
              aria-label="القائمة الرئيسية"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`p-2 rounded-lg lg:hidden ${textColorClass} hover:text-nubl-gold hover:bg-white/10 transition-all cursor-pointer`}
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Desktop Brand Logo */}
            <Link
              to="/"
              className="hidden lg:flex items-center gap-2 group text-center ml-8"
            >
              <span className={`text-2xl md:text-3xl font-light tracking-[0.2em] ${textColorClass} group-hover:text-nubl-gold transition-colors`}>
                نُـبْـل
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-nubl-gold"></span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-light tracking-wide">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative py-1 transition-colors ${
                      isActive
                        ? 'text-nubl-gold font-medium'
                        : `${subtextColorClass} hover:text-nubl-gold`
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-0 h-[1px] bg-nubl-gold" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Brand Logo - Perfectly Centered on Mobile */}
          <Link
            to="/"
            className="lg:hidden absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5 group text-center z-10"
          >
            <span className={`text-2xl font-light tracking-[0.2em] ${textColorClass} group-hover:text-nubl-gold transition-colors`}>
              نُـبْـل
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-nubl-gold"></span>
          </Link>

          {/* End (Left in RTL): Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search (Desktop) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-none text-xs text-nubl-muted hover:text-nubl-gold border border-transparent hover:border-nubl-gold/20 transition-all cursor-pointer ml-1"
              title="البحث"
            >
              <Search className="w-4 h-4" />
              <span>بحث</span>
            </button>

            {/* Theme Toggle Button (Single instance) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${subtextColorClass} hover:text-nubl-gold hover:bg-white/5 transition-transform hover:scale-105 cursor-pointer relative`}
              title={theme === 'dark' ? 'التحويل إلى الوضع الفاتح' : 'التحويل إلى الوضع الداكن'}
              aria-label="تبديل مظهر المتجر"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-nubl-gold" />
              ) : (
                <Moon className="w-5 h-5 text-nubl-gold" />
              )}
            </button>

            {/* Wishlist (Tablets & Desktops) */}
            <Link
              to="/wishlist"
              className={`hidden sm:flex relative p-2 rounded-lg ${subtextColorClass} hover:text-nubl-gold hover:bg-white/5 transition-colors`}
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-nubl-gold text-[#0B0A09] text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account (Tablets & Desktops) */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className={`hidden sm:flex p-2 rounded-lg ${subtextColorClass} hover:text-nubl-gold hover:bg-white/5 transition-colors`}
              title={isAuthenticated ? 'حسابي' : 'تسجيل الدخول'}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger (Always visible) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-lg ${subtextColorClass} hover:text-nubl-gold hover:bg-white/5 transition-colors flex items-center cursor-pointer`}
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 text-nubl-gold" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 -left-0.5 w-4 h-4 rounded-full bg-nubl-gold text-[#0B0A09] text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Discreet Admin Portal Link */}
            <Link
              to="/admin"
              className="hidden md:flex items-center p-1.5 text-xs text-nubl-subtle hover:text-nubl-gold border border-nubl-border hover:border-nubl-gold/40 transition-colors mr-1"
              title="لوحة الإدارة"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Luxury Animated Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-nubl-surface border-l border-nubl-border shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header with Logo & Close button */}
                <div className="flex items-center justify-between pb-5 border-b border-nubl-border">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-light tracking-[0.2em] text-nubl-gold">نُـبْـل</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-nubl-gold"></span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-nubl-muted hover:text-nubl-ivory hover:bg-nubl-espresso/60 transition-colors"
                    aria-label="إغلاق القائمة"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Account & Wishlist Quick Access */}
                <div className="grid grid-cols-2 gap-2.5 my-4">
                  <Link
                    to={isAuthenticated ? '/account' : '/login'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-nubl-espresso/50 border border-nubl-border hover:border-nubl-gold/40 text-center transition-all group"
                  >
                    <User className="w-5 h-5 text-nubl-gold mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-nubl-ivory">
                      {isAuthenticated ? 'حسابي' : 'تسجيل الدخول'}
                    </span>
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-nubl-espresso/50 border border-nubl-border hover:border-nubl-gold/40 text-center transition-all group relative"
                  >
                    <Heart className="w-5 h-5 text-nubl-gold mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-medium text-nubl-ivory">المفضلة</span>
                    {wishlistCount > 0 && (
                      <span className="absolute top-2 left-2 px-1.5 py-0.2 rounded-full bg-nubl-gold text-[#0B0A09] text-[9px] font-bold">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </div>

                {/* Theme Switcher inside Mobile Menu */}
                <div className="flex items-center justify-between py-3 px-3.5 rounded-xl bg-nubl-espresso/40 border border-nubl-border/60 mb-5">
                  <span className="text-xs text-nubl-muted">مظهر المتجر</span>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-nubl-surface border border-nubl-border text-xs text-nubl-ivory hover:border-nubl-gold transition-colors cursor-pointer"
                  >
                    {theme === 'dark' ? (
                      <>
                        <Sun className="w-3.5 h-3.5 text-nubl-gold" />
                        <span>الوضع الفاتح</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-3.5 h-3.5 text-nubl-gold" />
                        <span>الوضع الداكن</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col space-y-1">
                  <span className="text-[11px] font-medium tracking-wider text-nubl-muted uppercase px-2 mb-1">
                    أقسام المتجر
                  </span>
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                          isActive
                            ? 'bg-nubl-gold/10 text-nubl-gold font-medium'
                            : 'text-nubl-ivory hover:bg-nubl-espresso/60 hover:text-nubl-gold'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ChevronLeft className={`w-4 h-4 transition-transform ${isActive ? 'text-nubl-gold' : 'text-nubl-muted/50'}`} />
                      </Link>
                    );
                  })}

                  <div className="pt-3 mt-3 border-t border-nubl-border/40">
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs text-nubl-gold hover:bg-nubl-gold/10 rounded-lg transition-colors"
                    >
                      <Shield className="w-4 h-4" />
                      <span>لوحة إدارة نُبْل (Admin)</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="text-xs text-nubl-muted border-t border-nubl-border pt-4 mt-6">
                <p className="font-light text-nubl-ivory">دار نُـبْـل للعطور والبخور الفاخرة</p>
                <p className="text-[11px] text-nubl-subtle mt-1">الكويت — الشحن لجميع مناطق الخليج</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </>
  );
};
