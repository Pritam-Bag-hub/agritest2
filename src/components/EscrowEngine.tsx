import { useStore } from '@/store';
import { Cpu, Sliders, Receipt, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function EscrowEngine() {
  const { engine, setEngine, computeSplit, contract } = useStore();
  const split = computeSplit();
  const total = split.vendors + split.wages + split.rent + split.bonus + split.fee;

  const rows = [
    { label: 'Input Vendors (In-kind Vouchers)', pct: 20, val: split.vendors, color: 'bg-leaf-500', text: 'text-leaf-700' },
    { label: 'Worker Wages / Labor Tranches', pct: 25, val: split.wages, color: 'bg-amber', text: 'text-amber-700' },
    { label: 'Landowner Base Rent & HR Stipend', pct: 30, val: split.rent, color: 'bg-forest-600', text: 'text-forest-700' },
    { label: 'Landowner & Worker Quality Bonus', pct: 15, val: split.bonus, color: 'bg-earth-500', text: 'text-earth-700' },
    { label: 'Platform Facilitation Fee', pct: 10, val: split.fee, color: 'bg-gray-400', text: 'text-gray-600' },
  ];

  const riskScore = Math.round(100 - (engine.qualityGrade === 'A' ? 8 : engine.qualityGrade === 'B' ? 18 : 32) - (100 - engine.milestoneCompletion) * 0.2);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest-600 to-leaf-600 flex items-center justify-center">
          <Cpu className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-display font-bold text-base text-forest-800">AI Pricing & Escrow Payout Engine</h3>
          <p className="text-xs text-gray-500">Adjust parameters to simulate live payout splits</p>
        </div>
      </div>

      {/* Sliders */}
      <div className="mt-5 space-y-5">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5"><Sliders className="w-4 h-4 text-forest-600" /> Contract Value</label>
            <span className="text-sm font-bold text-forest-700">₹{engine.contractValue.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range" min={100000} max={1000000} step={50000}
            value={engine.contractValue}
            onChange={(e) => setEngine({ contractValue: +e.target.value })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>₹1,00,000</span><span>₹10,00,000</span></div>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">Crop Quality Grade</label>
          <div className="grid grid-cols-3 gap-2">
            {(['A', 'B', 'C'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setEngine({ qualityGrade: g })}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all border-2 ${
                  engine.qualityGrade === g
                    ? g === 'A' ? 'bg-leaf-50 border-leaf-500 text-leaf-700'
                      : g === 'B' ? 'bg-amber-soft border-amber text-amber-700'
                      : 'bg-earth-50 border-earth-500 text-earth-700'
                    : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                }`}
              >
                Grade {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-gray-700">Milestone Completion</label>
            <span className="text-sm font-bold text-forest-700">{engine.milestoneCompletion}%</span>
          </div>
          <input
            type="range" min={0} max={100} step={5}
            value={engine.milestoneCompletion}
            onChange={(e) => setEngine({ milestoneCompletion: +e.target.value })}
            className="w-full"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>0%</span><span>100%</span></div>
        </div>
      </div>

      {/* Risk indicator */}
      <div className="mt-5 rounded-xl bg-gradient-to-br from-gray-50 to-leaf-50/40 border border-leaf-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wide text-gray-500 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" /> AI Risk Assessment
          </span>
          <span className={`text-sm font-bold ${riskScore > 75 ? 'text-leaf-600' : riskScore > 50 ? 'text-amber-700' : 'text-red-600'}`}>{riskScore}/100</span>
        </div>
        <div className="h-2 bg-white rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${riskScore > 75 ? 'bg-leaf-500' : riskScore > 50 ? 'bg-amber' : 'bg-red-500'}`} style={{ width: `${riskScore}%` }} />
        </div>
        <p className="text-[11px] text-gray-500 mt-1.5">
          {riskScore > 75 ? 'Low risk — payout on schedule.' : riskScore > 50 ? 'Moderate risk — monitor weather & milestones.' : 'Elevated risk — recommend escrow hold review.'}
        </p>
      </div>

      {/* Split */}
      <div className="mt-5 rounded-xl bg-forest-800 p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wide text-leaf-200 flex items-center gap-1.5"><Receipt className="w-3.5 h-3.5" /> Calculated Payout Split</span>
          <span className="text-lg font-bold">₹{total.toLocaleString('en-IN')}</span>
        </div>

        {/* Stacked bar */}
        <div className="flex h-3 rounded-full overflow-hidden mb-4">
          {rows.map((r) => (
            <div key={r.label} className={r.color} style={{ width: `${r.pct}%` }} title={r.label} />
          ))}
        </div>

        <div className="space-y-2">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${r.color} shrink-0`} />
              <span className="text-xs text-leaf-100 flex-1">{r.label}</span>
              <span className="text-xs font-semibold text-white">₹{r.val.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-leaf-200 w-8 text-right">{r.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <ShieldCheck className="w-4 h-4 text-leaf-600" />
        <span>Live-linked to escrow balance: ₹{contract.escrowFunded.toLocaleString('en-IN')} locked in Contract {contract.id}</span>
      </div>
    </div>
  );
}
