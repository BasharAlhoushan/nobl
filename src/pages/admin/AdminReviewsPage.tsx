import React from 'react';
import { Star, Check, EyeOff, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminReviewsPage: React.FC = () => {
  const { reviews, updateReviewStatus, deleteReview } = useAdmin();
  const { showToast } = useToast();

  const handleStatus = (id: string, status: 'approved' | 'hidden') => {
    updateReviewStatus(id, status);
    showToast(status === 'approved' ? 'تمت الموافقة على التقييم ونشره' : 'تم إخفاء التقييم', 'info');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('هل تريد حذف هذا التقييم نهائياً؟')) {
      deleteReview(id);
      showToast('تم حذف التقييم', 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-nubl-border">
        <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
          إدارة تجارب العملاء
        </span>
        <h1 className="text-2xl font-light text-nubl-ivory">التقييمات والآراء</h1>
        <p className="text-xs text-nubl-muted mt-0.5">
          مراجعة واعتماد تقييمات عملاء الكويت المنشورة في صفحات المنتجات والصفحة الرئيسية ({reviews.length} تقييم)
        </p>
      </div>

      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">العميل والموقع</th>
                <th className="p-4 font-medium">المنتج</th>
                <th className="p-4 font-medium">التقييم</th>
                <th className="p-4 font-medium">نص التعليق</th>
                <th className="p-4 font-medium">التاريخ</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium text-left">إجراءات الإشراف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {reviews.map((rev) => (
                <tr key={rev.id} className="hover:bg-nubl-obsidian/40 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-nubl-ivory block">{rev.customerName}</span>
                    <span className="text-[10px] text-nubl-muted">{rev.customerCity}</span>
                  </td>
                  <td className="p-4 font-medium text-nubl-goldSoft">{rev.productName}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-nubl-gold">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-nubl-gold" />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs text-nubl-muted line-clamp-2 leading-relaxed font-light">
                    {rev.comment}
                  </td>
                  <td className="p-4 font-mono text-nubl-subtle">{rev.date}</td>
                  <td className="p-4">
                    {rev.status === 'approved' && (
                      <span className="px-2 py-0.5 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px]">
                        معتمد ومنشور
                      </span>
                    )}
                    {rev.status === 'pending' && (
                      <span className="px-2 py-0.5 bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[10px]">
                        قيد المراجعة
                      </span>
                    )}
                    {rev.status === 'hidden' && (
                      <span className="px-2 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700 text-[10px]">
                        مخفي
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      {rev.status !== 'approved' && (
                        <button
                          onClick={() => handleStatus(rev.id, 'approved')}
                          className="p-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                          title="اعتماد ونشر"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {rev.status !== 'hidden' && (
                        <button
                          onClick={() => handleStatus(rev.id, 'hidden')}
                          className="p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors"
                          title="إخفاء التقييم"
                        >
                          <EyeOff className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(rev.id)}
                        className="p-1.5 text-nubl-subtle hover:text-red-400 transition-colors"
                        title="حذف نهائي"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
