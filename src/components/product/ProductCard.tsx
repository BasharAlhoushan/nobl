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
    <div className="group relative flex flex-col bg-nubl-espresso/40 hover:bg-nubl-espresso/90 border border-nubl-border/50 hover:border-nubl-gold/30 transition-all duration-500">
      {/* Product Badges */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end pointer-events-none">
        {product.tag && (
          <span className="px-2.5 py-1 text-[10px] font-medium tracking-wider bg-nubl-obsidian/90 text-nubl-gold border border-nubl-gold/30 backdrop-blur-sm">
            {product.tag}
          </span>
        )}
        {product.originalPrice && (
          <span className="px-2 py-0.5 text-[10px] font-medium bg-red-950/80 text-red-300 border border-red-500/20">
            خصم {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product);
        }}
        className={`absolute top-3 left-3 z-10 w-9 h-9 flex items-center justify-center rounded-none bg-nubl-obsidian/70 backdrop-blur-md border border-nubl-border/60 transition-all ${
          isFavorited
            ? 'text-nubl-gold border-nubl-gold/50'
            : 'text-nubl-ivory/70 hover:text-nubl-gold hover:border-nubl-gold/40'
        }`}
        aria-label={isFavorited ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
      >
        <Heart className={`w-4 h-4 ${isFavorited ? 'fill-nubl-gold' : ''}`} />
      </button>

      {/* Product Image Container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-nubl-obsidian"
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
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-nubl-obsidian/95 via-nubl-obsidian/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden md:block">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(product, 1);
            }}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-4 text-xs font-medium tracking-wider flex items-center justify-center gap-2 transition-colors ${
              product.inStock
                ? 'bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian'
                : 'bg-nubl-surface text-nubl-muted cursor-not-allowed'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.inStock ? 'إضافة سريعة للسلة' : 'نفد المخزون'}</span>
          </button>
        </div>
      </Link>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-nubl-muted mb-1.5">
            <span className="text-nubl-gold/80 tracking-wide">{product.category}</span>
            <div className="flex items-center gap-1 text-nubl-gold">
              <Star className="w-3 h-3 fill-nubl-gold" />
              <span className="font-medium text-nubl-ivory text-[10px]">{product.rating}</span>
              <span className="text-[10px] text-nubl-subtle">({product.reviewsCount})</span>
            </div>
          </div>

          <Link to={`/product/${product.slug}`}>
            <h3 className="text-sm sm:text-base font-light text-nubl-ivory group-hover:text-nubl-gold transition-colors line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-nubl-muted/70 line-clamp-2 leading-relaxed font-light mb-3">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="pt-3 border-t border-nubl-border/40 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-medium text-nubl-gold">
              {product.price.toFixed(3)} <span className="text-xs font-normal">د.ك</span>
            </span>
            {product.originalPrice && (
              <span className="text-xs text-nubl-subtle line-through">
                {product.originalPrice.toFixed(3)}
              </span>
            )}
          </div>

          {/* Mobile Add to Cart Button */}
          <button
            onClick={() => addToCart(product, 1)}
            disabled={!product.inStock}
            className="md:hidden p-2 rounded-none bg-nubl-gold/15 text-nubl-gold hover:bg-nubl-gold hover:text-nubl-obsidian transition-colors border border-nubl-gold/30"
            aria-label="إضافة للسلة"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
