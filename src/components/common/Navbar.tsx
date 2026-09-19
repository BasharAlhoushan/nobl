import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, Menu, X, Shield } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { SearchOverlay } from './SearchOverlay';
import { CartDrawer } from './CartDrawer';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

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
    { label: 'البخور', path: '/category/incense' },
    { label: 'المباخر', path: '/category/burners' },
    { label: 'العطور', path: '/category/perfumes' },
    { label: 'الهدايا', path: '/category/gifts' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          isScrolled || !isHomePage
            ? 'bg-nubl-obsidian/90 backdrop-blur-md border-b border-nubl-gold/15 shadow-luxury py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Button & Search */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1 text-nubl-ivory hover:text-nubl-gold transition-colors"
              aria-label="القائمة"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-nubl-ivory hover:text-nubl-gold transition-colors"
              aria-label="البحث"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group text-center"
          >
            <span className="text-2xl md:text-3xl font-light tracking-[0.2em] text-nubl-ivory group-hover:text-nubl-gold transition-colors">
              نُـبْـل
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-nubl-gold"></span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-light tracking-wide">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-nubl-gold font-medium'
                      : 'text-nubl-ivory/80 hover:text-nubl-gold'
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

          {/* Actions: Search, Wishlist, Account, Cart, Admin */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-none text-xs text-nubl-muted hover:text-nubl-gold border border-transparent hover:border-nubl-gold/20 transition-all"
              title="البحث"
            >
              <Search className="w-4 h-4" />
              <span>بحث</span>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative p-2 text-nubl-ivory/80 hover:text-nubl-gold transition-colors"
              title="المفضلة"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-nubl-gold text-nubl-obsidian text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <Link
              to={isAuthenticated ? '/account' : '/login'}
              className="p-2 text-nubl-ivory/80 hover:text-nubl-gold transition-colors"
              title={isAuthenticated ? 'حسابي' : 'تسجيل الدخول'}
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-nubl-ivory/80 hover:text-nubl-gold transition-colors flex items-center gap-1.5"
              title="سلة المشتريات"
            >
              <ShoppingBag className="w-5 h-5 text-nubl-gold" />
              {itemCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-nubl-gold text-nubl-obsidian text-[10px] font-bold flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Discreet Admin Portal Link */}
            <Link
              to="/admin"
              className="hidden sm:flex items-center p-1.5 text-xs text-nubl-subtle hover:text-nubl-gold border border-nubl-border/40 hover:border-nubl-gold/40 transition-colors mr-2"
              title="لوحة الإدارة"
            >
              <Shield className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 w-72 bg-nubl-espresso border-l border-nubl-gold/20 p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-nubl-border">
                <span className="text-2xl font-light tracking-luxury text-nubl-gold">نُـبْـل</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-nubl-muted hover:text-nubl-ivory"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mt-8 flex flex-col gap-5 text-base">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-nubl-ivory hover:text-nubl-gold transition-colors font-light py-1 border-b border-nubl-border/30"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/admin"
                  className="text-xs text-nubl-gold/80 hover:text-nubl-gold flex items-center gap-2 pt-3"
                >
                  <Shield className="w-4 h-4" />
                  <span>لوحة إدارة نُبْل</span>
                </Link>
              </div>
            </div>

            <div className="text-xs text-nubl-muted border-t border-nubl-border pt-4">
              <p className="font-light">دار نُبْل للعطور والبخور الفاخرة</p>
              <p className="text-[11px] text-nubl-subtle mt-1">الكويت — الشحن لجميع المناطق</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />
    </>
  );
};
