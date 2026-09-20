import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);

  return (
    <div className="group relative flex flex-col bg-nubl-surface border border-nubl-border/60 hover:border-nubl-gold/50 transition-all duration-500 shadow-sm hover:shadow-luxury rounded-none overflow-hidden">
      {/* Product Badges */}
      <div className="absolute top-2 sm:top-3 right-2 sm:right-3 z-10 flex flex-col gap-1 items-end pointer-events-none">
        {product.tag && (
          <span className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium tracking-wider bg-nubl-surface/90 text-nubl-gold border border-nubl-gold/30 backdrop-blur-sm shadow-sm">
            {product.tag}
          </span>
        )}
        {product.originalPrice && (
          <span className="px-1.5 py-0.5 text-[8px] sm:text-[10px] font-medium bg-red-950/80 text-red-300 border border-red-500/20 shadow-sm">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-2 sm:top-3 left-2 sm:left-3 z-10 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center rounded-none bg-nubl-surface/85 backdrop-blur-md border border-nubl-border/70 transition-all cursor-pointer shadow-sm ${
          isFavorited
            ? 'text-nubl-gold border-nubl-gold/60'
            : 'text-nubl-ivory/70 hover:text-nubl-gold hover:border-nubl-gold/50'
        }`}
        aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorited ? 'fill-nubl-gold' : ''}`} />
      </button>

      {/* Product Image Container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-nubl-surfaceLight"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Secondary image preview on hover if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}

        {/* Quick Add Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm ${
              product.inStock
                ? 'bg-nubl-gold hover:bg-nubl-goldHover text-[#0B0A09]'
                : 'bg-nubl-surface text-nubl-muted cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'إضافة سريعة للسلة' : 'نفد المخزون'}</span>
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between bg-nubl-surface">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-nubl-muted mb-1">
            <span className="text-nubl-gold font-medium tracking-wide truncate max-w-[65%]">{product.category}</span>
            <div className="flex items-center gap-0.5 text-nubl-gold">
              <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-nubl-gold" />
              <span className="font-semibold text-nubl-ivory text-[9px] sm:text-[10px]">{product.rating}</span>
              <span className="text-[9px] sm:text-[10px] text-nubl-subtle">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="text-xs sm:text-base font-medium text-nubl-ivory group-hover:text-nubl-gold transition-colors line-clamp-1 mb-1 leading-snug">
              {product.name}
            </h3>
          </Link>

          <p className="text-[11px] sm:text-xs text-nubl-muted line-clamp-1 sm:line-clamp-2 leading-relaxed font-light mb-2 hidden sm:block">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="pt-2 sm:pt-3 border-t border-nubl-border/50 flex items-center justify-between gap-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
            <span className="text-xs sm:text-base font-semibold text-nubl-gold whitespace-nowrap">
              {product.price.toFixed(3)} <span className="text-[9px] sm:text-xs font-normal">د.ك</span>
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-nubl-subtle line-through whitespace-nowrap">
                {product.originalPrice.toFixed(3)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart Button */}
          <button
            type="button"
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="md:hidden p-1.5 sm:p-2 rounded-none bg-nubl-gold/15 text-nubl-gold hover:bg-nubl-gold hover:text-[#0B0A09] active:scale-90 transition-all border border-nubl-gold/30 cursor-pointer flex-shrink-0"
            aria-label="إضافة للسلة"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
