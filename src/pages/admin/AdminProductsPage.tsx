import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit3, Trash2, ExternalLink, Package } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';

export const AdminProductsPage: React.FC = () => {
  const { products, deleteProduct } = useAdmin();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = products.filter((p) => {
    if (selectedCategory !== 'all' && p.categorySlug !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`هل أنت متأكد من حذف المنتج "${name}"؟`)) {
      deleteProduct(id);
      showToast('تم حذف المنتج بنجاح', 'info');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-nubl-border gap-4">
        <div>
          <span className="text-xs uppercase tracking-luxury text-nubl-gold block mb-1">
            إدارة الكتالوج
          </span>
          <h1 className="text-2xl font-light text-nubl-ivory">المنتجات والمقتنيات</h1>
          <p className="text-xs text-nubl-muted mt-0.5">
            إجمالي المنتجات المسجلة في النظام ({products.length})
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="px-5 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs transition-colors flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة منتج جديد</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-nubl-espresso border border-nubl-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث بالاسم، رمز SKU، الفئة..."
            className="w-full bg-nubl-obsidian border border-nubl-border px-8 py-2 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
          />
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-nubl-gold" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-nubl-muted hidden sm:inline">الفئة:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto bg-nubl-obsidian border border-nubl-border text-nubl-ivory px-3 py-2 focus:border-nubl-gold cursor-pointer"
          >
            <option value="all">كافة الفئات</option>
            <option value="incense">البخور والعود</option>
            <option value="burners">المباخر الفاخرة</option>
            <option value="perfumes">العطور الحصرية</option>
            <option value="gifts">أطقم الهدايا</option>
            <option value="accessories">الإكسسوارات</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-nubl-espresso border border-nubl-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead className="bg-nubl-obsidian text-nubl-muted border-b border-nubl-border">
              <tr>
                <th className="p-4 font-medium">المنتج</th>
                <th className="p-4 font-medium">الفئة</th>
                <th className="p-4 font-medium">السعر (د.ك)</th>
                <th className="p-4 font-medium">المخزون</th>
                <th className="p-4 font-medium">الحالة</th>
                <th className="p-4 font-medium text-left">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-nubl-border/40">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-nubl-obsidian/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-12 h-12 object-cover bg-nubl-obsidian flex-shrink-0"
                      />
                      <div>
                        <span className="font-medium text-nubl-ivory block text-sm">
                          {prod.name}
                        </span>
                        <span className="text-[10px] text-nubl-muted font-mono">
                          {prod.sku}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-nubl-goldSoft">{prod.category}</td>
                  <td className="p-4 font-medium text-nubl-gold">
                    {prod.price.toFixed(3)}
                    {prod.originalPrice && (
                      <span className="text-[10px] text-nubl-subtle line-through mr-1">
                        {prod.originalPrice.toFixed(3)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className={`font-mono ${
                        prod.stockQuantity <= 10
                          ? 'text-amber-400 font-bold'
                          : 'text-nubl-ivory'
                      }`}
                    >
                      {prod.stockQuantity} قطعة
                    </span>
                  </td>
                  <td className="p-4">
                    {prod.inStock ? (
                      <span className="px-2.5 py-1 bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px]">
                        متوفر
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-red-950/60 text-red-300 border border-red-500/30 text-[10px]">
                        نفد المخزون
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-left">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        to={`/product/${prod.slug}`}
                        target="_blank"
                        className="p-1.5 text-nubl-muted hover:text-nubl-gold transition-colors"
                        title="معاينة في المتجر"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => navigate(`/admin/products/${prod.id}/edit`)}
                        className="p-1.5 text-nubl-muted hover:text-nubl-ivory transition-colors"
                        title="تعديل المنتج"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="p-1.5 text-nubl-subtle hover:text-red-400 transition-colors"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
