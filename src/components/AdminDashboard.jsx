import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import api from '../api/client';
import { 
  ShieldCheck, 
  Store, 
  Users, 
  Truck, 
  DollarSign, 
  Check, 
  MapPin, 
  AlertCircle 
} from 'lucide-react';

const AdminDashboard = () => {
  const { orders, showToast } = useApp();

  const [stores, setStores] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const fetchAdminData = () => {
    api.get('/admin/stores')
      .then(res => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setStores(res.data);
        }
      })
      .catch(() => {});

    api.get('/admin/analytics')
      .then(res => {
        if (res.data) {
          setAnalytics(res.data);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const toggleApproval = (id) => {
    const store = stores.find(s => s.id === id);
    if (!store) return;
    const nextApproved = !store.isApproved;

    api.put(`/admin/stores/${id}/approval?approved=${nextApproved}`)
      .then(res => {
        setStores(stores.map(s => s.id === id ? { ...s, isApproved: nextApproved } : s));
        showToast(`Store "${store.storeName}" approval updated to: ${nextApproved ? 'VERIFIED' : 'PENDING'}`);
        fetchAdminData();
      })
      .catch(err => {
        showToast(err.response?.data?.message || 'Failed to update store status');
      });
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-[#171922] via-[#14161f] to-[#12141c] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-orange-500/20 text-orange-400 rounded-xl border border-orange-500/30">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-black uppercase text-white tracking-tight">
              FitFlex Hyderabad Platform Administration
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Hyper-Local Gym Activewear Marketplace Operations & Logistics Control Center
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Hyderabad Platform GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">
            {analytics?.totalGmv ? `₹${Number(analytics.totalGmv).toLocaleString('en-IN')}` : '₹1,42,850'}
          </p>
          <span className="text-[11px] text-emerald-400 font-bold mt-1 block">
            Platform Cut: ₹{analytics?.platformRevenue ? Number(analytics.platformRevenue).toLocaleString('en-IN') : '12,142'} (8.5%)
          </span>
        </div>

        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Verified Local Sellers</span>
            <Store className="w-4 h-4 text-orange-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">
            {stores.filter(s => s.isApproved).length} Active
          </p>
          <span className="text-[11px] text-amber-400 font-bold mt-1 block">
            {stores.filter(s => !s.isApproved).length} Pending Verification
          </span>
        </div>

        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Total Local Deliveries</span>
            <Truck className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">
            {analytics?.totalOrders !== undefined ? analytics.totalOrders : orders.length}
          </p>
          <span className="text-[11px] text-blue-400 font-bold mt-1 block">
            {analytics?.deliveredOrders || 0} Fulfilled & Settled
          </span>
        </div>

        <div className="bg-[#14161f] border border-gray-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold">
            <span>Active Fitness Buyers</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white mt-2">
            {analytics?.totalUsers ? Number(analytics.totalUsers).toLocaleString('en-IN') : '2,840'}
          </p>
          <span className="text-[11px] text-purple-400 font-bold mt-1 block">Hyderabad Metro Region</span>
        </div>
      </div>

      {/* Sellers Oversight Table */}
      <div className="bg-[#14161f] border border-gray-800 rounded-3xl p-6 space-y-4">
        <div>
          <h2 className="text-lg font-black uppercase text-white tracking-wide">
            Hyderabad Seller Store Network
          </h2>
          <p className="text-xs text-gray-400">
            Review and certify gym apparel merchants in Hyderabad.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#1c1f2b] text-gray-400 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3.5 rounded-l-xl">Store & Merchant</th>
                <th className="p-3.5">Hyderabad Locality</th>
                <th className="p-3.5">Contact</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {stores.map((s) => (
                <tr key={s.id} className="hover:bg-[#181a24] transition">
                  <td className="p-3.5">
                    <span className="font-bold text-white block">{s.storeName}</span>
                    <span className="text-[10px] text-gray-500">Owner: {s.seller?.name || s.sellerName || 'Local Merchant'}</span>
                  </td>
                  <td className="p-3.5 font-semibold text-orange-300 flex items-center gap-1 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    <span>{s.locality}</span>
                  </td>
                  <td className="p-3.5 text-gray-400">
                    {s.contactNumber || s.phone || '+91 99887 76655'}
                  </td>
                  <td className="p-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      s.isApproved 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    }`}>
                      {s.isApproved ? 'VERIFIED' : 'PENDING'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <button
                      onClick={() => toggleApproval(s.id)}
                      className={`text-[10px] font-bold px-3 py-1 rounded-xl transition ${
                        s.isApproved 
                          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                          : 'bg-emerald-500 text-white hover:bg-emerald-600'
                      }`}
                    >
                      {s.isApproved ? 'Revoke' : 'Approve Store'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
