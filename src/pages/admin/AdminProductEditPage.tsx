import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useToast } from '../../context/ToastContext';
import { CategorySlug, Product } from '../../types';

export const AdminProductEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useAdmin();
  const { showToast } = useToast();

  const existingProduct = products.find((p) => p.id === id);

  const [name, setName] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [slug, setSlug] = useState('');
  const [categorySlug, setCategorySlug] = useState<CategorySlug>('perfumes');
  const [price, setPrice] = useState(25.0);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [stockQuantity, setStockQuantity] = useState(20);
  const [sku, setSku] = useState('');
  const [tag, setTag] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (existingProduct) {
      setName(existingProduct.name);
      setNameEn(existingProduct.nameEn);
      setSlug(existingProduct.slug);
      setCategorySlug(existingProduct.categorySlug);
      setPrice(existingProduct.price);
      setOriginalPrice(existingProduct.originalPrice);
      setStockQuantity(existingProduct.stockQuantity);
      setSku(existingProduct.sku);
      setTag(existingProduct.tag || '');
      setShortDescription(existingProduct.shortDescription);
      setFullDescription(existingProduct.fullDescription);
      setImages(existingProduct.images || []);
    } else if (isNew) {
      setSku(`NBL-${Math.floor(100 + Math.random() * 900)}`);
      setImages(['/images/nubl/hero/hero-desktop.jpg']);
    }
  }, [existingProduct, isNew]);

  const categoryNames: Record<CategorySlug, string> = {
    incense: 'البخور والعود',
    burners: 'المباخر الفاخرة',
    perfumes: 'العطور الحصرية',
    gifts: 'أطقم الهدايا',
    accessories: 'الإكسسوارات',
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !sku) {
      showToast('يرجى ملء الحقول الإلزامية', 'error');
      return;
    }

    const generatedSlug = slug.trim() || name.toLowerCase().replace(/\s+/g, '-');

    if (isNew) {
      const newProd: Omit<Product, 'id'> = {
        name,
        nameEn: nameEn || name,
        slug: generatedSlug,
        category: categoryNames[categorySlug],
        categorySlug,
        price,
        originalPrice: originalPrice || undefined,
        rating: 5.0,
        reviewsCount: 1,
        inStock: stockQuantity > 0,
        stockQuantity,
        sku,
        tag: tag || undefined,
        shortDescription,
        fullDescription: fullDescription || shortDescription,
        details: {
          character: 'إصدار فاخر',
        },
        images: images.length > 0 ? images : ['/images/nubl/hero/hero-desktop.jpg'],
      };

      addProduct(newProd);
      showToast('تمت إضافة المنتج بنجاح إلى المتجر', 'success');
    } else if (existingProduct) {
      updateProduct(existingProduct.id, {
        name,
        nameEn,
        slug: generatedSlug,
        category: categoryNames[categorySlug],
        categorySlug,
        price,
        originalPrice: originalPrice || undefined,
        stockQuantity,
        inStock: stockQuantity > 0,
        sku,
        tag: tag || undefined,
        shortDescription,
        fullDescription,
        images,
      });
      showToast('تم حفظ التعديلات بنجاح', 'success');
    }

    navigate('/admin/products');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-nubl-border">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="p-2 bg-nubl-espresso border border-nubl-border hover:border-nubl-gold text-nubl-muted hover:text-nubl-ivory transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transform rotate-180" />
          </Link>
          <div>
            <h1 className="text-xl font-light text-nubl-ivory">
              {isNew ? 'إضافة منتج جديد' : `تعديل: ${name}`}
            </h1>
            <span className="text-xs text-nubl-muted">
              {isNew ? 'إدراج صنف جديد في منصة نُبْل' : `SKU: ${sku}`}
            </span>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs flex items-center gap-2 transition-colors shadow-gold-glow"
        >
          <Save className="w-4 h-4" />
          <span>حفظ التغييرات</span>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        {/* Basic Info */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            البيانات الأساسية
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1.5">
                اسم المنتج (بالعربية) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: بخور نُبْل المعتق"
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1.5">الاسم الإنجليزي</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="NUBL Royal Incense"
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1.5">الرابط المخصص (Slug)</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="royal-oud-incense"
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1.5">
                الفئة <span className="text-red-400">*</span>
              </label>
              <select
                value={categorySlug}
                onChange={(e) => setCategorySlug(e.target.value as CategorySlug)}
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none cursor-pointer"
              >
                <option value="incense">البخور والعود</option>
                <option value="burners">المباخر الفاخرة</option>
                <option value="perfumes">العطور الحصرية</option>
                <option value="gifts">أطقم الهدايا</option>
                <option value="accessories">الإكسسوارات</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Inventory */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            التسعير والمخزون
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-nubl-muted mb-1.5">
                السعر الحالي (د.ك) <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                step="0.25"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1.5">السعر قبل الخصم (اختياري)</label>
              <input
                type="number"
                step="0.25"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="مثال: 30.000"
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1.5">
                الكمية في المخزون <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(Number(e.target.value))}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-nubl-muted mb-1.5">
                رمز الصنف (SKU) <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                required
                className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-nubl-muted mb-1.5">وسم الشارة (Tag)</label>
            <input
              type="text"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="مثال: الأكثر طلباً، إصدار خاص، جديد"
              className="w-full sm:w-1/2 bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            الوصف والنصوص التحريرية
          </h3>

          <div>
            <label className="block text-nubl-muted mb-1.5">الوصف المختصر (يظهر في البطاقات)</label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-nubl-muted mb-1.5">الوصف التفصيلي (صفحة المنتج)</label>
            <textarea
              rows={4}
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory focus:border-nubl-gold focus:outline-none"
            />
          </div>
        </div>

        {/* Images */}
        <div className="p-6 bg-nubl-espresso border border-nubl-border space-y-4">
          <h3 className="text-sm font-medium text-nubl-ivory pb-2 border-b border-nubl-border/60">
            صور المنتج
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="مسار الصورة مثل: /images/nubl/hero/hero-desktop.jpg"
              className="flex-1 bg-nubl-obsidian border border-nubl-border p-3 text-nubl-ivory font-mono"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-nubl-surfaceLight border border-nubl-border text-nubl-ivory hover:text-nubl-gold flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              <span>إضافة</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            {images.map((img, idx) => (
              <div key={idx} className="relative w-24 h-24 border border-nubl-border bg-nubl-obsidian group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 left-1 p-1 bg-red-950/80 text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};
