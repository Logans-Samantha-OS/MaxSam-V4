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
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    activeDeals: 0,
    conversionRate: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: sellerData } = await supabase.from('leads').select('*').limit(10);
      const { data: buyerData } = await supabase.from('buyers').select('*').limit(10);
      const { data: contractData } = await supabase.from('contracts').select('*').limit(10);
      
      setSellers(sellerData || []);
      setBuyers(buyerData || []);
      setContracts(contractData || []);
      
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
    <>
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        
        .container { min-height: 100vh; background: #0a0a0a; color: #f3f4f6; position: relative; overflow: hidden; }
        .hex-bg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.05; }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(80px); animation: pulse 2s ease-in-out infinite; }
        .glow-orb-1 { top: 0; right: 25%; width: 400px; height: 400px; background: rgba(0, 217, 255, 0.1); }
        .glow-orb-2 { bottom: 0; left: 25%; width: 400px; height: 400px; background: rgba(0, 128, 255, 0.1); animation-delay: 1s; }
        
        .main-container { position: relative; z-index: 10; display: flex; height: 100vh; }
        .sidebar { width: 256px; background: linear-gradient(to bottom, #1a1a1a, #0f0f0f); border-right: 1px solid rgba(0, 217, 255, 0.2); padding: 24px; display: flex; flex-direction: column; backdrop-filter: blur(16px); }
        .logo { font-size: 24px; font-weight: bold; letter-spacing: 0.05em; color: #00d9ff; margin-bottom: 4px; }
        .subtitle { color: #9ca3af; font-size: 14px; margin-bottom: 32px; }
        
        .nav-btn { width: 100%; text-align: left; padding: 12px 16px; border-radius: 8px; margin-bottom: 8px; border: 1px solid transparent; background: transparent; color: #9ca3af; cursor: pointer; display: flex; align-items: center; gap: 12px; font-size: 16px; transition: all 0.3s; }
        .nav-btn:hover { background: rgba(255, 255, 255, 0.05); color: #00d9ff; }
        .nav-btn.active { border: 1px solid rgba(0, 217, 255, 0.5); background: rgba(0, 217, 255, 0.2); color: #00d9ff; box-shadow: 0 0 20px rgba(0, 217, 255, 0.2); }
        .nav-icon { font-size: 20px; }
        
        .status-box { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 12px; margin-top: auto; }
        .status-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
        
        .content { flex: 1; overflow-y: auto; padding: 32px; }
        .page-title { font-size: 36px; font-weight: bold; background: linear-gradient(to right, #00d9ff, #0080ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 24px; }
        
        .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin-bottom: 32px; }
        .metric-card { background: linear-gradient(135deg, #1a1a1a, #0f0f0f); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 12px; padding: 24px; backdrop-filter: blur(16px); transition: all 0.3s; }
        .metric-card:hover { border-color: rgba(0, 217, 255, 0.4); }
        .metric-icon { font-size: 32px; margin-bottom: 12px; }
        .metric-value { font-size: 32px; font-weight: bold; margin-bottom: 8px; }
        .metric-label { font-size: 12px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.1em; }
        
        .two-col-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        .card { background: rgba(26, 26, 26, 0.5); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 12px; padding: 24px; backdrop-filter: blur(16px); }
        .card-title { font-size: 20px; font-weight: bold; color: #00d9ff; margin-bottom: 16px; }
        
        .activity-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #374151; }
        .activity-item:last-child { border-bottom: none; }
        
        .progress-bar { width: 100%; height: 8px; background: #374151; border-radius: 4px; overflow: hidden; margin-top: 8px; }
        .progress-fill { height: 100%; background: linear-gradient(to right, #00d9ff, #0080ff); transition: width 0.5s; }
        
        table { width: 100%; border-collapse: collapse; }
        thead { background: rgba(0, 217, 255, 0.1); border-bottom: 1px solid rgba(0, 217, 255, 0.2); }
        th { padding: 16px 24px; text-align: left; color: #00d9ff; font-size: 12px; text-transform: uppercase; }
        td { padding: 16px 24px; color: #d1d5db; border-bottom: 1px solid #374151; }
        tr:hover { background: rgba(0, 217, 255, 0.05); }
        
        .badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
        .badge-cyan { background: rgba(0, 217, 255, 0.2); color: #00d9ff; }
        .badge-green { background: rgba(16, 185, 129, 0.2); color: #10b981; }
        .badge-gray { background: rgba(107, 114, 128, 0.2); color: #9ca3af; }
        
        .buyer-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .buyer-card { background: linear-gradient(135deg, #1a1a1a, #0f0f0f); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 12px; padding: 24px; }
        .buyer-avatar { width: 48px; height: 48px; background: rgba(0, 217, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #00d9ff; font-size: 24px; font-weight: bold; margin-bottom: 16px; }
        
        .contract-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
        .contract-stage { background: rgba(26, 26, 26, 0.5); border: 1px solid rgba(0, 217, 255, 0.2); border-radius: 12px; padding: 16px; }
        .stage-title { color: #00d9ff; font-weight: bold; margin-bottom: 16px; text-transform: uppercase; font-size: 14px; }
        .contract-item { background: #0f0f0f; border: 1px solid #374151; border-radius: 8px; padding: 12px; margin-bottom: 12px; cursor: pointer; transition: border 0.3s; }
        .contract-item:hover { border-color: rgba(0, 217, 255, 0.3); }
      `}</style>
      
      <div className="container">
        <svg className="hex-bg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
              <polygon points="28,0 56,16 56,50 28,66 0,50 0,16" fill="none" stroke="#00d9ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
        
        <div className="glow-orb glow-orb-1" />
        <div className="glow-orb glow-orb-2" />
        
        <div className="main-container">
          <div className="sidebar">
            <div>
              <div className="logo">MaxSam V4</div>
              <div className="subtitle">Operations Platform</div>
            </div>
            
            <nav style={{ flex: 1 }}>
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
                  className={`nav-btn ${currentView === item.id ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            
            <div className="status-box" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="status-dot" />
              <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 500 }}>All Systems Online</span>
            </div>
          </div>
          
          <div className="content">
            {currentView === 'dashboard' && <DashboardView metrics={metrics} />}
            {currentView === 'sellers' && <SellersView sellers={sellers} />}
            {currentView === 'buyers' && <BuyersView buyers={buyers} />}
            {currentView === 'contracts' && <ContractsView contracts={contracts} />}
            {currentView === 'analytics' && <AnalyticsView />}
          </div>
        </div>
      </div>
    </>
  );
}

function DashboardView({ metrics }: { metrics: any }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 className="page-title">Command Center</h2>
        <div style={{ fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="status-dot" />
          Real-time Operations
        </div>
      </div>

      <div className="metrics-grid">
        {[
          { label: 'Total Leads', value: metrics.totalLeads, icon: '▲', color: '#00d9ff' },
          { label: 'Active Deals', value: metrics.activeDeals, icon: '●', color: '#0080ff' },
          { label: 'Conversion', value: `${metrics.conversionRate.toFixed(1)}%`, icon: '↗', color: '#10b981' },
          { label: 'Revenue', value: `$${(metrics.totalRevenue / 1000).toFixed(0)}K`, icon: '◆', color: '#a855f7' }
        ].map((metric, idx) => (
          <div key={idx} className="metric-card">
            <div className="metric-icon" style={{ color: metric.color }}>{metric.icon}</div>
            <div className="metric-value" style={{ color: metric.color }}>{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="two-col-grid">
        <div className="card">
          <h3 className="card-title">Recent Activity</h3>
          {[
            { time: '2m ago', action: 'New lead scored', value: '87/100' },
            { time: '15m ago', action: 'Contract signed', value: '$45K' },
            { time: '1h ago', action: 'SMS sent', value: 'Delivered' }
          ].map((activity, idx) => (
            <div key={idx} className="activity-item">
              <div>
                <div style={{ color: '#d1d5db', fontSize: '14px' }}>{activity.action}</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>{activity.time}</div>
              </div>
              <div style={{ color: '#00d9ff', fontSize: '14px', fontFamily: 'monospace' }}>{activity.value}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title">AI Agents</h3>
          {[
            { name: 'Sam', status: 'Processing leads', load: 45 },
            { name: 'Eleanor', status: 'Analyzing docs', load: 78 },
            { name: 'Alex', status: 'Idle', load: 12 }
          ].map((agent, idx) => (
            <div key={idx} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#d1d5db', fontWeight: 500 }}>{agent.name}</span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>{agent.status}</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${agent.load}%` }} />
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
      <h2 className="page-title">Seller Pipeline</h2>
      <div className="card">
        <table>
          <thead>
            <tr>
              <th>Property</th>
              <th>Owner</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? sellers.map((seller, idx) => (
              <tr key={idx}>
                <td>{seller.property_address || 'N/A'}</td>
                <td style={{ color: '#9ca3af' }}>{seller.owner_name || 'Unknown'}</td>
                <td><span className="badge badge-cyan">{seller.score || 0}/100</span></td>
                <td><span className={`badge ${seller.status === 'qualified' ? 'badge-green' : 'badge-gray'}`}>{seller.status || 'new'}</span></td>
              </tr>
            )) : (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: '32px', color: '#6b7280' }}>No sellers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BuyersView({ buyers }: { buyers: any[] }) {
  return (
    <div>
      <h2 className="page-title">Active Buyers</h2>
      <div className="buyer-grid">
        {buyers.length > 0 ? buyers.map((buyer, idx) => (
          <div key={idx} className="buyer-card">
            <div className="buyer-avatar">{(buyer.name || 'U')[0].toUpperCase()}</div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#e5e7eb', marginBottom: '12px' }}>{buyer.name || 'Unknown'}</h3>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>Budget:</span>
                <span style={{ color: '#00d9ff', fontFamily: 'monospace' }}>${buyer.budget || 0}K</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Deals:</span>
                <span style={{ color: '#d1d5db' }}>{buyer.deals_count || 0}</span>
              </div>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: '#6b7280' }}>No active buyers.</div>
        )}
      </div>
    </div>
  );
}

function ContractsView({ contracts }: { contracts: any[] }) {
  return (
    <div>
      <h2 className="page-title">Contract Pipeline</h2>
      <div className="contract-grid">
        {['Draft', 'Sent', 'Signed', 'Closed'].map((stage) => (
          <div key={stage} className="contract-stage">
            <h3 className="stage-title">{stage}</h3>
            {contracts.filter(c => c.status?.toLowerCase() === stage.toLowerCase()).map((contract, idx) => (
              <div key={idx} className="contract-item">
                <div style={{ color: '#d1d5db', fontSize: '14px', marginBottom: '4px' }}>{contract.property_address || 'Property'}</div>
                <div style={{ color: '#00d9ff', fontSize: '12px', fontFamily: 'monospace' }}>${contract.amount || 0}</div>
              </div>
            ))}
            {contracts.filter(c => c.status?.toLowerCase() === stage.toLowerCase()).length === 0 && (
              <div style={{ textAlign: 'center', padding: '16px', color: '#6b7280', fontSize: '12px' }}>No contracts</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AnalyticsView() {
  return (
    <div>
      <h2 className="page-title">Performance Analytics</h2>
      <div className="two-col-grid">
        <div className="card">
          <h3 className="card-title">Conversion Funnel</h3>
          {[
            { stage: 'Leads', count: 150, pct: 100 },
            { stage: 'Contacted', count: 120, pct: 80 },
            { stage: 'Qualified', count: 75, pct: 50 },
            { stage: 'Closed', count: 15, pct: 10 }
          ].map((item, idx) => (
            <div key={idx} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#d1d5db' }}>{item.stage}</span>
                <span style={{ color: '#00d9ff', fontFamily: 'monospace' }}>{item.count}</span>
              </div>
              <div className="progress-bar" style={{ height: '12px' }}>
                <div className="progress-fill" style={{ width: `${item.pct}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 className="card-title">Monthly Revenue</h3>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
            const revenue = Math.floor(Math.random() * 50 + 20);
            return (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <span style={{ color: '#6b7280', width: '48px' }}>{month}</span>
                <div style={{ flex: 1, height: '32px', background: '#374151', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(revenue / 70) * 100}%`,
                    height: '100%',
                    background: 'linear-gradient(to right, #10b981, #00d9ff)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingRight: '12px'
                  }}>
                    <span style={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>${revenue}K</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}