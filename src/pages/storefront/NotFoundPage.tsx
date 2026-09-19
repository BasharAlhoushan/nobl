import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'الصفحة غير موجودة | نُبْل';
  }, []);

  return (
    <div className="pt-36 pb-28 bg-nubl-obsidian text-nubl-ivory min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <span className="text-6xl sm:text-8xl font-light text-nubl-gold/30 font-mono tracking-widest block mb-4">
        404
      </span>
      <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
        مسار غير متاح
      </span>
      <h1 className="text-2xl sm:text-3xl font-light mb-4">
        الصفحة التي تبحث عنها غير متوفرة
      </h1>
      <p className="text-xs sm:text-sm text-nubl-muted max-w-md mx-auto mb-8 font-light leading-relaxed">
        ربما تم نقل الصفحة أو أن الرابط غير صحيح. ندعوك للعودة إلى واجهة الدار لاستكشاف أندر نفحات العود والبخور.
      </p>
      <Link
        to="/"
        className="px-8 py-3.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow flex items-center gap-2"
      >
        <span>العودة للرئيسية</span>
        <ArrowLeft className="w-4 h-4" />
      </Link>
    </div>
  );
};
