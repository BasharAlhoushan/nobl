import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Eye, MapPin } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminCustomersPage: React.FC = () => {
  const { customers } = useAdmin();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.governorate.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="pb-6 border-b border-nubl-border flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            دليل النخبة
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">قاعدة العملاء</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            سجل العملاء وإجمالي المشتريات ومواقع التوصيل في الكويت ({customers.length} عميل)
          </p>
        </div>
      </div>

      <div className="p-4 bg-nubl-espresso border border-nubl-border flex items-center gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، رقم الهاتف، المحافظة..."
            className="w-full bg-nubl-obsidian border border-nubl-border px-8 py-2 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-nubl-gold" />
        </div>
      </div>

      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">العميل</th>
                <th className="p-4 font-medium">المحافظة</th>
                <th className="p-4 font-medium">الهاتف</th>
                <th className="p-4 font-medium">عدد الطلبات</th>
                <th className="p-4 font-medium">إجمالي الإنفاق (د.ك)</th>
                <th className="p-4 font-medium">آخر طلب</th>
                <th className="p-4 font-medium text-left">الملف</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {filtered.map((customer) => (
                <tr key={customer.id} className="hover:bg-nubl-obsidian/40 transition-colors">
                  <td className="p-4">
                    <span className="font-medium text-nubl-ivory block text-sm">
                      {customer.name}
                    </span>
                    <span className="text-[10px] text-nubl-muted">{customer.email}</span>
                  </td>
                  <td className="p-4 text-nubl-muted">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-nubl-gold" />
                      {customer.governorate}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-nubl-muted">{customer.phone}</td>
                  <td className="p-4 font-mono font-medium text-nubl-ivory">
                    {customer.totalOrders}
                  </td>
                  <td className="p-4 font-medium text-nubl-gold text-sm">
                    {customer.totalSpent.toFixed(3)}
                  </td>
                  <td className="p-4 font-mono text-nubl-muted">{customer.lastOrderDate}</td>
                  <td className="p-4 text-left">
                    <Link
                      to={`/admin/customers/${customer.id}`}
                      className="p-1.5 text-nubl-muted hover:text-nubl-gold inline-block transition-colors"
                      title="عرض تفاصيل العميل"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
