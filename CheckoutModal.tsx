import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Truck, 
  QrCode, 
  Landmark, 
  Banknote,
  ArrowRight
} from 'lucide-react';
import { CartItem, UserProfile, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountRate: number;
  user: UserProfile | null;
  onOrderPlaced: (order: Order) => void;
  onOpenTrackingWithOrder: (orderId: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountRate,
  user,
  onOrderPlaced,
  onOpenTrackingWithOrder
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * discountRate);
  const shippingFee = subtotal >= 150 ? 0 : 25;
  const total = Math.max(0, subtotal - discount + shippingFee);

  // Form State
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'apple_pay' | 'netbanking' | 'cod'>('card');
  
  // Address State
  const [fullName, setFullName] = useState(user?.name || 'Basim Ansari');
  const [email, setEmail] = useState(user?.email || 'basim.ansari666@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-8901');
  const [street, setStreet] = useState(user?.street || '450 Avenue Montaigne, Suite 8');
  const [city, setCity] = useState(user?.city || 'Paris');
  const [state, setState] = useState(user?.state || 'Île-de-France');
  const [zipCode, setZipCode] = useState(user?.zipCode || '75008');
  const [country, setCountry] = useState(user?.country || 'France');

  // Card State
  const [cardNumber, setCardNumber] = useState('4532 8901 4321 9820');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('884');
  const [cardHolder, setCardHolder] = useState(user?.name || 'BASIM ANSARI');

  // UPI State
  const [upiId, setUpiId] = useState('basim@okhdfcbank');

  // Completed order reference
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleExecutePayment = () => {
    setStep('processing');
    
    // Simulate real luxury bank gateway authorization
    setTimeout(() => {
      const generatedId = `LX-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder: Order = {
        id: generatedId,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...items],
        subtotal,
        discount,
        shippingFee,
        totalAmount: total,
        status: 'confirmed',
        carrier: 'Luxora Air Express / DHL Global Priority',
        trackingNumber: `LX-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: '3-4 Business Days via Diplomatic Air',
        paymentMethod,
        paymentStatus: 'paid',
        shippingAddress: {
          fullName,
          phone,
          street,
          city,
          state,
          zipCode,
          country
        },
        timeline: [
          {
            status: 'confirmed',
            title: 'Order Confirmed & Payment Captured',
            description: `Payment of $${total.toLocaleString()} authorized via ${paymentMethod.toUpperCase()} gateway.`,
            location: 'Luxora Flagship Atelier Server, Geneva',
            timestamp: 'Just now',
            completed: true,
            current: true
          },
          {
            status: 'processing',
            title: 'Bespoke Atelier Quality Inspection',
            description: 'Item being selected from climate-controlled vault for verification.',
            location: 'Luxora Vault Facility',
            timestamp: 'Upcoming (within 4 hours)',
            completed: false,
            current: false
          },
          {
            status: 'shipped',
            title: 'Handover to Diplomatic Air Courier',
            description: 'Sealed in tamper-evident velvet case and transferred to air freight.',
            location: 'Charles de Gaulle Airport (CDG)',
            timestamp: 'Expected Tomorrow',
            completed: false,
            current: false
          },
          {
            status: 'in_transit',
            title: 'International Flight In Transit',
            description: 'High-security priority routing towards local sorting hub.',
            location: 'En Route',
            timestamp: 'Estimated Day 2',
            completed: false,
            current: false
          },
          {
            status: 'out_for_delivery',
            title: 'Out for White-Glove Hand Delivery',
            description: 'Private courier scheduled for doorstep handover with signature.',
            location: `${city} Distribution Hub`,
            timestamp: 'Estimated Day 3',
            completed: false,
            current: false
          },
          {
            status: 'delivered',
            title: 'Delivered to Recipient',
            description: 'Direct handover and physical receipt confirmation.',
            location: `${street}, ${city}`,
            timestamp: 'Pending Delivery',
            completed: false,
            current: false
          }
        ]
      };

      setCompletedOrder(newOrder);
      onOrderPlaced(newOrder);
      setStep('success');
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#101015] border border-white/15 rounded-lg max-w-2xl w-full overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0b0b0f]">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
              Luxora Secured Gateway
            </span>
            <h2 className="font-luxury text-xl text-white mt-0.5">
              {step === 'details' && 'Shipping & Recipient Details'}
              {step === 'payment' && 'Select Luxury Payment Method'}
              {step === 'processing' && 'Authorizing Payment...'}
              {step === 'success' && 'Order Successfully Placed!'}
            </h2>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Shipping Details */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Full Recipient Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                    placeholder="e.g. Lord Alexander Wright"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Phone for Delivery Courier
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Email Address for Tracking Updates
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  placeholder="name@domain.com"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Street Address (Residence / Penthouse)
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  placeholder="124 luxury boulevard, Apt 10A"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    State / Region
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 mb-1.5 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#171720] border border-white/10 rounded-sm px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <div className="text-xs text-neutral-400">
                  Total Payable: <span className="font-mono text-white font-semibold text-sm">${total.toLocaleString()}</span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#c5a880] hover:bg-[#d6bc96] text-black font-semibold text-xs tracking-widest uppercase rounded-sm flex items-center space-x-2 transition-all cursor-pointer"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Payment Gateway Selection */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* Payment Methods Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-md border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'card'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#c5a880]'
                      : 'border-white/10 hover:border-white/30 text-neutral-300 bg-white/5'
                  }`}
                >
                  <CreditCard size={18} />
                  <span className="text-[11px] font-semibold tracking-wider uppercase">Card</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-md border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'upi'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#c5a880]'
                      : 'border-white/10 hover:border-white/30 text-neutral-300 bg-white/5'
                  }`}
                >
                  <QrCode size={18} />
                  <span className="text-[11px] font-semibold tracking-wider uppercase">UPI / QR</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-md border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#c5a880]'
                      : 'border-white/10 hover:border-white/30 text-neutral-300 bg-white/5'
                  }`}
                >
                  <Landmark size={18} />
                  <span className="text-[11px] font-semibold tracking-wider uppercase">Net Banking</span>
                </button>

                <button
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-md border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                    paymentMethod === 'cod'
                      ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#c5a880]'
                      : 'border-white/10 hover:border-white/30 text-neutral-300 bg-white/5'
                  }`}
                >
                  <Banknote size={18} />
                  <span className="text-[11px] font-semibold tracking-wider uppercase">Concierge COD</span>
                </button>
              </div>

              {/* CREDIT CARD INTERACTIVE VIEW */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  {/* Luxury Obsidian Gold Card Preview */}
                  <div className="w-full max-w-sm mx-auto aspect-[1.586] rounded-xl p-5 bg-gradient-to-tr from-[#0a0a0d] via-[#1a1a24] to-[#2b251d] border border-[#c5a880]/40 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a880]/10 rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-center justify-between z-10">
                      <span className="font-luxury text-sm tracking-[0.25em] text-[#c5a880]">LUXORA BLACK</span>
                      <div className="w-8 h-6 rounded bg-[#d4af37]/80 flex items-center justify-center shadow-inner">
                        <div className="w-5 h-4 border border-amber-950/60 rounded-sm"></div>
                      </div>
                    </div>

                    <div className="z-10 tracking-[0.25em] font-mono text-base text-white text-center drop-shadow">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex items-end justify-between text-[11px] z-10 font-mono text-neutral-300 uppercase">
                      <div>
                        <span className="text-[8px] tracking-wider text-neutral-500 block">CARDHOLDER</span>
                        <span className="font-medium tracking-wider text-white">{cardHolder || 'BASIM ANSARI'}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] tracking-wider text-neutral-500 block">EXPIRES</span>
                        <span className="font-medium">{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Form Inputs */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="16-digit card number"
                        className="w-full bg-[#171720] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                        Expires (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-[#171720] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                        Security CVV
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="3 or 4 digits"
                        className="w-full bg-[#171720] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#c5a880]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI & QR VIEW */}
              {paymentMethod === 'upi' && (
                <div className="bg-[#14141d] border border-white/10 rounded-lg p-5 text-center space-y-4">
                  <div className="inline-block p-3 bg-white rounded-lg shadow-md">
                    <div className="w-36 h-36 bg-neutral-900 text-white flex flex-col items-center justify-center p-2 rounded">
                      <QrCode size={90} className="text-[#c5a880]" />
                      <span className="text-[9px] tracking-widest uppercase font-mono mt-1 text-neutral-400">
                        Scan with any UPI App
                      </span>
                    </div>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1.5">
                      Or Enter Virtual UPI ID
                    </label>
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="username@bank"
                      className="w-full bg-[#1c1c27] border border-white/15 rounded px-3 py-2 text-xs text-white text-center font-mono focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>
              )}

              {/* NET BANKING VIEW */}
              {paymentMethod === 'netbanking' && (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-400">Select your preferred private banking partner:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {['HDFC Bank Premium', 'ICICI Wealth', 'State Bank VIP', 'Citibank Private', 'HSBC Premier', 'Barclays Private'].map((bank, i) => (
                      <label key={i} className="flex items-center space-x-2.5 p-3 rounded bg-white/5 border border-white/10 hover:border-[#c5a880] cursor-pointer text-xs">
                        <input type="radio" name="bank" defaultChecked={i === 0} className="accent-[#c5a880]" />
                        <span>{bank}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* CASH ON DELIVERY VIEW */}
              {paymentMethod === 'cod' && (
                <div className="bg-[#14141d] border border-white/10 rounded-lg p-5 text-xs text-neutral-300 space-y-2">
                  <div className="flex items-center space-x-2 text-[#c5a880] font-semibold">
                    <Truck size={16} />
                    <span>White-Glove Concierge Hand Delivery</span>
                  </div>
                  <p className="text-neutral-400 leading-relaxed">
                    Our private diplomat courier will deliver your secured Luxora parcel directly to your residence at {street}, {city}. You can inspect the holographic seal before making the payment via card, cash, or instant link.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  ← Edit Shipping Address
                </button>

                <button
                  id="execute-payment-btn"
                  onClick={handleExecutePayment}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#c5a880] to-[#b39366] hover:brightness-110 text-black font-bold text-xs tracking-widest uppercase rounded-sm flex items-center space-x-2 transition-all shadow-[0_4px_20px_rgba(197,168,128,0.3)] cursor-pointer"
                >
                  <Lock size={14} />
                  <span>Authorize & Pay ${total.toLocaleString()}</span>
                </button>
              </div>

              <div className="flex items-center justify-center space-x-4 text-[10px] text-neutral-500 pt-1">
                <span>✓ 256-Bit SSL Encryption</span>
                <span>•</span>
                <span>PCI-DSS Level 1</span>
                <span>•</span>
                <span>Verified by Visa & Mastercard Identity Check</span>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Gateway Processing Animation */}
          {step === 'processing' && (
            <div className="py-16 text-center flex flex-col items-center justify-center space-y-5">
              <div className="w-16 h-16 rounded-full border-2 border-[#c5a880] border-t-transparent animate-spin flex items-center justify-center">
                <ShieldCheck size={24} className="text-[#c5a880]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-luxury text-lg text-white">Communicating with Banking Gateway...</h3>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Encrypting transaction credentials and reserving allocation from the Luxora Vault.
                </p>
              </div>
              <div className="text-[11px] font-mono text-[#c5a880] bg-[#1a1a24] px-3 py-1 rounded-full border border-[#c5a880]/30">
                TLS 1.3 SECURE HANDSHAKE IN PROGRESS
              </div>
            </div>
          )}

          {/* STEP 4: Success Screen with Direct Order Tracking Link */}
          {step === 'success' && completedOrder && (
            <div className="py-8 text-center flex flex-col items-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold">
                  Payment Authorized
                </span>
                <h3 className="font-luxury text-2xl sm:text-3xl text-white font-bold mt-1">
                  Thank You for Your Order
                </h3>
                <p className="text-xs text-neutral-400 mt-2">
                  A confirmation email with full receipt and customs documentation has been dispatched to{' '}
                  <span className="text-neutral-200 font-medium">{email}</span>.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="w-full bg-[#15151e] border border-white/10 rounded-lg p-5 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 tracking-wider block">YOUR ORDER ID</span>
                    <span className="font-mono text-base font-bold text-[#c5a880]">{completedOrder.id}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase text-neutral-500 tracking-wider block">TOTAL PAID</span>
                    <span className="font-mono text-base font-bold text-white">${completedOrder.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs text-neutral-300">
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block">CARRIER</span>
                    <span>{completedOrder.carrier}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-neutral-500 block">ESTIMATED DELIVERY</span>
                    <span>{completedOrder.estimatedDelivery}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[10px] uppercase text-neutral-500 block">DELIVERING TO</span>
                    <span>{completedOrder.shippingAddress.fullName}, {completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}</span>
                  </div>
                </div>
              </div>

              {/* Primary Order Tracking Action */}
              <div className="w-full flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="success-track-order-btn"
                  onClick={() => {
                    onClose();
                    onOpenTrackingWithOrder(completedOrder.id);
                  }}
                  className="flex-1 py-3.5 bg-[#c5a880] hover:bg-[#d6bc96] text-black font-bold text-xs tracking-[0.2em] uppercase rounded-sm flex items-center justify-center space-x-2 transition-all shadow-[0_4px_20px_rgba(197,168,128,0.3)] cursor-pointer"
                >
                  <Truck size={15} />
                  <span>Track This Order Now</span>
                </button>

                <button
                  onClick={onClose}
                  className="py-3.5 px-6 border border-white/20 hover:border-white text-white text-xs tracking-widest uppercase rounded-sm transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
