import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShieldCheck, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CartPage: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    freeShippingRemaining,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'سلة المقتنيات | نُبْل';
  }, []);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-28 bg-nubl-obsidian text-nubl-ivory min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-nubl-espresso border border-nubl-border flex items-center justify-center text-nubl-gold/60 mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-light mb-3">سلة المقتنيات فارغة</h1>
        <p className="text-sm text-nubl-muted max-w-md font-light mb-8">
          لم تقم بإضافة أي عطر أو بخور إلى سلتك بعد. استكشف تشكيلاتنا الفاخرة لتنتقي ما يناسب ذوقك.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow"
        >
          اكتشف المجموعة
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
            مراجعة الطلب
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide">
            سلة المقتنيات
          </h1>
        </div>

        {/* Free Shipping Progress */}
        <div className="max-w-4xl mx-auto bg-nubl-espresso border border-nubl-border p-4 mb-10">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-nubl-goldSoft flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-nubl-gold" />
              {freeShippingRemaining === 0 ? (
                <strong className="text-emerald-400 font-medium">
                  تهانينا! طلبيتك مؤهلة للتوصيل المجاني داخل جميع مناطق الكويت.
                </strong>
              ) : (
                <span>
                  أضف مقتنيات بقيمة <strong className="text-nubl-gold">{freeShippingRemaining.toFixed(3)} د.ك</strong> للحصول على توصيل مجاني.
                </span>
              )}
            </span>
          </div>
          <div className="w-full h-1.5 bg-nubl-obsidian rounded-full overflow-hidden">
            <div
              className="h-full bg-nubl-gold transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, ((25 - freeShippingRemaining) / 25) * 100)}%` }}
            />
          </div>
        </div>

        {/* Cart Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Items List (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="hidden sm:grid grid-cols-12 text-xs text-nubl-muted pb-3 border-b border-nubl-border/60">
              <span className="col-span-6">المقتنى</span>
              <span className="col-span-2 text-center">السعر</span>
              <span className="col-span-2 text-center">الكمية</span>
              <span className="col-span-2 text-left">الإجمالي</span>
            </div>

            {items.map((item) => (
              <div
                key={item.product.id}
                className="p-4 sm:p-5 bg-nubl-espresso/60 border border-nubl-border flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center"
              >
                {/* Product Meta */}
                <div className="w-full sm:col-span-6 flex items-center gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover bg-nubl-obsidian flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-nubl-gold block uppercase tracking-wider mb-0.5">
                      {item.product.category}
                    </span>
                    <Link
                      to={`/product/${item.product.slug}`}
                      className="text-sm font-medium text-nubl-ivory hover:text-nubl-gold transition-colors block truncate"
                    >
                      {item.product.name}
                    </Link>
                    <span className="text-xs text-nubl-muted/60 font-mono">
                      SKU: {item.product.sku}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="hidden sm:block sm:col-span-2 text-center text-xs text-nubl-ivory">
                  {item.product.price.toFixed(3)} د.ك
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-auto sm:col-span-2 flex items-center justify-between sm:justify-center">
                  <span className="sm:hidden text-xs text-nubl-muted">الكمية:</span>
                  <div className="flex items-center border border-nubl-border bg-nubl-obsidian">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 text-nubl-muted hover:text-nubl-gold transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-xs font-medium text-nubl-ivory">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 text-nubl-muted hover:text-nubl-gold transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Total & Remove */}
                <div className="w-full sm:w-auto sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 text-left">
                  <span className="sm:hidden text-xs text-nubl-muted">المجموع:</span>
                  <span className="text-xs font-semibold text-nubl-gold">
                    {(item.product.price * item.quantity).toFixed(3)} د.ك
                  </span>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-nubl-subtle hover:text-red-400 p-1 transition-colors"
                    title="حذف من السلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-4 flex justify-between items-center text-xs">
              <Link
                to="/shop"
                className="text-nubl-gold hover:underline flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5 transform rotate-180" />
                <span>متابعة التسوق في المتجر</span>
              </Link>
            </div>
          </div>

          {/* Order Summary & Coupon (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Coupon Box */}
            <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-nubl-ivory flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-nubl-gold" />
                كوبون الخصم أو الرمز الترويجي
              </h4>

              {appliedCoupon ? (
                <div className="p-3 bg-nubl-obsidian border border-nubl-gold/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-nubl-gold font-bold">{appliedCoupon.code}</span>
                    <span className="text-nubl-muted mr-2">({appliedCoupon.discountPercent}% خصم)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-400 hover:underline"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="مثال: NUBL10"
                    className="flex-1 bg-nubl-obsidian border border-nubl-border px-3 py-2 text-xs text-nubl-ivory uppercase focus:outline-none focus:border-nubl-gold font-mono"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-nubl-gold text-nubl-obsidian text-xs font-semibold hover:bg-nubl-goldHover transition-colors"
                  >
                    تطبيق
                  </button>
                </form>
              )}
              <p className="text-[11px] text-nubl-subtle">
                جرب الكود الترويجي <strong>NUBL10</strong> للحصول على خصم 10%
              </p>
            </div>

            {/* Summary Box */}
            <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
              <h4 className="text-sm font-medium text-nubl-ivory pb-3 border-b border-nubl-border/60">
                ملخص الفاتورة
              </h4>

              <div className="space-y-2.5 text-xs text-nubl-muted">
                <div className="flex justify-between">
                  <span>المجموع الجزئي:</span>
                  <span className="text-nubl-ivory font-medium">{subtotal.toFixed(3)} د.ك</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-nubl-gold">
                    <span>خصم الكوبون:</span>
                    <span>-{discount.toFixed(3)} د.ك</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>رسوم التوصيل داخل الكويت:</span>
                  <span className="text-nubl-ivory font-medium">
                    {shippingFee === 0 ? (
                      <span className="text-emerald-400 font-semibold">مجاني</span>
                    ) : (
                      `${shippingFee.toFixed(3)} د.ك`
                    )}
                  </span>
                </div>

                <div className="pt-3 border-t border-nubl-border/60 flex justify-between text-sm font-semibold text-nubl-ivory">
                  <span>المجموع النهائي:</span>
                  <span className="text-lg text-nubl-gold">{total.toFixed(3)} د.ك</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow flex items-center justify-center gap-2"
              >
                <span>إتمام الطلب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-nubl-subtle pt-2">
                <ShieldCheck className="w-4 h-4 text-nubl-gold" />
                <span>دفع إلكتروني آمن وموثق</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
