import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronRight, ChevronLeft, Quote } from 'lucide-react';
import { initialReviews } from '../../data/reviews';

export const CustomerReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = initialReviews.filter((r) => r.status === 'approved');

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const current = reviews[currentIndex];

  return (
    <section className="py-28 sm:py-36 bg-nubl-espresso text-nubl-ivory relative overflow-hidden border-t border-nubl-border/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
            انطباعات أصحاب الذوق
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-wide">
            تجارب من الكويت
          </h2>
        </div>

        {/* Large Editorial Quotation */}
        <div className="relative min-h-[260px] flex flex-col items-center justify-center text-center">
          <Quote className="w-12 h-12 text-nubl-gold/20 mb-6 transform -scale-x-100" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="space-y-6 max-w-3xl"
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-nubl-ivory leading-relaxed">
                &ldquo;{current.comment}&rdquo;
              </p>

              {/* Rating stars */}
              <div className="flex items-center justify-center gap-1 text-nubl-gold">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-nubl-gold" />
                ))}
              </div>

              {/* Customer details */}
              <div>
                <h4 className="text-base font-medium text-nubl-goldSoft">
                  {current.customerName}
                </h4>
                <p className="text-xs text-nubl-muted mt-1 font-light">
                  {current.customerCity} • اقتنى: {current.productName}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mt-12 pt-6 border-t border-nubl-border/40">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-nubl-obsidian border border-nubl-border hover:border-nubl-gold/40 text-nubl-ivory hover:text-nubl-gold transition-colors"
            aria-label="السابق"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs text-nubl-muted tracking-widest font-mono">
            0{currentIndex + 1} / 0{reviews.length}
          </span>

          <button
            onClick={next}
            className="p-3 rounded-full bg-nubl-obsidian border border-nubl-border hover:border-nubl-gold/40 text-nubl-ivory hover:text-nubl-gold transition-colors"
            aria-label="التالي"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
