import React, { useState } from 'react';
import { 
  ArrowRight, 
  Globe, 
  ShieldCheck, 
  Lock, 
  Truck, 
  Award, 
  Check 
} from 'lucide-react';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory | 'all') => void;
  onOpenTracking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenTracking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#08080b] border-t border-white/10 text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/10">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-1.5">
              <span className="font-luxury text-2xl tracking-[0.25em] text-white">LUXORA</span>
              <span className="text-[#c5a880] text-xs font-serif align-super">TM</span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-md">
              The premier destination for haute horlogerie, artisanal leathercraft, rare olfactive extraits, precision optics, and sculptural luxury footwear. Crafted for those who define their signature.
            </p>
            <div className="flex items-center space-x-4 text-xs text-neutral-400 pt-2">
              <div className="flex items-center space-x-1.5">
                <Globe size={14} className="text-[#c5a880]" />
                <span>Geneva • Paris • Milan • New York</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#101017] border border-white/10 p-6 sm:p-8 rounded-lg">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#c5a880] font-semibold block mb-1">
                Private Gazette
              </span>
              <h3 className="font-luxury text-lg text-white font-semibold mb-2">
                Receive Invitations to Private Vault Allocations
              </h3>
              <p className="text-xs text-neutral-400 mb-4 font-light">
                Subscribers receive confidential early access to numbered timepiece editions and seasonal perfume extraits.
              </p>

              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your VIP email address..."
                  className="flex-1 bg-[#171722] border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c5a880] hover:bg-[#d6bc96] text-black font-semibold text-xs tracking-widest uppercase rounded-sm flex items-center justify-center space-x-2 transition-all shrink-0 cursor-pointer"
                >
                  <span>{subscribed ? 'Subscribed ✓' : 'Subscribe'}</span>
                  <ArrowRight size={14} />
                </button>
              </form>
              {subscribed && (
                <p className="text-emerald-400 text-xs mt-2 flex items-center space-x-1">
                  <Check size={13} />
                  <span>Welcome to the Luxora Private Circle. Your invitation has been dispatched.</span>
                </p>
              )}
            </div>
          </div>

        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
          
          <div>
            <h4 className="font-luxury tracking-widest uppercase text-white font-semibold mb-4 text-[11px]">
              The Collections
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={() => onSelectCategory('perfumes')} className="hover:text-[#c5a880] transition-colors">
                  Rare Perfumes & Extraits
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('watches')} className="hover:text-[#c5a880] transition-colors">
                  Timeless Watches & Tourbillons
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('sunglasses')} className="hover:text-[#c5a880] transition-colors">
                  Titanium & Acetate Eyewear
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('sneakers')} className="hover:text-[#c5a880] transition-colors">
                  Italian Calfskin Sneakers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('belts')} className="hover:text-[#c5a880] transition-colors">
                  Handcrafted 24k Gold Belts
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-luxury tracking-widest uppercase text-white font-semibold mb-4 text-[11px]">
              Client Services
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button onClick={onOpenTracking} className="hover:text-[#c5a880] transition-colors font-medium text-neutral-300">
                  Track Consignment / Order
                </button>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">White-Glove Delivery</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Complimentary Returns</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Certificate of Authenticity</span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer">Watch Servicing & Care</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-luxury tracking-widest uppercase text-white font-semibold mb-4 text-[11px]">
              Private Concierge
            </h4>
            <ul className="space-y-2.5 text-neutral-400">
              <li className="text-white font-mono">+1 (800) 589-6721</li>
              <li>concierge@luxoragroup.com</li>
              <li>Mon – Sun: 24/7 International Desk</li>
              <li>Private Salon Appointments in Paris & Milan</li>
            </ul>
          </div>

          <div>
            <h4 className="font-luxury tracking-widest uppercase text-white font-semibold mb-4 text-[11px]">
              Trust & Guarantees
            </h4>
            <div className="space-y-3 text-neutral-400">
              <div className="flex items-center space-x-2 text-neutral-300">
                <ShieldCheck size={16} className="text-[#c5a880]" />
                <span>100% Guaranteed Authenticity</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Lock size={16} className="text-[#c5a880]" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-300">
                <Truck size={16} className="text-[#c5a880]" />
                <span>Diplomatic Air Priority Transport</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© 2026 LUXORA™ Lifestyle Haute Joaillerie & Couture. All Rights Reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Luxury Sale</span>
            <span className="hover:text-neutral-400 cursor-pointer">Security Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
