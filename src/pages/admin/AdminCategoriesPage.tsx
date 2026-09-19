import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Layers, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import { useAdmin } from '../../context/AdminContext';

export const AdminCategoriesPage: React.FC = () => {
  const { products } = useAdmin();

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-nubl-border">
        <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
          هيكل المتجر
        </span>
        <h1 className="text-2xl font-light text-nubl-ivory">الفئات والمجموعات الرئيسية</h1>
        <p className="text-xs text-nubl-muted mt-0.5">
          إدارة الأقسام التحريرية الخمسة لدار نُبْل الكويتية.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const count = products.filter((p) => p.categorySlug === cat.slug).length;

          return (
            <div
              key={cat.id}
              className="bg-nubl-espresso border border-nubl-border overflow-hidden flex flex-col justify-between"
            >
              <div className="relative aspect-video overflow-hidden bg-nubl-obsidian">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-nubl-espresso via-transparent to-transparent" />
                <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-nubl-obsidian/90 text-nubl-gold border border-nubl-gold/30 text-[10px] tracking-wider">
                  {cat.nameEn}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-medium text-nubl-ivory">{cat.name}</h3>
                    <span className="text-xs font-mono text-nubl-gold bg-nubl-obsidian px-2 py-0.5 border border-nubl-border">
                      {count} مقتنى
                    </span>
                  </div>
                  <p className="text-xs text-nubl-goldSoft mb-2 font-light">
                    &ldquo;{cat.tagline}&rdquo;
                  </p>
                  <p className="text-xs text-nubl-muted line-clamp-2 leading-relaxed font-light">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-nubl-border/60 flex items-center justify-between text-xs">
                  <span className="text-nubl-subtle font-mono">/{cat.slug}</span>
                  <Link
                    to={`/category/${cat.slug}`}
                    target="_blank"
                    className="text-nubl-gold hover:underline flex items-center gap-1"
                  >
                    <span>معاينة في المتجر</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
