import { useStore } from '@/store';
import { Lock, Sparkles, Users, TrendingUp, Cpu } from 'lucide-react';

export default function ActivityFeed() {
  const activity = useStore((s) => s.activity);
  const icons = {
    escrow: { icon: Lock, color: 'text-forest-600 bg-leaf-50' },
    worker: { icon: Users, color: 'text-amber-700 bg-amber-soft' },
    yield: { icon: TrendingUp, color: 'text-leaf-600 bg-leaf-50' },
    ai: { icon: Cpu, color: 'text-earth-700 bg-earth-50' },
    system: { icon: Sparkles, color: 'text-forest-600 bg-leaf-50' },
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-base text-forest-800">Live Activity Stream</h3>
        <span className="badge bg-leaf-100 text-leaf-700">
          <span className="w-1.5 h-1.5 rounded-full bg-leaf-500 animate-pulse" />
          Real-time
        </span>
      </div>
      <div className="space-y-1 max-h-[420px] overflow-y-auto -mr-2 pr-2">
        {activity.map((a) => {
          const { icon: Icon, color } = icons[a.type];
          return (
            <div key={a.id} className="flex items-start gap-3 py-2.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-snug">{a.text}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{a.time} IST</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
