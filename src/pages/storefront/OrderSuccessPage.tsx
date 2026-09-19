import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { CheckCircle2, Package, MapPin, Truck, ArrowLeft, Printer } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const OrderSuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'NBL-2026-00125';
  const { orders } = useAdmin();

  const order = orders.find((o) => o.orderNumber === orderNumber) || orders[0];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'تم تأكيد طلبك | نُبْل';

    // Elegant gold confetti celebration
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#B9975B', '#E8D8B5', '#FFFFFF'],
      });
    } catch {
      // Ignore if unavailable
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        {/* Success Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 rounded-full bg-nubl-espresso border border-nubl-gold/40 flex items-center justify-center text-nubl-gold mx-auto shadow-gold-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="text-xs uppercase tracking-luxury text-nubl-gold block">
            شكراً لاختيارك دار نُـبْـل
          </span>

          <h1 className="text-3xl sm:text-5xl font-light tracking-wide">
            تم تأكيد طلبك بنجاح
          </h1>

          <div className="inline-block p-3 bg-nubl-espresso border border-nubl-border text-sm">
            <span className="text-nubl-muted ml-2">رقم الطلب:</span>
            <strong className="font-mono text-nubl-gold tracking-widest">{orderNumber}</strong>
          </div>

          <p className="text-xs sm:text-sm text-nubl-muted font-light max-w-md mx-auto leading-relaxed">
            تم إرسال تفاصيل الفاتورة ورابط المتابعة إلى رقم هاتفك. بدأ فريقنا الآن بتجهيز الطيب وتغليفه الملكي.
          </p>
        </div>

        {/* Order Card */}
        <div className="bg-nubl-espresso border border-nubl-border p-6 sm:p-8 space-y-8">
          {/* Tracking Timeline */}
          <div>
            <h3 className="text-sm font-medium text-nubl-ivory mb-6 flex items-center gap-2">
              <Truck className="w-4 h-4 text-nubl-gold" />
              مراحل توصيل طلبك في الكويت
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {order.timeline.map((step, idx) => (
                <div
                  key={step.status}
                  className={`p-3 border text-xs text-center space-y-1 ${
                    step.done
                      ? 'border-nubl-gold bg-nubl-gold/10 text-nubl-gold'
                      : 'border-nubl-border/60 bg-nubl-obsidian/40 text-nubl-subtle'
                  }`}
                >
                  <span className="text-[10px] block text-nubl-muted">
                    0{idx + 1}
                  </span>
                  <p className="font-medium text-nubl-ivory text-xs">{step.label}</p>
                  {step.timestamp && (
                    <span className="text-[10px] text-nubl-muted block font-mono">
                      {step.timestamp}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-nubl-border/60 text-xs">
            {/* Shipping Address */}
            <div className="space-y-2">
              <h4 className="font-medium text-nubl-ivory flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-nubl-gold" />
                عنوان التوصيل في الكويت
              </h4>
              <p className="text-nubl-muted">{order.shippingAddress.name}</p>
              <p className="text-nubl-muted">{order.shippingAddress.phone}</p>
              <p className="text-nubl-muted">
                {order.shippingAddress.governorate} — {order.shippingAddress.area}
              </p>
              <p className="text-nubl-muted">
                قطعة {order.shippingAddress.block}، شارع {order.shippingAddress.street}، منزل {order.shippingAddress.house}
              </p>
              {order.shippingAddress.notes && (
                <p className="text-nubl-subtle">ملاحظات: {order.shippingAddress.notes}</p>
              )}
            </div>

            {/* Payment & Invoice Summary */}
            <div className="space-y-2">
              <h4 className="font-medium text-nubl-ivory flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-nubl-gold" />
                طريقة الدفع والإجمالي
              </h4>
              <p className="text-nubl-muted">
                طريقة الدفع:{' '}
                <strong className="text-nubl-gold uppercase">{order.paymentMethod}</strong>
              </p>
              <p className="text-nubl-muted">
                المجموع الجزئي: {order.subtotal.toFixed(3)} د.ك
              </p>
              {order.discount > 0 && (
                <p className="text-nubl-gold">
                  خصم الكوبون ({order.couponCode}): -{order.discount.toFixed(3)} د.ك
                </p>
              )}
              <p className="text-nubl-muted">
                الشحن والتوصيل: {order.shippingFee === 0 ? 'مجاني' : `${order.shippingFee.toFixed(3)} د.ك`}
              </p>
              <p className="text-sm font-semibold text-nubl-ivory pt-2 border-t border-nubl-border/40">
                المجموع الكلي: <span className="text-nubl-gold">{order.total.toFixed(3)} د.ك</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-nubl-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 bg-nubl-obsidian border border-nubl-border hover:border-nubl-gold/40 text-xs text-nubl-muted hover:text-nubl-ivory transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة إيصال الطلب</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/account/orders"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-nubl-espresso border border-nubl-border hover:border-nubl-gold/40 text-xs text-nubl-ivory transition-colors text-center"
              >
                متابعة في حسابي
              </Link>
              <Link
                to="/"
                className="flex-1 sm:flex-none px-6 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs transition-colors text-center flex items-center justify-center gap-1.5"
              >
                <span>العودة للرئيسية</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
