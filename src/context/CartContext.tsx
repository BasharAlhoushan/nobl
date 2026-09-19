import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product, Coupon } from '../types';
import { useToast } from './ToastContext';
import { useAdmin } from './AdminContext';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  freeShippingRemaining: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { showToast } = useToast();
  const { coupons, settings } = useAdmin();

  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nubl_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const saved = localStorage.getItem('nubl_applied_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('nubl_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('nubl_applied_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('nubl_applied_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity }];
      }
    });

    showToast('تمت إضافة المنتج إلى السلة', 'success');
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('تم حذف المنتج من السلة', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discount = appliedCoupon
    ? Math.min(
        (subtotal * appliedCoupon.discountPercent) / 100,
        appliedCoupon.maxDiscount || Infinity
      )
    : 0;

  const isFreeShipping = subtotal >= settings.freeShippingThreshold || items.length === 0;
  const shippingFee = isFreeShipping ? 0 : settings.shippingFee;
  const total = Math.max(0, subtotal - discount + (items.length > 0 ? shippingFee : 0));
  const freeShippingRemaining = Math.max(0, settings.freeShippingThreshold - subtotal);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === cleanCode && c.isActive
    );

    if (!coupon) {
      return { success: false, message: 'رمز الخصم غير صالح أو منتهي الصلاحية' };
    }

    if (subtotal < coupon.minOrder) {
      return {
        success: false,
        message: `الحد الأدنى لتطبيق هذا الكوبون هو ${coupon.minOrder.toFixed(3)} د.ك`,
      };
    }

    setAppliedCoupon(coupon);
    return {
      success: true,
      message: `تم تطبيق خصم ${coupon.discountPercent}% بنجاح`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('تمت إزالة كوبون الخصم', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discount,
        shippingFee,
        total,
        freeShippingRemaining,
        itemCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
