import React, { useState } from 'react';
import { User, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AccountProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, phone);
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-nubl-border/60">
        <h2 className="text-lg font-light text-nubl-ivory">البيانات الشخصية</h2>
        <p className="text-xs text-nubl-muted mt-0.5">
          إدارة اسمك ورقم هاتفك المستخدم في استلام الشحنات داخل الكويت.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4 text-xs">
        <div>
          <label className="block text-nubl-muted mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-nubl-gold" />
            الاسم الكريم
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-nubl-muted mb-1.5 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-nubl-gold" />
            البريد الإلكتروني (غير قابل للتعديل)
          </label>
          <input
            type="email"
            value={user?.email || ''}
            disabled
            className="w-full bg-nubl-obsidian/50 border border-nubl-border/40 p-3 text-nubl-subtle cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-nubl-muted mb-1.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-nubl-gold" />
            رقم الهاتف للتواصل والتوصيل
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs transition-colors"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>

      <div className="pt-6 border-t border-nubl-border/40 flex items-center gap-2 text-xs text-nubl-subtle">
        <ShieldCheck className="w-4 h-4 text-nubl-gold" />
        <span>بياناتك محمية ومشفرة وفق أعلى معايير الخصوصية في دار نُبْل.</span>
      </div>
    </div>
  );
};
