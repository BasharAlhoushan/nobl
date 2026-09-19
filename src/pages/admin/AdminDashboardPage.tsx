import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Package,
  CreditCard,
  ArrowUpRight,
  ArrowLeft,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminDashboardPage: React.FC = () => {
  const { products, orders, customers } = useAdmin();

  // Calculate Metrics
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const totalCustomersCount = customers.length;
  const totalProductsCount = products.length;
  const avgOrderValue = totalOrdersCount > 0 ? totalSales / totalOrdersCount : 0;

  // Mock weekly revenue points for luxury SVG chart
  const weeklyPoints = [
    { day: 'السبت', revenue: 145.5, height: 65 },
    { day: 'الأحد', revenue: 210.0, height: 95 },
    { day: 'الإثنين', revenue: 180.0, height: 80 },
    { day: 'الثلاثاء', revenue: 260.5, height: 115 },
    { day: 'الأربعاء', revenue: 310.0, height: 140 },
    { day: 'الخميس', revenue: 420.0, height: 185 },
    { day: 'الجمعة', revenue: 380.5, height: 165 },
  ];

  const recentOrders = orders.slice(0, 4);
  const topProducts = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-nubl-border">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            لوحة المؤشرات
          </span>
          <h1 className="text-2xl sm:text-3xl font-light text-nubl-ivory">
            نظرة عامة على المبيعات والعمليات
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="px-4 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs transition-colors"
          >
            + إضافة منتج جديد
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Sales */}
        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center justify-between text-xs text-nubl-muted">
            <span>إجمالي المبيعات</span>
            <TrendingUp className="w-4 h-4 text-nubl-gold" />
          </div>
          <div className="text-2xl font-light text-nubl-gold">
            {totalSales.toFixed(3)} <span className="text-xs text-nubl-ivory">د.ك</span>
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+18.4% عن الشهر السابق</span>
          </div>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center justify-between text-xs text-nubl-muted">
            <span>عدد الطلبات</span>
            <ShoppingBag className="w-4 h-4 text-nubl-gold" />
          </div>
          <div className="text-2xl font-light text-nubl-ivory font-mono">
            {totalOrdersCount}
          </div>
          <div className="text-[11px] text-nubl-muted">
            منها {orders.filter((o) => o.status === 'processing').length} قيد التجهيز
          </div>
        </div>

        {/* Metric 3: Total Customers */}
        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center justify-between text-xs text-nubl-muted">
            <span>عدد العملاء</span>
            <Users className="w-4 h-4 text-nubl-gold" />
          </div>
          <div className="text-2xl font-light text-nubl-ivory font-mono">
            {totalCustomersCount}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <span>عملاء مسجلين بالكويت</span>
          </div>
        </div>

        {/* Metric 4: Total Products */}
        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center justify-between text-xs text-nubl-muted">
            <span>عدد المنتجات</span>
            <Package className="w-4 h-4 text-nubl-gold" />
          </div>
          <div className="text-2xl font-light text-nubl-ivory font-mono">
            {totalProductsCount}
          </div>
          <div className="text-[11px] text-nubl-muted">
            عبر 5 فئات رئيسية
          </div>
        </div>

        {/* Metric 5: Average Order Value */}
        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center justify-between text-xs text-nubl-muted">
            <span>متوسط الطلب</span>
            <CreditCard className="w-4 h-4 text-nubl-gold" />
          </div>
          <div className="text-2xl font-light text-nubl-gold">
            {avgOrderValue.toFixed(3)} <span className="text-xs text-nubl-ivory">د.ك</span>
          </div>
          <div className="text-[11px] text-nubl-goldSoft">
            معدل سلة النخبة
          </div>
        </div>
      </div>

      {/* Sales Performance Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Revenue Bar Graph (8 cols) */}
        <div className="lg:col-span-8 p-6 bg-nubl-espresso border border-nubl-border space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-nubl-ivory">
                حجم المبيعات الأسبوعية (د.ك)
              </h3>
              <p className="text-xs text-nubl-muted">مقارنة الإيرادات اليومية في الكويت</p>
            </div>
            <span className="text-xs px-2.5 py-1 bg-nubl-obsidian border border-nubl-gold/30 text-nubl-gold">
              آخر 7 أيام
            </span>
          </div>

          {/* Luxury Chart Bars */}
          <div className="pt-8 pb-2 flex items-end justify-between gap-3 h-52 border-b border-nubl-border/60 px-2">
            {weeklyPoints.map((item) => (
              <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                <span className="text-[10px] text-nubl-gold opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                  {item.revenue.toFixed(0)} د.ك
                </span>
                <div className="w-full max-w-[36px] bg-nubl-obsidian rounded-none overflow-hidden h-40 flex items-end">
                  <div
                    className="w-full bg-gradient-to-t from-nubl-goldMuted to-nubl-gold group-hover:from-nubl-gold group-hover:to-nubl-goldSoft transition-all duration-300"
                    style={{ height: `${item.height}px` }}
                  />
                </div>
                <span className="text-[11px] text-nubl-muted group-hover:text-nubl-ivory transition-colors">
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown (4 cols) */}
        <div className="lg:col-span-4 p-6 bg-nubl-espresso border border-nubl-border space-y-5">
          <h3 className="text-sm font-medium text-nubl-ivory">توزيع المبيعات حسب الفئة</h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-nubl-muted mb-1.5">
                <span>البخور والعود</span>
                <span className="text-nubl-gold font-medium">42%</span>
              </div>
              <div className="w-full h-1.5 bg-nubl-obsidian">
                <div className="h-full bg-nubl-gold" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-nubl-muted mb-1.5">
                <span>العطور الحصرية</span>
                <span className="text-nubl-gold font-medium">35%</span>
              </div>
              <div className="w-full h-1.5 bg-nubl-obsidian">
                <div className="h-full bg-nubl-goldSoft" style={{ width: '35%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-nubl-muted mb-1.5">
                <span>المباخر الفاخرة</span>
                <span className="text-nubl-gold font-medium">15%</span>
              </div>
              <div className="w-full h-1.5 bg-nubl-obsidian">
                <div className="h-full bg-amber-600" style={{ width: '15%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-nubl-muted mb-1.5">
                <span>أطقم الهدايا والإكسسوارات</span>
                <span className="text-nubl-gold font-medium">8%</span>
              </div>
              <div className="w-full h-1.5 bg-nubl-obsidian">
                <div className="h-full bg-zinc-500" style={{ width: '8%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders & Top Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Table (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-nubl-border">
            <h3 className="text-sm font-medium text-nubl-ivory">أحدث الطلبات المستلمة</h3>
            <Link to="/admin/orders" className="text-xs text-nubl-gold hover:underline">
              عرض كل الطلبات
            </Link>
          </div>

          <div className="divide-y divide-nubl-border/40 text-xs">
            {recentOrders.map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between">
                <div>
                  <Link
                    to={`/admin/orders/${ord.id}`}
                    className="font-mono text-nubl-gold hover:underline font-medium block"
                  >
                    {ord.orderNumber}
                  </Link>
                  <span className="text-nubl-muted">{ord.customer.name} • {ord.shippingAddress.area}</span>
                </div>
                <div className="text-left">
                  <span className="font-semibold text-nubl-ivory block">
                    {ord.total.toFixed(3)} د.ك
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-nubl-obsidian border border-nubl-border text-nubl-goldSoft">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products (5 cols) */}
        <div className="lg:col-span-5 p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-nubl-border">
            <h3 className="text-sm font-medium text-nubl-ivory">الأكثر مبيعاً في المتجر</h3>
            <Link to="/admin/products" className="text-xs text-nubl-gold hover:underline">
              إدارة المنتجات
            </Link>
          </div>

          <div className="divide-y divide-nubl-border/40 text-xs">
            {topProducts.map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-10 h-10 object-cover bg-nubl-obsidian"
                  />
                  <div>
                    <h4 className="font-medium text-nubl-ivory truncate max-w-[150px]">
                      {prod.name}
                    </h4>
                    <span className="text-nubl-muted font-mono">{prod.sku}</span>
                  </div>
                </div>
                <div className="text-left">
                  <span className="text-nubl-gold font-medium block">{prod.price.toFixed(3)} د.ك</span>
                  <span className="text-[10px] text-nubl-subtle">مخزون: {prod.stockQuantity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
