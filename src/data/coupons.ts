import { Coupon } from '../types';

export const initialCoupons: Coupon[] = [
  {
    id: 'c-1',
    code: 'NUBL10',
    discountPercent: 10,
    minOrder: 20.000,
    maxDiscount: 15.000,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 142,
  },
  {
    id: 'c-2',
    code: 'DIWANIYA',
    discountPercent: 15,
    minOrder: 40.000,
    maxDiscount: 25.000,
    expiryDate: '2026-11-30',
    isActive: true,
    usageCount: 68,
  },
  {
    id: 'c-3',
    code: 'WELCOME',
    discountPercent: 5,
    minOrder: 10.000,
    expiryDate: '2026-12-31',
    isActive: true,
    usageCount: 310,
  },
];
