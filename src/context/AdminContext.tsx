import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Order, Customer, Coupon, Review, StoreSettings, OrderStatus } from '../types';
import { products as defaultProducts } from '../data/products';
import { initialOrders } from '../data/orders';
import { initialCustomers } from '../data/customers';
import { initialCoupons } from '../data/coupons';
import { initialReviews } from '../data/reviews';
import { initialSettings } from '../data/settings';

interface AdminContextType {
  products: Product[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  reviews: Review[];
  settings: StoreSettings;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addOrder: (order: Order) => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  toggleCouponStatus: (id: string) => void;
  deleteCoupon: (id: string) => void;
  updateReviewStatus: (id: string, status: 'approved' | 'pending' | 'hidden') => void;
  deleteReview: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  restockProduct: (id: string, quantity: number) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nubl_products');
    return saved ? JSON.parse(saved) : defaultProducts;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nubl_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('nubl_customers');
    return saved ? JSON.parse(saved) : initialCustomers;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('nubl_coupons');
    return saved ? JSON.parse(saved) : initialCoupons;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('nubl_reviews');
    return saved ? JSON.parse(saved) : initialReviews;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('nubl_settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  useEffect(() => {
    localStorage.setItem('nubl_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('nubl_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('nubl_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('nubl_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('nubl_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('nubl_settings', JSON.stringify(settings));
  }, [settings]);

  const addProduct = (newProd: Omit<Product, 'id'>): Product => {
    const id = 'prod-' + Date.now();
    const product: Product = { ...newProd, id };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;
        const now = new Date().toISOString().slice(0, 16).replace('T', ' ');
        const timeline = order.timeline.map((t) => {
          if (t.status === status) {
            return { ...t, done: true, timestamp: now };
          }
          return t;
        });
        return { ...order, status, timeline };
      })
    );
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);

    // Update product stock counts
    order.items.forEach((item) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === item.product.id
            ? {
                ...p,
                stockQuantity: Math.max(0, p.stockQuantity - item.quantity),
                inStock: p.stockQuantity - item.quantity > 0,
              }
            : p
        )
      );
    });

    // Update customer stats or add customer
    setCustomers((prev) => {
      const existing = prev.find((c) => c.phone === order.customer.phone);
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + order.total,
                lastOrderDate: order.date,
              }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: 'cust-' + Date.now(),
          name: order.customer.name,
          phone: order.customer.phone,
          email: order.customer.email,
          governorate: order.shippingAddress.governorate,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.date,
          addresses: [order.shippingAddress],
        };
        return [newCustomer, ...prev];
      }
    });
  };

  const addCoupon = (newCoupon: Omit<Coupon, 'id' | 'usageCount'>) => {
    const coupon: Coupon = {
      ...newCoupon,
      id: 'c-' + Date.now(),
      usageCount: 0,
    };
    setCoupons((prev) => [coupon, ...prev]);
  };

  const toggleCouponStatus = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const updateReviewStatus = (id: string, status: 'approved' | 'pending' | 'hidden') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const restockProduct = (id: string, quantity: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              stockQuantity: p.stockQuantity + quantity,
              inStock: p.stockQuantity + quantity > 0,
            }
          : p
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        customers,
        coupons,
        reviews,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        updateOrderStatus,
        addOrder,
        addCoupon,
        toggleCouponStatus,
        deleteCoupon,
        updateReviewStatus,
        deleteReview,
        updateSettings,
        restockProduct,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
