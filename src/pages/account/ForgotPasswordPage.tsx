import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('يرجى إدخال بريد إلكتروني صالح', 'error');
      return;
    }
    setSent(true);
    showToast('تم إرسال تعليمات استعادة كلمة المرور', 'success');
  };

  return (
    <div className="pt-32 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-nubl-espresso border border-nubl-border p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-2xl font-light tracking-[0.25em] text-nubl-ivory block">
            نُـبْـل
          </span>
          <h1 className="text-xl font-light text-nubl-ivory">استعادة كلمة المرور</h1>
          <p className="text-xs text-nubl-muted font-light">
            أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة ضبط كلمة المرور.
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-4 py-4">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <p className="text-xs text-nubl-ivory leading-relaxed">
              تم إرسال رابط إعادة التعيين إلى <strong>{email}</strong>. يرجى التحقق من صندوق الوارد.
            </p>
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 bg-nubl-gold text-nubl-obsidian text-xs font-semibold"
            >
              العودة لتسجيل الدخول
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-nubl-muted mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-nubl-gold" />
                البريد الإلكتروني
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.kw"
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow flex items-center justify-center gap-2 mt-2"
            >
              <span>إرسال رابط الاستعادة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-nubl-border/60 text-center text-xs text-nubl-muted">
          <Link to="/login" className="text-nubl-gold hover:underline">
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};
