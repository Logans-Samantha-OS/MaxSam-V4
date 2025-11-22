'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

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
      <div style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#f3f4f6',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        {/* Hexagon SVG Background */}
        <svg style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.05
        }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
              <polygon points="28,0 56,16 56,50 28,66 0,50 0,16" fill="none" stroke="#00d9ff" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>

        {/* Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '25%',
          width: '400px',
          height: '400px',
          background: 'rgba(0, 217, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          animation: 'pulse 2s ease-in-out infinite'
        }} />

        <div style={{ position: 'relative', zIndex: 10, display: 'flex', height: '100vh' }}>
          {/* Sidebar */}
          <div style={{
            width: '256px',
            background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)',
            borderRight: '1px solid rgba(0, 217, 255, 0.2)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                letterSpacing: '0.05em',
                color: '#00d9ff',
                marginBottom: '4px'
              }}>GRAPHENE</h1>
              <div style={{ color: '#9ca3af', fontSize: '14px' }}>Operations System</div>
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
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '8px',
                    border: currentView === item.id ? '1px solid rgba(0, 217, 255, 0.5)' : '1px solid transparent',
                    background: currentView === item.id ? 'rgba(0, 217, 255, 0.2)' : 'transparent',
                    color: currentView === item.id ? '#00d9ff' : '#9ca3af',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontSize: '16px',
                    transition: 'all 0.3s'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ fontWeight: 500 }}>{item.label}</span>
                </button>
              ))}
            </nav>

            <div style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  background: '#10b981',
                  borderRadius: '50%',
                  animation: 'pulse 2s ease-in-out infinite'
                }} />
                <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 500 }}>All Systems Online</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
            {currentView === 'dashboard' && <DashboardView metrics={metrics} />}
            {currentView === 'sellers' && <SellersView sellers={sellers} />}
            {currentView === 'buyers' && <BuyersView buyers={buyers} />}
            {currentView === 'contracts' && <ContractsView contracts={contracts} />}
            {currentView === 'analytics' && <AnalyticsView />}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.2; transform: scale(1.05); }
        }
        body { margin: 0; padding: 0; }
      `}</style>
    </>
  );
}

function DashboardView({ metrics }: { metrics: any }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          background: 'linear-gradient(to right, #00d9ff, #0080ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Command Center</h2>
        <div style={{ fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', animation: 'pulse 2s ease-in-out infinite' }} />
          Real-time Operations
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Total Leads', value: metrics.totalLeads, icon: '▲', color: '#00d9ff' },
          { label: 'Active Deals', value: metrics.activeDeals, icon: '●', color: '#0080ff' },
          { label: 'Conversion', value: `${metrics.conversionRate.toFixed(1)}%`, icon: '↗', color: '#10b981' },
          { label: 'Revenue', value: `$${(metrics.totalRevenue / 1000).toFixed(0)}K`, icon: '◆', color: '#a855f7' }
        ].map((metric, idx) => (
          <div key={idx} style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '12px',
            padding: '24px',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{ fontSize: '32px', color: metric.color, marginBottom: '12px' }}>{metric.icon}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: metric.color, marginBottom: '8px' }}>{metric.value}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{metric.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div style={{
          background: 'rgba(26, 26, 26, 0.5)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(16px)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00d9ff', marginBottom: '16px' }}>Recent Activity</h3>
          {[
            { time: '2m ago', action: 'New lead scored', value: '87/100' },
            { time: '15m ago', action: 'Contract signed', value: '$45K' },
            { time: '1h ago', action: 'SMS sent', value: 'Delivered' }
          ].map((activity, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: idx < 2 ? '1px solid #374151' : 'none'
            }}>
              <div>
                <div style={{ color: '#d1d5db', fontSize: '14px' }}>{activity.action}</div>
                <div style={{ color: '#6b7280', fontSize: '12px' }}>{activity.time}</div>
              </div>
              <div style={{ color: '#00d9ff', fontSize: '14px', fontFamily: 'monospace' }}>{activity.value}</div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(26, 26, 26, 0.5)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px',
          backdropFilter: 'blur(16px)'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00d9ff', marginBottom: '16px' }}>AI Agents</h3>
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
              <div style={{ width: '100%', height: '8px', background: '#374151', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${agent.load}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, #00d9ff, #0080ff)',
                  transition: 'width 0.5s'
                }} />
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
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #00d9ff, #0080ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px'
      }}>Seller Pipeline</h2>
      
      <div style={{
        background: 'rgba(26, 26, 26, 0.5)',
        border: '1px solid rgba(0, 217, 255, 0.2)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: 'rgba(0, 217, 255, 0.1)', borderBottom: '1px solid rgba(0, 217, 255, 0.2)' }}>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: '#00d9ff', fontSize: '12px', textTransform: 'uppercase' }}>Property</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: '#00d9ff', fontSize: '12px', textTransform: 'uppercase' }}>Owner</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: '#00d9ff', fontSize: '12px', textTransform: 'uppercase' }}>Score</th>
              <th style={{ padding: '16px 24px', textAlign: 'left', color: '#00d9ff', fontSize: '12px', textTransform: 'uppercase' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sellers.length > 0 ? sellers.map((seller, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #374151' }}>
                <td style={{ padding: '16px 24px', color: '#d1d5db' }}>{seller.property_address || 'N/A'}</td>
                <td style={{ padding: '16px 24px', color: '#9ca3af' }}>{seller.owner_name || 'Unknown'}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: 'rgba(0, 217, 255, 0.2)',
                    color: '#00d9ff',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}>{seller.score || 0}/100</span>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{
                    padding: '4px 12px',
                    background: seller.status === 'qualified' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                    color: seller.status === 'qualified' ? '#10b981' : '#9ca3af',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>{seller.status || 'new'}</span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
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

function BuyersView({ buyers }: { buyers: any[] }) {
  return (
    <div>
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #00d9ff, #0080ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px'
      }}>Active Buyers</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        {buyers.length > 0 ? buyers.map((buyer, idx) => (
          <div key={idx} style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'rgba(0, 217, 255, 0.2)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00d9ff',
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px'
            }}>{(buyer.name || 'U')[0].toUpperCase()}</div>
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
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px', color: '#6b7280' }}>
            No active buyers.
          </div>
        )}
      </div>
    </div>
  );
}

function ContractsView({ contracts }: { contracts: any[] }) {
  return (
    <div>
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #00d9ff, #0080ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px'
      }}>Contract Pipeline</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
        {['Draft', 'Sent', 'Signed', 'Closed'].map((stage) => (
          <div key={stage} style={{
            background: 'rgba(26, 26, 26, 0.5)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '12px',
            padding: '16px'
          }}>
            <h3 style={{ color: '#00d9ff', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase', fontSize: '14px' }}>{stage}</h3>
            {contracts.filter(c => c.status?.toLowerCase() === stage.toLowerCase()).map((contract, idx) => (
              <div key={idx} style={{
                background: '#0f0f0f',
                border: '1px solid #374151',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '12px'
              }}>
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
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #00d9ff, #0080ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px'
      }}>Performance Analytics</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div style={{
          background: 'rgba(26, 26, 26, 0.5)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00d9ff', marginBottom: '16px' }}>Conversion Funnel</h3>
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
              <div style={{ width: '100%', height: '12px', background: '#374151', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{
                  width: `${item.pct}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, #00d9ff, #0080ff)'
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          background: 'rgba(26, 26, 26, 0.5)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00d9ff', marginBottom: '16px' }}>Monthly Revenue</h3>
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