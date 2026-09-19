import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, CreditCard, Banknote, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { kuwaitGovernorates } from '../../data/locations';
import { Order, PaymentMethod, Address } from '../../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, discount, shippingFee, total, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useAdmin();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');

  // Address fields
  const [selectedGovernorate, setSelectedGovernorate] = useState(
    user?.addresses[0]?.governorate || 'العاصمة'
  );
  const [selectedArea, setSelectedArea] = useState(
    user?.addresses[0]?.area || 'مدينة الكويت'
  );
  const [block, setBlock] = useState(user?.addresses[0]?.block || '');
  const [street, setStreet] = useState(user?.addresses[0]?.street || '');
  const [avenue, setAvenue] = useState(user?.addresses[0]?.avenue || '');
  const [house, setHouse] = useState(user?.addresses[0]?.house || '');
  const [notes, setNotes] = useState(user?.addresses[0]?.notes || '');

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('knet');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'إتمام الطلب | نُبْل — الدفع الآمن';
  }, []);

  // Update areas when governorate changes
  const currentGovernorateData = kuwaitGovernorates.find(
    (g) => g.name === selectedGovernorate
  );

  const handleGovernorateChange = (govName: string) => {
    setSelectedGovernorate(govName);
    const gData = kuwaitGovernorates.find((g) => g.name === govName);
    if (gData && gData.areas.length > 0) {
      setSelectedArea(gData.areas[0]);
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !block || !street || !house) {
      showToast('يرجى ملء جميع الحقول الإلزامية لعنوان التوصيل', 'error');
      return;
    }

    if (items.length === 0) {
      showToast('سلتك فارغة', 'error');
      navigate('/shop');
      return;
    }

    setIsSubmitting(true);

    const orderNumber = `NBL-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString('ar-KW', { hour: '2-digit', minute: '2-digit' });

    const shippingAddress: Address = {
      id: 'addr-' + Date.now(),
      name: fullName,
      phone,
      email,
      governorate: selectedGovernorate,
      area: selectedArea,
      block,
      street,
      avenue,
      house,
      notes,
    };

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber,
      date: now,
      customer: {
        name: fullName,
        phone,
        email: email || 'guest@nubl.kw',
      },
      shippingAddress,
      items: items.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        price: i.product.price,
      })),
      subtotal,
      discount,
      couponCode: appliedCoupon?.code,
      shippingFee,
      total,
      paymentMethod,
      status: 'new',
      timeline: [
        {
          status: 'new',
          label: 'تم استلام وتأكيد الطلب',
          timestamp: `${now} ${time}`,
          done: true,
        },
        {
          status: 'processing',
          label: 'جاري التجهيز والتغليف الملكي',
          timestamp: '',
          done: false,
        },
        {
          status: 'shipped',
          label: 'في الطريق مع مندوب نُبْل',
          timestamp: '',
          done: false,
        },
        {
          status: 'delivered',
          label: 'تم التوصيل بنجاح',
          timestamp: '',
          done: false,
        },
      ],
    };

    setTimeout(() => {
      addOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success?orderNumber=${orderNumber}`);
    }, 1000);
  };

  if (items.length === 0) {
    return (
      <div className="pt-36 pb-24 text-center bg-nubl-obsidian text-nubl-ivory min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-light mb-4">لا توجد مقتنيات في السلة لإتمام الطلب</h2>
        <Link
          to="/shop"
          className="px-6 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold"
        >
          العودة للمتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-2">
            الدفع الآمن داخل الكويت
          </span>
          <h1 className="text-3xl sm:text-4xl font-light tracking-wide">
            إتمام الطلب
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Col: Customer & Address Information (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Personal Information */}
              <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
                <h3 className="text-base font-medium text-nubl-ivory pb-3 border-b border-nubl-border/60">
                  معلومات العميل
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      الاسم الكامل <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="مثال: عبدالرحمن الدوسري"
                      required
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      رقم الهاتف (الكويت) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="مثال: 9988 7766"
                      required
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-nubl-muted mb-1.5">
                      البريد الإلكتروني (لتأكيد الطلب والفاتورة)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.kw"
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Kuwait Address Information */}
              <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
                <h3 className="text-base font-medium text-nubl-ivory pb-3 border-b border-nubl-border/60">
                  عنوان التوصيل داخل الكويت
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Governorate */}
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      المحافظة <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={selectedGovernorate}
                      onChange={(e) => handleGovernorateChange(e.target.value)}
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none cursor-pointer"
                    >
                      {kuwaitGovernorates.map((gov) => (
                        <option key={gov.id} value={gov.name}>
                          {gov.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      المنطقة <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none cursor-pointer"
                    >
                      {currentGovernorateData?.areas.map((area) => (
                        <option key={area} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Block */}
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      القطعة <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={block}
                      onChange={(e) => setBlock(e.target.value)}
                      placeholder="مثال: قطعة 3"
                      required
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>

                  {/* Street */}
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      الشارع <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="مثال: شارع صنعاء أو شارع 14"
                      required
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>

                  {/* Avenue */}
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      الجادة (اختياري)
                    </label>
                    <input
                      type="text"
                      value={avenue}
                      onChange={(e) => setAvenue(e.target.value)}
                      placeholder="مثال: جادة 5"
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>

                  {/* House / Building */}
                  <div>
                    <label className="block text-nubl-muted mb-1.5">
                      رقم المنزل / القسيمة <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={house}
                      onChange={(e) => setHouse(e.target.value)}
                      placeholder="مثال: منزل 12 أو فيلا 4"
                      required
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>

                  {/* Delivery Notes */}
                  <div className="sm:col-span-2">
                    <label className="block text-nubl-muted mb-1.5">
                      ملاحظات خاصة للمندوب (اختياري)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="مثال: الاتصال قبل الوصول، تسليم للديوانية..."
                      className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
                <h3 className="text-base font-medium text-nubl-ivory pb-3 border-b border-nubl-border/60">
                  طريقة الدفع المعتمدة
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* KNET */}
                  <label
                    className={`p-4 border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'knet'
                        ? 'border-nubl-gold bg-nubl-gold/10'
                        : 'border-nubl-border bg-nubl-obsidian hover:border-nubl-gold/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'knet'}
                      onChange={() => setPaymentMethod('knet')}
                      className="sr-only"
                    />
                    <span className="text-base font-bold text-nubl-gold tracking-widest block mb-1">
                      KNET
                    </span>
                    <span className="text-xs text-nubl-ivory">بوابة كي نت</span>
                  </label>

                  {/* Card */}
                  <label
                    className={`p-4 border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'border-nubl-gold bg-nubl-gold/10'
                        : 'border-nubl-border bg-nubl-obsidian hover:border-nubl-gold/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="sr-only"
                    />
                    <CreditCard className="w-5 h-5 text-nubl-gold mb-1" />
                    <span className="text-xs text-nubl-ivory">بطاقة ائتمان</span>
                  </label>

                  {/* Cash on Delivery */}
                  <label
                    className={`p-4 border flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-nubl-gold bg-nubl-gold/10'
                        : 'border-nubl-border bg-nubl-obsidian hover:border-nubl-gold/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="sr-only"
                    />
                    <Banknote className="w-5 h-5 text-nubl-gold mb-1" />
                    <span className="text-xs text-nubl-ivory">الدفع عند الاستلام</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Col: Order Summary (5 cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
                <h3 className="text-sm font-medium text-nubl-ivory pb-3 border-b border-nubl-border/60">
                  ملخص المقتنيات ({items.length})
                </h3>

                <div className="max-h-60 overflow-y-auto space-y-3 divide-y divide-nubl-border/30">
                  {items.map((item) => (
                    <div key={item.product.id} className="pt-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover bg-nubl-obsidian"
                        />
                        <div>
                          <p className="font-medium text-nubl-ivory truncate max-w-[170px]">
                            {item.product.name}
                          </p>
                          <span className="text-[10px] text-nubl-muted">الكمية: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-semibold text-nubl-gold">
                        {(item.product.price * item.quantity).toFixed(3)} د.ك
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-nubl-border/60 space-y-2 text-xs text-nubl-muted">
                  <div className="flex justify-between">
                    <span>المجموع الجزئي</span>
                    <span className="text-nubl-ivory">{subtotal.toFixed(3)} د.ك</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-nubl-gold">
                      <span>الخصم</span>
                      <span>-{discount.toFixed(3)} د.ك</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>الشحن داخل الكويت ({selectedGovernorate})</span>
                    <span className="text-nubl-ivory">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-400">مجاني</span>
                      ) : (
                        `${shippingFee.toFixed(3)} د.ك`
                      )}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-nubl-border/60 flex justify-between text-base font-semibold text-nubl-ivory">
                    <span>الإجمالي المستحق</span>
                    <span className="text-nubl-gold text-lg">{total.toFixed(3)} د.ك</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider transition-colors shadow-gold-glow flex items-center justify-center gap-2 mt-4"
                >
                  {isSubmitting ? (
                    <span>جاري معالجة الطلب...</span>
                  ) : (
                    <>
                      <span>تأكيد الطلب والدفع</span>
                      <ArrowLeft className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-nubl-subtle pt-2">
                  <ShieldCheck className="w-4 h-4 text-nubl-gold" />
                  <span>تأكيد فوري عبر رسالة نصية وبريد إلكتروني</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
