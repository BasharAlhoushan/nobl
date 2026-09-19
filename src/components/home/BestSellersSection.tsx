import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import { ProductCard } from '../product/ProductCard';

export const BestSellersSection: React.FC = () => {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-24 sm:py-32 bg-nubl-obsidian text-nubl-ivory">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-nubl-border/40">
          <div>
            <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
              المختارات الملكية
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
              الأكثر طلباً
            </h2>
          </div>
          <Link
            to="/shop?sort=bestselling"
            className="inline-flex items-center gap-2 text-xs font-medium text-nubl-gold hover:text-nubl-goldSoft transition-colors mt-4 md:mt-0"
          >
            <span>استعراض جميع المنتجات الأكثر طلباً</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
