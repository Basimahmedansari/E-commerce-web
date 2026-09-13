import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  ShieldCheck, 
  Package, 
  Headphones 
} from 'lucide-react';
import { ProductCategory } from '../types';

interface HeroProps {
  onShopClick: (category?: ProductCategory | 'all') => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onExploreClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      tagline: 'LUXURY LIFESTYLE BRAND',
      title: 'DEFINE YOUR SIGNATURE',
      subtitle: 'Luxury fragrances. Timeless watches. Bold eyewear. Modern sneakers.',
      category: 'all' as const,
      imageBg: '/img/luxora_hero_bg_1789237869867.jpg',
      accent: 'Exclusive Cliffside Collection'
    },
    {
      id: 'slide-2',
      tagline: 'HAUTE HORLOGERIE',
      title: 'TIMELESS PRECISION',
      subtitle: 'Swiss automatic chronographs and skeleton tourbillons engineered for eternity.',
      category: 'watches' as const,
      imageBg: '/img/hero_watch_bg_178923573650.jpg',
      accent: 'Master Horology Series'
    },
    {
      id: 'slide-3',
      tagline: 'HAUTE PARFUMERIE',
      title: 'IMPERIAL ESSENCE',
      subtitle: 'Rare Cambodian oud, ambergris, and Bulgarian rose macerated in Grasse.',
      category: 'perfumes' as const,
      imageBg: '/img/hero_perfume_bg_1789238594887.jpg',
      accent: 'Private Reserve Scents'
    },
    {
      id: 'slide-4',
      tagline: 'ARTISANAL LEATHER & FOOTWEAR',
      title: 'SCULPTED ELEGANCE',
      subtitle: 'Italian calfskin sneakers and 24k gold monogram belts handcrafted in Florence.',
      category: 'sneakers' as const,
      imageBg: '/img/hero_sneaker_bg_1789238612917.jpg',
      accent: 'Bespoke Atelier Craft'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section className="relative bg-[#0b0b0e] text-white overflow-hidden border-b border-white/10">
      
      {/* Background with Cinematic Overlay matching screenshot */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center">
        
        {/* Visual Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${active.imageBg})`,
            filter: 'brightness(0.65) contrast(1.1)'
          }}
        />

        {/* Ambient atmospheric gradients & vignette: dark smooth fade on the left, clear view on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090c] via-[#09090c]/85 to-transparent w-full sm:w-3/4 lg:w-3/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-transparent to-black/30 pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Signature Headline & CTA */}
            <div className="lg:col-span-8 z-10">
              
              {/* Brand Tagline with horizontal divider line */}
              <div className="flex items-center space-x-3 mb-5">
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#c5a880] uppercase">
                  {active.tagline}
                </span>
                <span className="w-14 h-[1px] bg-[#c5a880]/70"></span>
              </div>

              {/* Main Headline */}
              <h1 className="font-luxury text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-[0.03em] text-[#f7f5f0] leading-[1.04] mb-6">
                {active.title === 'DEFINE YOUR SIGNATURE' ? (
                  <>
                    <span className="block">DEFINE YOUR</span>
                    <span className="block">SIGNATURE</span>
                  </>
                ) : (
                  active.title
                )}
              </h1>

              {/* Description */}
              <p className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-xl font-light leading-relaxed mb-8 sm:mb-10">
                {active.subtitle}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  id="hero-shop-collection-btn"
                  onClick={() => onShopClick(active.category)}
                  className="group relative inline-flex items-center space-x-2.5 px-7 py-3.5 bg-[#c5a880] hover:bg-[#d4ba94] text-black font-semibold text-xs tracking-[0.18em] uppercase rounded-sm transition-all duration-200 shadow-[0_4px_24px_rgba(197,168,128,0.3)] cursor-pointer"
                >
                  <span>Shop Collection</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  id="hero-explore-arrivals-btn"
                  onClick={onExploreClick}
                  className="group inline-flex items-center space-x-2.5 px-6 py-3.5 border border-white/25 hover:border-[#c5a880] text-white hover:text-[#c5a880] font-medium text-xs tracking-[0.18em] uppercase rounded-sm transition-all duration-200 bg-black/35 hover:bg-black/55 backdrop-blur-sm cursor-pointer"
                >
                  <span>Explore New Arrivals</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Right Column: Top Quote matching Image 2 */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end pt-2">
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-300 font-medium">
                  More Than Products
                </p>
                <p className="text-xs uppercase tracking-[0.25em] text-white font-semibold mt-1">
                  It's A Lifestyle
                </p>
                <div className="w-16 h-[1.5px] bg-[#c5a880] ml-auto mt-2"></div>
              </div>
            </div>

          </div>

          {/* Slider Pagination & Controls on bottom right matching Image 2 */}
          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-end mt-12 sm:mt-16 pt-6 border-t border-white/10">
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Slide dashes */}
              <div className="flex items-center space-x-2">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-[2px] transition-all rounded-full cursor-pointer ${
                      currentSlide === idx ? 'w-8 bg-[#c5a880]' : 'w-4 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Number indicator */}
              <span className="text-xs tracking-widest text-neutral-300 font-mono font-medium">
                0{currentSlide + 1} / 0{slides.length}
              </span>

              {/* Prev / Next circle buttons */}
              <div className="flex items-center space-x-2">
                <button
                  id="hero-prev-slide-btn"
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-[#c5a880] text-neutral-300 hover:text-white flex items-center justify-center transition-colors bg-black/40 hover:bg-black/70 cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  id="hero-next-slide-btn"
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-full border border-white/20 hover:border-[#c5a880] text-neutral-300 hover:text-white flex items-center justify-center transition-colors bg-black/40 hover:bg-black/70 cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Features Bar - Directly matching the bottom bar from the image */}
      <div className="bg-[#0e0e12] border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center shrink-0 text-[#c5a880]">
              <Globe size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
                Free International Shipping
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                On all orders over $150
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center shrink-0 text-[#c5a880]">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
                Secure Payment
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                100% Protected with 256-bit SSL
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center shrink-0 text-[#c5a880]">
              <Package size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
                Easy Returns
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Within 30 days hassle-free
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-full bg-[#181820] border border-white/10 flex items-center justify-center shrink-0 text-[#c5a880]">
              <Headphones size={18} />
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-wider uppercase text-neutral-200">
                24/7 Customer Support
              </h4>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                We're here to help anytime
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
