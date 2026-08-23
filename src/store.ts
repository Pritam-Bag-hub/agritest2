import { create } from 'zustand';

export type Role = 'buyer' | 'landowner' | 'worker' | 'admin';

export interface Worker {
  id: string;
  name: string;
  avatarColor: string;
  initials: string;
  task: string;
  attendance: 'Checked-In' | 'Pending';
  status: 'Active' | 'Paid' | 'Idle';
  phone: string;
  bonusEarned: number;
}

export interface Contract {
  id: string;
  buyer: string;
  cropType: string;
  landSize: number;
  targetQty: number;
  guaranteedPrice: number;
  escrowFunded: number;
  growthStage: number;
  healthScore: number;
  expectedDelivery: string;
}

export interface ActivityLog {
  id: string;
  time: string;
  text: string;
  type: 'escrow' | 'worker' | 'yield' | 'ai' | 'system';
}

interface EngineParams {
  contractValue: number;
  qualityGrade: 'A' | 'B' | 'C';
  milestoneCompletion: number;
}

interface SplitResult {
  vendors: number;
  wages: number;
  rent: number;
  bonus: number;
  fee: number;
}

interface StoreState {
  role: Role;
  setRole: (role: Role) => void;

  contract: Contract;
  fundEscrow: (amount: number) => void;
  updateContract: (patch: Partial<Contract>) => void;

  workers: Worker[];
  approveTask: (workerId: string) => void;

  engine: EngineParams;
  setEngine: (patch: Partial<EngineParams>) => void;
  computeSplit: () => SplitResult;

  activity: ActivityLog[];
  addActivity: (text: string, type: ActivityLog['type']) => void;

  workerGps: { checkedIn: boolean; coords: string };
  simulateGpsCheckIn: () => void;
}

const initialContract: Contract = {
  id: 'CT-2026-PUN-014',
  buyer: 'ITC Agri Business Division',
  cropType: 'Potato',
  landSize: 10,
  targetQty: 450,
  guaranteedPrice: 1400,
  escrowFunded: 600000,
  growthStage: 62,
  healthScore: 94,
  expectedDelivery: '14 Feb 2026',
};

const initialWorkers: Worker[] = [
  { id: 'w1', name: 'Ramesh Patel', avatarColor: 'bg-forest-600', initials: 'RP', task: 'Soil Preparation & Tilling', attendance: 'Checked-In', status: 'Active', phone: '+91 98240 11201', bonusEarned: 1200 },
  { id: 'w2', name: 'Sunita Devi', avatarColor: 'bg-leaf-600', initials: 'SD', task: 'Seed Sowing & Spacing', attendance: 'Checked-In', status: 'Active', phone: '+91 98240 11202', bonusEarned: 800 },
  { id: 'w3', name: 'Arjun Singh', avatarColor: 'bg-earth-600', initials: 'AS', task: 'Irrigation & Watering', attendance: 'Pending', status: 'Idle', phone: '+91 98240 11203', bonusEarned: 0 },
  { id: 'w4', name: 'Lakshmi Bai', avatarColor: 'bg-amber', initials: 'LB', task: 'Weeding & Pest Control', attendance: 'Checked-In', status: 'Active', phone: '+91 98240 11204', bonusEarned: 1500 },
  { id: 'w5', name: 'Deepak Kumar', avatarColor: 'bg-forest-700', initials: 'DK', task: 'Fertilizer Application', attendance: 'Pending', status: 'Idle', phone: '+91 98240 11205', bonusEarned: 0 },
];

const initialActivity: ActivityLog[] = [
  { id: 'a1', time: '09:42', text: 'ITC Agri funded escrow ₹6,00,000 for Contract CT-2026-PUN-014', type: 'escrow' },
  { id: 'a2', time: '10:05', text: 'AI Engine flagged soil moisture optimal in Block B, Field 102', type: 'ai' },
  { id: 'a3', time: '11:20', text: 'Ramesh Patel & Sunita Devi checked-in at Field 102', type: 'worker' },
  { id: 'a4', time: '13:15', text: 'Crop Growth Stage reached 62% — Phase 2 (Crop Growth)', type: 'yield' },
];

let activityId = 100;
const nowTime = () => new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

export const useStore = create<StoreState>((set, get) => ({
  role: 'buyer',
  setRole: (role) => set({ role }),

  contract: initialContract,
  fundEscrow: (amount) =>
    set((state) => ({
      contract: { ...state.contract, escrowFunded: state.contract.escrowFunded + amount },
      activity: [
        { id: `a${activityId++}`, time: nowTime(), text: `Escrow funded with ₹${amount.toLocaleString('en-IN')} — total locked ₹${(state.contract.escrowFunded + amount).toLocaleString('en-IN')}`, type: 'escrow' },
        ...state.activity,
      ],
    })),
  updateContract: (patch) => set((state) => ({ contract: { ...state.contract, ...patch } })),

  workers: initialWorkers,
  approveTask: (workerId) =>
    set((state) => {
      const worker = state.workers.find((w) => w.id === workerId);
      if (!worker || worker.status === 'Paid') return state;
      return {
        workers: state.workers.map((w) =>
          w.id === workerId ? { ...w, status: 'Paid', attendance: 'Checked-In', bonusEarned: w.bonusEarned + 500 } : w
        ),
        activity: [
          { id: `a${activityId++}`, time: nowTime(), text: `AI Geo-tag verified — ${worker.name}'s task approved. Labor cash released.`, type: 'worker' },
          ...state.activity,
        ],
      };
    }),

  engine: { contractValue: 600000, qualityGrade: 'A', milestoneCompletion: 62 },
  setEngine: (patch) => set((state) => ({ engine: { ...state.engine, ...patch } })),
  computeSplit: () => {
    const { contractValue, qualityGrade, milestoneCompletion } = get().engine;
    const gradeMultiplier = qualityGrade === 'A' ? 1.0 : qualityGrade === 'B' ? 0.92 : 0.82;
    const milestoneFactor = milestoneCompletion / 100;
    const effective = contractValue * gradeMultiplier * milestoneFactor;
    return {
      vendors: Math.round(effective * 0.2),
      wages: Math.round(effective * 0.25),
      rent: Math.round(effective * 0.3),
      bonus: Math.round(effective * 0.15),
      fee: Math.round(effective * 0.1),
    };
  },

  activity: initialActivity,
  addActivity: (text, type) =>
    set((state) => ({ activity: [{ id: `a${activityId++}`, time: nowTime(), text, type }, ...state.activity].slice(0, 40) })),

  workerGps: { checkedIn: false, coords: '' },
  simulateGpsCheckIn: () => {
    const state = get();
    if (state.workerGps.checkedIn) return;
    const lat = (28.6 + Math.random() * 0.05).toFixed(4);
    const lng = (77.2 + Math.random() * 0.05).toFixed(4);
    set({
      workerGps: { checkedIn: true, coords: `${lat}° N, ${lng}° E` },
      activity: [
        { id: `a${activityId++}`, time: nowTime(), text: `Field Worker GPS Check-In confirmed at Block B, Field 102 (${lat}°N, ${lng}°E)`, type: 'worker' },
        ...state.activity,
      ],
    });
  },
}));
