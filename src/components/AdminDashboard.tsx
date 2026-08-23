import { useStore } from '@/store';
import { ShieldCheck, Lock, Users, Cpu, TrendingUp, BadgeCheck, AlertTriangle, Activity } from 'lucide-react';
import EscrowEngine from './EscrowEngine';
import ActivityFeed from './ActivityFeed';

export default function AdminDashboard() {
  const { contract, workers, computeSplit } = useStore();
  const split = computeSplit();
  const checkedIn = workers.filter((w) => w.attendance === 'Checked-In').length;
  const paid = workers.filter((w) => w.status === 'Paid').length;
  const totalPayout = split.vendors + split.wages + split.rent + split.bonus + split.fee;

  const kpis = [
    { label: 'Escrow Under Management', value: `₹${(contract.escrowFunded / 100000).toFixed(1)}L`, icon: Lock, color: 'text-forest-700 bg-leaf-50', sub: 'Locked & active' },
    { label: 'Active Workers', value: `${checkedIn}/${workers.length}`, icon: Users, color: 'text-amber-700 bg-amber-soft', sub: `${paid} paid this cycle` },
    { label: 'Crop Health Index', value: `${contract.healthScore}%`, icon: TrendingUp, color: 'text-leaf-600 bg-leaf-50', sub: 'Above target threshold' },
    { label: 'Projected Payout', value: `₹${(totalPayout / 100000).toFixed(1)}L`, icon: Activity, color: 'text-earth-700 bg-earth-50', sub: 'Per current engine params' },
  ];

  const alerts = [
    { level: 'ok', text: 'Escrow fully funded for Contract CT-2026-PUN-014', icon: BadgeCheck },
    { level: 'ok', text: 'AI satellite: 94% crop health — no disease flagged', icon: Cpu },
    { level: 'warn', text: '2 workers pending check-in — auto-reminder sent', icon: AlertTriangle },
    { level: 'ok', text: 'Milestone 2 (Crop Growth) on track for Feb delivery', icon: TrendingUp },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-forest-800 via-forest-700 to-forest-600 text-white p-6 sm:p-7">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, white 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-5 h-5 text-amber" />
              <span className="text-xs font-semibold uppercase tracking-wider text-leaf-100">Platform Admin · AI Engine</span>
            </div>
            <h2 className="font-display text-2xl font-bold">System Oversight Console</h2>
            <p className="text-leaf-100 text-sm mt-1">Escrow integrity · AI risk analysis · automated payout orchestration</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center">
            <p className="text-3xl font-bold">₹{(contract.escrowFunded / 100000).toFixed(1)}L</p>
            <p className="text-[11px] text-leaf-100 uppercase tracking-wide">Total Escrow Managed</p>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="card p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${k.color}`}>
              <k.icon className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{k.label}</p>
            <p className="text-xl font-bold text-forest-800 mt-0.5">{k.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* AI Engine widget */}
        <div className="lg:col-span-2">
          <EscrowEngine />
        </div>

        {/* Alerts */}
        <div className="space-y-6">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-amber-soft flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-display font-bold text-base text-forest-800">System Alerts</h3>
            </div>
            <div className="space-y-2.5">
              {alerts.map((a, i) => (
                <div key={i} className={`flex items-start gap-2.5 p-3 rounded-xl ${
                  a.level === 'ok' ? 'bg-leaf-50/60' : 'bg-amber-soft/60'
                }`}>
                  <a.icon className={`w-4 h-4 mt-0.5 shrink-0 ${a.level === 'ok' ? 'text-leaf-600' : 'text-amber-700'}`} />
                  <p className="text-xs text-gray-700 leading-snug">{a.text}</p>
                </div>
              ))}
            </div>
          </div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
