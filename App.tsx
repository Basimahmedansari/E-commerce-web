import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AuthModal } from './components/AuthModal';
import { WishlistModal } from './components/WishlistModal';
import { Footer } from './components/Footer';

import { allProducts, sampleOrders as initialSampleOrders } from './data/products';
import { Product, ProductCategory, CartItem, UserProfile, Order } from './types';

export default function App() {
  // Navigation & Category
  const [currentCategory, setCurrentCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string>('LX-89421');

  // User State
  const [user, setUser] = useState<UserProfile | null>({
    name: 'Basim Ansari',
    email: 'basim.ansari666@gmail.com',
    phone: '+1 (555) 234-8901',
    street: '450 Avenue Montaigne, Penthouse 8',
    city: 'Paris',
    state: 'Île-de-France',
    zipCode: '75008',
    country: 'France'
  });

  // Cart State (Initialized with 1 sample item so user immediately experiences bag)
  const [cart, setCart] = useState<CartItem[]>(() => {
    return [
      {
        id: 'cart-sample-1',
        product: allProducts[0], // Amber Sovereign 100ml
        quantity: 1,
        selectedOption: allProducts[0].options[0]
      }
    ];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => [
    allProducts[20], // Chrono Royal Tourbillon
    allProducts[40], // Solstice Aviator 24k
  ]);

  // Orders State (Includes sample orders + newly completed orders)
  const [orders, setOrders] = useState<Order[]>(initialSampleOrders);

  // Discounts
  const [discountRate, setDiscountRate] = useState<number>(0);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, option?: string, quantity: number = 1) => {
    const chosenOption = option || product.options[0];
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedOption === chosenOption
      );
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${chosenOption}-${Date.now()}`,
          product,
          quantity,
          selectedOption: chosenOption
        }
      ];
    });
    showToast(`Added "${product.name}" to shopping bag`);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from shopping bag');
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'LUXORA10' || code === 'VIP10') {
      setDiscountRate(0.10);
      return true;
    }
    return false;
  };

  // Direct Checkout (from product modal)
  const handleDirectCheckout = (product: Product, option: string, quantity: number) => {
    handleAddToCart(product, option, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to wishlist`);
        return [...prev, product];
      }
    });
  };

  const wishlistIds = new Set(wishlist.map((p) => p.id));

  // Order Handlers
  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]); // Empty bag after successful checkout
    setActiveTrackingOrderId(newOrder.id);
  };

  const handleOpenTrackingWithOrder = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setIsTrackingOpen(true);
  };

  // Category & Scroll
  const handleCategorySelect = (category: ProductCategory | 'all') => {
    setCurrentCategory(category);
    const catalogEl = document.getElementById('catalog-section');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0e] text-[#ece8e1] flex flex-col selection:bg-[#c5a880] selection:text-black">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161622] border border-[#c5a880]/60 text-white px-5 py-3 rounded-md shadow-2xl flex items-center space-x-3 text-xs animate-bounce">
          <span className="w-2 h-2 rounded-full bg-[#c5a880]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Luxury Navigation */}
      <Navbar
        currentCategory={currentCategory}
        onSelectCategory={handleCategorySelect}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Hero Section */}
      <Hero
        onShopClick={(cat) => handleCategorySelect(cat || 'all')}
        onExploreClick={() => handleCategorySelect('all')}
      />

      {/* Five Category Ateliers Showcase */}
      {currentCategory === 'all' && !searchQuery && (
        <CategoryShowcase onSelectCategory={(cat) => handleCategorySelect(cat)} />
      )}

      {/* Main Product Catalog Section with 20 items per category */}
      <main className="flex-1">
        <ProductCatalog
          products={allProducts}
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          onSelectProduct={setSelectedProduct}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onDirectCheckout={handleDirectCheckout}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.has(selectedProduct.id) : false}
      />

      {/* Slide-out Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountRate={discountRate}
        onApplyPromo={handleApplyPromo}
      />

      {/* Secured Payment Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountRate={discountRate}
        user={user}
        onOrderPlaced={handleOrderPlaced}
        onOpenTrackingWithOrder={handleOpenTrackingWithOrder}
      />

      {/* Real-Time Order & Consignment Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        orders={orders}
        initialOrderId={activeTrackingOrderId}
      />

      {/* User Login / Register / Profile Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        user={user}
        onLogin={(u) => {
          setUser(u);
          setIsAuthOpen(false);
          showToast(`Signed in as ${u.name}`);
        }}
        onLogout={() => {
          setUser(null);
          showToast('Signed out of Luxora Account');
        }}
        userOrders={orders}
        onOpenTrackingWithOrder={handleOpenTrackingWithOrder}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(prod, opt) => {
          handleAddToCart(prod, opt);
          setIsCartOpen(true);
        }}
        onSelectProduct={setSelectedProduct}
      />

      {/* Footer */}
      <Footer
        onSelectCategory={handleCategorySelect}
        onOpenTracking={() => setIsTrackingOpen(true)}
      />

    </div>
  );
}
