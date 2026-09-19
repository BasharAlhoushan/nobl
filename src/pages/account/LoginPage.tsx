import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('a.aldosari@example.kw');
  const [password, setPassword] = useState('••••••••');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'تسجيل الدخول | نُبْل';
    if (isAuthenticated) {
      navigate('/account');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/account');
  };

  return (
    <div className="pt-32 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-nubl-espresso border border-nubl-border p-8 sm:p-10 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-2xl font-light tracking-[0.25em] text-nubl-ivory block">
            نُـبْـل
          </span>
          <h1 className="text-xl font-light text-nubl-ivory">تسجيل الدخول</h1>
          <p className="text-xs text-nubl-muted font-light">
            ادخل إلى حسابك لمتابعة طلبات العود والبخور وإدارة عناوينك في الكويت.
          </p>
        </div>

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
              required
              className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-nubl-muted flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-nubl-gold" />
                كلمة المرور
              </label>
              <Link
                to="/forgot-password"
                className="text-[11px] text-nubl-gold hover:underline"
              >
                نسيت كلمة المرور؟
              </Link>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow flex items-center justify-center gap-2 mt-2"
          >
            <span>دخول إلى الحساب</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-nubl-border/60 text-center text-xs text-nubl-muted">
          <span>ليس لديك حساب بعد؟ </span>
          <Link to="/register" className="text-nubl-gold hover:underline font-medium">
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    </div>
  );
};
