import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-nubl-obsidian">
      {/* Background Hero Photography with Subtle Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08, opacity: 0.85 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="/images/nubl/hero/hero-desktop.jpg"
            alt="نُبْل — دار العطور والبخور الفاخرة"
            className="w-full h-full object-cover object-center lg:object-[center_35%]"
          />
        </motion.div>

        {/* Cinematic Vignettes & Gradients for negative space and typography contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian via-nubl-obsidian/40 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-nubl-obsidian/80 via-transparent to-nubl-obsidian/80" />
        <div className="absolute inset-0 bg-dark-vignette opacity-80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-16 text-center flex flex-col items-center">
        {/* Subtle Brand Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 border border-nubl-gold/30 bg-nubl-obsidian/60 backdrop-blur-md mb-8"
        >
          <Sparkles className="w-3.5 h-3.5 text-nubl-gold" />
          <span className="text-xs tracking-[0.25em] text-nubl-goldSoft uppercase">
            دار نُـبْـل الكويتية
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-light text-nubl-ivory tracking-wide leading-[1.2] max-w-3xl mb-6"
        >
          فخامةٌ تُدركها <span className="text-gold-gradient font-normal">الحواس</span>
        </motion.h1>

        {/* Supporting Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-base sm:text-lg lg:text-xl text-nubl-ivory/80 max-w-2xl font-light leading-relaxed mb-10 text-balance"
        >
          اكتشف عالم نُبْل من البخور والعطور والمباخر المختارة بعناية.
        </motion.p>

        {/* Primary and Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            to="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-sm tracking-wider transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-3 group"
          >
            <span>اكتشف المجموعة</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/category/perfumes"
            className="w-full sm:w-auto px-8 py-4 bg-nubl-obsidian/70 hover:bg-nubl-espresso text-nubl-ivory border border-nubl-gold/40 hover:border-nubl-gold text-sm tracking-wider transition-all duration-300 backdrop-blur-sm"
          >
            تسوق الآن
          </Link>
        </motion.div>
      </div>

      {/* Bottom Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-2 pointer-events-none text-xs text-nubl-muted/60"
      >
        <span className="tracking-luxury text-[10px]">انزل للاستكشاف</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-nubl-gold/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
};
