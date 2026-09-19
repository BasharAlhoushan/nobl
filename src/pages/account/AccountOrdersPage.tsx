import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowLeft, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { OrderStatus } from '../../types';

export const AccountOrdersPage: React.FC = () => {
  const { userOrders } = useAuth();

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2.5 py-1 bg-amber-950/60 text-amber-300 border border-amber-500/30 text-[11px] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            جديد
          </span>
        );
      case 'processing':
        return (
          <span className="px-2.5 py-1 bg-blue-950/60 text-blue-300 border border-blue-500/30 text-[11px] flex items-center gap-1">
            <Package className="w-3 h-3" />
            قيد التجهيز
          </span>
        );
      case 'shipped':
        return (
          <span className="px-2.5 py-1 bg-purple-950/60 text-purple-300 border border-purple-500/30 text-[11px] flex items-center gap-1">
            <Truck className="w-3 h-3" />
            تم الشحن
          </span>
        );
      case 'delivered':
        return (
          <span className="px-2.5 py-1 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[11px] flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            تم التوصيل
          </span>
        );
      case 'cancelled':
        return (
          <span className="px-2.5 py-1 bg-red-950/60 text-red-300 border border-red-500/30 text-[11px] flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            ملغي
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-nubl-border/60 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-light text-nubl-ivory">طلباتي السابقة</h2>
          <p className="text-xs text-nubl-muted mt-0.5">
            سجل كافة مشترياتك وتتبع الشحنات الجارية لمناطق الكويت.
          </p>
        </div>
        <span className="text-xs text-nubl-gold font-mono">
          {userOrders.length} طلبات
        </span>
      </div>

      {userOrders.length === 0 ? (
        <div className="text-center py-16 bg-nubl-obsidian/40 border border-nubl-border/50 p-6">
          <Package className="w-10 h-10 text-nubl-muted/50 mx-auto mb-3" />
          <p className="text-sm text-nubl-ivory mb-1">لا توجد طلبات مسجلة بعد</p>
          <p className="text-xs text-nubl-muted mb-6 font-light">
            عند تأكيد أي طلب للبخور أو العطور سيظهر هنا مع مسار التتبع المباشر.
          </p>
          <Link
            to="/shop"
            className="px-6 py-2.5 bg-nubl-gold text-nubl-obsidian font-semibold text-xs inline-block"
          >
            تصفح المتجر
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 bg-nubl-obsidian/60 border border-nubl-border/70 hover:border-nubl-gold/30 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-nubl-border/40 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-nubl-muted">الطلب:</span>
                  <strong className="font-mono text-nubl-gold text-sm">
                    {order.orderNumber}
                  </strong>
                  <span className="text-nubl-subtle">• {order.date}</span>
                </div>
                <div>{getStatusBadge(order.status)}</div>
              </div>

              {/* Items preview */}
              <div className="flex flex-wrap gap-4 items-center">
                {order.items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-2 text-xs">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-10 h-10 object-cover bg-nubl-espresso"
                    />
                    <div>
                      <p className="text-nubl-ivory truncate max-w-[140px]">
                        {item.product.name}
                      </p>
                      <span className="text-[10px] text-nubl-muted">
                        {item.quantity} × {item.price.toFixed(3)} د.ك
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="pt-3 border-t border-nubl-border/40 flex items-center justify-between text-xs">
                <div className="text-nubl-muted">
                  الإجمالي الكلي:{' '}
                  <strong className="text-nubl-gold text-sm">
                    {order.total.toFixed(3)} د.ك
                  </strong>
                </div>

                <Link
                  to={`/account/orders/${order.id}`}
                  className="text-xs text-nubl-gold hover:underline flex items-center gap-1"
                >
                  <span>تفاصيل الفاتورة والتتبع</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
