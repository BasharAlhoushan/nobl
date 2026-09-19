import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { categories } from '../../data/categories';

export const CollectionsSection: React.FC = () => {
  const incenseCat = categories.find((c) => c.slug === 'incense')!;
  const burnersCat = categories.find((c) => c.slug === 'burners')!;
  const perfumesCat = categories.find((c) => c.slug === 'perfumes')!;
  const giftsCat = categories.find((c) => c.slug === 'gifts')!;

  return (
    <section className="py-24 sm:py-32 bg-nubl-obsidian text-nubl-ivory">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-nubl-border/40">
          <div>
            <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
              التشكيلات الحصرية
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
              مجموعات نُـبْـل
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-nubl-muted max-w-sm font-light mt-4 md:mt-0">
            أربعة عوالم من الطيب الفاخر، صُممت لتلبي ذائقة النخبة من البخور والعود إلى المباخر والعطور.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Incense (Large Dominant Card - 7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 relative group min-h-[440px] sm:min-h-[560px] overflow-hidden bg-nubl-espresso"
          >
            <img
              src={incenseCat.image}
              alt={incenseCat.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian via-nubl-obsidian/40 to-transparent" />
            
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12 flex flex-col justify-end">
              <span className="text-xs uppercase tracking-widest text-nubl-gold mb-2 block">
                01 / كسر العود المعتق
              </span>
              <h3 className="text-3xl sm:text-4xl font-light text-nubl-ivory mb-2">
                {incenseCat.name}
              </h3>
              <p className="text-sm text-nubl-ivory/80 font-light max-w-md mb-6 leading-relaxed">
                &ldquo;{incenseCat.tagline}&rdquo;
              </p>
              <div>
                <Link
                  to={`/category/${incenseCat.slug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold tracking-wider hover:bg-nubl-goldHover transition-colors group/btn"
                >
                  <span>اكتشف المجموعة</span>
                  <ArrowLeft className="w-3.5 h-3.5 group-hover/btn:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Stack of Burners & Perfumes (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 2: Burners */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group min-h-[260px] sm:min-h-[270px] overflow-hidden bg-nubl-espresso flex-1"
            >
              <img
                src={burnersCat.image}
                alt={burnersCat.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian/90 via-nubl-obsidian/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-[11px] uppercase tracking-widest text-nubl-gold mb-1 block">
                  02 / فن العمارة بالحجر
                </span>
                <h3 className="text-2xl font-light text-nubl-ivory mb-1">
                  {burnersCat.name}
                </h3>
                <p className="text-xs text-nubl-muted font-light mb-4">
                  {burnersCat.tagline}
                </p>
                <div>
                  <Link
                    to={`/category/${burnersCat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-nubl-gold hover:text-nubl-goldSoft transition-colors"
                  >
                    <span>استكشف المباخر</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Perfumes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative group min-h-[260px] sm:min-h-[270px] overflow-hidden bg-nubl-espresso flex-1"
            >
              <img
                src={perfumesCat.image}
                alt={perfumesCat.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-nubl-obsidian/90 via-nubl-obsidian/30 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex flex-col justify-end">
                <span className="text-[11px] uppercase tracking-widest text-nubl-gold mb-1 block">
                  03 / نفحات ملكية
                </span>
                <h3 className="text-2xl font-light text-nubl-ivory mb-1">
                  {perfumesCat.name}
                </h3>
                <p className="text-xs text-nubl-muted font-light mb-4">
                  {perfumesCat.tagline}
                </p>
                <div>
                  <Link
                    to={`/category/${perfumesCat.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-medium text-nubl-gold hover:text-nubl-goldSoft transition-colors"
                  >
                    <span>استكشف العطور</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 4: Gifts (Full Width Banner Row - 12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-12 relative group min-h-[300px] sm:min-h-[360px] overflow-hidden bg-nubl-espresso mt-2"
          >
            <img
              src={giftsCat.image}
              alt={giftsCat.name}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-nubl-obsidian via-nubl-obsidian/70 to-transparent" />

            <div className="absolute inset-y-0 right-0 p-8 sm:p-14 flex flex-col justify-center max-w-xl">
              <span className="text-xs uppercase tracking-widest text-nubl-gold mb-2 block">
                04 / الصناديق الملكية
              </span>
              <h3 className="text-3xl sm:text-4xl font-light text-nubl-ivory mb-3">
                {giftsCat.name}
              </h3>
              <p className="text-sm text-nubl-muted leading-relaxed font-light mb-6">
                صناديق هدايا فاخرة مهيأة لأرقى المناسبات والاحتفالات، تجمع بين العطر والبخور والمبخرة في تناغم استثنائي يرفع رأس المهدي.
              </p>
              <div>
                <Link
                  to={`/category/${giftsCat.slug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold tracking-wider hover:bg-nubl-goldHover transition-colors"
                >
                  <span>تسوق أطقم الإهداء</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
