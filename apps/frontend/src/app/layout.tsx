'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ViewType = 'dashboard' | 'sellers' | 'buyers' | 'contracts' | 'analytics';

export default function MaxSamDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sellers, setSellers] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: sellerData } = await supabase.from('leads').select('*').limit(10);
      const { data: buyerData } = await supabase.from('buyers').select('*').limit(10);
      const { data: contractData } = await supabase.from('contracts').select('*').limit(10);
      
      setSellers(sellerData || []);
      setBuyers(buyerData || []);
      setContracts(contractData || []);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-r border-cyan-500/20 p-6 flex flex-col">
        <div className="mb-8">
          <div className="text-2xl font-bold text-cyan-400">MaxSam V4</div>
          <div className="text-gray-400 text-sm">Operations Platform</div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '◆' },
            { id: 'sellers', label: 'Sellers', icon: '◇' },
            { id: 'buyers', label: 'Buyers', icon: '◈' },
            { id: 'contracts', label: 'Contracts', icon: '◉' },
            { id: 'analytics', label: 'Analytics', icon: '◊' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as ViewType)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                currentView === item.id
                  ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-cyan-400 border border-transparent'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-emerald-400 text-sm">All Systems Online</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {currentView === 'dashboard' && <DashboardView sellers={sellers} />}
        {currentView === 'sellers' && <SellersView sellers={sellers} />}
        {currentView === 'buyers' && <BuyersView buyers={buyers} />}
        {currentView === 'contracts' && <ContractsView contracts={contracts} />}
        {currentView === 'analytics' && <AnalyticsView />}
      </div>
    </div>
  );
}

function DashboardView({ sellers }: { sellers: any[] }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Command Center
        </h2>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Real-time Operations
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Leads', value: sellers.length, icon: '▲', color: 'cyan' },
          { label: 'Active Deals', value: Math.floor(sellers.length * 0.3), icon: '●', color: 'blue' },
          { label: 'Conversion', value: '8.5%', icon: '↗', color: 'emerald' },
          { label: 'Revenue', value: '$142K', icon: '◆', color: 'purple' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all">
            <div className={`text-3xl text-${metric.color}-400 mb-3`}>{metric.icon}</div>
            <div className={`text-3xl font-bold text-${metric.color}-400 mb-2`}>{metric.value}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wider">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">Recent Activity</h3>
          {[
            { time: '2m ago', action: 'New lead scored', value: '87/100' },
            { time: '15m ago', action: 'Contract signed', value: '$45K' },
            { time: '1h ago', action: 'SMS sent', value: 'Delivered' }
          ].map((activity, idx) => (
            <div key={idx} className="flex justify-between py-3 border-b border-gray-800 last:border-0">
              <div>
                <div className="text-gray-300 text-sm">{activity.action}</div>
                <div className="text-gray-600 text-xs">{activity.time}</div>
              </div>
              <div className="text-cyan-400 text-sm font-mono">{activity.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">AI Agents</h3>
          {[
            { name: 'Sam', status: 'Processing leads', load: 45 },
            { name: 'Eleanor', status: 'Analyzing docs', load: 78 }
          ].map((agent, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">{agent.name}</span>
                <span className="text-gray-500 text-sm">{agent.status}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all" style={{ width: `${agent.load}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SellersView({ sellers }: { sellers: any[] }) {
  return (
    <div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Seller Pipeline
      </h2>
      
      <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6">
        <div className="text-gray-300 text-center">
          {sellers.length > 0 ? `${sellers.length} sellers in pipeline` : 'No sellers found. Connect your data source.'}
        </div>
      </div>
    </div>
  );
}

function BuyersView({ buyers }: { buyers: any[] }) {
  return (
    <div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Active Buyers
      </h2>
      
      <div className="p-6 text-gray-300 text-center">
        {buyers.length > 0 ? `${buyers.length} active buyers` : 'No active buyers.'}
      </div>
    </div>
  );
}

function ContractsView({ contracts }: { contracts: any[] }) {
  return (
    <div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Contract Pipeline
      </h2>
      
      <div className="p-6 text-gray-300 text-center">
        {contracts.length > 0 ? `${contracts.length} contracts` : 'No contracts.'}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
        Performance Analytics
      </h2>
      
      <div className="p-6 text-gray-300">Analytics dashboard coming soon...</div>
    </div>
  );
}