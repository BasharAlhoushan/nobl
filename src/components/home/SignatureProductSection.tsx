import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag, ArrowLeft, ShieldCheck, Check } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const SignatureProductSection: React.FC = () => {
  const signatureProduct = products[0]; // مجموعة نُبْل الخاصة
  const { addToCart } = useCart();

  return (
    <section className="py-24 sm:py-36 bg-nubl-espresso relative overflow-hidden border-y border-nubl-border/30">
      {/* Ambient background light */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-nubl-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Huge Product Photography (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative group"
          >
            <div className="relative aspect-square overflow-hidden bg-nubl-obsidian border border-nubl-border/60 shadow-luxury">
              <img
                src={signatureProduct.images[0]}
                alt={signatureProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute top-6 right-6">
                <span className="px-3.5 py-1.5 bg-nubl-obsidian/90 border border-nubl-gold/40 text-nubl-gold text-xs tracking-widest font-medium uppercase backdrop-blur-md">
                  الإصدار الاستثنائي
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Editorial Product Details (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center space-y-6"
          >
            <div>
              <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
                حملة الإطلاق الرسمية
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-nubl-ivory tracking-wide leading-tight mb-3">
                {signatureProduct.name}
              </h2>
              <p className="text-sm sm:text-base text-nubl-goldSoft font-light">
                اختيارات صُممت لمن يبحث عن حضور لا يُنسى.
              </p>
            </div>

            {/* Rating & Availability */}
            <div className="flex items-center gap-4 text-xs pt-1 pb-2 border-b border-nubl-border/40">
              <div className="flex items-center gap-1 text-nubl-gold">
                <Star className="w-4 h-4 fill-nubl-gold" />
                <span className="font-semibold text-nubl-ivory">{signatureProduct.rating}</span>
                <span className="text-nubl-subtle">({signatureProduct.reviewsCount} تقييم موثق)</span>
              </div>
              <span className="text-nubl-border">•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                متوفر في بوتيك الكويت
              </span>
            </div>

            {/* Narrative Description */}
            <p className="text-sm text-nubl-muted font-light leading-relaxed">
              {signatureProduct.fullDescription}
            </p>

            {/* Fragrance Pyramid Highlights */}
            {signatureProduct.fragranceNotes && (
              <div className="bg-nubl-obsidian/60 p-4 border border-nubl-border/50 space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="text-nubl-gold font-medium min-w-[75px]">القمة:</span>
                  <span className="text-nubl-ivory/80">
                    {signatureProduct.fragranceNotes.top.join(' • ')}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-nubl-gold font-medium min-w-[75px]">القلب:</span>
                  <span className="text-nubl-ivory/80">
                    {signatureProduct.fragranceNotes.heart.join(' • ')}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-nubl-gold font-medium min-w-[75px]">القاعدة:</span>
                  <span className="text-nubl-ivory/80">
                    {signatureProduct.fragranceNotes.base.join(' • ')}
                  </span>
                </div>
              </div>
            )}

            {/* Price & Action */}
            <div className="pt-4 space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-medium text-nubl-gold">
                  {signatureProduct.price.toFixed(3)} <span className="text-sm">د.ك</span>
                </span>
                {signatureProduct.originalPrice && (
                  <span className="text-sm text-nubl-subtle line-through">
                    {signatureProduct.originalPrice.toFixed(3)} د.ك
                  </span>
                )}
                <span className="text-xs text-nubl-muted mr-auto">
                  شامل التوصيل السريع داخل الكويت
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart(signatureProduct, 1)}
                  className="flex-1 py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors shadow-gold-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>اقتنِ العطر الآن</span>
                </button>
                <Link
                  to={`/product/${signatureProduct.slug}`}
                  className="px-6 py-4 bg-nubl-obsidian hover:bg-nubl-surfaceLight text-nubl-ivory border border-nubl-border hover:border-nubl-gold/40 text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
                >
                  <span>استكشف التركيبة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-nubl-subtle pt-2">
              <ShieldCheck className="w-4 h-4 text-nubl-gold" />
              <span>تغليف ملكي فاخر، مثالي للإهداء الشخصي والرسمي</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
