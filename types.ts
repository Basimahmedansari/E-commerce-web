export type ProductCategory = 'sneakers' | 'perfumes' | 'sunglasses' | 'belts' | 'watches';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  gallery: string[];
  description: string;
  badge?: 'BESTSELLER' | 'LIMITED EDITION' | 'NEW ARRIVAL' | 'EXCLUSIVE';
  inStock: boolean;
  specs: Record<string, string>;
  optionName: string;
  options: string[];
  features: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedOption: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export type OrderStatus = 'confirmed' | 'processing' | 'shipped' | 'in_transit' | 'out_for_delivery' | 'delivered';

export interface TrackingStep {
  status: OrderStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  status: OrderStatus;
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  paymentMethod: 'card' | 'upi' | 'apple_pay' | 'cod' | 'netbanking';
  paymentStatus: 'paid' | 'pending';
  shippingAddress: {
    fullName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  timeline: TrackingStep[];
}
