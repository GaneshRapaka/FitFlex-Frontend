import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Package, 
  ShieldCheck, 
  Navigation,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const TRACKING_STEPS = [
  { key: 'PLACED', label: 'Order Placed', desc: 'Received & routed to Hyderabad store hub' },
  { key: 'SELLER_PROCESSING', label: 'Store Packed', desc: 'IronCore / AuraFlex merchant preparing parcel' },
  { key: 'PICKED_UP', label: 'In Transit', desc: 'FitFlex SwiftCourier bike picked up parcel' },
  { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', desc: 'Rider en route to your Hyderabad address' },
  { key: 'DELIVERED', label: 'Delivered', desc: 'Parcel inspected & payment collected at doorstep' }
];

const OrderTrackingModal = () => {
  const { 
    trackingOrder, 
    setTrackingOrder, 
    advanceOrderStatus,
    showToast 
  } = useApp();

  if (!trackingOrder) return null;

  const currentStatus = trackingOrder.deliveryTracking?.currentStatus || trackingOrder.orderStatus || 'PLACED';

  const getStepIndex = (status) => {
    switch (status) {
      case 'PLACED': return 0;
      case 'SELLER_PROCESSING': return 1;
      case 'PICKED_UP': return 2;
      case 'OUT_FOR_DELIVERY': return 3;
      case 'DELIVERED': return 4;
      default: return 1;
    }
  };

  const currentStepIndex = getStepIndex(currentStatus);

  const handleSimulateNextStep = () => {
    advanceOrderStatus(trackingOrder.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl overflow-hidden shadow-2xl my-6 text-neutral-900 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold uppercase tracking-tight font-heading">
                  Live Hyderabad Delivery Fleet
                </h3>
                <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {currentStatus.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Tracking: <strong className="text-neutral-900">{trackingOrder.deliveryTracking?.trackingCode || trackingOrder.orderNumber}</strong>
              </p>
            </div>
          </div>

          <button
            onClick={() => setTrackingOrder(null)}
            className="p-2 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-6 bg-white">
          
          {/* Estimated Arrival Banner */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-neutral-900 shrink-0" />
              <div>
                <span className="text-[10px] font-bold uppercase text-neutral-500 tracking-wider block">Estimated Delivery</span>
                <span className="text-sm font-bold text-neutral-950">
                  {trackingOrder.deliveryTracking?.estimatedDelivery || 'Today within 2-4 Hours'}
                </span>
              </div>
            </div>

            {/* Test Simulation Button */}
            {currentStatus !== 'DELIVERED' && (
              <button
                onClick={handleSimulateNextStep}
                className="bg-neutral-950 hover:bg-neutral-850 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow-xs"
                title="Simulate the courier rider progressing to the next checkpoint"
              >
                <Sparkles className="w-3 h-3 text-white" />
                <span>Advance Status</span>
              </button>
            )}
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500">Dispatch Progress</h4>
            
            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-neutral-200">
              {TRACKING_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div key={step.key} className="relative flex items-start gap-4">
                    {/* Circle Pin */}
                    <div 
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                        isCurrent 
                          ? 'bg-neutral-950 border-neutral-900 text-white shadow-sm ring-4 ring-neutral-200' 
                          : isPassed 
                            ? 'bg-emerald-600 border-emerald-600 text-white' 
                            : 'bg-white border-neutral-300 text-neutral-400'
                      }`}
                    >
                      {isPassed && !isCurrent ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-neutral-950' : isPassed ? 'text-neutral-800' : 'text-neutral-400'}`}>
                          {step.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] bg-neutral-100 text-neutral-900 px-2 py-0.2 rounded font-extrabold uppercase border border-neutral-300">
                            LIVE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Rider Card */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center text-xl shadow-2xs">
                🛵
              </div>
              <div>
                <h5 className="text-xs font-bold text-neutral-950">
                  {trackingOrder.deliveryTracking?.deliveryAgentName || 'Ramesh Kumar (Bike Fleet)'}
                </h5>
                <p className="text-[11px] text-neutral-500">
                  FitFlex Bike Partner • {trackingOrder.deliveryTracking?.bikePlate || 'TS 09 FF 4421'}
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-600 font-medium mt-0.5">
                  <MapPin className="w-3 h-3 text-neutral-900" />
                  <span>Current Hub: {trackingOrder.deliveryTracking?.currentLocality || 'Madhapur Hub'}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => showToast(`Dialing Courier Rider (${trackingOrder.deliveryTracking?.deliveryAgentPhone || '+91 98490 12345'})...`)}
              className="bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 p-2.5 rounded-xl transition flex items-center gap-1.5 text-xs font-bold shadow-2xs"
              title="Call Dispatcher"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden sm:inline">Call Rider</span>
            </button>
          </div>

          {/* Delivery & Items Summary */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between text-neutral-600 pb-2 border-b border-neutral-200">
              <span className="font-bold text-neutral-900 uppercase text-[11px]">Parcel Contents ({trackingOrder.items?.length || 1} drops)</span>
              <span className="font-bold text-neutral-950">COD Total: ₹{trackingOrder.totalAmount}</span>
            </div>

            <div className="space-y-2">
              {(trackingOrder.items || []).map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <span className="text-neutral-700 truncate max-w-[280px]">
                    {item.product?.name || 'IronCore Pump Cover'} ({item.size}) × {item.quantity}
                  </span>
                  <span className="text-neutral-900 font-mono font-semibold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-200 flex items-start gap-2 text-[11px] text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-neutral-900 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-800">Deliver To: </span>
                <span>{trackingOrder.deliveryAddress}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OrderTrackingModal;
