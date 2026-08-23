import { useStore } from '@/store';
import { UserSquare, MapPin, Sprout, Wallet, TrendingUp, CheckCircle2, Clock, BadgeCheck, Satellite, Phone } from 'lucide-react';
import ActivityFeed from './ActivityFeed';

export default function LandownerDashboard() {
  const { contract, workers, approveTask } = useStore();

  const baseRent = Math.round(contract.escrowFunded * 0.3);
  const bonusPool = Math.round(contract.escrowFunded * 0.15);
  const totalEarn = baseRent + bonusPool;
  const checkedIn = workers.filter((w) => w.attendance === 'Checked-In').length;
  const paid = workers.filter((w) => w.status === 'Paid').length;

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-earth-700 via-earth-600 to-amber text-white p-6 sm:p-7">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 80% 30%, white 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <UserSquare className="w-5 h-5 text-amber" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-100">Landowner · HR Manager</span>
            </div>
            <h2 className="font-display text-2xl font-bold">Harpreet Singh Farms</h2>
            <p className="text-amber-100 text-sm mt-1">Village Khanna, Ludhiana · Block B, Field 102</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[110px]">
              <p className="text-2xl font-bold">₹{(totalEarn / 100000).toFixed(1)}L</p>
              <p className="text-[11px] text-amber-100 uppercase tracking-wide">Total Earnings</p>
            </div>
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[110px]">
              <p className="text-2xl font-bold">{workers.length}</p>
              <p className="text-[11px] text-amber-100 uppercase tracking-wide">Field Workers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Land Size', value: `${contract.landSize} Acres`, icon: MapPin, color: 'text-forest-700 bg-leaf-50' },
          { label: 'Assigned Crop', value: contract.cropType, icon: Sprout, color: 'text-leaf-600 bg-leaf-50' },
          { label: 'Base Rent Earning', value: `₹${(baseRent / 1000).toFixed(0)}K`, icon: Wallet, color: 'text-amber-700 bg-amber-soft' },
          { label: 'Yield Bonus Pool', value: `₹${(bonusPool / 1000).toFixed(0)}K`, icon: TrendingUp, color: 'text-earth-700 bg-earth-50' },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">{s.label}</p>
            <p className="text-lg font-bold text-forest-800 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Worker management table */}
        <div className="card p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-leaf-50 flex items-center justify-center">
                <UserSquare className="w-5 h-5 text-forest-700" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-forest-800">Worker Management</h3>
                <p className="text-xs text-gray-500">{checkedIn}/{workers.length} checked-in · {paid} paid</p>
              </div>
            </div>
            <div className="flex gap-2">
              <span className="badge bg-leaf-100 text-leaf-700"><CheckCircle2 className="w-3 h-3" /> {checkedIn} Active</span>
              <span className="badge bg-gray-100 text-gray-600"><Clock className="w-3 h-3" /> {workers.length - checkedIn} Pending</span>
            </div>
          </div>

          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="text-[11px] font-bold uppercase tracking-wide text-gray-400 pb-2.5">Worker</th>
                  <th className="text-[11px] font-bold uppercase tracking-wide text-gray-400 pb-2.5">Assigned Task</th>
                  <th className="text-[11px] font-bold uppercase tracking-wide text-gray-400 pb-2.5">Attendance</th>
                  <th className="text-[11px] font-bold uppercase tracking-wide text-gray-400 pb-2.5">Status</th>
                  <th className="text-[11px] font-bold uppercase tracking-wide text-gray-400 pb-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((w) => (
                  <tr key={w.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-full ${w.avatarColor} text-white flex items-center justify-center text-xs font-bold shrink-0`}>
                          {w.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{w.name}</p>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1"><Phone className="w-2.5 h-2.5" />{w.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-3">
                      <span className="text-sm text-gray-600">{w.task}</span>
                    </td>
                    <td className="py-3.5 pr-3">
                      {w.attendance === 'Checked-In' ? (
                        <span className="badge bg-leaf-100 text-leaf-700"><CheckCircle2 className="w-3 h-3" /> Checked-In</span>
                      ) : (
                        <span className="badge bg-amber-soft text-amber-700"><Clock className="w-3 h-3" /> Pending</span>
                      )}
                    </td>
                    <td className="py-3.5 pr-3">
                      {w.status === 'Paid' ? (
                        <span className="badge bg-forest-100 text-forest-700"><BadgeCheck className="w-3 h-3" /> Paid</span>
                      ) : w.status === 'Active' ? (
                        <span className="badge bg-leaf-50 text-leaf-600"><span className="w-1.5 h-1.5 rounded-full bg-leaf-500 animate-pulse" /> Active</span>
                      ) : (
                        <span className="badge bg-gray-100 text-gray-500">Idle</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => approveTask(w.id)}
                        disabled={w.status === 'Paid'}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-forest-700 text-white hover:bg-forest-800 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-all inline-flex items-center gap-1.5"
                      >
                        {w.status === 'Paid' ? <BadgeCheck className="w-3.5 h-3.5" /> : <Satellite className="w-3.5 h-3.5" />}
                        {w.status === 'Paid' ? 'Verified' : 'Approve & Pay'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Verification explainer */}
          <div className="mt-4 rounded-xl bg-leaf-50/60 border border-leaf-100 p-3.5 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-forest-600 flex items-center justify-center shrink-0">
              <Satellite className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-forest-800">AI Satellite + Geo-tag Verification</p>
              <p className="text-xs text-gray-600 mt-0.5">Clicking "Approve & Pay" triggers a milestone verification check via satellite imagery & worker GPS coordinates. On pass, labor cash is instantly released from escrow.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
