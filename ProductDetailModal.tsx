import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award,
  Check
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, option: string, quantity: number) => void;
  onDirectCheckout: (product: Product, option: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onDirectCheckout,
  onToggleWishlist,
  isWishlisted
}) => {
  if (!product) return null;

  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedOption, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    onDirectCheckout(product, selectedOption, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#111116] border border-white/15 rounded-lg max-w-4xl w-full overflow-hidden shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          id="product-modal-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-black transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Gallery & Main Photo */}
          <div className="p-6 bg-[#0c0c10] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[#181820] mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold tracking-widest px-3 py-1 rounded-sm uppercase bg-[#c5a880] text-black">
                    {product.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {product.gallery.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImage === img ? 'border-[#c5a880]' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Authenticity Pledge */}
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center space-x-3 text-neutral-400 text-xs">
              <Award size={16} className="text-[#c5a880] shrink-0" />
              <span>Certified 100% Authentic Luxora Creation with Holographic Seal</span>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              {/* Category & Wishlist */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
                  {product.category}
                </span>
                <button
                  id="modal-toggle-wishlist-btn"
                  onClick={() => onToggleWishlist(product)}
                  className="flex items-center space-x-1 text-xs text-neutral-300 hover:text-rose-400 transition-colors"
                >
                  <Heart 
                    size={16} 
                    className={isWishlisted ? "fill-rose-500 text-rose-500" : ""} 
                  />
                  <span>{isWishlisted ? "Saved to Wishlist" : "Save to Wishlist"}</span>
                </button>
              </div>

              {/* Title */}
              <h2 className="font-luxury text-2xl sm:text-3xl text-white font-bold tracking-wide mb-3">
                {product.name}
              </h2>

              {/* Rating & Reviews */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center text-amber-400 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < Math.floor(product.rating) ? "fill-amber-400" : "text-neutral-600"} 
                    />
                  ))}
                </div>
                <span className="text-xs text-white font-medium">{product.rating}</span>
                <span className="text-xs text-neutral-500">({product.reviewsCount} verified collector reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-neutral-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                  In Stock & Ready to Dispatch
                </span>
              </div>

              {/* Description */}
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {product.description}
              </p>

              {/* Option Selector (Volume, Size, Waist Size, etc.) */}
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-widest text-neutral-300 font-medium mb-2.5">
                  Select {product.optionName}: <span className="text-[#c5a880]">{selectedOption}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedOption(opt)}
                      className={`px-3.5 py-2 text-xs rounded-sm border transition-all ${
                        selectedOption === opt
                          ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#c5a880] font-semibold'
                          : 'border-white/10 hover:border-white/30 text-neutral-300 bg-white/5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specifications Accordion / Grid */}
              <div className="mb-6 bg-[#16161e] border border-white/10 rounded-md p-4">
                <h4 className="text-xs uppercase tracking-wider text-[#c5a880] font-semibold mb-3">
                  Atelier Specifications
                </h4>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex flex-col">
                      <dt className="text-neutral-400 text-[11px]">{key}</dt>
                      <dd className="text-neutral-200 font-medium">{val}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Features Checklist */}
              <div className="mb-6 space-y-1.5">
                {product.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2 text-xs text-neutral-300">
                    <Check size={14} className="text-[#c5a880] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Quantity & CTA */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/20 rounded bg-white/5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-300 hover:text-white text-sm"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-300 hover:text-white text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-bag-btn"
                  onClick={handleAdd}
                  className="flex-1 py-3 bg-[#c5a880] hover:bg-[#d6bc96] text-black font-semibold text-xs tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-[0_4px_16px_rgba(197,168,128,0.25)]"
                >
                  <ShoppingBag size={15} />
                  <span>{addedNotice ? "Added to Bag ✓" : "Add to Bag"}</span>
                </button>
              </div>

              <button
                id="modal-buy-now-btn"
                onClick={handleBuyNow}
                className="w-full py-3 bg-white hover:bg-neutral-200 text-black font-semibold text-xs tracking-widest uppercase rounded-sm transition-all cursor-pointer"
              >
                Instant Checkout with Express Delivery
              </button>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-neutral-400 text-center">
                <div className="flex flex-col items-center">
                  <Truck size={14} className="text-[#c5a880] mb-1" />
                  <span>Free Express Air</span>
                </div>
                <div className="flex flex-col items-center">
                  <ShieldCheck size={14} className="text-[#c5a880] mb-1" />
                  <span>256-Bit Payment</span>
                </div>
                <div className="flex flex-col items-center">
                  <RotateCcw size={14} className="text-[#c5a880] mb-1" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
