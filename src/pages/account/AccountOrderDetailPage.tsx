import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Printer, Truck, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AccountOrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { orders } = useAdmin();

  const order = orders.find((o) => o.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!order) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-nubl-muted mb-4">لم يتم العثور على الطلب المحدد</p>
        <Link to="/account/orders" className="text-xs text-nubl-gold hover:underline">
          العودة لقائمة الطلبات
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-nubl-border/60 gap-3">
        <div>
          <Link
            to="/account/orders"
            className="text-xs text-nubl-gold hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform rotate-180" />
            <span>العودة للطلبات</span>
          </Link>
          <h2 className="text-lg font-light text-nubl-ivory">
            تفاصيل الطلب: <span className="font-mono text-nubl-gold">{order.orderNumber}</span>
          </h2>
          <span className="text-xs text-nubl-muted">تاريخ الطلب: {order.date}</span>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-nubl-obsidian border border-nubl-border text-xs text-nubl-muted hover:text-nubl-ivory flex items-center gap-1.5 self-start"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>طباعة الفاتورة</span>
        </button>
      </div>

      {/* Timeline */}
      <div className="p-5 bg-nubl-obsidian/60 border border-nubl-border space-y-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-nubl-ivory flex items-center gap-2">
          <Truck className="w-4 h-4 text-nubl-gold" />
          حالة ومسار الشحنة في الكويت
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {order.timeline.map((step, idx) => (
            <div
              key={step.status}
              className={`p-3 border text-xs text-center space-y-1 ${
                step.done
                  ? 'border-nubl-gold bg-nubl-gold/10 text-nubl-gold'
                  : 'border-nubl-border/50 bg-nubl-espresso/40 text-nubl-subtle'
              }`}
            >
              <span className="text-[10px] text-nubl-muted block">0{idx + 1}</span>
              <p className="font-medium text-xs text-nubl-ivory">{step.label}</p>
              {step.timestamp && (
                <span className="text-[10px] text-nubl-muted font-mono block">
                  {step.timestamp}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-nubl-ivory">
          المقتنيات المطلوبة ({order.items.length})
        </h3>

        <div className="divide-y divide-nubl-border/40 border border-nubl-border bg-nubl-obsidian/40">
          {order.items.map((item) => (
            <div key={item.product.id} className="p-4 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-14 h-14 object-cover bg-nubl-espresso"
                />
                <div>
                  <h4 className="font-medium text-nubl-ivory text-sm">{item.product.name}</h4>
                  <span className="text-nubl-muted">الكمية: {item.quantity}</span>
                  <span className="text-nubl-subtle mr-2 font-mono">SKU: {item.product.sku}</span>
                </div>
              </div>
              <span className="font-semibold text-nubl-gold">
                {(item.price * item.quantity).toFixed(3)} د.ك
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Address & Payment Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
        <div className="p-5 bg-nubl-obsidian/60 border border-nubl-border space-y-2">
          <h4 className="font-medium text-nubl-ivory flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-nubl-gold" />
            عنوان الشحن في الكويت
          </h4>
          <p className="text-nubl-muted">{order.shippingAddress.name}</p>
          <p className="text-nubl-muted">{order.shippingAddress.phone}</p>
          <p className="text-nubl-muted">
            {order.shippingAddress.governorate} — {order.shippingAddress.area}
          </p>
          <p className="text-nubl-muted">
            قطعة {order.shippingAddress.block}، شارع {order.shippingAddress.street}، منزل {order.shippingAddress.house}
          </p>
        </div>

        <div className="p-5 bg-nubl-obsidian/60 border border-nubl-border space-y-2">
          <h4 className="font-medium text-nubl-ivory mb-2">الملخص المالي</h4>
          <div className="flex justify-between text-nubl-muted">
            <span>المجموع الجزئي:</span>
            <span>{order.subtotal.toFixed(3)} د.ك</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-nubl-gold">
              <span>خصم الكوبون ({order.couponCode}):</span>
              <span>-{order.discount.toFixed(3)} د.ك</span>
            </div>
          )}
          <div className="flex justify-between text-nubl-muted">
            <span>رسوم الشحن والتوصيل:</span>
            <span>{order.shippingFee === 0 ? 'مجاني' : `${order.shippingFee.toFixed(3)} د.ك`}</span>
          </div>
          <div className="flex justify-between text-sm font-semibold text-nubl-ivory pt-2 border-t border-nubl-border/40">
            <span>الإجمالي:</span>
            <span className="text-nubl-gold">{order.total.toFixed(3)} د.ك</span>
          </div>
        </div>
      </div>
    </div>
  );
};
