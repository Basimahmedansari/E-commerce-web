import React, { useState } from 'react';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  User, 
  Menu, 
  X, 
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { ProductCategory, UserProfile, CartItem } from '../types';

interface NavbarProps {
  currentCategory: ProductCategory | 'all';
  onSelectCategory: (cat: ProductCategory | 'all') => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuth: () => void;
  onOpenTracking: () => void;
  user: UserProfile | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenTracking,
  user,
  searchQuery,
  onSearchChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const categories: { label: string; value: ProductCategory | 'all' }[] = [
    { label: 'Home', value: 'all' },
    { label: 'Shop', value: 'all' },
    { label: 'Perfumes', value: 'perfumes' },
    { label: 'Watches', value: 'watches' },
    { label: 'Sunglasses', value: 'sunglasses' },
    { label: 'Sneakers', value: 'sneakers' },
    { label: 'New Arrivals', value: 'all' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#0e0e12] border-b border-white/5 text-[11px] py-1.5 px-4 text-neutral-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center space-x-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-pulse"></span>
            <span className="tracking-wider uppercase text-neutral-300">Complimentary Worldwide Express Delivery on orders over $150</span>
          </div>
          <div className="flex items-center space-x-6 mx-auto sm:mx-0">
            <button 
              id="topbar-track-order-btn"
              onClick={onOpenTracking}
              className="flex items-center space-x-1.5 text-neutral-300 hover:text-[#c5a880] transition-colors cursor-pointer"
            >
              <Truck size={13} className="text-[#c5a880]" />
              <span className="uppercase tracking-wider font-medium">Track Order</span>
            </button>
            <span className="text-white/20">|</span>
            <span className="text-neutral-400">Concierge: +1 (800) LUXORA</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header className="sticky top-0 z-40 bg-[#09090c]/90 backdrop-blur-md border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left: Mobile Menu Toggle & Desktop Logo */}
            <div className="flex items-center space-x-4">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-neutral-300 hover:text-white"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              <div 
                onClick={() => onSelectCategory('all')} 
                className="cursor-pointer flex flex-col group"
              >
                <div className="flex items-center space-x-1">
                  <span className="font-luxury text-2xl sm:text-3xl tracking-[0.22em] text-white group-hover:text-[#c5a880] transition-colors">
                    LUXORA
                  </span>
                  <span className="text-[#c5a880] text-xs font-serif font-light align-super">TM</span>
                </div>
                <span className="text-[9px] tracking-[0.35em] text-neutral-400 uppercase -mt-1 font-medium">
                  Haute Lifestyle
                </span>
              </div>
            </div>

            {/* Middle: Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {categories.map((cat, idx) => (
                <button
                  key={`${cat.label}-${idx}`}
                  id={`nav-link-${cat.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => onSelectCategory(cat.value)}
                  className={`text-xs uppercase tracking-[0.16em] py-2 transition-all relative font-medium ${
                    (cat.label === 'Home' && currentCategory === 'all') ||
                    (cat.value !== 'all' && currentCategory === cat.value)
                      ? 'text-[#c5a880]'
                      : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {cat.label}
                  {((cat.label === 'Home' && currentCategory === 'all') ||
                    (cat.value !== 'all' && currentCategory === cat.value)) && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.6)]"></span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right: Actions (Search, Tracking, Wishlist, User, Bag) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Search Toggle */}
              <div className="relative">
                {searchOpen ? (
                  <div className="flex items-center bg-[#15151a] border border-[#c5a880]/50 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all">
                    <Search size={15} className="text-[#c5a880] mr-2 shrink-0" />
                    <input
                      id="navbar-search-input"
                      type="text"
                      placeholder="Search collection..."
                      value={searchQuery}
                      onChange={(e) => onSearchChange(e.target.value)}
                      autoFocus
                      className="bg-transparent border-none text-xs text-white placeholder-neutral-500 focus:outline-none w-full"
                    />
                    <button 
                      onClick={() => { setSearchOpen(false); onSearchChange(''); }}
                      className="text-neutral-400 hover:text-white ml-1 text-xs"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <button
                    id="search-toggle-btn"
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-neutral-300 hover:text-[#c5a880] transition-colors rounded-full hover:bg-white/5"
                    aria-label="Search"
                    title="Search"
                  >
                    <Search size={19} />
                  </button>
                )}
              </div>

              {/* Order Tracking (Direct icon on desktop) */}
              <button
                id="navbar-order-tracking-btn"
                onClick={onOpenTracking}
                className="hidden md:flex items-center p-2 text-neutral-300 hover:text-[#c5a880] transition-colors rounded-full hover:bg-white/5"
                title="Track Your Order"
                aria-label="Track Order"
              >
                <Truck size={19} />
              </button>

              {/* Wishlist */}
              <button
                id="navbar-wishlist-btn"
                onClick={onOpenWishlist}
                className="relative p-2 text-neutral-300 hover:text-[#c5a880] transition-colors rounded-full hover:bg-white/5"
                aria-label="Wishlist"
                title="Wishlist"
              >
                <Heart size={19} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#c5a880] text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* User Account / Profile */}
              <button
                id="navbar-user-account-btn"
                onClick={onOpenAuth}
                className="flex items-center space-x-2 p-2 text-neutral-300 hover:text-[#c5a880] transition-colors rounded-full hover:bg-white/5"
                aria-label="User Account"
                title={user ? `Signed in as ${user.name}` : 'Login / Register'}
              >
                <div className="relative">
                  <User size={19} />
                  {user && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#09090c]"></span>
                  )}
                </div>
                {user && (
                  <span className="hidden xl:inline-block text-xs font-medium text-neutral-300 max-w-[90px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                )}
              </button>

              {/* Shopping Bag */}
              <button
                id="navbar-shopping-bag-btn"
                onClick={onOpenCart}
                className="relative p-2.5 bg-gradient-to-br from-[#c5a880] to-[#9c7d54] text-black font-semibold rounded-full hover:brightness-110 transition-all shadow-[0_4px_16px_rgba(197,168,128,0.25)] cursor-pointer"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#09090c]">
                    {cartCount}
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0e0e13] border-b border-white/10 px-6 py-5 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <div className="pb-3 border-b border-white/10">
                <input
                  type="text"
                  placeholder="Search products, scents, watches..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full bg-[#15151c] border border-white/10 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#c5a880]"
                />
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => {
                    onSelectCategory(cat.value);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-between py-2.5 text-sm uppercase tracking-wider font-medium text-left ${
                    currentCategory === cat.value ? 'text-[#c5a880]' : 'text-neutral-300'
                  }`}
                >
                  <span>{cat.label}</span>
                  <ArrowRight size={14} className="text-neutral-500" />
                </button>
              ))}
              <div className="pt-3 border-t border-white/10 flex flex-col space-y-2.5">
                <button
                  onClick={() => {
                    onOpenTracking();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-sm text-neutral-300 hover:text-[#c5a880]"
                >
                  <Truck size={16} className="text-[#c5a880]" />
                  <span>Track Your Order</span>
                </button>
                <button
                  onClick={() => {
                    onOpenAuth();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 py-2 text-sm text-neutral-300 hover:text-[#c5a880]"
                >
                  <User size={16} className="text-[#c5a880]" />
                  <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
