import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Tag, 
  CheckCircle2,
  Percent
} from 'lucide-react';

const CartDrawer = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    rawSubtotal,
    discountAmount,
    deliveryFee,
    cartTotal, 
    updateQuantity, 
    removeFromCart, 
    setIsCheckoutOpen,
    promoCode,
    applyPromo,
    setQuickViewProduct
  } = useApp();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 1499;
  const progressToFree = Math.min(100, Math.round((rawSubtotal / freeDeliveryThreshold) * 100));
  const amountNeededForFree = Math.max(0, freeDeliveryThreshold - rawSubtotal);

  const handleApplyCode = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    applyPromo(inputCode);
    setInputCode('');
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-neutral-200 text-neutral-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-950 font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold uppercase tracking-tight font-heading">Your Cart</h3>
                <p className="text-xs text-neutral-500">{cart.length} unique drop{cart.length === 1 ? '' : 's'}</p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-100 transition"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-neutral-50 px-5 py-3.5 border-b border-neutral-200">
            <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
              {amountNeededForFree > 0 ? (
                <span className="text-neutral-700 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Add <strong className="text-neutral-950">₹{amountNeededForFree}</strong> more for Free Delivery!</span>
                </span>
              ) : (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Unlocked Free Express Local Delivery in Hyderabad!</span>
                </span>
              )}
              <span className="text-neutral-500">{progressToFree}%</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-neutral-950 rounded-full transition-all duration-500"
                style={{ width: `${progressToFree}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
                  <ShoppingBag className="w-8 h-8 stroke-1" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900 uppercase">Your Cart is Empty</h4>
                  <p className="text-xs text-neutral-500 mt-1">Explore our latest 240 GSM drops and gym sets.</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold uppercase px-6 py-3 rounded-xl transition shadow-xs"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 flex gap-3.5">
                  <img
                    src={item.product.apparelImageUrl}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-neutral-100 border border-neutral-200 shrink-0 cursor-pointer"
                    onClick={() => {
                      setQuickViewProduct(item.product);
                      setIsCartOpen(false);
                    }}
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 
                          className="text-xs font-bold text-neutral-950 hover:text-neutral-600 transition cursor-pointer line-clamp-1"
                          onClick={() => {
                            setQuickViewProduct(item.product);
                            setIsCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-500 transition p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                        <span className="bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200 font-bold text-neutral-800">
                          Size: {item.selectedSize}
                        </span>
                        <span>•</span>
                        <span>{item.product.store?.locality}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center bg-neutral-100 border border-neutral-200 rounded-lg p-0.5 text-xs font-bold">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black rounded"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-neutral-900 text-[11px]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black rounded"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-black text-neutral-950">
                          ₹{item.product.price * item.quantity}
                        </span>
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-neutral-400 block">
                            (₹{item.product.price} each)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 bg-neutral-50 border-t border-neutral-200 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCode} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    placeholder="Coupon (HYDFIT10)"
                    className="w-full bg-white border border-neutral-300 rounded-xl py-2 pl-8 pr-3 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black font-mono uppercase shadow-2xs"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
                >
                  Apply
                </button>
              </form>

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 font-semibold">
                  <span className="flex items-center gap-1 font-bold">
                    <Percent className="w-3 h-3" />
                    <span>Coupon {promoCode} Applied</span>
                  </span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-600 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="text-neutral-900 font-semibold">₹{rawSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Hyderabad Local Delivery</span>
                  <span className="font-semibold text-neutral-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total Amount</span>
                  <span className="text-neutral-950 text-base">₹{cartTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-neutral-950 hover:bg-neutral-850 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs uppercase tracking-wider active:scale-95"
              >
                <span>Proceed with Cash on Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero Advance Payment • Pay upon doorstep inspection</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
