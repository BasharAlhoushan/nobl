export type CategorySlug = 'incense' | 'burners' | 'perfumes' | 'accessories' | 'gifts';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  nameEn: string;
  tagline: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameEn: string;
  category: string;
  categorySlug: CategorySlug;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  shortDescription: string;
  fullDescription: string;
  details: {
    origin?: string;
    volume?: string;
    weight?: string;
    burningTime?: string;
    materials?: string;
    character?: string;
  };
  fragranceNotes?: FragranceNotes;
  burningTips?: string[];
  images: string[];
  tag?: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerCity: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  email?: string;
  governorate: string; // المحافظة
  area: string;        // المنطقة
  block: string;       // القطعة
  street: string;      // الشارع
  avenue?: string;     // الجادة
  house: string;       // رقم المنزل / المبنى
  notes?: string;      // ملاحظات التوصيل
  isDefault?: boolean;
}

export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'knet' | 'card' | 'cod';

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  shippingAddress: Address;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  timeline: {
    status: OrderStatus;
    label: string;
    timestamp: string;
    done: boolean;
  }[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  governorate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  addresses: Address[];
}

export interface StoreSettings {
  storeName: string;
  storeNameEn: string;
  country: string;
  currency: string;
  phone: string;
  email: string;
  address: string;
  shippingFee: number;
  freeShippingThreshold: number;
  bannerNotice: string;
  instagram: string;
  whatsapp: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  addresses: Address[];
}
