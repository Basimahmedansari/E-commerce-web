import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  Sparkles, 
  Watch, 
  Sparkle, 
  Glasses, 
  Footprints, 
  Layers 
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  currentCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, option?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: Set<string>;
  searchQuery: string;
  onClearSearch: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  currentCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  searchQuery,
  onClearSearch
}) => {
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');

  const categories: { label: string; value: ProductCategory | 'all'; count: number }[] = [
    { label: 'All Creations', value: 'all', count: products.length },
    { label: 'Perfumes', value: 'perfumes', count: products.filter(p => p.category === 'perfumes').length },
    { label: 'Watches', value: 'watches', count: products.filter(p => p.category === 'watches').length },
    { label: 'Sunglasses', value: 'sunglasses', count: products.filter(p => p.category === 'sunglasses').length },
    { label: 'Sneakers', value: 'sneakers', count: products.filter(p => p.category === 'sneakers').length },
    { label: 'Belts', value: 'belts', count: products.filter(p => p.category === 'belts').length },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }
      // Badge filter
      if (selectedBadge !== 'all' && item.badge !== selectedBadge) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchCat = item.category.toLowerCase().includes(query);
        return matchName || matchDesc || matchCat;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [products, currentCategory, selectedBadge, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Category Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold mb-1">
            <Sparkles size={13} />
            <span>Curated Catalog</span>
          </div>
          <h2 className="font-luxury text-3xl sm:text-4xl text-white font-bold tracking-tight capitalize">
            {currentCategory === 'all' ? 'All Luxury Creations' : `${currentCategory} Collection`}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-xl">
            {currentCategory === 'all' && 'Explore all 100 masterwork items across perfumes, horology, eyewear, sneakers, and artisanal belts.'}
            {currentCategory === 'perfumes' && '20 rare olfactive masterworks macerated with pure Bulgarian rose, ambergris, and Cambodian oud.'}
            {currentCategory === 'watches' && '20 haute horlogerie timepieces featuring Swiss automatic movements, sapphire crystals, and tourbillons.'}
            {currentCategory === 'sunglasses' && '20 sculptural shades crafted from Japanese acetate, aerospace titanium, and 24k gold plating.'}
            {currentCategory === 'sneakers' && '20 high-fashion Italian calfskin sneakers designed for ultimate luxury and comfort.'}
            {currentCategory === 'belts' && '20 handcrafted full-grain leather belts with solid brass and palladium buckles.'}
          </p>
        </div>

        {/* Sort & Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Badge Filter */}
          <div className="flex items-center space-x-1 bg-[#14141d] p-1 rounded border border-white/10 text-xs">
            {['all', 'BESTSELLER', 'LIMITED EDITION', 'NEW ARRIVAL'].map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBadge(b)}
                className={`px-2.5 py-1 rounded text-[10px] tracking-wider uppercase transition-colors ${
                  selectedBadge === b ? 'bg-[#c5a880] text-black font-bold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {b === 'all' ? 'All Tags' : b}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-[#14141d] border border-white/10 rounded px-3 py-1.5 text-xs text-neutral-300">
            <ArrowUpDown size={13} className="text-[#c5a880] mr-2" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-white focus:outline-none cursor-pointer pr-2"
            >
              <option value="featured" className="bg-[#14141d]">Featured Order</option>
              <option value="price-low" className="bg-[#14141d]">Price: Low to High</option>
              <option value="price-high" className="bg-[#14141d]">Price: High to Low</option>
              <option value="rating" className="bg-[#14141d]">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Navigation Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            id={`category-pill-${cat.value}`}
            onClick={() => onSelectCategory(cat.value)}
            className={`px-4 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all flex items-center space-x-2 ${
              currentCategory === cat.value
                ? 'bg-[#c5a880] text-black shadow-[0_4px_16px_rgba(197,168,128,0.25)]'
                : 'bg-[#14141d] border border-white/10 text-neutral-300 hover:border-white/30 hover:text-white'
            }`}
          >
            <span>{cat.label}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
              currentCategory === cat.value ? 'bg-black/20 text-black font-mono' : 'bg-white/10 text-neutral-400 font-mono'
            }`}>
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search Query Feedback */}
      {searchQuery && (
        <div className="mb-6 bg-[#161622] border border-[#c5a880]/30 rounded p-3.5 flex items-center justify-between text-xs">
          <p className="text-neutral-300">
            Showing results for <span className="text-[#c5a880] font-semibold font-mono">"{searchQuery}"</span> ({filteredProducts.length} items found)
          </p>
          <button 
            onClick={onClearSearch}
            className="text-neutral-400 hover:text-white underline cursor-pointer"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-20 text-center text-neutral-400 bg-[#101015] border border-white/5 rounded-lg">
          <p className="font-luxury text-lg text-white mb-2">No creations found</p>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-6">
            We couldn't find any products matching your search criteria. Try modifying your filter or search query.
          </p>
          <button
            onClick={() => {
              onSelectCategory('all');
              setSelectedBadge('all');
              onClearSearch();
            }}
            className="px-6 py-2.5 bg-[#c5a880] text-black text-xs font-semibold tracking-widest uppercase rounded-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
              onAddToCart={(p, opt) => onAddToCart(p, opt)}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.has(prod.id)}
            />
          ))}
        </div>
      )}

    </section>
  );
};
