import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';

export const PerfumeExperienceSection: React.FC = () => {
  const { addToCart } = useCart();
  const highlightPerfumes = products.filter((p) => p.categorySlug === 'perfumes').slice(1, 4);

  return (
    <section className="py-24 sm:py-36 bg-nubl-ivory text-nubl-obsidian relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Top Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-nubl-obsidian/10">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-luxury text-nubl-goldMuted block mb-2">
              فن صناعة العطر
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-nubl-obsidian">
              عطرٌ يترك أثراً
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-nubl-obsidian/70 font-light leading-relaxed">
              روائح صُممت لتكون امتداداً لحضورك. زيوت عطرية نقية بنسب تركيز ملكية لا تخبو بمرور الساعات.
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Campaign Visual (Travertine & Sunlight) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 relative group overflow-hidden bg-white shadow-xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/images/nubl/collections/collection-perfumes.jpg"
                alt="حملة عطور نُبْل — ترافرتين وأقواس معمارية"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>
            <div className="p-6 sm:p-8 bg-white/95 border-t border-nubl-obsidian/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-nubl-goldMuted uppercase tracking-wider block">
                  نقاء الزيوت
                </span>
                <h4 className="text-lg font-medium text-nubl-obsidian">
                  المزيج الخاص: عنبر دافئ، خشب الغاياك، وورد طائفي
                </h4>
              </div>
              <Link
                to="/category/perfumes"
                className="px-5 py-2.5 bg-nubl-obsidian hover:bg-nubl-espresso text-nubl-ivory text-xs font-medium tracking-wider transition-colors flex items-center gap-2"
              >
                <span>استكشف العطور</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Side Editorial Product Column */}
          <div className="lg:col-span-5 space-y-6">
            {highlightPerfumes.map((perfume, idx) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="group flex items-center justify-between p-5 bg-white/80 hover:bg-white border border-nubl-obsidian/5 hover:border-nubl-gold/40 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={perfume.images[0]}
                    alt={perfume.name}
                    className="w-16 h-16 object-cover bg-nubl-ivoryDark flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-nubl-goldMuted uppercase tracking-wider block mb-0.5">
                      {perfume.details.character || 'عطر فاخر'}
                    </span>
                    <Link to={`/product/${perfume.slug}`}>
                      <h4 className="text-sm font-medium text-nubl-obsidian group-hover:text-nubl-goldMuted transition-colors">
                        {perfume.name}
                      </h4>
                    </Link>
                    <span className="text-xs font-semibold text-nubl-obsidian/90 mt-1 block">
                      {perfume.price.toFixed(3)} د.ك
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(perfume, 1)}
                  className="w-9 h-9 rounded-full bg-nubl-ivory border border-nubl-obsidian/10 flex items-center justify-center text-nubl-obsidian hover:bg-nubl-obsidian hover:text-nubl-ivory transition-colors"
                  title="إضافة سريعة"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
