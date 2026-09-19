import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, RotateCcw } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { ProductCard } from '../../components/product/ProductCard';
import { categories } from '../../data/categories';
import { CategorySlug } from '../../types';

export const ShopPage: React.FC = () => {
  const { products } = useAdmin();
  const [searchParams, setSearchParams] = useSearchParams();

  // URL State
  const initialCategory = searchParams.get('category') as CategorySlug | null;
  const initialSearch = searchParams.get('q') || '';
  const initialSort = searchParams.get('sort') || 'featured';

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [selectedSort, setSelectedSort] = useState<string>(initialSort);
  const [maxPrice, setMaxPrice] = useState<number>(65);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'المتجر | نُبْل — اكتشف روائع الطيب والبخور';
  }, []);

  // Sync with URL if params change
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedSort('featured');
    setMaxPrice(65);
    setOnlyInStock(false);
    setMinRating(0);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.nameEn.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q);
        if (!match) return false;
      }
      // Price limit
      if (p.price > maxPrice) return false;
      // In stock
      if (onlyInStock && !p.inStock) return false;
      // Rating
      if (minRating > 0 && p.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (selectedSort === 'price-asc') return a.price - b.price;
      if (selectedSort === 'price-desc') return b.price - a.price;
      if (selectedSort === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      if (selectedSort === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, searchQuery, maxPrice, onlyInStock, minRating, selectedSort]);

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
            كتالوج نُـبْـل
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-wide mb-4">
            اكتشف نُـبْـل
          </h1>
          <p className="text-xs sm:text-sm text-nubl-muted font-light leading-relaxed">
            استعرض التشكيلة الكاملة من كسر العود المعتق، المباخر المنحوتة، والعطور الملكية. كل قطعة صنعت بعناية فائقة لتليق بذوقكم.
          </p>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-nubl-border/40 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-5 py-2.5 text-xs font-medium tracking-wider whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-nubl-gold text-nubl-obsidian'
                : 'bg-nubl-espresso text-nubl-muted hover:text-nubl-ivory border border-nubl-border'
            }`}
          >
            جميع المقتنيات ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`px-5 py-2.5 text-xs font-medium tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-nubl-gold text-nubl-obsidian'
                  : 'bg-nubl-espresso text-nubl-muted hover:text-nubl-ivory border border-nubl-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Controls Bar: Search, Mobile Filter Trigger, Sort */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-nubl-espresso/60 p-4 border border-nubl-border">
          {/* Live Search */}
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم أو الفئة..."
              className="w-full bg-nubl-obsidian border border-nubl-border px-9 py-2 text-xs text-nubl-ivory placeholder:text-nubl-muted/60 focus:outline-none focus:border-nubl-gold"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-nubl-gold" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-nubl-muted hover:text-nubl-ivory"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-nubl-obsidian border border-nubl-border text-xs text-nubl-ivory hover:text-nubl-gold"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>تصفية النتائج</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-nubl-gold hidden sm:block" />
              <span className="text-nubl-muted hidden sm:inline">الترتيب:</span>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                aria-label="الترتيب حسب"
                className="bg-nubl-obsidian border border-nubl-border text-nubl-ivory px-3 py-2 text-xs focus:outline-none focus:border-nubl-gold cursor-pointer"
              >
                <option value="featured">المميز أولاً</option>
                <option value="bestselling">الأكثر مبيعاً</option>
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block bg-nubl-espresso/60 border border-nubl-border p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-nubl-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-nubl-ivory flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-nubl-gold" />
                تصفية الخيارات
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-nubl-gold hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                إعادة ضبط
              </button>
            </div>

            {/* Price Filter Slider */}
            <div>
              <div className="flex justify-between text-xs text-nubl-muted mb-2">
                <span>الحد الأقصى للسعر:</span>
                <span className="text-nubl-gold font-medium">{maxPrice.toFixed(3)} د.ك</span>
              </div>
              <input
                type="range"
                min={4}
                max={65}
                step={1}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="الحد الأقصى للسعر"
                className="w-full accent-nubl-gold cursor-pointer bg-nubl-obsidian"
              />
              <div className="flex justify-between text-[10px] text-nubl-subtle mt-1">
                <span>4.000 د.ك</span>
                <span>65.000 د.ك</span>
              </div>
            </div>

            {/* Availability Toggle */}
            <div className="pt-4 border-t border-nubl-border">
              <label className="flex items-center justify-between cursor-pointer text-xs">
                <span className="text-nubl-ivory">المنتجات المتوفرة فقط</span>
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="w-4 h-4 accent-nubl-gold cursor-pointer"
                />
              </label>
            </div>

            {/* Minimum Rating */}
            <div className="pt-4 border-t border-nubl-border space-y-2">
              <span className="text-xs text-nubl-muted block">التقييم:</span>
              <div className="flex flex-col gap-1.5 text-xs">
                {[4.8, 4.5, 4.0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={minRating === rating}
                      onChange={() => setMinRating(minRating === rating ? 0 : rating)}
                      className="accent-nubl-gold"
                    />
                    <span className="text-nubl-ivory/80">{rating} نجوم وأعلى</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Area (3 cols on lg) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 bg-nubl-espresso/40 border border-nubl-border p-8">
                <p className="text-base text-nubl-ivory mb-2">لم نعثر على مقتنيات مطابقة لخيارات التصفية</p>
                <p className="text-xs text-nubl-muted mb-6">
                  جرّب تعديل نطاق السعر، أو إزالة الكلمات المفتاحية في البحث.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-nubl-gold text-nubl-obsidian text-xs font-semibold tracking-wider hover:bg-nubl-goldHover transition-colors"
                >
                  عرض جميع المقتنيات
                </button>
              </div>
            ) : (
              <div>
                <div className="text-xs text-nubl-muted mb-4">
                  عرض {filteredProducts.length} من أصل {products.length} مقتنى
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 w-80 max-w-full bg-nubl-espresso border-l border-nubl-border p-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-nubl-border">
                <span className="text-sm font-semibold text-nubl-ivory flex items-center gap-2">
                  <Filter className="w-4 h-4 text-nubl-gold" />
                  تصفية النتائج
                </span>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-nubl-muted hover:text-nubl-ivory"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price */}
              <div>
                <div className="flex justify-between text-xs text-nubl-muted mb-2">
                  <span>الحد الأقصى للسعر:</span>
                  <span className="text-nubl-gold font-medium">{maxPrice.toFixed(3)} د.ك</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={65}
                  step={1}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  aria-label="الحد الأقصى للسعر للهاتف"
                  className="w-full accent-nubl-gold"
                />
              </div>

              {/* In Stock */}
              <div className="pt-4 border-t border-nubl-border">
                <label className="flex items-center justify-between text-xs">
                  <span className="text-nubl-ivory">المتوفر في المخزون فقط</span>
                  <input
                    type="checkbox"
                    checked={onlyInStock}
                    onChange={(e) => setOnlyInStock(e.target.checked)}
                    className="w-4 h-4 accent-nubl-gold"
                  />
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-nubl-border flex gap-3">
              <button
                onClick={() => {
                  handleResetFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-1 py-3 bg-nubl-obsidian border border-nubl-border text-xs text-nubl-muted"
              >
                إعادة ضبط
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold"
              >
                تطبيق ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
