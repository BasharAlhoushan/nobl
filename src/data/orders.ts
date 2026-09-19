import { Order } from '../types';
import { products } from './products';

export const initialOrders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'NBL-2026-00125',
    date: '2026-09-18',
    customer: {
      name: 'عبدالرحمن الدوسري',
      phone: '+965 9988 7766',
      email: 'a.aldosari@example.kw',
    },
    shippingAddress: {
      id: 'addr-1',
      name: 'عبدالرحمن الدوسري',
      phone: '+965 9988 7766',
      governorate: 'العاصمة',
      area: 'الضاحية (عبدالله السالم)',
      block: '3',
      street: 'شارع صنعاء',
      avenue: 'جادة 12',
      house: 'منزل 14',
      notes: 'التوصيل بعد صلاة العصر رجاءً',
    },
    items: [
      {
        product: products[0], // مجموعة نُبْل الخاصة
        quantity: 1,
        price: 38.000,
      },
      {
        product: products[6], // بخور نُبْل الملكي
        quantity: 2,
        price: 18.500,
      },
    ],
    subtotal: 75.000,
    discount: 7.500,
    couponCode: 'NUBL10',
    shippingFee: 0,
    total: 67.500,
    paymentMethod: 'knet',
    status: 'processing',
    timeline: [
      { status: 'new', label: 'تم تأكيد الطلب والدفع', timestamp: '2026-09-18 14:30', done: true },
      { status: 'processing', label: 'جاري التجهيز والتغليف الملكي', timestamp: '2026-09-18 16:00', done: true },
      { status: 'shipped', label: 'تم تسليم الشحنة لمندوب نُبْل', timestamp: '', done: false },
      { status: 'delivered', label: 'تم التوصيل بنجاح', timestamp: '', done: false },
    ],
  },
  {
    id: 'ord-2',
    orderNumber: 'NBL-2026-00124',
    date: '2026-09-17',
    customer: {
      name: 'دلال الكندري',
      phone: '+965 9722 1144',
      email: 'dalal.kandari@example.kw',
    },
    shippingAddress: {
      id: 'addr-2',
      name: 'دلال الكندري',
      phone: '+965 9722 1144',
      governorate: 'حولي',
      area: 'السالمية',
      block: '7',
      street: 'شارع سالم المبارك',
      house: 'برج الأوركيد، شقة 14',
    },
    items: [
      {
        product: products[11], // مبخرة الحجر الداكن
        quantity: 1,
        price: 15.500,
      },
      {
        product: products[18], // ملقط فحم نُبْل الذهبي
        quantity: 1,
        price: 4.500,
      },
    ],
    subtotal: 20.000,
    discount: 0,
    shippingFee: 2.000,
    total: 22.000,
    paymentMethod: 'knet',
    status: 'shipped',
    timeline: [
      { status: 'new', label: 'تم تأكيد الطلب', timestamp: '2026-09-17 10:15', done: true },
      { status: 'processing', label: 'تم التجهيز', timestamp: '2026-09-17 11:30', done: true },
      { status: 'shipped', label: 'في الطريق إلى العميل', timestamp: '2026-09-17 14:00', done: true },
      { status: 'delivered', label: 'تم التوصيل', timestamp: '', done: false },
    ],
  },
  {
    id: 'ord-3',
    orderNumber: 'NBL-2026-00123',
    date: '2026-09-16',
    customer: {
      name: 'جراح المطوع',
      phone: '+965 6644 3322',
      email: 'jarrah.almutawa@example.kw',
    },
    shippingAddress: {
      id: 'addr-3',
      name: 'جراح المطوع',
      phone: '+965 6644 3322',
      governorate: 'العاصمة',
      area: 'اليرموك',
      block: '2',
      street: 'شارع 1',
      house: 'فيلا 8',
    },
    items: [
      {
        product: products[15], // طقم نُبْل الملكي الفاخر
        quantity: 1,
        price: 54.000,
      },
    ],
    subtotal: 54.000,
    discount: 0,
    shippingFee: 0,
    total: 54.000,
    paymentMethod: 'card',
    status: 'delivered',
    timeline: [
      { status: 'new', label: 'تم تأكيد الطلب', timestamp: '2026-09-16 09:00', done: true },
      { status: 'processing', label: 'تم التجهيز', timestamp: '2026-09-16 10:30', done: true },
      { status: 'shipped', label: 'تم الشحن', timestamp: '2026-09-16 13:00', done: true },
      { status: 'delivered', label: 'تم التوصيل للعميل', timestamp: '2026-09-16 15:45', done: true },
    ],
  },
  {
    id: 'ord-4',
    orderNumber: 'NBL-2026-00122',
    date: '2026-09-15',
    customer: {
      name: 'سارة الخرافي',
      phone: '+965 9911 2233',
      email: 'sara.kharafi@example.kw',
    },
    shippingAddress: {
      id: 'addr-4',
      name: 'سارة الخرافي',
      phone: '+965 9911 2233',
      governorate: 'العاصمة',
      area: 'الشويخ السكنية',
      block: '1',
      street: 'شارع 10',
      house: 'قصر 5',
    },
    items: [
      {
        product: products[1], // عطر نُبْل الأيقوني
        quantity: 2,
        price: 24.500,
      },
      {
        product: products[7], // بخور العود المعتّق
        quantity: 1,
        price: 26.000,
      },
    ],
    subtotal: 75.000,
    discount: 0,
    shippingFee: 0,
    total: 75.000,
    paymentMethod: 'knet',
    status: 'delivered',
    timeline: [
      { status: 'new', label: 'تم تأكيد الطلب', timestamp: '2026-09-15 11:00', done: true },
      { status: 'processing', label: 'تم التجهيز', timestamp: '2026-09-15 12:00', done: true },
      { status: 'shipped', label: 'تم الشحن', timestamp: '2026-09-15 14:00', done: true },
      { status: 'delivered', label: 'تم التوصيل', timestamp: '2026-09-15 17:00', done: true },
    ],
  },
];
