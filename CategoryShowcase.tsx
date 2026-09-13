import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCategory } from '../types';

interface CategoryShowcaseProps {
  onSelectCategory: (cat: ProductCategory) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const showcases = [
    {
      category: 'perfumes' as ProductCategory,
      title: 'Haute Parfumerie',
      subtitle: 'Pure Macerations & Rare Extraits',
      count: '20 Master Perfumes',
      image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
      description: 'Hand-blended with natural ambergris, Bulgarian damask rose, and aged Cambodian agarwood.'
    },
    {
      category: 'watches' as ProductCategory,
      title: 'Haute Horlogerie',
      subtitle: 'Swiss Automatic Tourbillons & Chronos',
      count: '20 Timepieces',
      image: '/images/watch_imperial.jpg',
      description: 'COSC-certified chronometers, skeletonized movements, and exhibition sapphire casebacks.'
    },
    {
      category: 'sunglasses' as ProductCategory,
      title: 'Precision Eyewear',
      subtitle: 'Japanese Acetate & Titanium Optics',
      count: '20 Sculptural Frames',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      description: 'Anti-reflective Zeiss polarized lenses, 24-karat gold-plated hinges, and handcrafted temples.'
    },
    {
      category: 'sneakers' as ProductCategory,
      title: 'Artisanal Footwear',
      subtitle: 'Italian Full-Grain Leather & Suede',
      count: '20 Haute Sneakers',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted in Civitanova Marche with Margom rubber soles and padded calfskin linings.'
    },
    {
      category: 'belts' as ProductCategory,
      title: 'Artisan Leather Belts',
      subtitle: 'Palladium & 24K Gold Buckles',
      count: '20 Hand-stitched Belts',
      image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
      description: 'Vegetable-tanned Florentine bridle leather and equestrian hand-saddle stitching.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#09090c] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold mb-2">
            <Sparkles size={13} />
            <span>The Five Pillars of Luxora</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight">
            Curated Category Ateliers
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-light mt-2">
            Each collection represents months of bespoke sourcing, master craftsmanship, and uncompromising materials.
          </p>
        </div>

        {/* 5-Column Grid with First 2 slightly larger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcases.map((cat, idx) => (
            <div
              key={cat.category}
              onClick={() => onSelectCategory(cat.category)}
              className={`group relative rounded-lg overflow-hidden border border-white/10 hover:border-[#c5a880]/60 cursor-pointer transition-all duration-300 bg-[#121217] flex flex-col justify-end p-6 min-h-[340px] hover:shadow-[0_12px_36px_rgba(0,0,0,0.7)] ${
                idx === 0 ? 'lg:col-span-2 md:col-span-2' : ''
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${cat.image})` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/70 to-transparent group-hover:via-[#0b0b0e]/50 transition-colors" />

              {/* Top Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-[10px] font-mono font-semibold tracking-widest text-[#c5a880] uppercase bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-[#c5a880]/30">
                  {cat.count}
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#c5a880] font-medium mb-1">
                  {cat.subtitle}
                </p>
                <h3 className="font-luxury text-xl sm:text-2xl text-white font-bold mb-2 group-hover:text-[#c5a880] transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-neutral-300 line-clamp-2 mb-4 font-light leading-relaxed">
                  {cat.description}
                </p>
                
                <div className="flex items-center space-x-2 text-xs font-semibold text-white group-hover:text-[#c5a880] transition-colors uppercase tracking-widest">
                  <span>Explore Atelier</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
