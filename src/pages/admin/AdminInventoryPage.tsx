import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, XCircle, Plus, Search } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminInventoryPage: React.FC = () => {
  const { products, restockProduct } = useAdmin();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [restockAmount, setRestockAmount] = useState<Record<string, number>>({});

  const handleRestock = (id: string, name: string) => {
    const qty = restockAmount[id] || 10;
    restockProduct(id, qty);
    showToast(`تمت إضافة ${qty} قطع إلى مخزون "${name}"`, 'success');
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const outOfStockCount = products.filter((p) => p.stockQuantity === 0).length;
  const lowStockCount = products.filter((p) => p.stockQuantity > 0 && p.stockQuantity <= 12).length;

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-nubl-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            إدارة المستودع
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">مستويات المخزون والوفرة</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            تنبيهات فورية للمنتجات التي أوشكت على النفاد في مخازن نُبْل بالكويت.
          </p>
        </div>

        {/* Quick Alert Stats */}
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1.5 bg-amber-950/60 border border-amber-500/40 text-amber-300 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>مخزون منخفض: {lowStockCount}</span>
          </span>
          <span className="px-3 py-1.5 bg-red-950/60 border border-red-500/40 text-red-300 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5" />
            <span>نفد المخزون: {outOfStockCount}</span>
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4 bg-nubl-espresso border border-nubl-border flex items-center gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم أو SKU..."
            className="w-full bg-nubl-obsidian border border-nubl-border px-8 py-2 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-nubl-gold" />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">المنتج</th>
                <th className="p-4 font-medium">رمز SKU</th>
                <th className="p-4 font-medium">الفئة</th>
                <th className="p-4 font-medium">الكمية المتوفرة</th>
                <th className="p-4 font-medium">حالة التوفر</th>
                <th className="p-4 font-medium text-left">إعادة التزويد السريع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {filtered.map((prod) => {
                let statusBadge = (
                  <span className="px-2.5 py-1 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px] flex items-center gap-1 w-fit">
                    <CheckCircle2 className="w-3 h-3" />
                    مخزون كافٍ
                  </span>
                );

                if (prod.stockQuantity === 0) {
                  statusBadge = (
                    <span className="px-2.5 py-1 bg-red-950/60 text-red-300 border border-red-500/30 text-[10px] flex items-center gap-1 w-fit">
                      <XCircle className="w-3 h-3" />
                      نفد تماماً
                    </span>
                  );
                } else if (prod.stockQuantity <= 12) {
                  statusBadge = (
                    <span className="px-2.5 py-1 bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px] flex items-center gap-1 w-fit">
                      <AlertTriangle className="w-3 h-3" />
                      مخزون منخفض
                    </span>
                  );
                }

                return (
                  <tr key={prod.id} className="hover:bg-nubl-obsidian/40 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-10 h-10 object-cover bg-nubl-obsidian"
                      />
                      <span className="font-medium text-nubl-ivory text-sm">{prod.name}</span>
                    </td>
                    <td className="p-4 font-mono text-nubl-muted">{prod.sku}</td>
                    <td className="p-4 text-nubl-goldSoft">{prod.category}</td>
                    <td className="p-4">
                      <span className="font-mono text-sm font-bold text-nubl-ivory">
                        {prod.stockQuantity} قطعة
                      </span>
                    </td>
                    <td className="p-4">{statusBadge}</td>
                    <td className="p-4 text-left">
                      <div className="flex items-center justify-end gap-2">
                        <input
                          type="number"
                          min="1"
                          placeholder="10"
                          value={restockAmount[prod.id] || ''}
                          onChange={(e) =>
                            setRestockAmount({
                              ...restockAmount,
                              [prod.id]: Number(e.target.value),
                            })
                          }
                          className="w-16 bg-nubl-obsidian border border-nubl-border p-1.5 text-center text-nubl-ivory font-mono"
                        />
                        <button
                          onClick={() => handleRestock(prod.id, prod.name)}
                          className="px-3 py-1.5 bg-nubl-gold text-nubl-obsidian font-semibold flex items-center gap-1 hover:bg-nubl-goldHover transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>تزويد</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
