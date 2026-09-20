import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestSellersSection: React.FC = () => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-nubl-obsidian text-nubl-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-16 pb-4 sm:pb-6 border-b border-nubl-border/40">
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-luxury text-nubl-gold block mb-1.5 sm:mb-2">
              المختارات الملكية
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-wide">
              الأكثر طلباً
            </h2>
          </div>
          <Link
            to="/shop?sort=bestselling"
            className="inline-flex items-center gap-2 text-xs font-medium text-nubl-gold hover:text-nubl-goldSoft transition-colors mt-3 md:mt-0"
          >
            <span>استعراض جميع المنتجات الأكثر طلباً</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
