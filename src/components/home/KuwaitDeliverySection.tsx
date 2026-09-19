import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { kuwaitGovernorates } from '../../data/locations';

export const KuwaitDeliverySection: React.FC = () => {
  const governorateNames = [
    'العاصمة (مدينة الكويت)',
    'حولي والسالمية',
    'الفروانية',
    'مبارك الكبير',
    'الأحمدي',
    'الجهراء',
  ];

  return (
    <section className="py-24 sm:py-32 bg-nubl-obsidian text-nubl-ivory border-t border-nubl-border/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Right Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-luxury text-nubl-gold block">
              خدمة التوصيل الحصرية
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-wide">
              نُـبْـل إلى بابك
            </h2>

            <p className="text-sm sm:text-base text-nubl-muted font-light leading-relaxed">
              نولي كل شحنة عناية فائقة تليق بقيمتها. يتولى فريق نُبْل المعتمد توصيل طلباتكم مباشرة إلى منازلكم ومكاتبكم في كافة مناطق دولة الكويت بتغليف محكم يحفظ نقاء العود وحرارة الطيب.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
              <div className="p-4 bg-nubl-espresso border border-nubl-border flex items-start gap-3">
                <Truck className="w-5 h-5 text-nubl-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-nubl-ivory mb-1">توصيل بنفس اليوم</h4>
                  <p className="text-nubl-muted/70">للطلبات المؤكدة قبل الساعة 2 ظهراً في الكويت</p>
                </div>
              </div>

              <div className="p-4 bg-nubl-espresso border border-nubl-border flex items-start gap-3">
                <Clock className="w-5 h-5 text-nubl-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-nubl-ivory mb-1">شحن مجاني</h4>
                  <p className="text-nubl-muted/70">لكافة الطلبات التي تتجاوز قيمتها 25.000 د.ك</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Visual/Map Representative Area Cards */}
          <div className="lg:col-span-6 bg-nubl-espresso/60 border border-nubl-border p-8 sm:p-10 relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-nubl-border">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-nubl-gold" />
                <span className="text-sm font-medium text-nubl-ivory">تغطية محافظات دولة الكويت</span>
              </div>
              <span className="text-xs px-2.5 py-1 bg-nubl-gold/10 text-nubl-gold border border-nubl-gold/20">
                توصيل مباشر
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {governorateNames.map((gov) => (
                <div
                  key={gov}
                  className="p-3 bg-nubl-obsidian/70 border border-nubl-border/60 text-center hover:border-nubl-gold/40 transition-colors"
                >
                  <span className="text-xs text-nubl-ivory/90 font-light block">
                    {gov}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-nubl-border/60 flex items-center justify-between text-xs text-nubl-muted">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-nubl-gold" />
                <span>دفع آمن عند الاستلام أو عبر بوابة كي نت KNET</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
