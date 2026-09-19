import React, { useState } from 'react';
import { Save, Sparkles } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminContentPage: React.FC = () => {
  const { showToast } = useToast();

  const [heroHeading, setHeroHeading] = useState('فخامةٌ تُدركها الحواس');
  const [heroSubtext, setHeroSubtext] = useState('اكتشف عالم نُبْل من البخور والعطور والمباخر المختارة بعناية.');
  const [brandStatementTitle, setBrandStatementTitle] = useState('تفاصيل تُشم... وتُذكر.');
  const [brandStatementBody, setBrandStatementBody] = useState('نصنع تجربة تتجاوز العطر، لتصبح جزءاً من المكان والذاكرة.');
  const [incenseCampaignHeadline, setIncenseCampaignHeadline] = useState('حين يصبح العطر جزءاً من المكان');
  const [perfumeCampaignHeadline, setPerfumeCampaignHeadline] = useState('عطرٌ يترك أثراً');
  const [giftCampaignHeadline, setGiftCampaignHeadline] = useState('هديتك... تترك أثراً');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('تم حفظ ونشر نصوص الواجهة بنجاح', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-6 border-b border-nubl-border flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            إدارة نصوص الواجهة
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">محتوى الحملات التحريرية</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            تحديث العناوين الرئيسية وشعارات الحملات المعروضة في الصفحة الرئيسية لدار نُبْل.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs flex items-center gap-2 transition-colors shadow-gold-glow"
        >
          <Save className="w-4 h-4" />
          <span>حفظ المحتوى</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Hero Section Content */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nubl-gold" />
            01 — واجهة الهيرو السينمائية (Hero Section)
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-nubl-muted mb-1">العنوان الرئيسي للهيرو</label>
              <input
                type="text"
                value={heroHeading}
                onChange={(e) => setHeroHeading(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-nubl-muted mb-1">النص المساند للهيرو</label>
              <textarea
                rows={2}
                value={heroSubtext}
                onChange={(e) => setHeroSubtext(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Brand Statement Content */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            02 — العبارة التحريرية الكبرى (Brand Statement)
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-nubl-muted mb-1">عنوان العبارة</label>
              <input
                type="text"
                value={brandStatementTitle}
                onChange={(e) => setBrandStatementTitle(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-nubl-muted mb-1">النص الفلسفي المساند</label>
              <textarea
                rows={2}
                value={brandStatementBody}
                onChange={(e) => setBrandStatementBody(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Campaign Headlines */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            03 — عناوين الحملات التخصصية
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1">عنوان تجربة البخور</label>
              <input
                type="text"
                value={incenseCampaignHeadline}
                onChange={(e) => setIncenseCampaignHeadline(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">عنوان تجربة العطور</label>
              <input
                type="text"
                value={perfumeCampaignHeadline}
                onChange={(e) => setPerfumeCampaignHeadline(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">عنوان تجربة الإهداء</label>
              <input
                type="text"
                value={giftCampaignHeadline}
                onChange={(e) => setGiftCampaignHeadline(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
