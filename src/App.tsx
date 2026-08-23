import { useStore } from '@/store';
import Header from '@/components/Header';
import BuyerDashboard from '@/components/BuyerDashboard';
import LandownerDashboard from '@/components/LandownerDashboard';
import WorkerDashboard from '@/components/WorkerDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import { Sprout, Github, Lock } from 'lucide-react';

function App() {
  const role = useStore((s) => s.role);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {role === 'buyer' && <BuyerDashboard />}
        {role === 'landowner' && <LandownerDashboard />}
        {role === 'worker' && <WorkerDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </main>
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-forest-600 to-leaf-600 flex items-center justify-center">
              <Sprout className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-semibold text-forest-800">AgriContract AI</span>
            <span className="text-xs text-gray-400">· Smart India Hackathon MVP</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Escrow-secured</span>
            <span className="flex items-center gap-1"><Github className="w-3 h-3" /> AI-Driven Contract Farming</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
