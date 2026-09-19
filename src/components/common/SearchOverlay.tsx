import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowLeft, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { Product } from '../../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const { products } = useAdmin();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.trim().toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.fragranceNotes?.top.some((n) => n.toLowerCase().includes(q)) ||
        p.fragranceNotes?.heart.some((n) => n.toLowerCase().includes(q)) ||
        p.fragranceNotes?.base.some((n) => n.toLowerCase().includes(q))
    );
    setResults(filtered);
  }, [query, products]);

  const handleSelect = (slug: string) => {
    onClose();
    navigate(`/product/${slug}`);
  };

  const quickSearches = ['بخور ملكي', 'عود معتق', 'مبخرة بازلت', 'عطر أثر', 'طقم هدايا'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-nubl-obsidian/95 backdrop-blur-xl flex flex-col overflow-y-auto"
        >
          {/* Top Bar */}
          <div className="max-w-6xl w-full mx-auto px-6 py-8 flex items-center justify-between border-b border-nubl-gold/15">
            <div className="flex items-center gap-3">
              <span className="text-xl font-light tracking-luxury text-nubl-gold">نُبْل</span>
              <span className="text-xs uppercase tracking-widest text-nubl-muted border-r border-nubl-gold/20 pr-3 mr-3">
                البحث الحصري
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-nubl-espresso/60 hover:bg-nubl-espresso border border-nubl-gold/20 text-nubl-ivory hover:text-nubl-gold transition-all"
              aria-label="إغلاق البحث"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search Input Container */}
          <div className="max-w-4xl w-full mx-auto px-6 pt-16 pb-8">
            <h2 className="text-3xl md:text-5xl font-light text-center mb-8 text-nubl-ivory tracking-wide">
              ماذا تبحث عن؟
            </h2>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث بالاسم، الفئة، أو النوتات العطرية..."
                className="w-full bg-nubl-espresso/80 border-b-2 border-nubl-gold/40 focus:border-nubl-gold px-12 py-5 text-lg md:text-2xl text-nubl-ivory placeholder:text-nubl-muted/50 focus:outline-none transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 text-nubl-gold/70 pointer-events-none" />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-nubl-muted hover:text-nubl-ivory p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick Search Chips */}
            {!query && (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                <span className="text-xs text-nubl-muted ml-2 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-nubl-gold" />
                  عمليات بحث رائجة:
                </span>
                {quickSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs px-3.5 py-1.5 rounded-full bg-nubl-espresso hover:bg-nubl-surfaceLight border border-nubl-border text-nubl-goldSoft transition-all hover:border-nubl-gold/40"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}

            {/* Live Search Results */}
            <div className="mt-12">
              {query && results.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-nubl-muted mb-2">لم نعثر على نتائج مطابقة لـ &quot;{query}&quot;</p>
                  <p className="text-sm text-nubl-subtle">
                    جرّب البحث بمصطلحات أخرى مثل: بخور، عود، مبخرة، أو عطر.
                  </p>
                </div>
              )}

              {results.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-nubl-border">
                    <span className="text-sm text-nubl-muted">
                      النتائج المتوفرة ({results.length})
                    </span>
                    <Link
                      to={`/shop?q=${encodeURIComponent(query)}`}
                      onClick={onClose}
                      className="text-xs text-nubl-gold hover:underline flex items-center gap-1"
                    >
                      عرض الكل في المتجر
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {results.slice(0, 6).map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSelect(product.slug)}
                        className="group flex gap-4 p-3 bg-nubl-espresso/60 hover:bg-nubl-espresso border border-nubl-border/60 hover:border-nubl-gold/40 transition-all cursor-pointer"
                      >
                        <div className="w-20 h-20 bg-nubl-obsidian overflow-hidden flex-shrink-0">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0">
                          <span className="text-[11px] text-nubl-gold/80 mb-0.5">{product.category}</span>
                          <h4 className="text-sm font-medium text-nubl-ivory group-hover:text-nubl-gold transition-colors truncate">
                            {product.name}
                          </h4>
                          <span className="text-xs font-semibold text-nubl-gold mt-1">
                            {product.price.toFixed(3)} د.ك
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
