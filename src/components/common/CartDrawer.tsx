import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shippingFee,
    total,
    freeShippingRemaining,
    itemCount,
  } = useCart();

  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-nubl-obsidian/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer container - in RTL, sliding from left or right */}
          <div className="fixed inset-y-0 left-0 max-w-full flex pl-0">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="w-screen max-w-md bg-nubl-espresso border-r border-nubl-gold/20 shadow-luxury flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-5 border-b border-nubl-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-nubl-obsidian border border-nubl-gold/30 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-nubl-gold" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-nubl-ivory">سلة المقتنيات</h3>
                    <span className="text-xs text-nubl-muted">{itemCount} منتجات مختارة</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-nubl-muted hover:text-nubl-ivory rounded-full hover:bg-nubl-surface transition-colors"
                  aria-label="إغلاق السلة"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Delivery Bar */}
              <div className="bg-nubl-surface px-6 py-3 border-b border-nubl-border/60">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-nubl-goldSoft flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-nubl-gold" />
                    {freeShippingRemaining === 0 ? (
                      <span className="text-emerald-400 font-medium">تهانينا! حصلت على توصيل مجاني داخل الكويت</span>
                    ) : (
                      <span>متبقي <strong className="text-nubl-gold">{freeShippingRemaining.toFixed(3)} د.ك</strong> للشحن المجاني</span>
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

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-nubl-obsidian border border-nubl-gold/20 flex items-center justify-center mb-4 text-nubl-gold/50">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-light text-nubl-ivory mb-1">سلتك فارغة حالياً</h4>
                    <p className="text-xs text-nubl-muted max-w-xs mb-6">
                      استكشف مجموعات البخور الملكي والعطور الحصرية وأضف لمسة فخامة إلى يومك.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigate('/shop');
                      }}
                      className="px-6 py-2.5 text-xs tracking-widest text-nubl-obsidian bg-nubl-gold hover:bg-nubl-goldHover transition-colors font-medium"
                    >
                      تصفح المجموعة
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 p-3 bg-nubl-surface/50 border border-nubl-border/60 hover:border-nubl-gold/30 transition-all"
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover bg-nubl-obsidian flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] text-nubl-gold uppercase tracking-wider block">
                              {item.product.category}
                            </span>
                            <h5 className="text-sm font-medium text-nubl-ivory truncate">
                              {item.product.name}
                            </h5>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-nubl-subtle hover:text-red-400 p-1 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-nubl-border/30">
                          {/* Stepper */}
                          <div className="flex items-center border border-nubl-border bg-nubl-obsidian">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 hover:text-nubl-gold transition-colors text-nubl-muted"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-nubl-ivory min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 hover:text-nubl-gold transition-colors text-nubl-muted"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="text-left">
                            <span className="text-xs font-semibold text-nubl-gold">
                              {(item.product.price * item.quantity).toFixed(3)} د.ك
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer / Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-nubl-border bg-nubl-surface/80 space-y-3">
                  <div className="space-y-1.5 text-xs text-nubl-muted">
                    <div className="flex justify-between">
                      <span>المجموع الجزئي</span>
                      <span className="text-nubl-ivory font-medium">{subtotal.toFixed(3)} د.ك</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-nubl-gold">
                        <span>الخصم المطبق</span>
                        <span>-{discount.toFixed(3)} د.ك</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>الشحن داخل الكويت</span>
                      <span className="text-nubl-ivory font-medium">
                        {shippingFee === 0 ? (
                          <span className="text-emerald-400">مجاني</span>
                        ) : (
                          `${shippingFee.toFixed(3)} د.ك`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold text-nubl-ivory pt-2 border-t border-nubl-border/60">
                      <span>الإجمالي</span>
                      <span className="text-nubl-gold text-base">{total.toFixed(3)} د.ك</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-sm transition-colors flex items-center justify-center gap-2 shadow-luxury"
                    >
                      <span>إتمام الطلب</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>

                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="w-full py-2.5 block text-center text-xs text-nubl-goldSoft hover:text-nubl-gold transition-colors"
                    >
                      عرض تفاصيل السلة الكاملة
                    </Link>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-nubl-subtle pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-nubl-gold" />
                    <span>دفع آمن عبر KNET وبطاقات الائتمان</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
