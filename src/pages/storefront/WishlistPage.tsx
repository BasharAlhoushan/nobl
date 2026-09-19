import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { ProductCard } from '../../components/product/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const { addToCart, setIsCartOpen } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'المفضلة | نُبْل — مقتنياتك المحفوظة';
  }, []);

  const handleAddAllToCart = () => {
    wishlist.forEach((p) => addToCart(p, 1));
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
            مقتنياتك المفضلة
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide">
            قائمة الرغبات
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-nubl-espresso/40 border border-nubl-border max-w-2xl mx-auto p-8">
            <div className="w-16 h-16 rounded-full bg-nubl-obsidian border border-nubl-border flex items-center justify-center text-nubl-gold/50 mx-auto mb-4">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-light text-nubl-ivory mb-2">
              لم تحفظ أي منتج بعد
            </h3>
            <p className="text-xs text-nubl-muted max-w-md mx-auto mb-8 leading-relaxed font-light">
              يمكنك حفظ العطور المفضلة، المباخر المعمارية، وكسر العود المعتّقة للرجوع إليها وشرائها لاحقاً.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow"
            >
              <span>اكتشف المجموعة</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-nubl-border/60">
              <span className="text-xs text-nubl-muted">
                لديك {wishlist.length} مقتنيات في قائمتك
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={clearWishlist}
                  className="text-xs text-nubl-muted hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفريغ القائمة</span>
                </button>
                <button
                  onClick={handleAddAllToCart}
                  className="px-4 py-2 bg-nubl-gold text-nubl-obsidian text-xs font-semibold hover:bg-nubl-goldHover transition-colors flex items-center gap-1.5"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>نقل الكل إلى السلة</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
