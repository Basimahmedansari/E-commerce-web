import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Package, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  initialOrderId?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  initialOrderId
}) => {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState(initialOrderId || (orders.length > 0 ? orders[0].id : ''));
  const [copied, setCopied] = useState(false);

  // Find the matched order
  const currentOrder = orders.find(
    (o) => o.id.toLowerCase() === searchId.trim().toLowerCase()
  ) || orders[0];

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-emerald-950 text-emerald-300 border-emerald-500/40';
      case 'in_transit':
        return 'bg-amber-950 text-amber-300 border-amber-500/40 animate-pulse';
      case 'out_for_delivery':
        return 'bg-sky-950 text-sky-300 border-sky-500/40';
      case 'shipped':
        return 'bg-purple-950 text-purple-300 border-purple-500/40';
      default:
        return 'bg-stone-900 text-neutral-300 border-white/20';
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#101015] border border-white/15 rounded-lg max-w-3xl w-full overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Modal Top Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0b0b0f]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#181824] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880]">
              <Truck size={20} />
            </div>
            <div>
              <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
                Diplomatic Air Express
              </span>
              <h2 className="font-luxury text-xl text-white">
                Live Order & Consignment Tracking
              </h2>
            </div>
          </div>
          <button
            id="tracking-modal-close-btn"
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close tracking"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar & Order Switcher */}
        <div className="p-6 border-b border-white/10 bg-[#13131b]">
          <div className="flex flex-col sm:flex-row gap-3 items-center">
            <div className="relative flex-1 w-full">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Enter Order ID (e.g. LX-89421 or LX-72104)..."
                className="w-full bg-[#1c1c27] border border-white/15 rounded-sm pl-10 pr-4 py-2.5 text-xs text-white uppercase tracking-wider font-mono focus:outline-none focus:border-[#c5a880]"
              />
            </div>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex items-center space-x-2 mt-3 overflow-x-auto text-[11px] pb-1">
            <span className="text-neutral-500 uppercase tracking-widest text-[10px] shrink-0">
              Recent Orders:
            </span>
            {orders.map((o) => (
              <button
                key={o.id}
                onClick={() => setSearchId(o.id)}
                className={`px-3 py-1 rounded-sm border font-mono transition-colors shrink-0 ${
                  currentOrder?.id === o.id
                    ? 'bg-[#c5a880] text-black border-[#c5a880] font-bold'
                    : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/30'
                }`}
              >
                {o.id} ({o.status.replace('_', ' ').toUpperCase()})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details Body */}
        {currentOrder ? (
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            
            {/* Top Order Status Banner */}
            <div className="bg-[#161622] border border-white/10 rounded-lg p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xl font-bold text-white tracking-wider">
                      {currentOrder.id}
                    </span>
                    <span className={`text-[10px] font-bold tracking-widest px-2.5 py-0.5 rounded uppercase border ${getStatusBadge(currentOrder.status)}`}>
                      {currentOrder.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-1">
                    Placed on {currentOrder.date} • Secured Courier Priority Air
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-neutral-500 block">
                    ESTIMATED ARRIVAL
                  </span>
                  <span className="text-sm font-semibold text-[#c5a880]">
                    {currentOrder.estimatedDelivery}
                  </span>
                </div>
              </div>

              {/* Courier & Tracking Code bar */}
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2 text-neutral-300">
                  <span className="text-neutral-500">Carrier:</span>
                  <span className="font-medium text-white">{currentOrder.carrier}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-neutral-500">Waybill No:</span>
                  <span className="font-mono text-neutral-200">{currentOrder.trackingNumber}</span>
                  <button
                    onClick={() => handleCopy(currentOrder.trackingNumber)}
                    className="text-neutral-400 hover:text-white p-1"
                    title="Copy tracking number"
                  >
                    {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Timeline Stepper */}
            <div>
              <h3 className="font-luxury text-sm tracking-wider uppercase text-[#c5a880] mb-6 flex items-center space-x-2">
                <Clock size={16} />
                <span>Live Route & Handover Milestones</span>
              </h3>

              <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {currentOrder.timeline.map((step, idx) => (
                  <div key={idx} className="relative">
                    {/* Step Icon / Dot */}
                    <div 
                      className={`absolute -left-6 sm:-left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.completed
                          ? 'bg-[#c5a880] border-[#c5a880] text-black shadow-[0_0_12px_rgba(197,168,128,0.5)]'
                          : step.current
                          ? 'bg-[#101015] border-[#c5a880] text-[#c5a880] animate-pulse'
                          : 'bg-[#181820] border-white/20 text-neutral-600'
                      }`}
                    >
                      {step.completed ? (
                        <Check size={12} className="stroke-[3]" />
                      ) : (
                        <div className={`w-2 h-2 rounded-full ${step.current ? 'bg-[#c5a880]' : 'bg-transparent'}`} />
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="bg-[#14141d] border border-white/5 p-4 rounded-md">
                      <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                        <h4 className={`text-xs font-semibold ${step.completed || step.current ? 'text-white' : 'text-neutral-400'}`}>
                          {step.title}
                        </h4>
                        <span className="text-[11px] font-mono text-neutral-500">
                          {step.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-400 mb-2">
                        {step.description}
                      </p>

                      <div className="flex items-center space-x-1.5 text-[11px] text-[#c5a880]">
                        <MapPin size={12} />
                        <span>{step.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Destination & Item Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              
              {/* Delivery Address */}
              <div className="bg-[#14141c] border border-white/5 p-4 rounded-md">
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2 flex items-center space-x-1.5">
                  <MapPin size={14} className="text-[#c5a880]" />
                  <span>Consignment Destination</span>
                </h4>
                <p className="text-sm font-semibold text-white">{currentOrder.shippingAddress.fullName}</p>
                <p className="text-xs text-neutral-300 mt-0.5">{currentOrder.shippingAddress.street}</p>
                <p className="text-xs text-neutral-400">
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} {currentOrder.shippingAddress.zipCode}
                </p>
                <p className="text-xs text-neutral-400">{currentOrder.shippingAddress.country}</p>
                <p className="text-xs text-neutral-500 mt-2 font-mono">Tel: {currentOrder.shippingAddress.phone}</p>
              </div>

              {/* Items In Parcel */}
              <div className="bg-[#14141c] border border-white/5 p-4 rounded-md">
                <h4 className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2 flex items-center space-x-1.5">
                  <Package size={14} className="text-[#c5a880]" />
                  <span>Sealed Parcel Contents</span>
                </h4>
                <div className="space-y-2.5">
                  {currentOrder.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2.5">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-9 h-11 object-cover rounded bg-[#20202a]" 
                        />
                        <div>
                          <p className="font-luxury text-white line-clamp-1">{item.product.name}</p>
                          <p className="text-[10px] text-[#c5a880]">Qty: {item.quantity} • {item.selectedOption}</p>
                        </div>
                      </div>
                      <span className="font-mono text-neutral-300">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Assistance Banner */}
            <div className="bg-gradient-to-r from-[#171722] to-[#121217] border border-[#c5a880]/20 rounded-md p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <ShieldCheck size={24} className="text-[#c5a880] shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-white">Luxora Diplomatic Escort & Guarantee</p>
                  <p className="text-neutral-400">All shipments are insured for 100% of declared value during transport.</p>
                </div>
              </div>
              <button 
                onClick={() => alert(`Connecting with Luxora Diplomatic Concierge for Order #${currentOrder.id}. We are at your service.`)}
                className="px-4 py-2 border border-white/20 hover:border-[#c5a880] text-neutral-200 hover:text-[#c5a880] text-xs font-medium rounded uppercase tracking-wider shrink-0 transition-colors"
              >
                Contact Concierge
              </button>
            </div>

          </div>
        ) : (
          <div className="py-16 text-center text-neutral-400">
            <p>No order found matching "{searchId}". Please check your order reference number.</p>
          </div>
        )}

      </div>
    </div>
  );
};
