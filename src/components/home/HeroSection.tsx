import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  id: number;
  image: string;
  tag: string;
  headlinePrefix: string;
  headlineHighlight: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    image: '/images/nubl/hero/hero-desktop.jpg',
    tag: 'دار نُـبْـل الكويتية',
    headlinePrefix: 'فخامةٌ تُدركها ',
    headlineHighlight: 'الحواس',
    subheadline: 'اكتشف عالم نُبْل من البخور والعطور والمباخر المختارة بعناية لتليق بذوقكم الرفيع.',
    ctaText: 'اكتشف المجموعة',
    ctaLink: '/shop',
    secondaryCtaText: 'تسوق العطور',
    secondaryCtaLink: '/category/perfumes',
  },
  {
    id: 2,
    image: '/images/nubl/collections/collection-incense.jpg',
    tag: 'مجموعة البخور والعود الملكي',
    headlinePrefix: 'أصالة العود و ',
    headlineHighlight: 'طيب الأثر',
    subheadline: 'أجود أنواع خشب العود المروكي والكلمنتان المعتق برائحة تأسر الحضور وتدوم في المكان.',
    ctaText: 'تصفح البخور والعود',
    ctaLink: '/category/incense',
    secondaryCtaText: 'المتجر بالكامل',
    secondaryCtaLink: '/shop',
  },
  {
    id: 3,
    image: '/images/nubl/campaigns/signature-product.jpg',
    tag: 'توليفات نيش حصرية',
    headlinePrefix: 'عطورٌ تحكي ',
    headlineHighlight: 'هيبتك',
    subheadline: 'روائح مبتكرة تمزج ندرة دهن العود وسحر الزهور الشرقية والنوتات الفاخرة.',
    ctaText: 'استكشف العطور',
    ctaLink: '/category/perfumes',
    secondaryCtaText: 'تسوق الآن',
    secondaryCtaLink: '/shop',
  },
  {
    id: 4,
    image: '/images/nubl/collections/collection-burners.jpg',
    tag: 'مباخر ومقتنيات فاخرة',
    headlinePrefix: 'روائع التصميم و ',
    headlineHighlight: 'الإتقان',
    subheadline: 'مباخر وتحف فاخرة مصممة لتكون قطعة فنية تزين مجالسكم وتخلّد طيب الضيافة.',
    ctaText: 'تسوق المباخر',
    ctaLink: '/category/burners',
    secondaryCtaText: 'تصفح الكل',
    secondaryCtaLink: '/shop',
  },
  {
    id: 5,
    image: '/images/nubl/collections/collection-gifts.jpg',
    tag: 'إهداءات ملكية راقية',
    headlinePrefix: 'هديةٌ تخلّد ',
    headlineHighlight: 'اللحظات',
    subheadline: 'صناديق وباقات هدايا استثنائية بتغليف فاخر يترك أثراً لا يُنسى لمن تحب.',
    ctaText: 'تصفح الهدايا',
    ctaLink: '/category/gifts',
    secondaryCtaText: 'تسوق الآن',
    secondaryCtaLink: '/shop',
  },
];

const SLIDE_DURATION = 5000; // 5 seconds per slide

export const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Continuous auto-play timer that resets whenever slide changes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section
      className="relative min-h-[92vh] lg:min-h-screen w-full flex items-center justify-center overflow-hidden bg-nubl-obsidian"
      aria-label="القسم الرئيسي - معرض الصور"
    >
      {/* Background Slideshow with Smooth Crossfade and Subtle Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={slide.image}
              alt={slide.tag}
              className="w-full h-full object-cover object-center lg:object-[center_40%]"
            />
          </motion.div>
        </AnimatePresence>

        {/* 
          Lightened Luxury Overlays:
          Only ~25% black veil with soft top and bottom gradients so background images are clear & bright.
        */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-nubl-obsidian/90 pointer-events-none z-[2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25 pointer-events-none z-[2]" />
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="الشريحة السابقة"
        className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-nubl-gold hover:text-black text-white border border-white/20 hover:border-nubl-gold backdrop-blur-md transition-all duration-300 shadow-luxury group cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="الشريحة التالية"
        className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-black/40 hover:bg-nubl-gold hover:text-black text-white border border-white/20 hover:border-nubl-gold backdrop-blur-md transition-all duration-300 shadow-luxury group cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Hero Content Container - Always retains radiant white/gold typography over the photo background */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-24 text-center flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center w-full"
          >
            {/* Subtle Brand Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-nubl-gold/40 bg-black/60 backdrop-blur-md mb-6 shadow-luxury">
              <Sparkles className="w-3.5 h-3.5 text-nubl-gold" />
              <span className="text-xs tracking-[0.25em] text-[#E8D8B5] uppercase">
                {slide.tag}
              </span>
            </div>

            {/* Main Headline - Fixed bright white/gold for photographic contrast in both light & dark modes */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-[1.2] max-w-3xl mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {slide.headlinePrefix}
              <span className="text-gold-gradient font-normal">
                {slide.headlineHighlight}
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl font-light leading-relaxed mb-10 text-balance drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              {slide.subheadline}
            </p>

            {/* Primary and Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to={slide.ctaLink}
                className="w-full sm:w-auto px-8 py-4 bg-nubl-gold hover:bg-nubl-goldHover text-[#0B0A09] font-semibold text-sm tracking-wider transition-all duration-300 shadow-gold-glow flex items-center justify-center gap-3 group"
              >
                <span>{slide.ctaText}</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>

              <Link
                to={slide.secondaryCtaLink}
                className="w-full sm:w-auto px-8 py-4 bg-black/50 hover:bg-black/70 text-white border border-white/30 hover:border-nubl-gold text-sm tracking-wider transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                {slide.secondaryCtaText}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Indicators with Live Progress Bar */}
      <div className="absolute bottom-6 inset-x-0 z-20 flex flex-col items-center gap-3">
        {/* Slide Indicator Pills with Animated Progress */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-luxury">
          {HERO_SLIDES.map((s, index) => {
            const isActive = index === currentSlide;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlide(index)}
                aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                className="cursor-pointer transition-all duration-300"
              >
                {isActive ? (
                  <div className="relative w-12 h-2 rounded-full bg-white/20 overflow-hidden">
                    <motion.div
                      key={`progress-${currentSlide}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
                      className="h-full bg-nubl-gold shadow-gold-glow rounded-full"
                    />
                  </div>
                ) : (
                  <div className="w-2.5 h-2 rounded-full bg-white/30 hover:bg-white/60 transition-colors" />
                )}
              </button>
            );
          })}
        </div>

        {/* Subtle Scroll Down Prompt */}
        <div className="flex flex-col items-center gap-1 pointer-events-none text-xs text-white/60">
          <span className="tracking-luxury text-[10px] uppercase font-light">انزل للاستكشاف</span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-nubl-gold/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};
