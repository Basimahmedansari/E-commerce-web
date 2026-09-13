import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Phone, 
  MapPin, 
  LogOut, 
  Package, 
  Truck, 
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { UserProfile, Order } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  userOrders: Order[];
  onOpenTrackingWithOrder: (orderId: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout,
  userOrders,
  onOpenTrackingWithOrder
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('basim.ansari666@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Basim Ansari');
  const [phone, setPhone] = useState('+1 (555) 234-8901');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: UserProfile = {
      name: mode === 'login' ? (user?.name || 'Basim Ansari') : name,
      email: email,
      phone: phone,
      street: '450 Avenue Montaigne, Penthouse 8',
      city: 'Paris',
      state: 'Île-de-France',
      zipCode: '75008',
      country: 'France'
    };
    onLogin(newUser);
  };

  const handleDemoLogin = () => {
    const demoUser: UserProfile = {
      name: 'Basim Ansari',
      email: 'basim.ansari666@gmail.com',
      phone: '+1 (555) 234-8901',
      street: '450 Avenue Montaigne, Penthouse 8',
      city: 'Paris',
      state: 'Île-de-France',
      zipCode: '75008',
      country: 'France'
    };
    onLogin(demoUser);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#101015] border border-white/15 rounded-lg max-w-lg w-full overflow-hidden shadow-2xl my-8 text-white">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0b0b0f]">
          <div>
            <span className="text-[10px] tracking-[0.25em] text-[#c5a880] uppercase font-semibold">
              Luxora Privé Account
            </span>
            <h2 className="font-luxury text-xl text-white mt-0.5">
              {user ? `Welcome Back, ${user.name.split(' ')[0]}` : mode === 'login' ? 'Collector Sign In' : 'Create Exclusive Account'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {user ? (
            /* LOGGED IN USER PROFILE VIEW */
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="bg-[#161622] border border-white/10 rounded-lg p-5 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c5a880] to-[#8c6d46] text-black font-luxury text-lg font-bold flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-luxury text-base font-semibold text-white">{user.name}</h3>
                    <p className="text-xs text-neutral-400">{user.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-mono tracking-widest text-[#c5a880] uppercase bg-[#c5a880]/10 px-2 py-0.5 rounded border border-[#c5a880]/20">
                      VIP Premier Member
                    </span>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-neutral-400 hover:text-rose-400 hover:bg-white/5 rounded transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>

              {/* Order History with Direct Tracking */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-luxury text-xs uppercase tracking-wider text-[#c5a880] font-semibold flex items-center space-x-1.5">
                    <Package size={14} />
                    <span>Your Recent Orders</span>
                  </h4>
                  <span className="text-[11px] text-neutral-500 font-mono">
                    {userOrders.length} orders
                  </span>
                </div>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {userOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-[#14141d] border border-white/10 rounded-md p-3.5 flex items-center justify-between hover:border-white/20 transition-all"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-xs font-bold text-white">{ord.id}</span>
                          <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-mono">
                            {ord.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 mt-1">
                          {ord.date} • {ord.items.length} item(s) • <span className="text-white font-mono">${ord.totalAmount.toLocaleString()}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenTrackingWithOrder(ord.id);
                        }}
                        className="px-3 py-1.5 bg-[#c5a880]/15 hover:bg-[#c5a880] text-[#c5a880] hover:text-black text-xs font-semibold rounded transition-colors flex items-center space-x-1 cursor-pointer"
                      >
                        <Truck size={12} />
                        <span>Track</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Concierge Address */}
              <div className="bg-[#14141d] border border-white/5 rounded-md p-4 text-xs text-neutral-300">
                <div className="flex items-center space-x-2 text-[#c5a880] font-semibold uppercase tracking-wider text-[10px] mb-2">
                  <MapPin size={13} />
                  <span>Default Shipping Address</span>
                </div>
                <p className="font-medium text-white">{user.name}</p>
                <p className="text-neutral-400">{user.street}, {user.city}, {user.country} {user.zipCode}</p>
                <p className="text-neutral-500 font-mono mt-1">Tel: {user.phone}</p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-widest uppercase rounded-sm transition-colors"
              >
                Back to Shopping
              </button>

            </div>
          ) : (
            /* SIGN IN OR REGISTER FORM */
            <div className="space-y-5">
              
              {/* Toggle Switch */}
              <div className="flex border border-white/10 rounded p-1 bg-white/5">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold rounded transition-colors ${
                    mode === 'login' ? 'bg-[#c5a880] text-black shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`flex-1 py-1.5 text-xs uppercase tracking-wider font-semibold rounded transition-colors ${
                    mode === 'register' ? 'bg-[#c5a880] text-black shadow' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#161620] border border-white/10 rounded-sm pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                        placeholder="Alexander Wright"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#161620] border border-white/10 rounded-sm pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                      placeholder="name@luxury.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#161620] border border-white/10 rounded-sm pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                      placeholder="••••••••••••"
                    />
                  </div>
                </div>

                {mode === 'register' && (
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-neutral-400 mb-1">
                      Phone Number (for Courier SMS updates)
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#161620] border border-white/10 rounded-sm pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#c5a880]"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-[#c5a880] hover:bg-[#d6bc96] text-black font-semibold text-xs tracking-[0.2em] uppercase rounded-sm transition-all shadow-[0_4px_16px_rgba(197,168,128,0.25)] cursor-pointer"
                >
                  {mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}
                </button>
              </form>

              {/* Instant One-Click Demo Login */}
              <div className="pt-3 border-t border-white/10">
                <button
                  onClick={handleDemoLogin}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-neutral-200 text-xs tracking-wider uppercase font-medium rounded-sm transition-colors flex items-center justify-center space-x-2"
                >
                  <ShieldCheck size={14} className="text-[#c5a880]" />
                  <span>One-Click VIP Demo Login (Basim Ansari)</span>
                </button>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
