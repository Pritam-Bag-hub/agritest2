import { Sprout, ChevronDown, Lock, CalendarClock, Building2, UserSquare, Smartphone, ShieldCheck } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore, type Role } from '@/store';

const roles: { key: Role; label: string; icon: typeof Building2; desc: string }[] = [
  { key: 'buyer', label: 'Corporate Buyer', icon: Building2, desc: 'Fund contracts & monitor yield' },
  { key: 'landowner', label: 'Landowner (HR)', icon: UserSquare, desc: 'Manage land & field workers' },
  { key: 'worker', label: 'Field Worker', icon: Smartphone, desc: 'Check-in & complete tasks' },
  { key: 'admin', label: 'Platform Admin', icon: ShieldCheck, desc: 'AI engine & escrow oversight' },
];

export default function Header() {
  const { role, setRole, contract } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = roles.find((r) => r.key === role)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forest-600 to-leaf-600 flex items-center justify-center shadow-md shadow-forest-600/20">
                <Sprout className="w-5.5 h-5.5 text-white" strokeWidth={2.5} />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-amber border-2 border-white" />
            </div>
            <div className="hidden sm:block leading-tight">
              <h1 className="font-display font-bold text-lg text-forest-800">AgriContract AI</h1>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Smart Contract Farming</p>
            </div>
          </div>

          {/* Live status — hidden on mobile */}
          <div className="hidden md:flex items-center gap-3 flex-1 justify-center max-w-md">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-leaf-50 border border-leaf-200">
              <Lock className="w-3.5 h-3.5 text-forest-600" />
              <span className="text-xs font-semibold text-forest-700">Escrow Active</span>
              <span className="text-xs font-bold text-forest-800">₹{contract.escrowFunded.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-soft border border-amber-200/70">
              <CalendarClock className="w-3.5 h-3.5 text-amber-700" />
              <span className="text-xs font-semibold text-amber-800">Phase 2 · Crop Growth</span>
            </div>
          </div>

          {/* Role switcher */}
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2.5 pl-2.5 pr-3 py-2 rounded-xl border border-gray-200 bg-white hover:border-forest-300 hover:bg-leaf-50/50 transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-forest-100 flex items-center justify-center">
                <active.icon className="w-4 h-4 text-forest-700" />
              </div>
              <span className="text-sm font-semibold text-gray-700 hidden sm:block">{active.label}</span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-72 card shadow-xl p-2 animate-fade-in origin-top-right">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">Switch Role</p>
                {roles.map((r) => (
                  <button
                    key={r.key}
                    onClick={() => { setRole(r.key); setOpen(false); }}
                    className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${
                      role === r.key ? 'bg-leaf-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      role === r.key ? 'bg-forest-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <r.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${role === r.key ? 'text-forest-800' : 'text-gray-700'}`}>{r.label}</p>
                      <p className="text-xs text-gray-500">{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile live status */}
        <div className="md:hidden flex items-center gap-2 pb-3 -mt-1">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-leaf-50 border border-leaf-200 flex-1 justify-center">
            <Lock className="w-3 h-3 text-forest-600" />
            <span className="text-[11px] font-semibold text-forest-700">₹{contract.escrowFunded.toLocaleString('en-IN')} Locked</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-soft border border-amber-200/70 flex-1 justify-center">
            <CalendarClock className="w-3 h-3 text-amber-700" />
            <span className="text-[11px] font-semibold text-amber-800">Phase 2 · Growth</span>
          </div>
        </div>
      </div>
    </header>
  );
}
