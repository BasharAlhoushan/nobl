import React from 'react';
import { motion } from 'framer-motion';

export const BrandStorySection: React.FC = () => {
  const pillars = [
    {
      number: '٠١',
      title: 'اختيارات مدروسة',
      description:
        'لا نعتمد الوفرة التجارية، بل نختار عدداً محدوداً من أندر كسر العود ومستخلصات الزيوت النقية التي تصمد أمام اختبار الذائقة الرفيعة.',
    },
    {
      number: '٠٢',
      title: 'جودة تستحق الثقة',
      description:
        'من صخور البازلت والرخام الطبيعي للمباخر، إلى زجاج العطور المعتم المقاوم للضوء؛ كل مادة صُنعت لتدوم وتعبّر عن الفخامة الصامتة.',
    },
    {
      number: '٠٣',
      title: 'تجربة تليق بك',
      description:
        'خدمة كويتية راقية تبدأ من لحظة تصفحك للمجموعات، وحتى وصول الشحنة مغلّفة بأبهى حُلّة إلى بابك في نفس اليوم.',
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-nubl-obsidian text-nubl-ivory border-t border-nubl-border/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Story Top Section */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-24">
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block">
            فلسفة الدار
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide">
            من التفاصيل تبدأ الحكاية
          </h2>
          <div className="w-12 h-[1px] bg-nubl-gold mx-auto my-4" />
          <p className="text-base sm:text-lg text-nubl-muted font-light leading-relaxed">
            انطلقت دار نُبْل من شغف كويتي أصيل بإعادة تعريف طقوس الطيب والضيافة. نؤمن أن العطر ليس مجرد رائحة عابرة، بل هو هالة غير مرئية تسبقك، وذاكرة تتجسد في زوايا المكان لتروي قصة الذوق الرفيع.
          </p>
        </div>

        {/* Pillars / Values Editorial Layout (Minimal horizontal columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pt-8 border-t border-nubl-border/40">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative space-y-4"
            >
              <span className="text-3xl font-light text-nubl-gold/40 block font-serif">
                {pillar.number}
              </span>
              <h3 className="text-xl font-light text-nubl-ivory tracking-wide">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-nubl-muted/80 leading-relaxed font-light">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
