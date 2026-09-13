import React from 'react';
import { Heart, Star, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, option?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onToggleWishlist,
  isWishlisted
}) => {
  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-[#111116] border border-white/10 hover:border-[#c5a880]/50 rounded-md overflow-hidden transition-all duration-300 flex flex-col relative hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#181820] cursor-pointer" onClick={() => onSelect(product)}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Badge (Bestseller, Limited Edition, New Arrival) */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`text-[9px] font-bold tracking-[0.2em] px-2.5 py-1 rounded-sm uppercase ${
              product.badge === 'BESTSELLER' 
                ? 'bg-[#c5a880] text-black font-semibold' 
                : product.badge === 'LIMITED EDITION'
                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                : product.badge === 'NEW ARRIVAL'
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                : 'bg-stone-900 text-neutral-200 border border-white/20'
            }`}>
              {product.badge}
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:text-rose-400 hover:border-rose-400/50 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={15} 
            className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"} 
          />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex-1 py-2.5 bg-black/80 hover:bg-black text-white text-xs uppercase tracking-wider font-medium rounded-sm border border-white/20 backdrop-blur-md flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Eye size={13} />
            <span>Quick View</span>
          </button>
          
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, product.options[0]);
            }}
            className="p-2.5 bg-[#c5a880] hover:bg-[#d6bc96] text-black rounded-sm transition-colors"
            title="Quick Add to Bag"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-neutral-400 uppercase tracking-widest mb-1.5">
            <span>{product.category}</span>
            <div className="flex items-center space-x-1 text-amber-400">
              <Star size={12} className="fill-amber-400" />
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-neutral-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-luxury text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors cursor-pointer line-clamp-1 mb-1"
          >
            {product.name}
          </h3>

          {/* Short description teaser */}
          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        {/* Pricing & Selection hint */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-semibold text-white font-mono">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-500 line-through font-mono">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <span className="text-[10px] text-neutral-400 tracking-wider">
            {product.options.length} {product.optionName.toLowerCase()}s
          </span>
        </div>
      </div>
    </div>
  );
};
