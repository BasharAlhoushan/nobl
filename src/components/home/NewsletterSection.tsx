import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('يرجى إدخال بريد إلكتروني صحيح', 'error');
      return;
    }
    setSubscribed(true);
    showToast('شكراً لانضمامك إلى قائمة نُبْل الخاصة', 'success');
  };

  return (
    <section className="py-24 bg-nubl-espresso relative overflow-hidden border-t border-nubl-border/30">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-nubl-obsidian border border-nubl-gold/30 text-nubl-gold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>دعوة خاصة</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-nubl-ivory tracking-wide">
          انضم إلى مجتمع نُـبْـل الخاص
        </h2>

        <p className="text-sm sm:text-base text-nubl-muted font-light max-w-xl mx-auto leading-relaxed">
          كن أول من يحصل على إشعارات إطلاق دفعات العود المعتّقة النادرة، والإصدارات الخاصة من العطور قبل نفادها.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-2 px-6 py-4 bg-nubl-obsidian border border-emerald-500/40 text-emerald-400 text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>تم تسجيل بريدك في قائمة الضيافة الخاصة بنجاح.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-4"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="أدخل بريدك الإلكتروني..."
              required
              className="flex-1 bg-nubl-obsidian border border-nubl-border focus:border-nubl-gold px-4 py-3 text-sm text-nubl-ivory placeholder:text-nubl-muted/60 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian text-xs font-semibold tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <span>انضمام</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
