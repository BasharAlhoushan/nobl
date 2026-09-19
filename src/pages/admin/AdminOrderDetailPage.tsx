import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Truck, MapPin, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { OrderStatus } from '../../types';

export const AdminOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders, updateOrderStatus } = useAdmin();
  const { showToast } = useToast();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-nubl-muted mb-4">لم يتم العثور على الطلب</p>
        <Link to="/admin/orders" className="text-xs text-nubl-gold hover:underline">
          العودة لقائمة الطلبات
        </Link>
      </div>
    );
  }

  const handleStatusChange = (newStatus: OrderStatus) => {
    updateOrderStatus(order.id, newStatus);
    showToast('تم تحديث حالة الطلب بنجاح', 'success');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-nubl-border gap-3">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/orders"
            className="p-2 bg-nubl-espresso border border-nubl-border text-nubl-muted hover:text-nubl-ivory"
          >
            <ArrowLeft className="w-4 h-4 transform rotate-180" />
          </Link>
          <div>
            <h1 className="text-xl font-light text-nubl-ivory">
              إدارة الطلب: <span className="font-mono text-nubl-gold">{order.orderNumber}</span>
            </h1>
            <span className="text-xs text-nubl-muted">تاريخ الطلب: {order.date}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-nubl-espresso border border-nubl-border text-xs text-nubl-muted hover:text-nubl-ivory flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4" />
            <span>طباعة بوليصة الشحن</span>
          </button>

          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
            className="px-4 py-2 bg-nubl-gold text-nubl-obsidian font-semibold text-xs cursor-pointer focus:outline-none"
          >
            <option value="new">جديد</option>
            <option value="processing">قيد التجهيز</option>
            <option value="shipped">تم الشحن</option>
            <option value="delivered">تم التوصيل</option>
            <option value="cancelled">ملغي</option>
          </select>
        </div>
      </div>

      {/* Grid: Customer & Kuwait Address */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-3">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            بيانات العميل
          </h3>
          <p className="text-nubl-ivory text-sm font-medium">{order.customer.name}</p>
          <p className="text-nubl-muted">الهاتف: {order.customer.phone}</p>
          <p className="text-nubl-muted">البريد: {order.customer.email}</p>
          <p className="text-nubl-gold pt-1">
            طريقة الدفع: <strong className="uppercase font-mono">{order.paymentMethod}</strong>
          </p>
        </div>

        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-3">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-nubl-gold" />
            عنوان التوصيل (الكويت)
          </h3>
          <p className="text-nubl-ivory font-medium">
            {order.shippingAddress.governorate} — {order.shippingAddress.area}
          </p>
          <p className="text-nubl-muted">
            قطعة {order.shippingAddress.block}، شارع {order.shippingAddress.street}
            {order.shippingAddress.avenue && `، جادة ${order.shippingAddress.avenue}`}، منزل {order.shippingAddress.house}
          </p>
          {order.shippingAddress.notes && (
            <p className="text-nubl-subtle pt-1">ملاحظات العميل: {order.shippingAddress.notes}</p>
          )}
        </div>
      </div>

      {/* Ordered Products Table */}
      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="p-4 border-b border-nubl-border text-sm font-medium text-nubl-ivory">
          المقتنيات المطلوبة ({order.items.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">المنتج</th>
                <th className="p-4 font-medium">رمز SKU</th>
                <th className="p-4 font-medium">سعر الوحدة</th>
                <th className="p-4 font-medium">الكمية</th>
                <th className="p-4 font-medium text-left">الإجمالي</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {order.items.map((item) => (
                <tr key={item.product.id}>
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover bg-nubl-obsidian flex-shrink-0"
                    />
                    <span className="font-medium text-nubl-ivory text-sm">
                      {item.product.name}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-nubl-muted">{item.product.sku}</td>
                  <td className="p-4 text-nubl-muted">{item.price.toFixed(3)} د.ك</td>
                  <td className="p-4 font-mono font-medium text-nubl-ivory">{item.quantity}</td>
                  <td className="p-4 font-medium text-nubl-gold text-left">
                    {(item.price * item.quantity).toFixed(3)} د.ك
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Invoice Summary */}
        <div className="p-6 bg-nubl-obsidian/60 border-t border-nubl-border flex justify-end">
          <div className="w-72 space-y-2 text-xs text-nubl-muted">
            <div className="flex justify-between">
              <span>المجموع الجزئي:</span>
              <span className="text-nubl-ivory font-medium">{order.subtotal.toFixed(3)} د.ك</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-nubl-gold">
                <span>خصم الكوبون ({order.couponCode}):</span>
                <span>-{order.discount.toFixed(3)} د.ك</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>الشحن والتوصيل بالكويت:</span>
              <span className="text-nubl-ivory font-medium">
                {order.shippingFee === 0 ? 'مجاني' : `${order.shippingFee.toFixed(3)} د.ك`}
              </span>
            </div>
            <div className="pt-2 border-t border-nubl-border/60 flex justify-between text-sm font-semibold text-nubl-ivory">
              <span>الإجمالي الكلي:</span>
              <span className="text-nubl-gold text-base">{order.total.toFixed(3)} د.ك</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
