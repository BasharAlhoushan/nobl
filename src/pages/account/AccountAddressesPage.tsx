import React, { useState } from 'react';
import { Plus, Trash2, MapPin, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { kuwaitGovernorates } from '../../data/locations';
import { Address } from '../../types';

export const AccountAddressesPage: React.FC = () => {
  const { user, addAddress, removeAddress, setDefaultAddress } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  const [governorate, setGovernorate] = useState('العاصمة');
  const [area, setArea] = useState('مدينة الكويت');
  const [block, setBlock] = useState('');
  const [street, setStreet] = useState('');
  const [avenue, setAvenue] = useState('');
  const [house, setHouse] = useState('');
  const [notes, setNotes] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const currentGov = kuwaitGovernorates.find((g) => g.name === governorate);

  const handleGovChange = (govName: string) => {
    setGovernorate(govName);
    const g = kuwaitGovernorates.find((x) => x.name === govName);
    if (g && g.areas.length > 0) setArea(g.areas[0]);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    addAddress({
      name: user.name,
      phone: user.phone,
      governorate,
      area,
      block,
      street,
      avenue,
      house,
      notes,
      isDefault,
    });

    setIsAdding(false);
    setBlock('');
    setStreet('');
    setAvenue('');
    setHouse('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-nubl-border/60 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-light text-nubl-ivory">دفتر العناوين</h2>
          <p className="text-xs text-nubl-muted mt-0.5">
            إدارة عناوين التوصيل في منازلكم ومكاتبكم في محافظات الكويت.
          </p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة عنوان جديد</span>
        </button>
      </div>

      {/* Add Address Form Modal / Inline Box */}
      {isAdding && (
        <form
          onSubmit={handleSave}
          className="p-6 bg-nubl-obsidian border border-nubl-gold/40 space-y-4 text-xs"
        >
          <div className="flex items-center justify-between pb-3 border-b border-nubl-border/60">
            <h4 className="font-medium text-nubl-ivory text-sm">إضافة عنوان جديد في الكويت</h4>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-nubl-muted hover:text-nubl-ivory"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1">المحافظة</label>
              <select
                value={governorate}
                onChange={(e) => handleGovChange(e.target.value)}
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              >
                {kuwaitGovernorates.map((g) => (
                  <option key={g.id} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">المنطقة</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              >
                {currentGov?.areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">القطعة</label>
              <input
                type="text"
                value={block}
                onChange={(e) => setBlock(e.target.value)}
                required
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">الشارع</label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">الجادة (اختياري)</label>
              <input
                type="text"
                value={avenue}
                onChange={(e) => setAvenue(e.target.value)}
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">رقم المنزل / القسيمة</label>
              <input
                type="text"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                required
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-nubl-muted mb-1">ملاحظات التوصيل</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="مثال: مدخل الديوانية من الجانب الأيمن"
                className="w-full bg-nubl-espresso border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isDefault"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="accent-nubl-gold"
            />
            <label htmlFor="isDefault" className="text-nubl-ivory cursor-pointer">
              تعيين كعنوان افتراضي للتوصيل
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-nubl-border/60">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-nubl-border text-nubl-muted hover:text-nubl-ivory"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-nubl-gold text-nubl-obsidian font-semibold hover:bg-nubl-goldHover"
            >
              حفظ العنوان
            </button>
          </div>
        </form>
      )}

      {/* Address Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user?.addresses.map((addr) => (
          <div
            key={addr.id}
            className={`p-5 border text-xs space-y-3 relative ${
              addr.isDefault
                ? 'bg-nubl-obsidian border-nubl-gold/60'
                : 'bg-nubl-obsidian/50 border-nubl-border/70'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-nubl-ivory flex items-center gap-1.5 text-sm">
                <MapPin className="w-3.5 h-3.5 text-nubl-gold" />
                {addr.governorate} — {addr.area}
              </span>
              {addr.isDefault && (
                <span className="px-2 py-0.5 bg-nubl-gold/20 text-nubl-gold border border-nubl-gold/30 text-[10px] font-medium">
                  الافتراضي
                </span>
              )}
            </div>

            <p className="text-nubl-muted leading-relaxed">
              قطعة {addr.block}، شارع {addr.street}
              {addr.avenue && `، جادة ${addr.avenue}`}، منزل {addr.house}
            </p>

            {addr.notes && (
              <p className="text-nubl-subtle text-[11px]">ملاحظات: {addr.notes}</p>
            )}

            <div className="pt-3 border-t border-nubl-border/40 flex items-center justify-between text-xs">
              {!addr.isDefault && (
                <button
                  onClick={() => setDefaultAddress(addr.id)}
                  className="text-nubl-gold hover:underline"
                >
                  تعيين كافتراضي
                </button>
              )}
              <button
                onClick={() => removeAddress(addr.id)}
                className="text-nubl-subtle hover:text-red-400 p-1 mr-auto transition-colors"
                title="حذف"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
