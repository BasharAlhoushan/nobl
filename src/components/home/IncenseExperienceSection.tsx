import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Flame, Sparkles } from 'lucide-react';

export const IncenseExperienceSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] py-28 flex items-center bg-nubl-obsidian overflow-hidden">
      {/* Background Dark Photographic Canvas */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/nubl/collections/collection-incense.jpg"
          alt="تجربة البخور الفاخر — نُبْل"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Deep dark gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-nubl-obsidian via-nubl-obsidian/85 to-nubl-obsidian/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian via-transparent to-nubl-obsidian/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 bg-nubl-espresso/80 border border-nubl-gold/30 text-nubl-gold text-xs"
          >
            <Flame className="w-3.5 h-3.5 text-nubl-gold" />
            <span>طقس الطيب العربي</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-light text-nubl-ivory tracking-wide leading-tight"
          >
            حين يصبح العطر جزءاً من المكان
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-nubl-ivory/80 font-light leading-relaxed"
          >
            اختيارات من البخور صُممت لتمنح المكان حضوراً لا يُنسى. ننتقي أندر أخشاب العود المروكي والكمبودي المعتق لتفوح في أرجاء مجالسكم بهدوء وأناقة.
          </motion.p>

          {/* Sensory Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 pt-4 pb-2 text-xs text-nubl-goldSoft"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nubl-gold flex-shrink-0" />
              <span>خشب عود طبيعي 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nubl-gold flex-shrink-0" />
              <span>دخان بارد وكثافة تدوم</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-4"
          >
            <Link
              to="/category/incense"
              className="inline-flex items-center gap-3 px-8 py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow"
            >
              <span>اكتشف البخور</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
