import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import { useAdmin } from '../../context/AdminContext';
import { ProductCard } from '../../components/product/ProductCard';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useAdmin();

  const category = categories.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (category) {
      document.title = `${category.name} | نُبْل`;
    }
  }, [category]);

  if (!category) {
    return (
      <div className="pt-36 pb-24 text-center bg-nubl-obsidian text-nubl-ivory min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-light mb-4">الفئة المطلوبة غير متوفرة</h2>
        <Link
          to="/shop"
          className="px-6 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold"
        >
          العودة للمتجر
        </Link>
      </div>
    );
  }

  const categoryProducts = products.filter((p) => p.categorySlug === category.slug);

  return (
    <div className="bg-nubl-obsidian text-nubl-ivory min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian via-nubl-obsidian/75 to-nubl-obsidian/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-24 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-nubl-obsidian/80 border border-nubl-gold/30 text-nubl-gold text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{category.nameEn}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide mb-4">
            {category.name}
          </h1>

          <p className="text-base sm:text-lg text-nubl-goldSoft font-light max-w-xl mx-auto mb-3">
            &ldquo;{category.tagline}&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-nubl-muted font-light max-w-2xl mx-auto leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-nubl-border/40">
          <span className="text-xs text-nubl-muted">
            المتوفر في هذه التشكيلة ({categoryProducts.length} مقتنيات)
          </span>
          <Link
            to="/shop"
            className="text-xs text-nubl-gold hover:text-nubl-goldSoft flex items-center gap-1.5"
          >
            <span>عرض كافة المجموعات</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
