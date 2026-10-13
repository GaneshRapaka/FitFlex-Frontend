import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_PRODUCTS } from '../api/productsApi';
import api from '../api/client';
import { 
  PlusCircle, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Truck, 
  Layers, 
  AlertCircle,
  Eye,
  Store
} from 'lucide-react';

const SellerDashboard = () => {
  const { currentUser, orders, setOrders, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'addProduct', 'orders'
  const [sellerProducts, setSellerProducts] = useState(INITIAL_PRODUCTS);

  // New product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    categorySlug: 'oversized-tees',
    gender: 'Men',
    price: '',
    originalPrice: '',
    // Standalone apparel
    apparelImageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
    // On-model image
    modelImageUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1000&auto=format&fit=crop',
    fabricDetails: '100% Combed Cotton Heavyweight',
    fitType: 'Oversized Athletic Fit',
    badge: 'NEW DROP',
    stockS: 15,
    stockM: 25,
    stockL: 20,
    stockXL: 10
  });

  // Calculate seller financial metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const platformFee = Math.round(totalRevenue * 0.085);
  const netPayout = totalRevenue - platformFee;

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) {
      showToast('Please fill in product name and price');
      return;
    }

    const payload = {
      name: newProduct.name,
      description: newProduct.fabricDetails + ' - ' + newProduct.fitType,
      categorySlug: newProduct.categorySlug,
      gender: newProduct.gender,
      price: Number(newProduct.price),
      originalPrice: Number(newProduct.originalPrice || newProduct.price),
      discountPercent: Math.round(((Number(newProduct.originalPrice || newProduct.price) - Number(newProduct.price)) / Number(newProduct.originalPrice || newProduct.price)) * 100) || 0,
      apparelImageUrl: newProduct.apparelImageUrl,
      modelImageUrl: newProduct.modelImageUrl,
      fabricDetails: newProduct.fabricDetails,
      fitType: newProduct.fitType,
      badge: newProduct.badge,
      sizeStock: {
        'S': Number(newProduct.stockS),
        'M': Number(newProduct.stockM),
        'L': Number(newProduct.stockL),
        'XL': Number(newProduct.stockXL)
      }
    };

    try {
      const res = await api.post('/products', payload);
      const created = res.data;
      setSellerProducts(prev => [created, ...prev]);
      showToast(`✅ Drop "${created.name}" published to Hyderabad Marketplace!`);
      setActiveTab('inventory');
    } catch {
      const created = {
        id: Date.now(),
        ...payload,
        rating: 5.0,
        reviewCount: 1,
        store: {
          id: 1,
          storeName: currentUser.storeName || "IronCore Activewear Hub",
          locality: currentUser.locality || "Banjara Hills",
          address: currentUser.address || "Road No 10, Banjara Hills, Hyderabad"
        },
        variants: [
          { id: Date.now() + 1, size: 'S', stockQuantity: Number(newProduct.stockS) },
          { id: Date.now() + 2, size: 'M', stockQuantity: Number(newProduct.stockM) },
          { id: Date.now() + 3, size: 'L', stockQuantity: Number(newProduct.stockL) },
          { id: Date.now() + 4, size: 'XL', stockQuantity: Number(newProduct.stockXL) },
        ]
      };
      setSellerProducts(prev => [created, ...prev]);
      showToast(`✅ Drop "${created.name}" published to Hyderabad Marketplace!`);
      setActiveTab('inventory');
    }
  };

  useEffect(() => {
    api.get('/products')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setSellerProducts(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleUpdateStock = (productId, variantSize, delta) => {
    let targetVariantId = null;
    let targetQuantity = null;

    setSellerProducts(sellerProducts.map(p => {
      if (p.id === productId) {
        return {
          ...p,
          variants: p.variants.map(v => {
            if (v.size === variantSize) {
              const updatedQty = Math.max(0, v.stockQuantity + delta);
              targetVariantId = v.id;
              targetQuantity = updatedQty;
              return { ...v, stockQuantity: updatedQty };
            }
            return v;
          })
        };
      }
      return p;
    }));
    showToast(`Stock updated for ${variantSize}`);

    if (targetVariantId && targetQuantity !== null) {
      api.put(`/seller/inventory/${targetVariantId}?quantity=${targetQuantity}`)
        .catch(err => console.warn('Backend stock sync skipped:', err?.message));
    }
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: newStatus,
          paymentStatus: newStatus === 'DELIVERED' ? 'COLLECTED' : o.paymentStatus
        };
      }
      return o;
    }));
    showToast(`Order #${orderId} marked as ${newStatus}`);

    api.put(`/orders/${orderId}/status?status=${newStatus}`)
      .catch(err => console.warn('Backend order status sync skipped:', err?.message));
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 space-y-8">
      
      {/* Seller Header */}
      <div className="bg-gradient-to-r from-[#171922] via-[#14161f] to-[#12141c] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black uppercase text-white tracking-tight">
                {currentUser.storeName || "IronCore Activewear Hub"}
              </h1>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                VERIFIED LOCAL SELLER
              </span>
            </div>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              <span>{currentUser.address || "Road No 10, Banjara Hills, Hyderabad"}</span>
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#1b1e28] p-1.5 rounded-2xl border border-gray-800 text-xs font-bold">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'inventory' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Inventory & Catalog
          </button>
          <button
            onClick={() => setActiveTab('addProduct')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'addProduct' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            + Add New Drop
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'orders' ? 'bg-orange-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}
          >
            Orders & COD ({orders.length})
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Total Gross GMV</span>
            <DollarSign className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">₹{totalRevenue}</p>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 block">Local Hyderabad Orders</span>
        </div>

        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Platform Commission (8.5%)</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-gray-300 mt-2">₹{platformFee}</p>
          <span className="text-[11px] text-gray-500 mt-1 block">Includes local fleet delivery</span>
        </div>

        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Net Seller Settlement</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-2">₹{netPayout}</p>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 block">Ready for Bank Transfer</span>
        </div>

        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Active Products Listed</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{sellerProducts.length}</p>
          <span className="text-[11px] text-orange-400 font-bold mt-1 block">Both Flat & Model Views Live</span>
        </div>
      </div>

      {/* Tab 1: Inventory & Catalog */}
      {activeTab === 'inventory' && (
        <div className="bg-[#14161f] border border-gray-800 rounded-3xl p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-black uppercase text-white tracking-wide">
                Active Store Inventory & Dual-Visual Catalog
              </h2>
              <p className="text-xs text-gray-400">
                Products feature both standalone flat-lay and athlete on-model views.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('addProduct')}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-2 rounded-xl transition uppercase flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#1c1f2b] text-gray-400 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Visuals (Apparel & Model)</th>
                  <th className="p-3.5">Product Title</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Size Inventory Stock</th>
                  <th className="p-3.5 rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sellerProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#181a24] transition">
                    <td className="p-3.5">
                      <div className="flex items-center gap-2">
                        {/* Standalone Dress / Flat Image */}
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-800 border border-gray-700 relative group" title="Standalone Flat Lay">
                          <img src={p.apparelImageUrl} alt="Flat Lay" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center text-gray-200">Flat</span>
                        </div>
                        {/* Model Image */}
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-800 border border-orange-500/40 relative group" title="On-Person Model Fit">
                          <img src={p.modelImageUrl} alt="Model Fit" className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-orange-600 text-[8px] text-center text-white font-bold">Model</span>
                        </div>
                      </div>
                    </td>

                    <td className="p-3.5 font-bold text-white">
                      {p.name}
                      <span className="block text-[10px] font-normal text-gray-500">{p.fabricDetails}</span>
                    </td>

                    <td className="p-3.5 text-gray-400 uppercase font-semibold">
                      {p.category?.name || p.gender}
                    </td>

                    <td className="p-3.5 font-black text-white">
                      ₹{p.price}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        {p.variants?.map((v) => (
                          <div key={v.size} className="bg-[#1e212d] border border-gray-700 px-2 py-1 rounded-lg flex items-center gap-1.5">
                            <span className="font-bold text-gray-400">{v.size}:</span>
                            <span className={`font-black ${v.stockQuantity < 5 ? 'text-red-400' : 'text-emerald-400'}`}>
                              {v.stockQuantity}
                            </span>
                            <div className="flex flex-col gap-0.5 ml-1">
                              <button
                                onClick={() => handleUpdateStock(p.id, v.size, 5)}
                                className="text-[9px] text-gray-400 hover:text-orange-400 leading-none"
                              >
                                +
                              </button>
                              <button
                                onClick={() => handleUpdateStock(p.id, v.size, -1)}
                                className="text-[9px] text-gray-400 hover:text-red-400 leading-none"
                              >
                                -
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>

                    <td className="p-3.5">
                      <span className="bg-emerald-500/20 text-emerald-400 font-bold px-2.5 py-1 rounded-full text-[10px] border border-emerald-500/30">
                        ACTIVE
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Add New Drop Form */}
      {activeTab === 'addProduct' && (
        <div className="bg-[#14161f] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-800 pb-4">
            <h2 className="text-xl font-black uppercase text-white tracking-wide">
              Create New Activewear Drop (Dual-View Enabled)
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Provide both the standalone flat-lay dress/tee photo AND the athletic on-model image for the interactive hover reveal.
            </p>
          </div>

          <form onSubmit={handleCreateProduct} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IronCore Pump Heavy Oversized Tee"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Category</label>
                <select
                  value={newProduct.categorySlug}
                  onChange={(e) => setNewProduct({ ...newProduct, categorySlug: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="oversized-tees">Oversized Gym Tees</option>
                  <option value="active-dresses-sets">Active Dresses & Co-ord Sets</option>
                  <option value="stringers-tanks">Stringers & Muscle Tanks</option>
                  <option value="compression-wear">Compression Wear</option>
                  <option value="joggers-shorts">Joggers & Gym Shorts</option>
                  <option value="accessories">Fitness Accessories</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Selling Price (₹)</label>
                <input
                  type="number"
                  required
                  placeholder="999"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Original Price (₹)</label>
                <input
                  type="number"
                  placeholder="1599"
                  value={newProduct.originalPrice}
                  onChange={(e) => setNewProduct({ ...newProduct, originalPrice: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Target Gender</label>
                <select
                  value={newProduct.gender}
                  onChange={(e) => setNewProduct({ ...newProduct, gender: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
              </div>
            </div>

            {/* Crucial Section: The Two Image URLs */}
            <div className="p-4 bg-[#181a24] rounded-2xl border border-gray-800 space-y-4">
              <div className="flex items-center gap-2 text-xs font-black uppercase text-orange-400">
                <Eye className="w-4 h-4" />
                <span>Dual Image Experience (Hover Reveal Technology)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    1. Standalone Apparel Image URL (Default View - Flat Lay / Ghost Dress)
                  </label>
                  <input
                    type="url"
                    required
                    value={newProduct.apparelImageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, apparelImageUrl: e.target.value })}
                    className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                  <div className="mt-2 w-24 h-28 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
                    <img src={newProduct.apparelImageUrl} alt="Apparel preview" className="w-full h-full object-cover" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    2. On-Person Model Image URL (Revealed on Hover - Muscular Athlete)
                  </label>
                  <input
                    type="url"
                    required
                    value={newProduct.modelImageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, modelImageUrl: e.target.value })}
                    className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                  <div className="mt-2 w-24 h-28 rounded-lg overflow-hidden bg-gray-800 border border-orange-500/50">
                    <img src={newProduct.modelImageUrl} alt="Model preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Initial Inventory Stock */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Size S Stock</label>
                <input
                  type="number"
                  value={newProduct.stockS}
                  onChange={(e) => setNewProduct({ ...newProduct, stockS: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Size M Stock</label>
                <input
                  type="number"
                  value={newProduct.stockM}
                  onChange={(e) => setNewProduct({ ...newProduct, stockM: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Size L Stock</label>
                <input
                  type="number"
                  value={newProduct.stockL}
                  onChange={(e) => setNewProduct({ ...newProduct, stockL: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 mb-1">Size XL Stock</label>
                <input
                  type="number"
                  value={newProduct.stockXL}
                  onChange={(e) => setNewProduct({ ...newProduct, stockXL: e.target.value })}
                  className="w-full bg-[#1c1f2b] border border-gray-700 rounded-xl py-2 px-3 text-xs text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-orange-500/25 transition text-xs uppercase tracking-wider flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publish Product to FitFlex Marketplace</span>
            </button>
          </form>
        </div>
      )}

      {/* Tab 3: Orders & COD Management */}
      {activeTab === 'orders' && (
        <div className="bg-[#14161f] border border-gray-800 rounded-3xl p-6 space-y-6">
          <div>
            <h2 className="text-lg font-black uppercase text-white tracking-wide">
              Store Orders & Cash on Delivery Processing
            </h2>
            <p className="text-xs text-gray-400">
              Process customer orders and request Hyderabad local fleet pickup.
            </p>
          </div>

          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="bg-[#181a24] border border-gray-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-white">Order #{o.orderNumber}</span>
                    <span className="bg-orange-500/20 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/30">
                      COD • ₹{o.totalAmount}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Buyer: <strong className="text-white">{o.buyerName}</strong> ({o.buyerPhone})
                  </p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-orange-400" />
                    <span>{o.deliveryAddress}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block uppercase">Current Fulfillment Status</span>
                    <span className="text-xs font-black text-orange-400 uppercase">
                      {o.orderStatus.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <select
                    value={o.orderStatus}
                    onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                    className="bg-[#212433] border border-gray-700 text-xs text-white font-bold py-2 px-3 rounded-xl focus:outline-none focus:border-orange-500"
                  >
                    <option value="PLACED">Placed</option>
                    <option value="CONFIRMED">Seller Confirmed</option>
                    <option value="SHIPPED">Handed to Local Courier</option>
                    <option value="OUT_FOR_DELIVERY">Out for Delivery</option>
                    <option value="DELIVERED">Delivered & Cash Collected</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SellerDashboard;
