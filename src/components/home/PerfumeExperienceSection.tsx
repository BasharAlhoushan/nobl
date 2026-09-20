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
    <section className="py-24 sm:py-36 bg-[#F5F1EA] text-[#15110D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Editorial Top Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 pb-8 border-b border-[#15110D]/10">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase tracking-luxury text-[#8C7142] block mb-2">
              فن صناعة العطر
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-[#15110D]">
              عطرٌ يترك أثراً
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-[#15110D]/70 font-light leading-relaxed">
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
            <div className="p-6 sm:p-8 bg-white/95 border-t border-[#15110D]/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C7142] uppercase tracking-wider block">
                  نقاء الزيوت
                </span>
                <h4 className="text-lg font-medium text-[#15110D]">
                  المزيج الخاص: عنبر دافئ، خشب الغاياك، وورد طائفي
                </h4>
              </div>
              <Link
                to="/category/perfumes"
                className="px-5 py-2.5 bg-[#15110D] hover:bg-[#2A211A] text-[#F5F1EA] text-xs font-medium tracking-wider transition-colors flex items-center gap-2"
              >
                <span>المجموعة</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Perfume List */}
          <div className="lg:col-span-5 space-y-4">
            {highlightPerfumes.map((perfume, idx) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="p-5 bg-white/80 border border-[#15110D]/10 hover:border-[#B9975B] transition-all flex items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={perfume.images[0]}
                    alt={perfume.name}
                    className="w-16 h-16 object-cover bg-[#E8E1D5] flex-shrink-0"
                  />
                  <div>
                    <span className="text-[10px] text-[#8C7142] uppercase tracking-wider block mb-0.5">
                      {perfume.details.character || 'عطر فاخر'}
                    </span>
                    <Link to={`/product/${perfume.slug}`}>
                      <h4 className="text-sm font-medium text-[#15110D] group-hover:text-[#8C7142] transition-colors">
                        {perfume.name}
                      </h4>
                    </Link>
                    <span className="text-xs font-semibold text-[#15110D]/90 mt-1 block">
                      {perfume.price.toFixed(3)} د.ك
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(perfume, 1)}
                  className="w-9 h-9 rounded-full bg-[#F5F1EA] border border-[#15110D]/10 flex items-center justify-center text-[#15110D] hover:bg-[#15110D] hover:text-[#F5F1EA] transition-colors"
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
