import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, MapPin, ShoppingBag } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminCustomerDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { customers, orders } = useAdmin();

  const customer = customers.find((c) => c.id === id);

  if (!customer) {
    return (
      <div className="text-center py-16">
        <p className="text-sm text-nubl-muted mb-4">لم يتم العثور على العميل</p>
        <Link to="/admin/customers" className="text-xs text-nubl-gold hover:underline">
          العودة لقائمة العملاء
        </Link>
      </div>
    );
  }

  // Find customer orders
  const customerOrders = orders.filter(
    (o) =>
      o.customer.phone === customer.phone ||
      o.customer.email.toLowerCase() === customer.email.toLowerCase()
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-nubl-border">
        <Link
          to="/admin/customers"
          className="p-2 bg-nubl-espresso border border-nubl-border text-nubl-muted hover:text-nubl-ivory"
        >
          <ArrowLeft className="w-4 h-4 transform rotate-180" />
        </Link>
        <div>
          <h1 className="text-xl font-light text-nubl-ivory">{customer.name}</h1>
          <span className="text-xs text-nubl-muted">{customer.governorate} — دولة الكويت</span>
        </div>
      </div>

      {/* Customer Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center gap-2 text-nubl-gold">
            <User className="w-4 h-4" />
            <span className="font-medium">بيانات الاتصال</span>
          </div>
          <p className="text-nubl-ivory font-mono">{customer.phone}</p>
          <p className="text-nubl-muted">{customer.email}</p>
        </div>

        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center gap-2 text-nubl-gold">
            <ShoppingBag className="w-4 h-4" />
            <span className="font-medium">إجمالي المشتريات</span>
          </div>
          <p className="text-xl font-light text-nubl-gold">
            {customer.totalSpent.toFixed(3)} د.ك
          </p>
          <p className="text-nubl-muted">عبر {customer.totalOrders} طلبات مؤكدة</p>
        </div>

        <div className="p-5 bg-nubl-espresso border border-nubl-border space-y-2">
          <div className="flex items-center gap-2 text-nubl-gold">
            <MapPin className="w-4 h-4" />
            <span className="font-medium">الموقع المعتمد</span>
          </div>
          <p className="text-nubl-ivory">{customer.governorate}</p>
          <p className="text-nubl-muted">آخر طلب: {customer.lastOrderDate}</p>
        </div>
      </div>

      {/* Customer Orders Table */}
      <div className="bg-nubl-espresso border border-nubl-border p-6 space-y-4">
        <h3 className="text-sm font-medium text-nubl-ivory">سجل طلبات هذا العميل ({customerOrders.length})</h3>

        {customerOrders.length === 0 ? (
          <p className="text-xs text-nubl-muted">لا توجد طلبات مسجلة حالياً لهذا العميل.</p>
        ) : (
          <div className="divide-y divide-nubl-border/40 text-xs">
            {customerOrders.map((ord) => (
              <div key={ord.id} className="py-3 flex items-center justify-between">
                <div>
                  <Link
                    to={`/admin/orders/${ord.id}`}
                    className="font-mono text-nubl-gold hover:underline font-medium block"
                  >
                    {ord.orderNumber}
                  </Link>
                  <span className="text-nubl-muted">{ord.date} • {ord.shippingAddress.area}</span>
                </div>
                <div className="text-left">
                  <span className="font-medium text-nubl-ivory block">{ord.total.toFixed(3)} د.ك</span>
                  <span className="text-[10px] text-nubl-goldSoft uppercase">{ord.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
