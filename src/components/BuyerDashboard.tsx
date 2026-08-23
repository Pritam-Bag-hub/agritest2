import { useStore } from '@/store';
import { Building2, FileText, Wallet, TrendingUp, Calendar, Sprout, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ActivityFeed from './ActivityFeed';

export default function BuyerDashboard() {
  const { contract, fundEscrow, updateContract, addActivity } = useStore();
  const [form, setForm] = useState({
    cropType: contract.cropType,
    landSize: contract.landSize,
    targetQty: contract.targetQty,
    guaranteedPrice: contract.guaranteedPrice,
  });
  const [fundAmount, setFundAmount] = useState(50000);

  const totalValue = form.targetQty * form.guaranteedPrice;
  const escrowCoverage = Math.round((contract.escrowFunded / (contract.targetQty * contract.guaranteedPrice)) * 100);

  const handleCreateContract = () => {
    updateContract({
      cropType: form.cropType,
      landSize: form.landSize,
      targetQty: form.targetQty,
      guaranteedPrice: form.guaranteedPrice,
    });
    addActivity(`New contract drafted: ${form.cropType} on ${form.landSize} acres @ ₹${form.guaranteedPrice}/quintal`, 'escrow');
  };

  const handleFund = () => {
    if (fundAmount <= 0) return;
    fundEscrow(fundAmount);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-700 via-forest-600 to-leaf-600 p-6 sm:p-7 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Building2 className="w-5 h-5 text-amber" />
              <span className="text-xs font-semibold uppercase tracking-wider text-leaf-100">Corporate Buyer Dashboard</span>
            </div>
            <h2 className="font-display text-2xl font-bold">{contract.buyer}</h2>
            <p className="text-leaf-100 text-sm mt-1">Contract farming powered by escrow-locked guarantees & AI yield monitoring.</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[110px]">
              <p className="text-2xl font-bold">₹{(contract.escrowFunded / 100000).toFixed(1)}L</p>
              <p className="text-[11px] text-leaf-100 uppercase tracking-wide">Escrow Locked</p>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[110px]">
              <p className="text-2xl font-bold">{contract.healthScore}%</p>
              <p className="text-[11px] text-leaf-100 uppercase tracking-wide">Crop Health</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Create contract form */}
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-leaf-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-forest-800">Create Contract</h3>
              <p className="text-xs text-gray-500">Define crop & guarantee terms</p>
            </div>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="label-text">Crop Type</label>
              <select className="input-field" value={form.cropType} onChange={(e) => setForm({ ...form, cropType: e.target.value })}>
                <option>Potato</option>
                <option>Wheat</option>
                <option>Cotton</option>
                <option>Rice</option>
                <option>Onion</option>
                <option>Tomato</option>
                <option>Soybean</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-text">Land Size (Acres)</label>
                <input type="number" className="input-field" value={form.landSize} onChange={(e) => setForm({ ...form, landSize: +e.target.value })} />
              </div>
              <div>
                <label className="label-text">Target Qty (Qtls)</label>
                <input type="number" className="input-field" value={form.targetQty} onChange={(e) => setForm({ ...form, targetQty: +e.target.value })} />
              </div>
            </div>
            <div>
              <label className="label-text">Guaranteed Price (₹/Quintal)</label>
              <input type="number" className="input-field" value={form.guaranteedPrice} onChange={(e) => setForm({ ...form, guaranteedPrice: +e.target.value })} />
            </div>

            <div className="bg-leaf-50 rounded-xl p-3.5 border border-leaf-100">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">Total Contract Value</span>
                <span className="font-bold text-forest-800 text-base">₹{totalValue.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button onClick={handleCreateContract} className="btn-primary w-full">
              <FileText className="w-4 h-4" /> Draft Contract
            </button>
          </div>
        </div>

        {/* Fund escrow + breakdown */}
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-amber-soft flex items-center justify-center">
              <Wallet className="w-5 h-5 text-amber-700" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-forest-800">Fund Escrow Account</h3>
              <p className="text-xs text-gray-500">Lock capital to guarantee farmer payout</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-forest-700 to-leaf-700 rounded-xl p-4 text-white mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-amber" />
              <span className="text-xs uppercase tracking-wide text-leaf-100 font-semibold">Escrow Balance</span>
            </div>
            <p className="text-3xl font-bold">₹{contract.escrowFunded.toLocaleString('en-IN')}</p>
            <div className="mt-3">
              <div className="flex justify-between text-[11px] text-leaf-100 mb-1">
                <span>Coverage of contract value</span>
                <span>{escrowCoverage}%</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-amber rounded-full transition-all duration-500" style={{ width: `${Math.min(escrowCoverage, 100)}%` }} />
              </div>
            </div>
          </div>

          <label className="label-text">Fund Amount (₹)</label>
          <div className="flex items-center gap-2 mb-2">
            <input type="number" step={10000} className="input-field" value={fundAmount} onChange={(e) => setFundAmount(+e.target.value)} />
          </div>
          <div className="flex gap-2 mb-4">
            {[25000, 50000, 100000].map((amt) => (
              <button key={amt} onClick={() => setFundAmount(amt)} className="flex-1 py-1.5 rounded-lg text-xs font-semibold border border-gray-200 hover:border-forest-300 hover:bg-leaf-50 text-gray-600 transition-all">
                ₹{(amt / 1000).toFixed(0)}K
              </button>
            ))}
          </div>
          <button onClick={handleFund} className="btn-amber w-full">
            <Wallet className="w-4 h-4" /> Fund Escrow Now
          </button>
        </div>

        {/* Live farm analytics */}
        <div className="card p-5 lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-leaf-50 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-forest-700" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-forest-800">Live Farm Analytics</h3>
              <p className="text-xs text-gray-500">Satellite + IoT monitored</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Sprout className="w-4 h-4 text-leaf-600" />
                  <span className="text-sm font-semibold text-gray-700">Crop Growth Stage</span>
                </div>
                <span className="text-sm font-bold text-forest-700">{contract.growthStage}%</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden relative">
                <div className="h-full bg-gradient-to-r from-leaf-400 to-forest-600 rounded-full transition-all duration-700" style={{ width: `${contract.growthStage}%` }} />
              </div>
              <p className="text-[11px] text-gray-500 mt-1">Phase 2 · Crop Growth → Phase 3: Maturation</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 p-3.5 bg-gradient-to-br from-leaf-50/50 to-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-leaf-600" />
                  <span className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Health Score</span>
                </div>
                <p className="text-2xl font-bold text-forest-700">{contract.healthScore}<span className="text-sm text-gray-400">/100</span></p>
                <p className="text-[11px] text-leaf-600 font-medium mt-0.5">Excellent · No disease flags</p>
              </div>
              <div className="rounded-xl border border-gray-100 p-3.5 bg-gradient-to-br from-amber-soft/50 to-white">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-amber-700" />
                  <span className="text-[11px] uppercase tracking-wide text-gray-500 font-semibold">Expected Delivery</span>
                </div>
                <p className="text-lg font-bold text-earth-700 leading-tight">{contract.expectedDelivery}</p>
                <p className="text-[11px] text-amber-700 font-medium mt-0.5">{Math.ceil((new Date(contract.expectedDelivery).getTime() - Date.now()) / 86400000)} days remaining</p>
              </div>
            </div>

            <div className="rounded-xl bg-forest-700 p-3.5 text-white flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <ArrowRight className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Contract {contract.id}</p>
                <p className="text-[11px] text-leaf-100">{contract.cropType} · {contract.landSize} acres · {contract.targetQty} qtl target</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-5">
          <h3 className="font-display font-bold text-base text-forest-800 mb-4">Escrow Breakdown & Payout Schedule</h3>
          <div className="space-y-3">
            {[
              { label: 'Worker Wages (Labor Tranches)', pct: 25, color: 'bg-amber', val: contract.escrowFunded * 0.25 },
              { label: 'Landowner Base Rent & HR Stipend', pct: 30, color: 'bg-forest-600', val: contract.escrowFunded * 0.3 },
              { label: 'Input Vendors (In-kind Vouchers)', pct: 20, color: 'bg-leaf-500', val: contract.escrowFunded * 0.2 },
              { label: 'Quality Bonus Pool', pct: 15, color: 'bg-earth-500', val: contract.escrowFunded * 0.15 },
              { label: 'Platform Facilitation Fee', pct: 10, color: 'bg-gray-400', val: contract.escrowFunded * 0.1 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 font-medium">{row.label}</span>
                  <span className="font-semibold text-gray-800">₹{row.val.toLocaleString('en-IN')} <span className="text-gray-400 text-xs">({row.pct}%)</span></span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${row.color} rounded-full transition-all duration-500`} style={{ width: `${row.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <ActivityFeed />
      </div>
    </div>
  );
}
