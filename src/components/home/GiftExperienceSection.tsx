import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react';

export const GiftExperienceSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-nubl-espresso text-nubl-ivory border-t border-nubl-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Col (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-nubl-obsidian border border-nubl-gold/30 text-nubl-gold text-xs">
              <Gift className="w-3.5 h-3.5" />
              <span>طقوس الإهداء الفاخر</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide leading-tight">
              هديتك... تترك أثراً
            </h2>

            <p className="text-sm sm:text-base text-nubl-muted font-light leading-relaxed">
              صُممت أطقم هدايا نُبْل لتكون ترجمة بصرية وعطرية لتقديرك الرفيع. صناديق صلبة مكسوة بالمخمل الأسود، تضم نخب الطيب من العود والمباخر والعطور، محكمة بشريط ساتاني ناعم وبطاقة إهداء مذهبة تخلد مناسباتكم في الكويت.
            </p>

            {/* Occasion highlights */}
            <div className="pt-2 pb-4 space-y-2.5 text-xs text-nubl-ivory/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-nubl-gold" />
                <span>إهداءات خاصة: مناسبات الأعراس، الترقية، الأعياد، واستقبال الضيوف</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-nubl-gold" />
                <span>خدمة كتابة رسالة الإهداء بخط يدوي متقن مجاناً مع كل طلب</span>
              </div>
            </div>

            <div>
              <Link
                to="/category/gifts"
                className="inline-flex items-center gap-3 px-8 py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow"
              >
                <span>استكشف أطقم الهدايا</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* Visual Col (7 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative group overflow-hidden bg-nubl-obsidian border border-nubl-border/60 shadow-luxury"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/nubl/collections/collection-gifts.jpg"
                alt="طقم هدايا نُبْل الفاخر"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian/70 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
