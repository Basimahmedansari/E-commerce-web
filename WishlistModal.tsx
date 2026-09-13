import React from 'react';
import { X, Trash2, ShoppingBag, Heart, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product, option: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#101015] border border-white/15 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0b0b0f]">
          <div className="flex items-center space-x-2">
            <Heart size={18} className="text-[#c5a880] fill-[#c5a880]" />
            <h2 className="font-luxury text-xl text-white">Your Saved Wishlist</h2>
            <span className="text-xs text-neutral-400 font-mono">({wishlistProducts.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-3">
                <Heart size={22} />
              </div>
              <h3 className="font-luxury text-base text-neutral-300 mb-1">No items saved yet</h3>
              <p className="text-xs text-neutral-500 max-w-xs mb-6">
                Click the heart icon on any timepiece, perfume, sneaker, or accessory to save it here for later.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#c5a880] text-black text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#d6bc96] transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistProducts.map((prod) => (
                <div 
                  key={prod.id}
                  className="bg-[#14141c] border border-white/5 hover:border-white/15 p-4 rounded-md flex items-center justify-between gap-4 transition-all"
                >
                  <div 
                    onClick={() => {
                      onClose();
                      onSelectProduct(prod);
                    }}
                    className="flex items-center space-x-4 cursor-pointer group flex-1"
                  >
                    <img 
                      src={prod.image} 
                      alt={prod.name} 
                      className="w-16 h-20 object-cover rounded bg-[#1c1c24] shrink-0 group-hover:scale-105 transition-transform" 
                    />
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#c5a880]">{prod.category}</span>
                      <h4 className="font-luxury text-sm text-white group-hover:text-[#c5a880] transition-colors line-clamp-1">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-mono text-white font-semibold mt-1">
                        ${prod.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onAddToCart(prod, prod.options[0]);
                      }}
                      className="px-3.5 py-2 bg-[#c5a880] hover:bg-[#d6bc96] text-black text-xs font-semibold rounded-sm transition-colors flex items-center space-x-1.5"
                    >
                      <ShoppingBag size={13} />
                      <span className="hidden sm:inline">Add to Bag</span>
                    </button>

                    <button
                      onClick={() => onRemoveWishlist(prod)}
                      className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-white/5 rounded transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
