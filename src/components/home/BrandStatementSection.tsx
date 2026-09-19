import React from 'react';
import { motion } from 'framer-motion';

export const BrandStatementSection: React.FC = () => {
  return (
    <section className="relative py-28 sm:py-36 bg-nubl-obsidian text-center overflow-hidden border-b border-nubl-border/30">
      {/* Decorative Subtle Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-nubl-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="block text-2xl md:text-3xl font-light tracking-[0.3em] text-nubl-gold mb-6"
        >
          نُـبْـل
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-light text-nubl-ivory tracking-wide leading-tight mb-8"
        >
          تفاصيل تُشم... وتُذكر.
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-16 h-[1px] bg-nubl-gold mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base sm:text-xl text-nubl-muted font-light leading-relaxed max-w-2xl mx-auto"
        >
          نصنع تجربة تتجاوز العطر، لتصبح جزءاً من المكان والذاكرة. ننتقي النادر، ونعتني بأدق تفاصيل الطيب لنمنحك حضوراً يسبق الكلمات.
        </motion.p>
      </div>
    </section>
  );
};
