import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const Footer: React.FC = () => {
  const { settings } = useAdmin();

  return (
    <footer className="bg-nubl-espresso border-t border-nubl-border text-nubl-muted pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-nubl-border/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-block">
              <span className="text-3xl font-light tracking-[0.25em] text-nubl-ivory">نُـبْـل</span>
            </Link>
            <p className="text-xs text-nubl-gold uppercase tracking-luxury">
              {settings.storeNameEn}
            </p>
            <p className="text-sm text-nubl-muted leading-relaxed max-w-md font-light">
              دار كويتية فاخرة تُعنى بأرقى نفحات العود والبخور المعتق، والمباخر المنحوتة من صخور الطبيعة، والعطور المستخلصة من أندر الزيوت الملكية. نصنع تجربة حسية تبقى في الذاكرة.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href={settings.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-nubl-obsidian border border-nubl-border flex items-center justify-center text-nubl-goldSoft hover:text-nubl-gold hover:border-nubl-gold/40 transition-all"
                aria-label="إنستغرام"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href={settings.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-nubl-obsidian border border-nubl-border flex items-center justify-center text-nubl-goldSoft hover:text-nubl-gold hover:border-nubl-gold/40 transition-all"
                aria-label="واتساب"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-nubl-ivory tracking-wide">المجموعات</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/category/incense" className="hover:text-nubl-gold transition-colors">
                  البخور والعود المعتق
                </Link>
              </li>
              <li>
                <Link to="/category/burners" className="hover:text-nubl-gold transition-colors">
                  المباخر المعمارية
                </Link>
              </li>
              <li>
                <Link to="/category/perfumes" className="hover:text-nubl-gold transition-colors">
                  العطور الحصرية
                </Link>
              </li>
              <li>
                <Link to="/category/gifts" className="hover:text-nubl-gold transition-colors">
                  أطقم الهدايا الملكية
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-nubl-gold transition-colors">
                  إكسسوارات الطيب
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-nubl-ivory tracking-wide">خدمة العملاء</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/account/orders" className="hover:text-nubl-gold transition-colors">
                  تتبع الشحنة
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-nubl-gold transition-colors">
                  سياسة التوصيل بالكويت
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-nubl-gold transition-colors">
                  سلة المشتريات
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-nubl-gold transition-colors">
                  قائمة الرغبات
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-nubl-gold/70 hover:text-nubl-gold transition-colors">
                  بوابة إدارة المتجر
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Kuwait Concierge */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-nubl-ivory tracking-wide">التواصل والضيافة</h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-nubl-gold flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{settings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-nubl-gold flex-shrink-0" />
                <span dir="ltr">{settings.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-nubl-gold flex-shrink-0" />
                <span>{settings.email}</span>
              </div>
              <div className="pt-2 flex items-center gap-2 text-[11px] text-nubl-gold">
                <ShieldCheck className="w-4 h-4" />
                <span>توصيل معتمد لجميع محافظات الكويت</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4 text-[11px] text-nubl-subtle">
            <span>© {new Date().getFullYear()} دار نُبْل. جميع الحقوق محفوظة.</span>
            <span>•</span>
            <span>صُنع بشغف في دولة الكويت</span>
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-3 text-xs">
            <span className="px-2.5 py-1 bg-nubl-obsidian border border-nubl-border/60 text-nubl-gold font-bold tracking-wider">
              KNET
            </span>
            <span className="px-2.5 py-1 bg-nubl-obsidian border border-nubl-border/60 text-nubl-ivory font-medium">
              VISA
            </span>
            <span className="px-2.5 py-1 bg-nubl-obsidian border border-nubl-border/60 text-nubl-ivory font-medium">
              Mastercard
            </span>
            <span className="px-2.5 py-1 bg-nubl-obsidian border border-nubl-border/60 text-nubl-muted">
              الدفع عند الاستلام
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
