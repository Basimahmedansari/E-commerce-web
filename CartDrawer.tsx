import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  discountRate: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  discountRate,
  onApplyPromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountRate);
  const freeShippingThreshold = 150;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 25;
  const total = Math.max(0, subtotal - discount + shippingFee);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoMessage({ text: 'Promo code applied: 10% VIP luxury discount!', isError: false });
    } else {
      setPromoMessage({ text: 'Invalid code. Try "LUXORA10"', isError: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f0f14] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h2 className="font-luxury text-lg tracking-wider text-white">Your Shopping Bag</h2>
              <span className="text-xs text-neutral-400 font-mono">({items.length})</span>
            </div>
            <button
              id="cart-drawer-close-btn"
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close cart"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#14141c] px-6 py-3 border-b border-white/5 text-xs">
            {subtotal >= freeShippingThreshold ? (
              <p className="text-emerald-400 font-medium flex items-center space-x-1.5">
                <span>✓</span>
                <span>You qualify for Complimentary Worldwide Express Shipping!</span>
              </p>
            ) : (
              <div>
                <p className="text-neutral-300">
                  Add <span className="font-mono text-[#c5a880] font-semibold">${freeShippingThreshold - subtotal}</span> more for Free Express Delivery
                </p>
                <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="bg-[#c5a880] h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center text-neutral-400 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-500 mb-4">
                  <Tag size={24} />
                </div>
                <p className="font-luxury text-base text-neutral-300 mb-1">Your bag is currently empty</p>
                <p className="text-xs text-neutral-500 max-w-xs mb-6">
                  Explore our private reserve of perfumes, horology, eyewear, sneakers, and leather goods.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#c5a880] text-black text-xs font-semibold tracking-widest uppercase rounded-sm hover:bg-[#d6bc96] transition-colors"
                >
                  Discover Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div 
                  key={item.id}
                  className="flex space-x-4 bg-[#14141b] border border-white/5 p-3 rounded-md relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded bg-[#1c1c24] shrink-0"
                  />
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-luxury text-xs font-semibold text-white line-clamp-1 pr-6">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-neutral-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                      
                      <p className="text-[11px] text-[#c5a880] mt-0.5 font-medium">
                        {item.selectedOption}
                      </p>
                      
                      <p className="text-xs font-mono text-neutral-300 mt-1">
                        ${item.product.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      <div className="flex items-center border border-white/15 rounded bg-black/40 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-mono text-xs font-semibold text-white">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {items.length > 0 && (
            <div className="p-6 bg-[#0a0a0e] border-t border-white/10 space-y-4">
              
              {/* Promo code form */}
              <form onSubmit={handleApplyCode} className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. LUXORA10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-[#16161e] border border-white/10 rounded-sm px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880] uppercase tracking-wider"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-neutral-200 text-xs uppercase tracking-wider font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {promoMessage.text}
                </p>
              )}

              {/* Cost Calculations */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Luxury Savings (10%)</span>
                    <span className="font-mono">-${discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Courier Delivery</span>
                  <span className="font-mono text-white">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-white pt-2 border-t border-white/10">
                  <span className="font-luxury">Estimated Total</span>
                  <span className="font-mono text-base text-[#c5a880]">${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-proceed-checkout-btn"
                onClick={onCheckout}
                className="w-full py-3.5 bg-[#c5a880] hover:bg-[#d6bc96] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(197,168,128,0.2)] cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight size={15} />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-neutral-500">
                <ShieldCheck size={12} className="text-[#c5a880]" />
                <span>Encrypted 256-bit checkout with diplomatic delivery insurance</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
