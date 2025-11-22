'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type ViewType = 'dashboard' | 'sellers' | 'buyers' | 'contracts' | 'analytics';

export default function GrapheneDashboard() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [sellers, setSellers] = useState<any[]>([]);
  const [buyers, setBuyers] = useState<any[]>([]);
  const [contracts, setContracts] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    activeDeals: 0,
    conversionRate: 0,
    totalRevenue: 0
  });

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data: sellerData } = await supabase.from('leads').select('*').limit(10);
      const { data: buyerData } = await supabase.from('buyers').select('*').limit(10);
      const { data: contractData } = await supabase.from('contracts').select('*').limit(10);
      
      setSellers(sellerData || []);
      setBuyers(buyerData || []);
      setContracts(contractData || []);
      
      // Calculate metrics
      setMetrics({
        totalLeads: sellerData?.length || 0,
        activeDeals: contractData?.filter((c: any) => c.status === 'active').length || 0,
        conversionRate: sellerData?.length ? ((contractData?.length || 0) / sellerData.length * 100) : 0,
        totalRevenue: contractData?.reduce((sum: number, c: any) => sum + (c.amount || 0), 0) || 0
      });
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-100 relative overflow-hidden font-sans">
      {/* Graphene Hexagonal Pattern Background */}
      <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
            <polygon points="28,0 56,16 56,50 28,66 0,50 0,16" fill="none" stroke="#00d9ff" strokeWidth="0.5"/>
            <polygon points="28,66 56,82 56,116 28,132 0,116 0,82" fill="none" stroke="#00d9ff" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      {/* Electric Blue Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex h-screen">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-r border-cyan-500/20 p-6 backdrop-blur-xl flex flex-col">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-wider">
              <span className="text-cyan-400 font-black">GRAPHENE</span>
              <span className="text-gray-400 text-sm block mt-1 font-light">Operations System</span>
            </h1>
          </div>

          <nav className="space-y-2 flex-1">
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
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 group ${
                  currentView === item.id
                    ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400 shadow-lg shadow-cyan-500/20'
                    : 'hover:bg-white/5 text-gray-400 hover:text-cyan-400 border border-transparent'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium tracking-wide">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* System Status */}
          <div className="mt-auto pt-8">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-medium">All Systems Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {currentView === 'dashboard' && <DashboardView metrics={metrics} />}
            {currentView === 'sellers' && <SellersView sellers={sellers} />}
            {currentView === 'buyers' && <BuyersView buyers={buyers} />}
            {currentView === 'contracts' && <ContractsView contracts={contracts} />}
            {currentView === 'analytics' && <AnalyticsView />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Overview Component
function DashboardView({ metrics }: { metrics: any }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Command Center
          </span>
        </h2>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          Real-time Operations
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', value: metrics.totalLeads, icon: '▲', color: 'cyan', bgColor: 'bg-cyan-500' },
          { label: 'Active Deals', value: metrics.activeDeals, icon: '●', color: 'blue', bgColor: 'bg-blue-500' },
          { label: 'Conversion Rate', value: `${metrics.conversionRate.toFixed(1)}%`, icon: '↗', color: 'emerald', bgColor: 'bg-emerald-500' },
          { label: 'Total Revenue', value: `$${(metrics.totalRevenue / 1000).toFixed(0)}K`, icon: '◆', color: 'purple', bgColor: 'bg-purple-500' }
        ].map((metric, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-3xl text-${metric.color}-400`}>{metric.icon}</span>
              <div className={`w-12 h-12 rounded-full ${metric.bgColor}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <div className={`w-6 h-6 rounded-full ${metric.bgColor}/20`} />
              </div>
            </div>
            <div className={`text-3xl font-bold text-${metric.color}-400 mb-2`}>{metric.value}</div>
            <div className="text-gray-500 text-sm uppercase tracking-wider">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Activity Feed */}
      <div className="grid grid-cols-2 gap-6 mt-8">
        <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { time: '2m ago', action: 'New lead scored', score: '87/100', icon: '▲' },
              { time: '15m ago', action: 'Contract signed', value: '$45K', icon: '●' },
              { time: '1h ago', action: 'SMS sent to seller', status: 'Delivered', icon: '◈' },
              { time: '2h ago', action: 'Eleanor analyzed doc', result: 'Approved', icon: '✓' }
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0 hover:bg-cyan-500/5 transition-colors rounded px-2">
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400">{activity.icon}</span>
                  <div>
                    <div className="text-gray-300 text-sm">{activity.action}</div>
                    <div className="text-gray-600 text-xs">{activity.time}</div>
                  </div>
                </div>
                <div className="text-cyan-400 text-sm font-mono">
                  {activity.score || activity.value || activity.status || activity.result}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Agent Status
          </h3>
          <div className="space-y-4">
            {[
              { name: 'Sam', status: 'Processing 3 leads', load: 45, color: 'from-cyan-500 to-blue-500' },
              { name: 'Eleanor', status: 'Analyzing contracts', load: 78, color: 'from-blue-500 to-purple-500' },
              { name: 'Alex (NanoBanana)', status: 'Idle', load: 12, color: 'from-purple-500 to-pink-500' },
              { name: 'Automation Engine', status: 'Running', load: 34, color: 'from-emerald-500 to-cyan-500' }
            ].map((agent, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-300 font-medium">{agent.name}</span>
                  <span className="text-gray-500 text-sm">{agent.status}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${agent.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${agent.load}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sellers View Component
function SellersView({ sellers }: { sellers: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Seller Pipeline
          </span>
        </h2>
        <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all">
          + Add Seller
        </button>
      </div>

      <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-xl">
        <table className="w-full">
          <thead className="bg-cyan-500/10 border-b border-cyan-500/20">
            <tr>
              <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Property</th>
              <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Owner</th>
              <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Score</th>
              <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-cyan-400 font-semibold text-sm uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {sellers.length > 0 ? sellers.map((seller, idx) => (
              <tr key={idx} className="hover:bg-cyan-500/5 transition-colors">
                <td className="px-6 py-4 text-gray-300">{seller.property_address || 'N/A'}</td>
                <td className="px-6 py-4 text-gray-400">{seller.owner_name || 'Unknown'}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-mono">
                    {seller.score || 0}/100
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    seller.status === 'contacted' ? 'bg-blue-500/20 text-blue-400' : 
                    seller.status === 'qualified' ? 'bg-emerald-500/20 text-emerald-400' :
                    'bg-gray-500/20 text-gray-400'
                  }`}>
                    {seller.status || 'new'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View →</button>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No sellers found. Connect your data source.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Buyers View Component
function BuyersView({ buyers }: { buyers: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Active Buyers
          </span>
        </h2>
        <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all">
          + Add Buyer
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {buyers.length > 0 ? buyers.map((buyer, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 backdrop-blur-xl group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-xl group-hover:scale-110 transition-transform">
                {(buyer.name || 'U')[0].toUpperCase()}
              </div>
              <span className="text-emerald-400 text-xs font-semibold px-2 py-1 bg-emerald-500/10 rounded-full">ACTIVE</span>
            </div>
            <h3 className="text-lg font-bold text-gray-200 mb-2">{buyer.name || 'Unknown Buyer'}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Budget:</span>
                <span className="text-cyan-400 font-mono">${buyer.budget || 0}K</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Deals:</span>
                <span className="text-gray-300">{buyer.deals_count || 0}</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-3 text-center py-12 text-gray-500 bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl backdrop-blur-xl">
            No active buyers. Start building your buyer list.
          </div>
        )}
      </div>
    </div>
  );
}

// Contracts View Component
function ContractsView({ contracts }: { contracts: any[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Contract Pipeline
          </span>
        </h2>
        <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-all">
          + New Contract
        </button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {['Draft', 'Sent', 'Signed', 'Closed'].map((stage) => (
          <div key={stage} className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-4 backdrop-blur-xl">
            <h3 className="text-cyan-400 font-bold mb-4 uppercase text-sm tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-full" />
              {stage}
            </h3>
            <div className="space-y-3">
              {contracts.filter((c: any) => c.status?.toLowerCase() === stage.toLowerCase()).map((contract, idx) => (
                <div key={idx} className="bg-[#0f0f0f] border border-gray-800 rounded-lg p-3 hover:border-cyan-500/30 transition-colors cursor-pointer group">
                  <div className="text-gray-300 font-medium text-sm mb-1 group-hover:text-cyan-400 transition-colors">{contract.property_address || 'Property'}</div>
                  <div className="text-cyan-400 font-mono text-xs">${contract.amount || 0}</div>
                </div>
              ))}
              {contracts.filter((c: any) => c.status?.toLowerCase() === stage.toLowerCase()).length === 0 && (
                <div className="text-gray-600 text-xs text-center py-4">No contracts</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Analytics View Component
function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-4xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Performance Analytics
          </span>
        </h2>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-lg text-cyan-400 text-sm">7D</button>
          <button className="px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-white/10">30D</button>
          <button className="px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-gray-400 text-sm hover:bg-white/10">90D</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Lead Conversion Funnel
          </h3>
          <div className="space-y-4">
            {[
              { stage: 'Total Leads', count: 150, percentage: 100, color: 'cyan' },
              { stage: 'Contacted', count: 120, percentage: 80, color: 'blue' },
              { stage: 'Qualified', count: 75, percentage: 50, color: 'purple' },
              { stage: 'Under Contract', count: 30, percentage: 20, color: 'pink' },
              { stage: 'Closed', count: 15, percentage: 10, color: 'emerald' }
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300 text-sm">{item.stage}</span>
                  <span className={`text-${item.color}-400 font-mono text-sm`}>{item.count}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-3">
                  <div
                    className={`bg-gradient-to-r from-${item.color}-500 to-${item.color}-400 h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a1a]/50 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-xl">
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">💰</span>
            Monthly Performance
          </h3>
          <div className="space-y-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
              const revenue = Math.floor(Math.random() * 50 + 20);
              const percentage = (revenue / 70) * 100;
              return (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-gray-500 w-12 text-sm">{month}</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-8">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-8 rounded-full flex items-center justify-end pr-3 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    >
                      <span className="text-white text-xs font-bold">${revenue}K</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}