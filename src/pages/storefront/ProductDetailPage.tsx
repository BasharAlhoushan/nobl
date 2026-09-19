import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Truck, ShieldCheck, ArrowLeft, Plus, Minus, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { ProductCard } from '../../components/product/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, reviews, updateReviewStatus } = useAdmin();
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const product = products.find((p) => p.slug === slug);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fragrance' | 'shipping' | 'reviews'>('details');

  // Review Form State
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerCity, setReviewerCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setQuantity(1);
    if (product) {
      document.title = `${product.name} | نُبْل`;
    }
  }, [product, slug]);

  if (!product) {
    return (
      <div className="pt-36 pb-24 text-center bg-nubl-obsidian text-nubl-ivory min-h-[60vh] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-light mb-4">المنتج غير موجود</h2>
        <Link
          to="/shop"
          className="px-6 py-3 bg-nubl-gold text-nubl-obsidian text-xs font-semibold"
        >
          العودة للمتجر
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id && r.status === 'approved');
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewComment) {
      showToast('يرجى ملء جميع حقول التقييم', 'error');
      return;
    }

    setReviewSubmitted(true);
    showToast('شكراً لتقييمك، سيظهر بعد مراجعة الإدارة', 'success');
  };

  return (
    <div className="pt-28 pb-24 bg-nubl-obsidian text-nubl-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-nubl-muted mb-8">
          <Link to="/" className="hover:text-nubl-gold transition-colors">الرئيسية</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-nubl-gold transition-colors">المتجر</Link>
          <span>/</span>
          <Link to={`/category/${product.categorySlug}`} className="hover:text-nubl-gold transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-nubl-ivory truncate">{product.name}</span>
        </div>

        {/* Top Product Section: Gallery & Purchase Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 items-start">
          {/* Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-[4/5] sm:aspect-square overflow-hidden bg-nubl-espresso border border-nubl-border/60">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.tag && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-nubl-obsidian/90 text-nubl-gold border border-nubl-gold/30 text-xs tracking-wider">
                  {product.tag}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 flex-shrink-0 bg-nubl-espresso border overflow-hidden transition-all ${
                      selectedImageIndex === idx
                        ? 'border-nubl-gold ring-1 ring-nubl-gold'
                        : 'border-nubl-border opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sticky Product Purchasing Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <div>
              <div className="flex items-center justify-between text-xs text-nubl-muted mb-2">
                <span className="text-nubl-gold tracking-widest uppercase">{product.category}</span>
                <span className="font-mono text-nubl-subtle">SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-light tracking-wide text-nubl-ivory mb-1">
                {product.name}
              </h1>
              <p className="text-xs text-nubl-goldSoft font-light tracking-widest uppercase mb-4">
                {product.nameEn}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-nubl-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-nubl-gold text-nubl-gold'
                          : 'text-nubl-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-semibold text-nubl-ivory">{product.rating}</span>
                <span className="text-nubl-muted">({product.reviewsCount} تقييم في الكويت)</span>
              </div>
            </div>

            {/* Price */}
            <div className="py-4 border-y border-nubl-border/50 flex items-baseline gap-3">
              <span className="text-3xl font-light text-nubl-gold">
                {product.price.toFixed(3)} <span className="text-sm font-normal">د.ك</span>
              </span>
              {product.originalPrice && (
                <span className="text-sm text-nubl-subtle line-through">
                  {product.originalPrice.toFixed(3)} د.ك
                </span>
              )}
              <span className="text-xs text-emerald-400 mr-auto flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {product.inStock ? `متوفر (${product.stockQuantity} قطعة)` : 'نفد المخزون'}
              </span>
            </div>

            {/* Short Description */}
            <p className="text-xs sm:text-sm text-nubl-muted leading-relaxed font-light">
              {product.shortDescription}
            </p>

            {/* Quantity Stepper & Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-nubl-muted">الكمية:</span>
                <div className="flex items-center border border-nubl-border bg-nubl-espresso">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-nubl-muted hover:text-nubl-gold transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-nubl-ivory min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-nubl-muted hover:text-nubl-gold transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 border transition-all ${
                    isFavorited
                      ? 'border-nubl-gold bg-nubl-gold/10 text-nubl-gold'
                      : 'border-nubl-border bg-nubl-espresso text-nubl-muted hover:text-nubl-gold'
                  }`}
                  aria-label="المفضلة"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-nubl-gold' : ''}`} />
                </button>
              </div>

              {/* Main CTAs */}
              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setIsCartOpen(true);
                  }}
                  disabled={!product.inStock}
                  className="w-full py-4 bg-nubl-gold hover:bg-nubl-goldHover text-nubl-obsidian font-semibold text-xs tracking-wider flex items-center justify-center gap-2 transition-colors shadow-gold-glow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>إضافة إلى السلة</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="w-full py-3.5 bg-nubl-espresso hover:bg-nubl-surfaceLight text-nubl-ivory border border-nubl-border hover:border-nubl-gold/50 text-xs tracking-wider transition-colors"
                >
                  شراء فوري مباشر
                </button>
              </div>
            </div>

            {/* Delivery Guarantees */}
            <div className="pt-4 border-t border-nubl-border/40 space-y-2.5 text-xs text-nubl-muted">
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-nubl-gold flex-shrink-0" />
                <span>توصيل سريع داخل الكويت (نفس اليوم للطلبات المبكرة)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-nubl-gold flex-shrink-0" />
                <span>أصالة مضمونة بنسبة 100% مع تغليف نُبْل الفاخر</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details & Fragrance Notes */}
        <div className="mb-20">
          <div className="flex items-center gap-8 border-b border-nubl-border/60 pb-3 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-sm tracking-wide pb-2 relative whitespace-nowrap transition-colors ${
                activeTab === 'details'
                  ? 'text-nubl-gold font-medium'
                  : 'text-nubl-muted hover:text-nubl-ivory'
              }`}
            >
              الوصف والتفاصيل
              {activeTab === 'details' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-nubl-gold" />
              )}
            </button>

            {(product.fragranceNotes || product.burningTips) && (
              <button
                onClick={() => setActiveTab('fragrance')}
                className={`text-sm tracking-wide pb-2 relative whitespace-nowrap transition-colors ${
                  activeTab === 'fragrance'
                    ? 'text-nubl-gold font-medium'
                    : 'text-nubl-muted hover:text-nubl-ivory'
                }`}
              >
                {product.fragranceNotes ? 'الهرم العطري والنوتات' : 'إرشادات الاستخدام والتبخير'}
                {activeTab === 'fragrance' && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-nubl-gold" />
                )}
              </button>
            )}

            <button
              onClick={() => setActiveTab('shipping')}
              className={`text-sm tracking-wide pb-2 relative whitespace-nowrap transition-colors ${
                activeTab === 'shipping'
                  ? 'text-nubl-gold font-medium'
                  : 'text-nubl-muted hover:text-nubl-ivory'
              }`}
            >
              الشحن والاسترجاع
              {activeTab === 'shipping' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-nubl-gold" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`text-sm tracking-wide pb-2 relative whitespace-nowrap transition-colors ${
                activeTab === 'reviews'
                  ? 'text-nubl-gold font-medium'
                  : 'text-nubl-muted hover:text-nubl-ivory'
              }`}
            >
              التقييمات ({productReviews.length})
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-nubl-gold" />
              )}
            </button>
          </div>

          {/* Tab 1: Details */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-4 text-sm text-nubl-muted font-light leading-relaxed">
                <p>{product.fullDescription}</p>
              </div>

              <div className="bg-nubl-espresso/60 border border-nubl-border p-6 space-y-3 text-xs">
                <h4 className="text-sm font-medium text-nubl-ivory mb-2">مواصفات المقتنى:</h4>
                {product.details.volume && (
                  <div className="flex justify-between py-2 border-b border-nubl-border/40">
                    <span className="text-nubl-muted">الحجم:</span>
                    <span className="text-nubl-ivory">{product.details.volume}</span>
                  </div>
                )}
                {product.details.weight && (
                  <div className="flex justify-between py-2 border-b border-nubl-border/40">
                    <span className="text-nubl-muted">الوزن الصافي:</span>
                    <span className="text-nubl-ivory">{product.details.weight}</span>
                  </div>
                )}
                {product.details.character && (
                  <div className="flex justify-between py-2 border-b border-nubl-border/40">
                    <span className="text-nubl-muted">الطابع الحسي:</span>
                    <span className="text-nubl-ivory">{product.details.character}</span>
                  </div>
                )}
                {product.details.materials && (
                  <div className="flex justify-between py-2 border-b border-nubl-border/40">
                    <span className="text-nubl-muted">الخامات:</span>
                    <span className="text-nubl-ivory">{product.details.materials}</span>
                  </div>
                )}
                {product.details.origin && (
                  <div className="flex justify-between py-2 border-b border-nubl-border/40">
                    <span className="text-nubl-muted">بلد المنشأ / التجهيز:</span>
                    <span className="text-nubl-ivory">{product.details.origin}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Fragrance / Burning */}
          {activeTab === 'fragrance' && (
            <div>
              {product.fragranceNotes && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-nubl-espresso border border-nubl-border text-center space-y-3">
                    <Sparkles className="w-5 h-5 text-nubl-gold mx-auto" />
                    <h4 className="text-sm font-medium text-nubl-ivory">القمة العطرية</h4>
                    <p className="text-xs text-nubl-muted">
                      {product.fragranceNotes.top.join(' • ')}
                    </p>
                  </div>

                  <div className="p-6 bg-nubl-espresso border border-nubl-border text-center space-y-3">
                    <Sparkles className="w-5 h-5 text-nubl-gold mx-auto" />
                    <h4 className="text-sm font-medium text-nubl-ivory">قلب العطر</h4>
                    <p className="text-xs text-nubl-muted">
                      {product.fragranceNotes.heart.join(' • ')}
                    </p>
                  </div>

                  <div className="p-6 bg-nubl-espresso border border-nubl-border text-center space-y-3">
                    <Sparkles className="w-5 h-5 text-nubl-gold mx-auto" />
                    <h4 className="text-sm font-medium text-nubl-ivory">القاعدة العطرية</h4>
                    <p className="text-xs text-nubl-muted">
                      {product.fragranceNotes.base.join(' • ')}
                    </p>
                  </div>
                </div>
              )}

              {product.burningTips && (
                <div className="bg-nubl-espresso border border-nubl-border p-6 space-y-4">
                  <h4 className="text-sm font-medium text-nubl-ivory flex items-center gap-2">
                    <Flame className="w-4 h-4 text-nubl-gold" />
                    إرشادات الاستمتاع بأجود تبخير
                  </h4>
                  <ul className="space-y-2 text-xs text-nubl-muted font-light list-disc list-inside">
                    {product.burningTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Shipping & Returns */}
          {activeTab === 'shipping' && (
            <div className="max-w-3xl space-y-4 text-xs text-nubl-muted font-light leading-relaxed">
              <p>
                <strong className="text-nubl-ivory block mb-1">الشحن والتوصيل في الكويت:</strong>
                يتم التوصيل بواسطة مندوبي دار نُبْل في سيارات مجهزة لضمان عدم تأثر العطور والبخور بدرجات الحرارة. التوصيل مجاني للطلبات التي تزيد قيمتها عن 25.000 د.ك، ورسوم التوصيل للطلبات الأقل هي 2.000 د.ك لجميع محافظات الكويت.
              </p>
              <p>
                <strong className="text-nubl-ivory block mb-1">سياسة الاستبدال:</strong>
                نظراً لخصوصية منتجات العطور والبخور؛ يُسمح بالاستبدال أو الاسترجاع في حال وجود عيب مصنعي أو كسر أثناء النقل خلال 48 ساعة من تاريخ الاستلام شريطة بقاء المنتج في تغليفه الأصلي غير المفتوح.
              </p>
            </div>
          )}

          {/* Tab 4: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Reviews List */}
              <div className="space-y-4">
                {productReviews.length === 0 ? (
                  <p className="text-xs text-nubl-muted">لا توجد تقييمات منشورة لهذا المقتنى بعد. كن أول من يشارك تجربته.</p>
                ) : (
                  productReviews.map((rev) => (
                    <div key={rev.id} className="p-4 bg-nubl-espresso border border-nubl-border space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-nubl-ivory">{rev.customerName}</span>
                        <span className="text-nubl-subtle">{rev.customerCity} • {rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-nubl-gold">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-nubl-gold" />
                        ))}
                      </div>
                      <p className="text-xs text-nubl-muted font-light leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Submit Review Form */}
              <div className="bg-nubl-espresso border border-nubl-border p-6 max-w-xl">
                <h4 className="text-sm font-medium text-nubl-ivory mb-4">أضف تقييمك الخاص</h4>
                {reviewSubmitted ? (
                  <div className="text-xs text-emerald-400 p-3 bg-nubl-obsidian border border-emerald-500/20">
                    تم استلام تقييمك بنجاح، شكراً لمشاركتك ذوقك الراقي.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-nubl-muted mb-1">الاسم الكريم</label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="مثال: فهد الدبوس"
                          required
                          className="w-full bg-nubl-obsidian border border-nubl-border p-2 text-nubl-ivory"
                        />
                      </div>
                      <div>
                        <label className="block text-nubl-muted mb-1">المنطقة في الكويت</label>
                        <input
                          type="text"
                          value={reviewerCity}
                          onChange={(e) => setReviewerCity(e.target.value)}
                          placeholder="مثال: الروضة"
                          required
                          className="w-full bg-nubl-obsidian border border-nubl-border p-2 text-nubl-ivory"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-nubl-muted mb-1">التقييم</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="bg-nubl-obsidian border border-nubl-border p-2 text-nubl-ivory cursor-pointer"
                      >
                        <option value={5}>5 نجوم — استثنائي ومميز جداً</option>
                        <option value={4}>4 نجوم — رائع جداً</option>
                        <option value={3}>3 نجوم — جيد</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-nubl-muted mb-1">رأيك وتجربتك</label>
                      <textarea
                        rows={3}
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        placeholder="شاركنا رأيك في الرائحة، الثبات، والتغليف..."
                        required
                        className="w-full bg-nubl-obsidian border border-nubl-border p-2 text-nubl-ivory"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-nubl-gold text-nubl-obsidian font-semibold"
                    >
                      إرسال التقييم
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-nubl-border/40">
            <h3 className="text-xl sm:text-2xl font-light text-nubl-ivory mb-8">
              مقتنيات أخرى قد تنال إعجابك
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
