import React, { useState } from 'react';
import { Save, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useAdmin();
  const { showToast } = useToast();

  const [storeName, setStoreName] = useState(settings.storeName);
  const [storeNameEn, setStoreNameEn] = useState(settings.storeNameEn);
  const [country, setCountry] = useState(settings.country);
  const [currency, setCurrency] = useState(settings.currency);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [shippingFee, setShippingFee] = useState(settings.shippingFee);
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(settings.freeShippingThreshold);
  const [instagram, setInstagram] = useState(settings.instagram);
  const [whatsapp, setWhatsapp] = useState(settings.whatsapp);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      storeName,
      storeNameEn,
      country,
      currency,
      phone,
      email,
      address,
      shippingFee,
      freeShippingThreshold,
      instagram,
      whatsapp,
    });
    showToast('تم حفظ إعدادات المتجر وسياسات الشحن بنجاح', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="pb-6 border-b border-nubl-border flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            تهيئة النظام
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">إعدادات دار نُـبْـل</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            السياسات العامة، رسوم الشحن في الكويت، وقنوات التواصل الرسمية.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs flex items-center gap-2 transition-colors shadow-gold-glow"
        >
          <Save className="w-4 h-4" />
          <span>حفظ الإعدادات</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* Brand Information */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            هوية المتجر
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1">اسم الدار بالعربية</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">الاسم بالإنجليزية</label>
              <input
                type="text"
                value={storeNameEn}
                onChange={(e) => setStoreNameEn(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">الدولة المقر</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">رمز العملة الرسمية</label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Shipping Policies (Kuwait) */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            سياسات التوصيل والشحن (دولة الكويت)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1">
                رسوم التوصيل الافتراضية (د.ك)
              </label>
              <input
                type="number"
                step="0.25"
                value={shippingFee}
                onChange={(e) => setShippingFee(Number(e.target.value))}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">
                الحد الأدنى للتوصيل المجاني (د.ك)
              </label>
              <input
                type="number"
                step="1"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(Number(e.target.value))}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            بيانات الاتصال ومقر الضيافة
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1">رقم هاتف البوتيك</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">البريد الإلكتروني الرسمي</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-nubl-muted mb-1">العنوان الفعلي في الكويت</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">رابط إنستغرام</label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">رابط واتساب المباشر</label>
              <input
                type="url"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
