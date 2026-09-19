import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Filter, ArrowUpDown } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { OrderStatus } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const { orders, updateOrderStatus } = useAdmin();
  const { showToast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = orders.filter((o) => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) ||
        o.customer.phone.includes(q) ||
        o.shippingAddress.area.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    showToast('تم تحديث حالة الطلب بنجاح', 'success');
  };

  const statusArabic: Record<OrderStatus, string> = {
    new: 'جديد',
    processing: 'قيد التجهيز',
    shipped: 'تم الشحن',
    delivered: 'تم التوصيل',
    cancelled: 'ملغي',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-nubl-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            إدارة المبيعات
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">طلبات الشراء والتوصيل</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            متابعة جميع طلبات الكويت وتحديث حالات الشحن المباشر ({orders.length} طلب)
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-nubl-espresso border border-nubl-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث برقم الطلب، اسم العميل، الهاتف، المنطقة..."
            className="w-full bg-nubl-obsidian border border-nubl-border px-8 py-2 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-nubl-gold" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-nubl-muted hidden sm:inline">حالة الطلب:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto bg-nubl-obsidian border border-nubl-border text-nubl-ivory px-3 py-2 focus:border-nubl-gold cursor-pointer"
          >
            <option value="all">كافة الحالات</option>
            <option value="new">جديد</option>
            <option value="processing">قيد التجهيز</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">رقم الطلب</th>
                <th className="p-4 font-medium">العميل</th>
                <th className="p-4 font-medium">المنطقة (الكويت)</th>
                <th className="p-4 font-medium">التاريخ</th>
                <th className="p-4 font-medium">الإجمالي (د.ك)</th>
                <th className="p-4 font-medium">طريقة الدفع</th>
                <th className="p-4 font-medium">تغيير الحالة</th>
                <th className="p-4 font-medium text-left">معاينة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-nubl-obsidian/40 transition-colors">
                  <td className="p-4">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="font-mono text-nubl-gold font-medium hover:underline text-sm"
                    >
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-nubl-ivory block">{order.customer.name}</span>
                    <span className="text-[10px] text-nubl-muted">{order.customer.phone}</span>
                  </td>
                  <td className="p-4 text-nubl-muted">
                    {order.shippingAddress.governorate} — {order.shippingAddress.area}
                  </td>
                  <td className="p-4 text-nubl-muted font-mono">{order.date}</td>
                  <td className="p-4 font-medium text-nubl-gold text-sm">
                    {order.total.toFixed(3)}
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 bg-nubl-obsidian border border-nubl-border font-bold uppercase text-[10px] text-nubl-goldSoft">
                      {order.paymentMethod}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                      aria-label="تغيير حالة الطلب"
                      className="bg-nubl-obsidian border border-nubl-border text-nubl-ivory p-1.5 text-xs focus:border-nubl-gold cursor-pointer"
                    >
                      <option value="new">جديد</option>
                      <option value="processing">قيد التجهيز</option>
                      <option value="shipped">تم الشحن</option>
                      <option value="delivered">تم التوصيل</option>
                      <option value="cancelled">ملغي</option>
                    </select>
                  </td>
                  <td className="p-4 text-left">
                    <Link
                      to={`/admin/orders/${order.id}`}
                      className="p-1.5 text-nubl-muted hover:text-nubl-gold inline-block transition-colors"
                      title="عرض التفاصيل والفاتورة"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
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
