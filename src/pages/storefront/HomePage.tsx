import React, { useEffect } from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { BrandStatementSection } from '../../components/home/BrandStatementSection';
import { CollectionsSection } from '../../components/home/CollectionsSection';
import { SignatureProductSection } from '../../components/home/SignatureProductSection';
import { IncenseExperienceSection } from '../../components/home/IncenseExperienceSection';
import { PerfumeExperienceSection } from '../../components/home/PerfumeExperienceSection';
import { BestSellersSection } from '../../components/home/BestSellersSection';
import { GiftExperienceSection } from '../../components/home/GiftExperienceSection';
import { BrandStorySection } from '../../components/home/BrandStorySection';
import { CustomerReviewsSection } from '../../components/home/CustomerReviewsSection';
import { KuwaitDeliverySection } from '../../components/home/KuwaitDeliverySection';
import { NewsletterSection } from '../../components/home/NewsletterSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'نُبْل | NUBL — دار العطور والبخور الكويتية الفاخرة';
  }, []);

  return (
    <div className="bg-nubl-obsidian">
      {/* 01 — Cinematic Hero */}
      <HeroSection />

      {/* 02 — Brand Statement */}
      <BrandStatementSection />

      {/* 03 — Signature Collections */}
      <CollectionsSection />

      {/* 04 — Featured Signature Product */}
      <SignatureProductSection />

      {/* 05 — Incense Experience (Dark Cinematic) */}
      <IncenseExperienceSection />

      {/* 06 — Perfume Experience (Contrasting Ivory Neutral) */}
      <PerfumeExperienceSection />

      {/* 07 — Best Sellers */}
      <BestSellersSection />

      {/* 08 — Gift Experience */}
      <GiftExperienceSection />

      {/* 09 — Brand Story & Philosophy */}
      <BrandStorySection />

      {/* 10 — Customer Experiences (Kuwait Testimonials) */}
      <CustomerReviewsSection />

      {/* 11 — Kuwait Delivery */}
      <KuwaitDeliverySection />

      {/* 12 — Newsletter */}
      <NewsletterSection />
    </div>
  );
};
