import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';
import { INITIAL_PRODUCTS } from '../api/productsApi';

const AppContext = createContext();

const STORAGE_KEYS = {
  CART: 'fitflex_cart_v2',
  ORDERS: 'fitflex_orders_v2',
  WISHLIST: 'fitflex_wishlist_v2',
  ROLE: 'fitflex_role_v2',
  USER: 'fitflex_user_v2',
};

const DEFAULT_BUYER = {
  id: 1,
  name: 'Rahul Sharma',
  email: 'rahul@fitflex.hyd',
  role: 'ROLE_BUYER',
  phone: '+91 98765 43210',
  locality: 'Madhapur',
  address: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'
};

const DEFAULT_SELLER = {
  id: 2,
  name: 'Vikram Rao',
  email: 'ironcore@fitflex.hyd',
  role: 'ROLE_SELLER',
  phone: '+91 99887 76655',
  locality: 'Banjara Hills',
  address: 'Road No 10, Banjara Hills, Hyderabad - 500034',
  storeName: 'IronCore Activewear Hub',
  storeId: 1
};

const DEFAULT_ADMIN = {
  id: 4,
  name: 'FitFlex Admin HQ',
  email: 'admin@fitflex.hyd',
  role: 'ROLE_ADMIN',
  phone: '+91 90000 00000',
  locality: 'Gachibowli',
  address: 'FitFlex HQ, Financial District, Hyderabad - 500032'
};

const INITIAL_ORDERS = [
  {
    id: 101,
    orderNumber: 'FF-HYD-84291',
    buyerName: 'Rahul Sharma',
    buyerPhone: '+91 98765 43210',
    totalAmount: 999,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING_DELIVERY',
    orderStatus: 'OUT_FOR_DELIVERY',
    deliveryLocality: 'Madhapur',
    deliveryAddress: 'Flat 402, Sai Residency, Madhapur, Hyderabad - 500081',
    deliveryNotes: 'Call upon arrival at gate. Keep COD change ready.',
    speed: 'EXPRESS_SAME_DAY',
    items: [
      {
        id: 1,
        product: INITIAL_PRODUCTS[0],
        size: 'L',
        price: 999,
        quantity: 1
      }
    ],
    deliveryTracking: {
      id: 501,
      trackingCode: 'HYD-EXP-77291',
      courierPartner: 'FitFlex SwiftFleet Hyderabad',
      deliveryAgentName: 'Ramesh Kumar (Bike Fleet)',
      deliveryAgentPhone: '+91 98490 12345',
      bikePlate: 'TS 09 FF 4421',
      currentStatus: 'OUT_FOR_DELIVERY',
      currentLocality: 'Madhapur Cyber Towers Hub',
      estimatedDelivery: 'Arriving in ~35 mins (Live Delivery)'
    },
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  }
];

export const AppProvider = ({ children }) => {
  // Load state from localStorage or fallback
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'BUYER';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : DEFAULT_BUYER;
    } catch {
      return DEFAULT_BUYER;
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [
        {
          id: 'cart-1',
          product: INITIAL_PRODUCTS[0],
          selectedSize: 'L',
          quantity: 1,
        }
      ];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [2, 3];
    } catch {
      return [];
    }
  });

  // Filter state
  const [filters, setFilters] = useState({
    category: 'all',
    gender: 'all',
    locality: 'all',
    query: '',
    sortBy: 'featured'
  });

  // Promo code & discounts
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in percent or flat amount

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
  }, [currentUser]);

  // Auto-authenticate default demo session if no token exists
  useEffect(() => {
    if (!localStorage.getItem('fitflex_token')) {
      const email = currentRole === 'SELLER' ? 'ironcore@fitflex.hyd' : (currentRole === 'ADMIN' ? 'admin@fitflex.hyd' : 'rahul@fitflex.hyd');
      const password = currentRole === 'ADMIN' ? 'admin123' : 'password123';
      api.post('/auth/login', { email, password })
        .then(res => {
          if (res.data?.token) {
            localStorage.setItem('fitflex_token', res.data.token);
          }
        })
        .catch(() => {});
    }
  }, []);

  // Toast notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Cart actions
  const addToCart = (product, size = 'M', quantity = 1) => {
    const existingIndex = cart.findIndex(
      item => item.product.id === product.id && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      setCart(updated);
    } else {
      setCart([
        ...cart,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          product,
          selectedSize: size,
          quantity
        }
      ]);
    }

    showToast(`Added ${product.name} (${size}) to Cart`);
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(cart.map(item => item.id === cartItemId ? { ...item, quantity } : item));
  };

  const removeFromCart = (cartItemId) => {
    setCart(cart.filter(item => item.id !== cartItemId));
    showToast('Item removed from cart.');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedDiscount(0);
    setPromoCode('');
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = appliedDiscount > 0 ? Math.round(rawSubtotal * (appliedDiscount / 100)) : 0;
  const deliveryFee = rawSubtotal >= 1499 ? 0 : 79;
  const cartTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee);

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HYDFIT10') {
      setAppliedDiscount(10);
      setPromoCode('HYDFIT10');
      showToast('🎉 Promo code HYDFIT10 applied: 10% Off!');
      return true;
    } else if (clean === 'LOCALHYD') {
      setAppliedDiscount(15);
      setPromoCode('LOCALHYD');
      showToast('🎉 Local Hyderabad perk applied: 15% Off!');
      return true;
    } else {
      showToast('Invalid promo code. Try HYDFIT10 or LOCALHYD.');
      return false;
    }
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
      showToast('Removed from Wishlist.');
    } else {
      setWishlist([...wishlist, productId]);
      showToast('Saved to your Wishlist!');
    }
  };

  const isWishlisted = (productId) => wishlist.includes(productId);

  // Order placement with real backend validation
  const placeOrder = async (checkoutData) => {
    try {
      const payload = {
        buyerName: checkoutData.buyerName || currentUser.name,
        buyerPhone: checkoutData.buyerPhone || currentUser.phone,
        deliveryAddress: checkoutData.deliveryAddress,
        deliveryLocality: checkoutData.deliveryLocality || 'Madhapur',
        deliveryPincode: checkoutData.deliveryPincode || '500081',
        deliveryNotes: checkoutData.deliveryNotes || '',
        items: cart.map(ci => ({
          productId: ci.product.id,
          size: ci.selectedSize,
          quantity: ci.quantity
        }))
      };
      const res = await api.post('/orders/checkout', payload);
      const backendOrder = res.data;

      const newOrder = {
        id: backendOrder.id,
        orderNumber: backendOrder.orderNumber,
        buyerName: backendOrder.buyerName || checkoutData.buyerName,
        buyerPhone: backendOrder.buyerPhone || checkoutData.buyerPhone,
        totalAmount: backendOrder.totalAmount || cartTotal,
        subtotal: rawSubtotal,
        discountAmount,
        deliveryFee,
        paymentMethod: backendOrder.paymentMethod || 'COD',
        paymentStatus: backendOrder.paymentStatus || 'PENDING',
        orderStatus: backendOrder.orderStatus || 'PLACED',
        speed: checkoutData.speed || 'EXPRESS_SAME_DAY',
        deliveryLocality: backendOrder.deliveryLocality || checkoutData.deliveryLocality,
        deliveryAddress: backendOrder.deliveryAddress || checkoutData.deliveryAddress,
        items: backendOrder.items?.length > 0 ? backendOrder.items.map(i => ({
          id: i.id,
          product: i.product,
          size: i.size,
          price: i.price,
          quantity: i.quantity
        })) : cart.map((ci, idx) => ({
          id: idx + 1,
          product: ci.product,
          size: ci.selectedSize,
          price: ci.product.price,
          quantity: ci.quantity
        })),
        deliveryTracking: backendOrder.deliveryTracking || {
          trackingCode: `HYD-EXP-${Date.now().toString().slice(-6)}`,
          courierPartner: 'FitFlex Local Express (Hyderabad Fleet)',
          currentStatus: 'SELLER_PROCESSING',
          currentLocality: `${checkoutData.deliveryLocality || 'Banjara Hills'} Hub`,
          estimatedDelivery: 'Within 24 Hours'
        },
        createdAt: backendOrder.createdAt || new Date().toISOString()
      };

      setOrders(prev => [newOrder, ...prev]);
      clearCart();
      setIsCheckoutOpen(false);
      setTrackingOrder(newOrder);
      showToast(`✅ Order Placed Successfully! Order #${newOrder.orderNumber}`);
      return newOrder;
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || 'Checkout failed. Please check variant stock.';
      showToast(`❌ ${errorMsg}`);
      return null;
    }
  };

  // Advance delivery status simulator (for demo / user test)
  const advanceOrderStatus = async (orderId) => {
    let nextStatusToApi = null;

    setOrders(prevOrders => prevOrders.map(order => {
      if (order.id !== orderId) return order;

      const current = order.deliveryTracking?.currentStatus || order.orderStatus;
      let nextStatus = current;
      let nextLocality = order.deliveryTracking?.currentLocality;
      let nextEstimate = order.deliveryTracking?.estimatedDelivery;

      if (current === 'PLACED' || current === 'SELLER_PROCESSING') {
        nextStatus = 'PICKED_UP';
        nextLocality = `${order.deliveryLocality || 'Madhapur'} Transit Hub`;
        nextEstimate = 'Dispatched on Courier Bike — Arriving in 45 mins';
      } else if (current === 'PICKED_UP') {
        nextStatus = 'OUT_FOR_DELIVERY';
        nextLocality = `Near ${order.deliveryLocality || 'Madhapur'} Area`;
        nextEstimate = 'Rider is 10 mins away from your location';
      } else if (current === 'OUT_FOR_DELIVERY') {
        nextStatus = 'DELIVERED';
        nextLocality = order.deliveryAddress || 'Doorstep';
        nextEstimate = 'Delivered & COD Payment Settled';
      }

      nextStatusToApi = nextStatus;

      const updated = {
        ...order,
        orderStatus: nextStatus,
        paymentStatus: nextStatus === 'DELIVERED' ? 'PAID' : order.paymentStatus,
        deliveryTracking: {
          ...order.deliveryTracking,
          currentStatus: nextStatus,
          currentLocality: nextLocality,
          estimatedDelivery: nextEstimate
        }
      };

      if (trackingOrder && trackingOrder.id === orderId) {
        setTrackingOrder(updated);
      }

      showToast(`Updated Delivery Status: ${nextStatus.replace(/_/g, ' ')}`);
      return updated;
    }));

    if (orderId && nextStatusToApi) {
      try {
        await api.put(`/orders/${orderId}/status?status=${nextStatusToApi}`);
      } catch {
        // Graceful demo fallback
      }
    }
  };

  // Role switching with backend authentication sync
  const switchRole = async (role) => {
    setCurrentRole(role);
    let targetUser = DEFAULT_BUYER;
    let email = 'rahul@fitflex.hyd';
    let password = 'password123';
    let toast = 'Switched to FitFlex Buyer Marketplace';

    if (role === 'SELLER') {
      targetUser = DEFAULT_SELLER;
      email = 'ironcore@fitflex.hyd';
      password = 'password123';
      toast = 'Switched to Seller Portal: IronCore Banjara Hills';
    } else if (role === 'ADMIN') {
      targetUser = DEFAULT_ADMIN;
      email = 'admin@fitflex.hyd';
      password = 'admin123';
      toast = 'Switched to Admin Operations HQ';
    }

    setCurrentUser(targetUser);
    showToast(toast);

    // Synchronize JWT token with backend demo account
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.token) {
        localStorage.setItem('fitflex_token', res.data.token);
      }
    } catch (err) {
      console.warn('Backend demo auth sync skipped:', err?.message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        currentUser,
        switchRole,
        setCurrentUser,
        cart,
        rawSubtotal,
        discountAmount,
        deliveryFee,
        cartTotal,
        promoCode,
        applyPromo,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        orders,
        setOrders,
        placeOrder,
        advanceOrderStatus,
        wishlist,
        toggleWishlist,
        isWishlisted,
        filters,
        setFilters,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isSearchOpen,
        setIsSearchOpen,
        trackingOrder,
        setTrackingOrder,
        quickViewProduct,
        setQuickViewProduct,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
