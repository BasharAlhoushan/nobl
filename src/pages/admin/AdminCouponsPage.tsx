import React, { useState } from 'react';
import { Plus, Tag, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminCouponsPage: React.FC = () => {
  const { coupons, addCoupon, toggleCouponStatus, deleteCoupon } = useAdmin();
  const { showToast } = useToast();

  const [isAdding, setIsAdding] = useState(false);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [minOrder, setMinOrder] = useState(20);
  const [maxDiscount, setMaxDiscount] = useState<number | undefined>(undefined);
  const [expiryDate, setExpiryDate] = useState('2026-12-31');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) {
      showToast('يرجى كتابة رمز الكوبون', 'error');
      return;
    }

    addCoupon({
      code: code.trim().toUpperCase(),
      discountPercent,
      minOrder,
      maxDiscount: maxDiscount || undefined,
      expiryDate,
      isActive: true,
    });

    showToast(`تم إنشاء الكوبون ${code.toUpperCase()} بنجاح`, 'success');
    setIsAdding(false);
    setCode('');
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-nubl-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            الحملات الترويجية
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">كوبونات الخصم</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            إدارة رموز التخفيض المعتمدة لعملاء نُبْل في الكويت ({coupons.length} كوبون)
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs transition-colors flex items-center gap-1.5 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء كوبون جديد</span>
        </button>
      </div>

      {isAdding && (
        <form
          onSubmit={handleCreate}
          className="p-6 bg-nubl-espresso border border-nubl-gold/40 space-y-4 text-xs max-w-xl"
        >
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            إنشاء رمز ترويجي جديد
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1">رمز الكوبون</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="مثال: EID2026"
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-2.5 text-nubl-ivory font-mono uppercase focus:border-nubl-gold"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">نسبة الخصم (%)</label>
              <input
                type="number"
                min="1"
                max="90"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-2.5 text-nubl-ivory font-mono focus:border-nubl-gold"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">الحد الأدنى للطلب (د.ك)</label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(Number(e.target.value))}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-2.5 text-nubl-ivory font-mono focus:border-nubl-gold"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1">الحد الأقصى للخصم (د.ك - اختياري)</label>
              <input
                type="number"
                value={maxDiscount || ''}
                onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="مثال: 15.000"
                className="w-full bg-nubl-obsidian border border-nubl-border p-2.5 text-nubl-ivory font-mono focus:border-nubl-gold"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-nubl-muted mb-1">تاريخ الانتهاء</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-2.5 text-nubl-ivory focus:border-nubl-gold"
              />
            </div>
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
              className="px-6 py-2 bg-nubl-gold text-nubl-obsidian font-semibold"
            >
              تفعيل الكوبون
            </button>
          </div>
        </form>
      )}

      {/* Coupons Table */}
      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">رمز الكوبون</th>
                <th className="p-4 font-medium">نسبة الخصم</th>
                <th className="p-4 font-medium">الحد الأدنى للطلب</th>
                <th className="p-4 font-medium">مرات الاستخدام</th>
                <th className="p-4 font-medium">تاريخ الصلاحية</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="hover:bg-nubl-obsidian/40 transition-colors">
                  <td className="p-4">
                    <span className="font-mono text-sm font-bold text-nubl-gold flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-nubl-gold" />
                      {coupon.code}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-medium text-nubl-ivory">
                    {coupon.discountPercent}%
                  </td>
                  <td className="p-4 font-mono text-nubl-muted">
                    {coupon.minOrder.toFixed(3)} د.ك
                  </td>
                  <td className="p-4 font-mono text-nubl-muted">{coupon.usageCount} طلب</td>
                  <td className="p-4 font-mono text-nubl-muted">{coupon.expiryDate}</td>
                  <td className="p-4">
                    <button
                      onClick={() => toggleCouponStatus(coupon.id)}
                      className={`px-2.5 py-1 text-[10px] border flex items-center gap-1 ${
                        coupon.isActive
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                      }`}
                    >
                      {coupon.isActive ? 'نشط وفعال' : 'معطل'}
                    </button>
                  </td>
                  <td className="p-4 text-left">
                    <button
                      onClick={() => {
                        deleteCoupon(coupon.id);
                        showToast('تم حذف الكوبون', 'info');
                      }}
                      className="p-1.5 text-nubl-subtle hover:text-red-400 transition-colors"
                      title="حذف الكوبون"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
