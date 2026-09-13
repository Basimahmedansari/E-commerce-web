import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Globe,
  ShieldCheck,
  Package,
  Headphones
} from 'lucide-react';

interface HeroProps {
  onShopClick: (category?: any) => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onExploreClick
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'slide-1',
      tagline: 'LUXURY LIFESTYLE BRAND',
      title: 'DEFINE YOUR SIGNATURE',
      subtitle:
        'Luxury fragrances. Timeless watches. Bold eyewear. Modern sneakers.',
      category: 'all',
      imageBg: '/img/luxora_hero_bg_1789237869867.jpg'
    },
    {
      id: 'slide-2',
      tagline: 'HAUTE HORLOGERIE',
      title: 'TIMELESS PRECISION',
      subtitle:
        'Swiss automatic chronographs engineered for eternity.',
      category: 'watches',
      imageBg: '/img/hero_watch_bg_178923573650.jpg'
    },
    {
      id: 'slide-3',
      tagline: 'HAUTE PARFUMERIE',
      title: 'IMPERIAL ESSENCE',
      subtitle:
        'Rare fragrances crafted in Grasse.',
      category: 'perfumes',
      imageBg: '/img/hero_perfume_bg_1789238594887.jpg'
    },
    {
      id: 'slide-4',
      tagline: 'ARTISANAL FOOTWEAR',
      title: 'SCULPTED ELEGANCE',
      subtitle:
        'Italian craftsmanship made for modern luxury.',
      category: 'sneakers',
      imageBg: '/img/hero_sneaker_bg_1789238612917.jpg'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const active = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#0b0b0e] text-white">

      {/* HERO */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center">

        {/* BACKGROUND */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url("${active.imageBg}")`,
            filter: 'brightness(0.65) contrast(1.1)'
          }}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090c] via-[#09090c]/80 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-transparent to-black/20" />

        {/* CONTENT */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

            {/* LEFT */}
            <div className="lg:col-span-8">

              <div className="mb-5 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#c5a880]">
                  {active.tagline}
                </span>

                <span className="h-px w-14 bg-[#c5a880]" />
              </div>

              <h1 className="mb-6 text-5xl font-normal leading-tight text-[#f7f5f0] sm:text-7xl lg:text-8xl">
                {active.title === 'DEFINE YOUR SIGNATURE' ? (
                  <>
                    <span className="block">DEFINE YOUR</span>
                    <span className="block">SIGNATURE</span>
                  </>
                ) : (
                  active.title
                )}
              </h1>

              <p className="mb-10 max-w-xl text-base leading-relaxed text-neutral-300 lg:text-lg">
                {active.subtitle}
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() => onShopClick(active.category)}
                  className="inline-flex items-center gap-3 rounded-sm bg-[#c5a880] px-7 py-4 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-[#d4ba94]"
                >
                  Shop Collection
                  <ArrowRight size={15} />
                </button>

                <button
           onClick={onExploreClick}
                  className="inline-flex items-center gap-3 rounded-sm border border-white/25 px-6 py-4 text-xs uppercase tracking-widest text-white transition hover:border-[#c5a880] hover:text-[#c5a880]"
                >
                  Explore New Arrivals
                  <ArrowRight size={15} />
                </button>

              </div>
            </div>

            {/* RIGHT */}
            <div className="hidden justify-end lg:col-span-4 lg:flex">
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-300">
                  More Than Products
                </p>

                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em]">
                  It's A Lifestyle
                </p>

                <div className="ml-auto mt-2 h-px w-16 bg-[#c5a880]" />
              </div>
            </div>

          </div>

          {/* SLIDER CONTROLS */}
          <div className="mt-16 flex justify-end border-t border-white/10 pt-6">

            <div className="flex items-center gap-5">

              {/* DOTS */}
              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1 rounded-full transition-all ${
                      currentSlide === index
                        ? 'w-8 bg-[#c5a880]'
                        : 'w-4 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* NUMBER */}
              <span className="text-xs tracking-widest text-neutral-300">
                0{currentSlide + 1} / 0{slides.length}
              </span>

              {/* ARROWS */}
              <div className="flex gap-2">

                <button
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-[#c5a880]"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-[#c5a880]"
                >
                  <ChevronRight size={16} />
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* FEATURES */}
      <div className="border-t border-white/10 bg-[#0e0e12] px-4 py-6 sm:px-6 lg:px-8">

        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 md:grid-cols-4">

          <div className="flex items-center gap-3">
            <Globe size={22} className="text-[#c5a880]" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Free International Shipping
              </h4>
              <p className="text-[11px] text-neutral-400">
                On all orders over $150
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-[#c5a880]" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Secure Payment
              </h4>
              <p className="text-[11px] text-neutral-400">
                100% Protected Payment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Package size={22} className="text-[#c5a880]" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                Easy Returns
              </h4>
              <p className="text-[11px] text-neutral-400">
                Within 30 days
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones size={22} className="text-[#c5a880]" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider">
                24/7 Customer Support
              </h4>
              <p className="text-[11px] text-neutral-400">
                We're here to help
              </p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};