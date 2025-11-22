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

  const navButtons = [
    { id: 'dashboard', label: 'Dashboard', icon: '◆' },
    { id: 'sellers', label: 'Sellers', icon: '◇' },
    { id: 'buyers', label: 'Buyers', icon: '◈' },
    { id: 'contracts', label: 'Contracts', icon: '◉' },
    { id: 'analytics', label: 'Analytics', icon: '◊' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#f3f4f6',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <div style={{
        width: '256px',
        background: 'linear-gradient(to bottom, #1a1a1a, #0f0f0f)',
        borderRight: '1px solid rgba(0, 217, 255, 0.2)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#00d9ff' }}>MaxSam V4</div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>Operations Platform</div>
        </div>

        <div style={{ flex: 1 }}>
          {navButtons.map((item) => (
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
                fontSize: '16px'
              }}
            >
              <span style={{ fontSize: '20px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }} />
          <span style={{ color: '#10b981', fontSize: '14px' }}>All Systems Online</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
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
      <h2 style={{
        fontSize: '36px',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #00d9ff, #0080ff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '24px'
      }}>Command Center</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
        {[
          { label: 'Total Leads', value: sellers.length, icon: '▲', color: '#00d9ff' },
          { label: 'Active Deals', value: Math.floor(sellers.length * 0.3), icon: '●', color: '#0080ff' },
          { label: 'Conversion', value: '8.5%', icon: '↗', color: '#10b981' },
          { label: 'Revenue', value: '$142K', icon: '◆', color: '#a855f7' }
        ].map((metric, idx) => (
          <div key={idx} style={{
            background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
            border: '1px solid rgba(0, 217, 255, 0.2)',
            borderRadius: '12px',
            padding: '24px'
          }}>
            <div style={{ fontSize: '32px', color: metric.color, marginBottom: '12px' }}>{metric.icon}</div>
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: metric.color, marginBottom: '8px' }}>{metric.value}</div>
            <div style={{ fontSize: '12px', color: '#6b7280', textTransform: 'uppercase' }}>{metric.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
        <div style={{
          background: 'rgba(26, 26, 26, 0.5)',
          border: '1px solid rgba(0, 217, 255, 0.2)',
          borderRadius: '12px',
          padding: '24px'
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
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#00d9ff', marginBottom: '16px' }}>AI Agents</h3>
          {[
            { name: 'Sam', status: 'Processing leads', load: 45 },
            { name: 'Eleanor', status: 'Analyzing docs', load: 78 }
          ].map((agent, idx) => (
            <div key={idx} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#d1d5db' }}>{agent.name}</span>
                <span style={{ color: '#6b7280', fontSize: '14px' }}>{agent.status}</span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#374151', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${agent.load}%`,
                  height: '100%',
                  background: 'linear-gradient(to right, #00d9ff, #0080ff)'
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
        <div style={{ padding: '24px', color: '#d1d5db', textAlign: 'center' }}>
          {sellers.length > 0 ? `${sellers.length} sellers in pipeline` : 'No sellers found. Connect your data source.'}
        </div>
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
      
      <div style={{ padding: '24px', color: '#d1d5db', textAlign: 'center' }}>
        {buyers.length > 0 ? `${buyers.length} active buyers` : 'No active buyers.'}
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
      
      <div style={{ padding: '24px', color: '#d1d5db', textAlign: 'center' }}>
        {contracts.length > 0 ? `${contracts.length} contracts in pipeline` : 'No contracts.'}
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
      
      <div style={{ padding: '24px', color: '#d1d5db' }}>Analytics dashboard coming soon...</div>
    </div>
  );
}