import { useStore } from '@/store';
import { Smartphone, MapPin, Navigation, Wallet, Clock, CheckCircle2, Sprout, Bell, Battery, Wifi, Signal, BadgeCheck, Coins } from 'lucide-react';
import ActivityFeed from './ActivityFeed';

export default function WorkerDashboard() {
  const { workers, workerGps, simulateGpsCheckIn, contract } = useStore();
  const me = workers[0];
  const baseRetainer = 8000;
  const totalBonus = workers.reduce((sum, w) => sum + w.bonusEarned, 0);
  const myBonus = me.bonusEarned;
  const monthlyTotal = baseRetainer + myBonus;

  const tasks = [
    { name: 'Soil Preparation & Tilling', done: true },
    { name: 'Seed Sowing & Spacing', done: true },
    { name: 'Irrigation & Watering', done: workerGps.checkedIn },
    { name: 'Weeding & Pest Control', done: false },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-leaf-600 via-leaf-500 to-forest-600 text-white p-6 sm:p-7">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 30% 70%, white 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Smartphone className="w-5 h-5 text-amber" />
              <span className="text-xs font-semibold uppercase tracking-wider text-leaf-100">Field Worker App</span>
            </div>
            <h2 className="font-display text-2xl font-bold">{me.name}</h2>
            <p className="text-leaf-100 text-sm mt-1 flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Block B, Field 102 · Khanna, Ludhiana</p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/15 backdrop-blur rounded-xl px-4 py-3 text-center min-w-[110px]">
              <p className="text-2xl font-bold">₹{monthlyTotal.toLocaleString('en-IN')}</p>
              <p className="text-[11px] text-leaf-100 uppercase tracking-wide">Monthly Earnings</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Phone mockup */}
        <div className="lg:col-span-1 flex justify-center">
          <div className="w-full max-w-[320px]">
            {/* Phone frame */}
            <div className="relative bg-gray-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-forest-900/20">
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-gray-900 rounded-b-2xl z-10" />
              <div className="bg-gradient-to-b from-leaf-50 to-white rounded-[2rem] overflow-hidden h-[560px] flex flex-col">
                {/* Status bar */}
                <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-gray-700">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <Signal className="w-3 h-3" />
                    <Wifi className="w-3 h-3" />
                    <Battery className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* App content */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forest-600 to-leaf-600 flex items-center justify-center">
                      <Sprout className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-forest-800">AgriContract AI</p>
                      <p className="text-[9px] text-gray-400">Field Worker</p>
                    </div>
                    <div className="ml-auto relative">
                      <Bell className="w-4 h-4 text-gray-500" />
                      <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber" />
                    </div>
                  </div>

                  {/* Job alert */}
                  <div className="rounded-xl bg-forest-700 p-3 text-white">
                    <p className="text-[9px] uppercase tracking-wide text-leaf-200 font-semibold">Job Alert</p>
                    <p className="text-sm font-bold mt-0.5">{me.task}</p>
                    <p className="text-[10px] text-leaf-100 mt-1 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> Block B, Field 102</p>
                  </div>

                  {/* GPS card */}
                  <div className="rounded-xl border border-gray-200 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-2">Location & Check-In</p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${workerGps.checkedIn ? 'bg-leaf-100' : 'bg-gray-100'}`}>
                        <Navigation className={`w-4 h-4 ${workerGps.checkedIn ? 'text-leaf-600' : 'text-gray-400'}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        {workerGps.checkedIn ? (
                          <>
                            <p className="text-[11px] font-semibold text-leaf-700">Checked-In</p>
                            <p className="text-[9px] text-gray-500 font-mono">{workerGps.coords}</p>
                          </>
                        ) : (
                          <p className="text-[11px] text-gray-400">Awaiting GPS check-in…</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={simulateGpsCheckIn}
                      disabled={workerGps.checkedIn}
                      className="w-full py-2 rounded-lg text-[11px] font-bold bg-forest-600 text-white disabled:bg-leaf-300 transition-all flex items-center justify-center gap-1.5"
                    >
                      {workerGps.checkedIn ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Navigation className="w-3.5 h-3.5" />}
                      {workerGps.checkedIn ? 'Attendance Logged' : 'Simulate GPS Check-In'}
                    </button>
                  </div>

                  {/* Earnings widget */}
                  <div className="rounded-xl border border-gray-200 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-2">Monthly Earnings</p>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500">Base Retainer</span>
                        <span className="font-semibold text-gray-700">₹{baseRetainer.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                        <span className="text-gray-500">Milestone Bonuses</span>
                        <span className="font-semibold text-leaf-600">+₹{myBonus.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="border-t border-gray-100 pt-1.5 flex justify-between">
                        <span className="text-[11px] font-bold text-gray-700">Total This Month</span>
                        <span className="text-sm font-bold text-forest-700">₹{monthlyTotal.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Task list */}
                  <div className="rounded-xl border border-gray-200 p-3">
                    <p className="text-[10px] uppercase tracking-wide text-gray-500 font-semibold mb-2">Field Tasks</p>
                    <div className="space-y-1.5">
                      {tasks.map((t) => (
                        <div key={t.name} className="flex items-center gap-2">
                          {t.done ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-leaf-600 shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-200 shrink-0" />
                          )}
                          <span className={`text-[11px] ${t.done ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'}`}>{t.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400 mt-3 font-medium">Simulated Smartphone Interface</p>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-leaf-50 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-forest-700" />
                </div>
                <h3 className="font-display font-bold text-base text-forest-800">Earnings Breakdown</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600">Base Retainer</span>
                  </div>
                  <span className="font-bold text-gray-800">₹{baseRetainer.toLocaleString('en-IN')}<span className="text-xs text-gray-400">/mo</span></span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-leaf-50">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-leaf-600" />
                    <span className="text-sm font-medium text-forest-700">Milestone Bonuses</span>
                  </div>
                  <span className="font-bold text-forest-700">+₹{myBonus.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-forest-700 text-white">
                  <span className="text-sm font-semibold">Total Monthly Payout</span>
                  <span className="font-bold text-lg">₹{monthlyTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg bg-amber-soft flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-700" />
                </div>
                <h3 className="font-display font-bold text-base text-forest-800">Attendance Status</h3>
              </div>
              <div className="text-center py-3">
                {workerGps.checkedIn ? (
                  <>
                    <div className="w-14 h-14 rounded-full bg-leaf-100 flex items-center justify-center mx-auto mb-2">
                      <CheckCircle2 className="w-7 h-7 text-leaf-600" />
                    </div>
                    <p className="text-sm font-bold text-leaf-700">Present Today</p>
                    <p className="text-xs text-gray-500 mt-0.5">Checked in at {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                    <p className="text-[11px] text-gray-400 font-mono mt-1">{workerGps.coords}</p>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-amber-soft flex items-center justify-center mx-auto mb-2">
                      <Clock className="w-7 h-7 text-amber-600" />
                    </div>
                    <p className="text-sm font-bold text-amber-700">Not Checked-In</p>
                    <p className="text-xs text-gray-500 mt-0.5">Tap GPS Check-In on your phone</p>
                  </>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-xs text-gray-500">Crop</p>
                  <p className="text-sm font-bold text-forest-700">{contract.cropType}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-2 text-center">
                  <p className="text-xs text-gray-500">Field</p>
                  <p className="text-sm font-bold text-forest-700">B-102</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team bonus summary */}
          <div className="card p-5">
            <h3 className="font-display font-bold text-base text-forest-800 mb-4">Team Bonus Pool (All Workers)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {workers.map((w) => (
                <div key={w.id} className="text-center p-3 rounded-xl border border-gray-100">
                  <div className={`w-10 h-10 rounded-full ${w.avatarColor} text-white flex items-center justify-center text-xs font-bold mx-auto mb-1.5`}>
                    {w.initials}
                  </div>
                  <p className="text-[11px] font-semibold text-gray-700 truncate">{w.name.split(' ')[0]}</p>
                  <p className="text-sm font-bold text-leaf-600">₹{w.bonusEarned}</p>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between p-3 rounded-xl bg-leaf-50">
              <span className="text-sm font-semibold text-forest-700">Total Team Bonus Disbursed</span>
              <span className="font-bold text-forest-800">₹{totalBonus.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
