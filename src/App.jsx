import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  Home, Building2, ShoppingCart, Truck, Users,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  Clock, X, Sparkles, ChevronDown, BarChart2,
  DollarSign, Package, MapPin, Phone, Mail, RefreshCw
} from 'lucide-react';

// ─── DATA ──────────────────────────────────────────────────────────────────────

const RE_PROPERTIES = [
  { id: 'P001', name: 'Marina Gate Tower 3 — 2BR', agent: 'Omar Al Rashidi', location: 'Dubai Marina', price: 2850000, status: 'Active', views: 342, leads: 18, type: 'Apartment' },
  { id: 'P002', name: 'Downtown Burj Vista — 1BR', agent: 'Sarah Mitchell', location: 'Downtown Dubai', price: 1950000, status: 'Under Offer', views: 289, leads: 24, type: 'Apartment' },
  { id: 'P003', name: 'JBR Sadaf 6 — Studio', agent: 'Khalid Al Mansoori', location: 'JBR', price: 980000, status: 'Active', views: 156, leads: 9, type: 'Studio' },
  { id: 'P004', name: 'Business Bay — 3BR Penthouse', agent: 'Priya Sharma', location: 'Business Bay', price: 5400000, status: 'Sold', views: 521, leads: 41, type: 'Penthouse' },
  { id: 'P005', name: 'Palm Jumeirah Frond — 4BR Villa', agent: 'Ahmed Al Suwaidi', location: 'Palm Jumeirah', price: 12800000, status: 'Active', views: 687, leads: 53, type: 'Villa' },
  { id: 'P006', name: 'DIFC Index Tower — 2BR', agent: 'Jessica Wong', location: 'DIFC', price: 3200000, status: 'Under Offer', views: 234, leads: 19, type: 'Apartment' },
  { id: 'P007', name: 'Jumeirah Village — 3BR Townhouse', agent: 'Faisal Al Hamad', location: 'JVC', price: 1650000, status: 'Active', views: 178, leads: 12, type: 'Townhouse' },
  { id: 'P008', name: 'Emaar Beachfront — 1BR Sea View', agent: 'Noor Al Zaabi', location: 'Emaar Beachfront', price: 2100000, status: 'Expired', views: 89, leads: 3, type: 'Apartment' },
];

const RE_BAR_DATA = [
  { month: 'Mar', listings: 12, sold: 4, revenue: 18.2 },
  { month: 'Apr', listings: 18, sold: 7, revenue: 31.5 },
  { month: 'May', listings: 15, sold: 5, revenue: 22.8 },
  { month: 'Jun', listings: 22, sold: 9, revenue: 47.3 },
  { month: 'Jul', listings: 28, sold: 12, revenue: 61.1 },
  { month: 'Aug', listings: 31, sold: 14, revenue: 78.4 },
];

const RE_PIE_DATA = [
  { name: 'Apartments', value: 48 },
  { name: 'Villas', value: 22 },
  { name: 'Townhouses', value: 15 },
  { name: 'Penthouses', value: 9 },
  { name: 'Studios', value: 6 },
];

const ECOM_ORDERS = [
  { id: 'ORD-8821', customer: 'Layla Al Farsi', product: 'Apple Watch Ultra 2', sku: 'AW-U2-49', value: 3299, status: 'Delivered', location: 'Al Barsha', date: '2024-08-19' },
  { id: 'ORD-8822', customer: 'James Patterson', product: 'Samsung 65" QLED TV', sku: 'SS-QN65', value: 5499, status: 'Processing', location: 'Downtown', date: '2024-08-20' },
  { id: 'ORD-8823', customer: 'Fatima Al Blooshi', product: 'Dyson V15 Detect', sku: 'DY-V15D', value: 2799, status: 'Shipped', location: 'Jumeirah', date: '2024-08-20' },
  { id: 'ORD-8824', customer: 'Raj Patel', product: 'Nike Air Max 2024', sku: 'NK-AM24-42', value: 799, status: 'Delivered', location: 'Silicon Oasis', date: '2024-08-18' },
  { id: 'ORD-8825', customer: 'Aisha Al Marzooqi', product: 'Nespresso Expert Coffee', sku: 'NS-EXP-BK', value: 1299, status: 'Cancelled', location: 'Mirdif', date: '2024-08-21' },
  { id: 'ORD-8826', customer: 'Michael Chen', product: 'iPad Pro M4 12.9"', sku: 'AP-IPP-M4', value: 4999, status: 'Processing', location: 'DIFC', date: '2024-08-21' },
  { id: 'ORD-8827', customer: 'Mariam Al Kaabi', product: 'Bosch Refrigerator 500L', sku: 'BS-REF500', value: 3799, status: 'Shipped', location: 'Abu Hail', date: '2024-08-19' },
  { id: 'ORD-8828', customer: 'David Williams', product: 'Sony WH-1000XM6', sku: 'SN-WH6-BK', value: 1599, status: 'Delivered', location: 'JBR', date: '2024-08-17' },
];

const ECOM_BAR_DATA = [
  { day: 'Mon', orders: 142, revenue: 89400 },
  { day: 'Tue', orders: 168, revenue: 112800 },
  { day: 'Wed', orders: 195, revenue: 143200 },
  { day: 'Thu', orders: 221, revenue: 167900 },
  { day: 'Fri', orders: 287, revenue: 198400 },
  { day: 'Sat', orders: 334, revenue: 241600 },
  { day: 'Sun', orders: 256, revenue: 178300 },
];

const ECOM_PIE_DATA = [
  { name: 'Electronics', value: 42 },
  { name: 'Home & Living', value: 24 },
  { name: 'Fashion', value: 18 },
  { name: 'Sports', value: 10 },
  { name: 'Other', value: 6 },
];

const LOGISTICS_SHIPMENTS = [
  { id: 'SHP-4401', origin: 'Jebel Ali Port', destination: 'Business Bay', driver: 'Hassan Al Matroushi', ETA: '14:30', status: 'On Route', cargo: 'Electronics 2.4T', delay: 0 },
  { id: 'SHP-4402', origin: 'DIP Warehouse', destination: 'Dubai Marina', driver: 'Suresh Kumar', ETA: '15:00', status: 'Delayed', cargo: 'Furniture 1.8T', delay: 45 },
  { id: 'SHP-4403', origin: 'Dragon Mart', destination: 'Mirdif City Centre', driver: 'Ali Al Jabri', ETA: '13:15', status: 'Delivered', cargo: 'Retail Goods 0.9T', delay: 0 },
  { id: 'SHP-4404', origin: 'Al Quoz Hub', destination: 'Palm Jumeirah', driver: 'Rajesh Nair', ETA: '16:45', status: 'On Route', cargo: 'Luxury Items 0.3T', delay: 0 },
  { id: 'SHP-4405', origin: 'Sharjah Depot', destination: 'DAFZA Free Zone', driver: 'Mohammed Al Khuri', ETA: '12:00', status: 'Delayed', cargo: 'Chemicals 3.1T', delay: 90 },
  { id: 'SHP-4406', origin: 'Jebel Ali Port', destination: 'Al Quoz Industrial', driver: 'Vikram Singh', ETA: '17:30', status: 'On Route', cargo: 'Construction 5.2T', delay: 0 },
  { id: 'SHP-4407', origin: 'DWC Cargo Hub', destination: 'Downtown Dubai', driver: 'Omar Al Saeed', ETA: '11:45', status: 'Delivered', cargo: 'Food Grade 1.1T', delay: 0 },
  { id: 'SHP-4408', origin: 'RAKEZ Depot', destination: 'JBR Walk', driver: 'Pradeep Thomas', ETA: '18:00', status: 'Critical', cargo: 'Perishables 0.8T', delay: 120 },
];

const LOG_BAR_DATA = [
  { zone: 'Marina', deliveries: 48, onTime: 44 },
  { zone: 'Downtown', deliveries: 62, onTime: 58 },
  { zone: 'Business Bay', deliveries: 71, onTime: 65 },
  { zone: 'JBR', deliveries: 39, onTime: 37 },
  { zone: 'DIFC', deliveries: 53, onTime: 50 },
  { zone: 'JVC', deliveries: 44, onTime: 41 },
];

const LOG_PIE_DATA = [
  { name: 'On Time', value: 67 },
  { name: 'Delayed <1hr', value: 18 },
  { name: 'Delayed >1hr', value: 11 },
  { name: 'Critical', value: 4 },
];

const SALES_LEADS = [
  { id: 'L-3301', name: 'Omar Al Rashidi', company: 'Al Futtaim Group', value: 485000, stage: 'Proposal Sent', source: 'LinkedIn', lastContact: '2024-08-21', probability: 75 },
  { id: 'L-3302', name: 'Sarah Mitchell', company: 'Emaar Properties', value: 1200000, stage: 'Negotiation', source: 'Referral', lastContact: '2024-08-20', probability: 85 },
  { id: 'L-3303', name: 'Khalid Al Mansoori', company: 'DAMAC Holdings', value: 890000, stage: 'Discovery', source: 'Event', lastContact: '2024-08-19', probability: 35 },
  { id: 'L-3304', name: 'Priya Sharma', company: 'Noon Digital', value: 320000, stage: 'Closed Won', source: 'Cold Outreach', lastContact: '2024-08-18', probability: 100 },
  { id: 'L-3305', name: 'Ahmed Al Suwaidi', company: 'DP World', value: 2100000, stage: 'Proposal Sent', source: 'Website', lastContact: '2024-08-21', probability: 60 },
  { id: 'L-3306', name: 'Jessica Wong', company: 'Carrefour UAE', value: 560000, stage: 'Discovery', source: 'LinkedIn', lastContact: '2024-08-17', probability: 40 },
  { id: 'L-3307', name: 'Faisal Al Hamad', company: 'Emirates NBD', value: 780000, stage: 'Negotiation', source: 'Referral', lastContact: '2024-08-22', probability: 80 },
  { id: 'L-3308', name: 'Noor Al Zaabi', company: 'Etisalat (e&)', value: 1450000, stage: 'Closed Lost', source: 'Event', lastContact: '2024-08-15', probability: 0 },
];

const SALES_BAR_DATA = [
  { rep: 'Omar', target: 500, achieved: 485 },
  { rep: 'Sarah', target: 800, achieved: 920 },
  { rep: 'Khalid', target: 600, achieved: 410 },
  { rep: 'Priya', target: 400, achieved: 380 },
  { rep: 'Ahmed', target: 1000, achieved: 750 },
  { rep: 'Jessica', target: 450, achieved: 390 },
];

const SALES_PIE_DATA = [
  { name: 'Negotiation', value: 28 },
  { name: 'Proposal Sent', value: 35 },
  { name: 'Discovery', value: 20 },
  { name: 'Closed Won', value: 12 },
  { name: 'Closed Lost', value: 5 },
];

const HOME_REVENUE_DATA = [
  { month: 'Mar', realEstate: 18.2, ecommerce: 12.4, logistics: 8.1, sales: 9.3 },
  { month: 'Apr', realEstate: 31.5, ecommerce: 15.8, logistics: 9.4, sales: 11.2 },
  { month: 'May', realEstate: 22.8, ecommerce: 19.2, logistics: 10.8, sales: 13.7 },
  { month: 'Jun', realEstate: 47.3, ecommerce: 24.1, logistics: 12.3, sales: 18.4 },
  { month: 'Jul', realEstate: 61.1, ecommerce: 28.7, logistics: 15.6, sales: 22.1 },
  { month: 'Aug', realEstate: 78.4, ecommerce: 33.9, logistics: 18.2, sales: 28.6 },
];

// ─── COLORS ────────────────────────────────────────────────────────────────────
const GOLD = '#D4AF37';
const GOLD_LIGHT = '#F0D060';
const NAVY = '#0A0F1E';
const CHART_COLORS = ['#D4AF37', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const STATUS_MAP = {
  'Active': 'green', 'Under Offer': 'amber', 'Sold': 'green', 'Expired': 'red',
  'Delivered': 'green', 'Processing': 'amber', 'Shipped': 'amber', 'Cancelled': 'red',
  'On Route': 'green', 'Delayed': 'amber', 'Critical': 'red',
  'Negotiation': 'amber', 'Proposal Sent': 'amber', 'Discovery': 'amber',
  'Closed Won': 'green', 'Closed Lost': 'red',
};

function StatusBadge({ status }) {
  const type = STATUS_MAP[status] || 'amber';
  return (
    <span className={`status-${type} text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap`}>
      {status}
    </span>
  );
}

function KpiCard({ label, value, sub, icon: Icon, trend, color = GOLD }) {
  const isUp = trend > 0;
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#8B9EC7' }}>{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${color}20` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <div className="text-2xl font-800 font-bold mb-1" style={{ color }}>{value}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs" style={{ color: '#8B9EC7' }}>{sub}</span>
        {trend !== undefined && (
          <span className={`text-xs font-semibold flex items-center gap-0.5 ${isUp ? 'text-emerald-400' : 'text-red-400'}`}>
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: '#1A2035', border: '1px solid #243054', borderRadius: 8, padding: '10px 14px' }}>
      <p style={{ color: GOLD, fontWeight: 600, marginBottom: 4, fontSize: 12 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 12, margin: '2px 0' }}>
          {p.name}: <strong>{typeof p.value === 'number' && p.value > 1000 ? `AED ${p.value.toLocaleString()}` : p.value}</strong>
        </p>
      ))}
    </div>
  );
}

function AIModal({ title, content, loading, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: GOLD }} />
            <span className="font-bold text-sm uppercase tracking-widest" style={{ color: GOLD }}>AI Generated</span>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-navy-600 transition-colors" style={{ background: '#243054' }}>
            <X size={16} />
          </button>
        </div>
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 gap-4">
            <div className="w-10 h-10 border-2 rounded-full animate-spin" style={{ borderColor: `${GOLD}30`, borderTopColor: GOLD }} />
            <p style={{ color: '#8B9EC7', fontSize: 13 }}>Claude is generating content...</p>
          </div>
        ) : (
          <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#CBD5E1' }}>{content}</div>
        )}
      </div>
    </div>
  );
}

// ─── CLAUDE API ────────────────────────────────────────────────────────────────
async function callClaude(prompt) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || 'No content generated.';
}

// ─── REAL ESTATE TAB ──────────────────────────────────────────────────────────
function RealEstateTab() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const statuses = ['All', 'Active', 'Under Offer', 'Sold', 'Expired'];
  const filtered = filter === 'All' ? RE_PROPERTIES : RE_PROPERTIES.filter(p => p.status === filter);

  const kpis = {
    activeListings: RE_PROPERTIES.filter(p => p.status === 'Active').length,
    totalValue: RE_PROPERTIES.reduce((s, p) => s + p.price, 0),
    avgLeads: Math.round(RE_PROPERTIES.reduce((s, p) => s + p.leads, 0) / RE_PROPERTIES.length),
    conversionRate: ((RE_PROPERTIES.filter(p => p.status === 'Sold').length / RE_PROPERTIES.length) * 100).toFixed(0),
  };

  const handleAI = async (property) => {
    setModal(property);
    setAiLoading(true);
    setAiContent('');
    const text = await callClaude(
      `You are a luxury Dubai real estate copywriter. Write a compelling property listing description for:\n\nProperty: ${property.name}\nLocation: ${property.location}\nPrice: AED ${property.price.toLocaleString()}\nType: ${property.type}\n\nWrite 3 short paragraphs: (1) lifestyle hook, (2) key features and amenities, (3) investment angle and location advantages. Use Dubai luxury market tone. Keep under 200 words total.`
    );
    setAiContent(text);
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      {modal && (
        <AIModal
          title={`Listing: ${modal.name}`}
          content={aiContent}
          loading={aiLoading}
          onClose={() => setModal(null)}
        />
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Active Listings" value={kpis.activeListings} sub="Properties live" icon={Building2} trend={12} />
        <KpiCard label="Portfolio Value" value={`AED ${(kpis.totalValue / 1e6).toFixed(1)}M`} sub="Total listed value" icon={DollarSign} trend={8} />
        <KpiCard label="Avg Leads / Property" value={kpis.avgLeads} sub="Enquiries per listing" icon={Users} trend={5} />
        <KpiCard label="Conversion Rate" value={`${kpis.conversionRate}%`} sub="Listed → Sold" icon={TrendingUp} trend={3} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Monthly Listings & Sales</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={RE_BAR_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243054" />
              <XAxis dataKey="month" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8B9EC7' }} />
              <Bar dataKey="listings" name="Listings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="sold" name="Sold" fill={GOLD} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Property Type Mix</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={RE_PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {RE_PIE_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-widest" style={{ color: GOLD }}>Active Portfolio</h3>
          <div className="flex items-center gap-2">
            <select value={filter} onChange={e => setFilter(e.target.value)}
              className="text-xs rounded-lg px-3 py-2 outline-none"
              style={{ background: '#0A0F1E', border: '1px solid #243054', color: '#E8E8E8' }}>
              {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Property</th><th>Agent</th><th>Location</th>
                <th>Price (AED)</th><th>Leads</th><th>Status</th><th>AI Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td style={{ color: '#8B9EC7' }}>{p.id}</td>
                  <td className="font-medium" style={{ minWidth: 160 }}>{p.name}</td>
                  <td>{p.agent}</td>
                  <td><span className="flex items-center gap-1"><MapPin size={10} style={{ color: GOLD }} />{p.location}</span></td>
                  <td className="font-semibold" style={{ color: GOLD }}>{p.price.toLocaleString()}</td>
                  <td>{p.leads}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td>
                    <button className="ai-btn" style={{ padding: '5px 10px', fontSize: 10 }} onClick={() => handleAI(p)}>
                      ✦ Write Listing
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── E-COMMERCE TAB ───────────────────────────────────────────────────────────
function EcommerceTab() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  const filtered = filter === 'All' ? ECOM_ORDERS : ECOM_ORDERS.filter(o => o.status === filter);

  const totalRevenue = ECOM_ORDERS.reduce((s, o) => s + o.value, 0);
  const avgOrderVal = Math.round(totalRevenue / ECOM_ORDERS.length);
  const fulfilmentRate = ((ECOM_ORDERS.filter(o => o.status === 'Delivered').length / ECOM_ORDERS.length) * 100).toFixed(0);

  const handleAI = async (order) => {
    setModal(order);
    setAiLoading(true);
    setAiContent('');
    const text = await callClaude(
      `You are a Dubai e-commerce product copywriter. Write a compelling product description for:\n\nProduct: ${order.product}\nSKU: ${order.sku}\nPrice: AED ${order.value.toLocaleString()}\n\nWrite 3 punchy sections:\n1. A one-liner headline that sells the product\n2. 3-4 key benefits in bullet points\n3. A short urgency/CTA paragraph for UAE market\n\nKeep it professional, exciting, and under 180 words.`
    );
    setAiContent(text);
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      {modal && (
        <AIModal
          title={`Product: ${modal.product}`}
          content={aiContent}
          loading={aiLoading}
          onClose={() => setModal(null)}
        />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Orders Today" value={ECOM_ORDERS.length} sub="Total orders" icon={ShoppingCart} trend={14} color="#3B82F6" />
        <KpiCard label="Revenue (AED)" value={`${(totalRevenue / 1000).toFixed(1)}K`} sub="Today's revenue" icon={DollarSign} trend={9} />
        <KpiCard label="Avg Order Value" value={`AED ${avgOrderVal.toLocaleString()}`} sub="Per transaction" icon={TrendingUp} trend={6} color="#10B981" />
        <KpiCard label="Fulfilment Rate" value={`${fulfilmentRate}%`} sub="Orders delivered" icon={CheckCircle} trend={2} color="#8B5CF6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Weekly Orders & Revenue (AED)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ECOM_BAR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243054" />
              <XAxis dataKey="day" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8B9EC7' }} />
              <Bar yAxisId="left" dataKey="orders" name="Orders" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue" fill={GOLD} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={ECOM_PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {ECOM_PIE_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-widest" style={{ color: GOLD }}>Order Management</h3>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="text-xs rounded-lg px-3 py-2 outline-none"
            style={{ background: '#0A0F1E', border: '1px solid #243054', color: '#E8E8E8' }}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th><th>Customer</th><th>Product</th><th>Value (AED)</th>
                <th>Location</th><th>Status</th><th>AI Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td style={{ color: '#8B9EC7' }}>{o.id}</td>
                  <td className="font-medium">{o.customer}</td>
                  <td style={{ minWidth: 160 }}>{o.product}</td>
                  <td className="font-semibold" style={{ color: GOLD }}>{o.value.toLocaleString()}</td>
                  <td>{o.location}</td>
                  <td><StatusBadge status={o.status} /></td>
                  <td>
                    <button className="ai-btn" style={{ padding: '5px 10px', fontSize: 10 }} onClick={() => handleAI(o)}>
                      ✦ Write Desc
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── LOGISTICS TAB ────────────────────────────────────────────────────────────
function LogisticsTab() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const statuses = ['All', 'On Route', 'Delayed', 'Delivered', 'Critical'];
  const filtered = filter === 'All' ? LOGISTICS_SHIPMENTS : LOGISTICS_SHIPMENTS.filter(s => s.status === filter);

  const onTime = LOGISTICS_SHIPMENTS.filter(s => s.status === 'Delivered' || s.status === 'On Route').length;
  const delayed = LOGISTICS_SHIPMENTS.filter(s => s.status === 'Delayed').length;
  const critical = LOGISTICS_SHIPMENTS.filter(s => s.status === 'Critical').length;
  const onTimeRate = ((onTime / LOGISTICS_SHIPMENTS.length) * 100).toFixed(0);

  const handleAI = async (shipment) => {
    setModal(shipment);
    setAiLoading(true);
    setAiContent('');
    const delayMin = shipment.delay;
    const text = await callClaude(
      `You are a Dubai logistics operations manager. Write a professional delay notification message for a shipment customer.\n\nShipment ID: ${shipment.id}\nCargo: ${shipment.cargo}\nOrigin: ${shipment.origin}\nDestination: ${shipment.destination}\nDelay: ${delayMin} minutes\nNew ETA: ${shipment.ETA}\n\nWrite:\n1. A brief apology and clear delay explanation\n2. New estimated time of arrival\n3. What action is being taken\n4. Contact/follow-up details\n\nProfessional, concise, under 150 words. Use formal Dubai business tone.`
    );
    setAiContent(text);
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      {modal && (
        <AIModal
          title={`Delay Notice: ${modal.id} — ${modal.cargo}`}
          content={aiContent}
          loading={aiLoading}
          onClose={() => setModal(null)}
        />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Total Shipments" value={LOGISTICS_SHIPMENTS.length} sub="Active today" icon={Truck} trend={7} color="#3B82F6" />
        <KpiCard label="On-Time Rate" value={`${onTimeRate}%`} sub="Delivered on schedule" icon={CheckCircle} trend={3} color="#10B981" />
        <KpiCard label="Delayed" value={delayed} sub="Need attention" icon={Clock} trend={-8} color="#F59E0B" />
        <KpiCard label="Critical Alerts" value={critical} sub="Urgent escalation" icon={AlertCircle} trend={-15} color="#EF4444" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Deliveries by Zone</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={LOG_BAR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243054" />
              <XAxis dataKey="zone" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8B9EC7' }} />
              <Bar dataKey="deliveries" name="Total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="onTime" name="On Time" fill={GOLD} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Delivery Status Mix</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={LOG_PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {LOG_PIE_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-widest" style={{ color: GOLD }}>Live Shipment Tracker</h3>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="text-xs rounded-lg px-3 py-2 outline-none"
            style={{ background: '#0A0F1E', border: '1px solid #243054', color: '#E8E8E8' }}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>SHP ID</th><th>Origin</th><th>Destination</th><th>Driver</th>
                <th>Cargo</th><th>ETA</th><th>Status</th><th>AI Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <tr key={s.id}>
                  <td style={{ color: '#8B9EC7' }}>{s.id}</td>
                  <td>{s.origin}</td>
                  <td>{s.destination}</td>
                  <td className="font-medium">{s.driver}</td>
                  <td>{s.cargo}</td>
                  <td className="font-semibold" style={{ color: s.delay > 0 ? '#F59E0B' : '#10B981' }}>{s.ETA}</td>
                  <td><StatusBadge status={s.status} /></td>
                  <td>
                    <button className="ai-btn" style={{ padding: '5px 10px', fontSize: 10 }} onClick={() => handleAI(s)}>
                      ✦ Notify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SALES COORDINATION TAB ───────────────────────────────────────────────────
function SalesTab() {
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const statuses = ['All', 'Discovery', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];
  const filtered = filter === 'All' ? SALES_LEADS : SALES_LEADS.filter(l => l.stage === filter);

  const totalPipeline = SALES_LEADS.reduce((s, l) => s + l.value, 0);
  const closedWon = SALES_LEADS.filter(l => l.stage === 'Closed Won').reduce((s, l) => s + l.value, 0);
  const winRate = ((SALES_LEADS.filter(l => l.stage === 'Closed Won').length / SALES_LEADS.length) * 100).toFixed(0);
  const avgDeal = Math.round(totalPipeline / SALES_LEADS.length);

  const handleAI = async (lead) => {
    setModal(lead);
    setAiLoading(true);
    setAiContent('');
    const text = await callClaude(
      `You are a B2B sales expert in Dubai. Write a professional follow-up email for:\n\nProspect: ${lead.name}\nCompany: ${lead.company}\nDeal Value: AED ${lead.value.toLocaleString()}\nStage: ${lead.stage}\nSource: ${lead.source}\nLast Contact: ${lead.lastContact}\n\nWrite a concise follow-up email:\n- Subject line\n- Professional greeting\n- Reference to previous conversation\n- Value proposition reminder\n- Clear next step / call to action\n- Professional close\n\nDubai B2B tone, formal but warm, under 180 words total.`
    );
    setAiContent(text);
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      {modal && (
        <AIModal
          title={`Follow-Up: ${modal.name} @ ${modal.company}`}
          content={aiContent}
          loading={aiLoading}
          onClose={() => setModal(null)}
        />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard label="Pipeline Value" value={`AED ${(totalPipeline / 1e6).toFixed(1)}M`} sub="Total opportunity" icon={DollarSign} trend={18} />
        <KpiCard label="Revenue Closed" value={`AED ${(closedWon / 1000).toFixed(0)}K`} sub="Won this month" icon={CheckCircle} trend={22} color="#10B981" />
        <KpiCard label="Win Rate" value={`${winRate}%`} sub="Closed vs Total" icon={TrendingUp} trend={5} color="#8B5CF6" />
        <KpiCard label="Avg Deal Size" value={`AED ${(avgDeal / 1000).toFixed(0)}K`} sub="Per opportunity" icon={BarChart2} trend={11} color="#3B82F6" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Target vs Achieved (AED K)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SALES_BAR_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#243054" />
              <XAxis dataKey="rep" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, color: '#8B9EC7' }} />
              <Bar dataKey="target" name="Target" fill="#243054" radius={[4, 4, 0, 0]} />
              <Bar dataKey="achieved" name="Achieved" fill={GOLD} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Pipeline Stage Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={SALES_PIE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                {SALES_PIE_DATA.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-semibold text-sm uppercase tracking-widest" style={{ color: GOLD }}>CRM Pipeline</h3>
          <select value={filter} onChange={e => setFilter(e.target.value)}
            className="text-xs rounded-lg px-3 py-2 outline-none"
            style={{ background: '#0A0F1E', border: '1px solid #243054', color: '#E8E8E8' }}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th><th>Contact</th><th>Company</th><th>Value (AED)</th>
                <th>Stage</th><th>Probability</th><th>Source</th><th>AI Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id}>
                  <td style={{ color: '#8B9EC7' }}>{l.id}</td>
                  <td className="font-medium">{l.name}</td>
                  <td>{l.company}</td>
                  <td className="font-semibold" style={{ color: GOLD }}>{l.value.toLocaleString()}</td>
                  <td><StatusBadge status={l.stage} /></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#243054', minWidth: 50 }}>
                        <div className="h-full rounded-full" style={{
                          width: `${l.probability}%`,
                          background: l.probability >= 70 ? '#10B981' : l.probability >= 40 ? '#F59E0B' : '#EF4444'
                        }} />
                      </div>
                      <span className="text-xs" style={{ color: '#8B9EC7' }}>{l.probability}%</span>
                    </div>
                  </td>
                  <td>{l.source}</td>
                  <td>
                    <button className="ai-btn" style={{ padding: '5px 10px', fontSize: 10 }} onClick={() => handleAI(l)}>
                      ✦ Email
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── HOME TAB ─────────────────────────────────────────────────────────────────
function HomeTab({ onTabChange }) {
  const [modal, setModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');

  const handleReport = async () => {
    setModal(true);
    setAiLoading(true);
    setAiContent('');
    const text = await callClaude(
      `You are an AI Operations Manager. Generate a professional weekly executive ops report for Mohammad Irfan's Dubai operations portfolio.\n\nData summary:\n- Real Estate: 8 properties, AED 31.4M portfolio value, 12.5% avg monthly growth, 4 active listings, 1 sold, 2 under offer\n- E-commerce: 1,403 weekly orders, AED 1.13M weekly revenue, 87.5% fulfilment rate, Avg order AED 2.8K\n- Logistics: 8 active shipments, 62.5% on-time rate, 2 delayed, 1 critical alert in JBR zone\n- Sales: AED 7.78M total pipeline, AED 320K closed won, 12.5% win rate, 8 active leads\n\nWrite a formatted weekly operations report with:\n1. Executive Summary (2-3 sentences)\n2. Key Wins This Week\n3. Concerns & Risks\n4. AI Automation Impact\n5. Recommended Actions for Next Week\n\nProfessional Dubai business tone. Under 300 words.`
    );
    setAiContent(text);
    setAiLoading(false);
  };

  const metrics = [
    { label: 'Real Estate Portfolio', value: 'AED 31.4M', sub: '8 Properties', color: GOLD, icon: Building2, tab: 'realestate' },
    { label: 'E-com Revenue (Week)', value: 'AED 1.13M', sub: '1,403 Orders', color: '#3B82F6', icon: ShoppingCart, tab: 'ecommerce' },
    { label: 'Logistics SLA', value: '62.5%', sub: 'On-Time Rate', color: '#10B981', icon: Truck, tab: 'logistics' },
    { label: 'Sales Pipeline', value: 'AED 7.78M', sub: '8 Active Leads', color: '#8B5CF6', icon: Users, tab: 'sales' },
  ];

  return (
    <div className="space-y-6">
      {modal && (
        <AIModal
          title="Weekly Operations Report — Mohammad Irfan"
          content={aiContent}
          loading={aiLoading}
          onClose={() => setModal(false)}
        />
      )}

      {/* Hero */}
      <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A2035 0%, #111827 100%)', border: '1px solid #243054' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: GOLD, transform: 'translate(30%, -30%)' }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-2">
            <span className="pulse-dot" />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#8B9EC7' }}>Live Dashboard — Dubai Operations</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">
            Mohammad Irfan
            <span className="gradient-text ml-3">AI Ops Portfolio</span>
          </h1>
          <p className="text-sm md:text-base mb-6" style={{ color: '#8B9EC7' }}>MBA Finance · Dubai · AI-Powered Operations Specialist</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Real Estate Ops', 'E-commerce Ops', 'Logistics Ops', 'Sales Coordination'].map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: `${GOLD}20`, color: GOLD, border: `1px solid ${GOLD}40` }}>{t}</span>
            ))}
          </div>
          <button className="ai-btn" onClick={handleReport}>
            ✦ Generate Weekly Report
          </button>
        </div>
      </div>

      {/* Exec Summary KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="kpi-card cursor-pointer" onClick={() => onTabChange(m.tab)}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#8B9EC7' }}>{m.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${m.color}20` }}>
                <m.icon size={16} style={{ color: m.color }} />
              </div>
            </div>
            <div className="text-xl font-bold mb-1" style={{ color: m.color }}>{m.value}</div>
            <div className="text-xs" style={{ color: '#8B9EC7' }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Combined Revenue Chart */}
      <div className="chart-container">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Cross-Industry Revenue Trend — AED Millions</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={HOME_REVENUE_DATA}>
            <defs>
              {[
                { id: 'gold', color: GOLD },
                { id: 'blue', color: '#3B82F6' },
                { id: 'green', color: '#10B981' },
                { id: 'purple', color: '#8B5CF6' },
              ].map(g => (
                <linearGradient key={g.id} id={`grad-${g.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={g.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={g.color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#243054" />
            <XAxis dataKey="month" tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#8B9EC7', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11, color: '#8B9EC7' }} />
            <Area type="monotone" dataKey="realEstate" name="Real Estate" stroke={GOLD} fill="url(#grad-gold)" strokeWidth={2} />
            <Area type="monotone" dataKey="ecommerce" name="E-commerce" stroke="#3B82F6" fill="url(#grad-blue)" strokeWidth={2} />
            <Area type="monotone" dataKey="logistics" name="Logistics" stroke="#10B981" fill="url(#grad-green)" strokeWidth={2} />
            <Area type="monotone" dataKey="sales" name="Sales" stroke="#8B5CF6" fill="url(#grad-purple)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Performance grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="chart-container md:col-span-2">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>AI Automation Impact</h3>
          <div className="space-y-4">
            {[
              { label: 'Real Estate — Listing Descriptions Automated', pct: 94, color: GOLD },
              { label: 'E-commerce — Product Descriptions Generated', pct: 88, color: '#3B82F6' },
              { label: 'Logistics — Delay Notifications Automated', pct: 79, color: '#10B981' },
              { label: 'Sales — Follow-up Emails Automated', pct: 85, color: '#8B5CF6' },
            ].map(item => (
              <div key={item.label}>
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: '#8B9EC7' }}>{item.label}</span>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="h-1.5 rounded-full" style={{ background: '#243054' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${item.pct}%`, background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-container">
          <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest" style={{ color: GOLD }}>Portfolio Health</h3>
          <div className="space-y-3">
            {[
              { label: 'Revenue Growth MoM', value: '+28.4%', good: true },
              { label: 'Active Opportunities', value: '34', good: true },
              { label: 'Automation Rate', value: '87%', good: true },
              { label: 'Overdue Actions', value: '3', good: false },
              { label: 'Critical Alerts', value: '1', good: false },
              { label: 'Closed Deals (Aug)', value: 'AED 8.3M', good: true },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1A2035' }}>
                <span className="text-xs" style={{ color: '#8B9EC7' }}>{item.label}</span>
                <span className="text-xs font-bold" style={{ color: item.good ? '#10B981' : '#EF4444' }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'home', label: 'Overview', icon: Home },
  { id: 'realestate', label: 'Real Estate', icon: Building2 },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingCart },
  { id: 'logistics', label: 'Logistics', icon: Truck },
  { id: 'sales', label: 'Sales CRM', icon: Users },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen" style={{ background: '#060A14' }}>
      {/* Top Bar */}
      <header style={{ background: '#0A0F1E', borderBottom: '1px solid #1A2035' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm" style={{ background: GOLD, color: '#0A0F1E' }}>MI</div>
            <div>
              <div className="font-bold text-sm" style={{ color: '#E8E8E8', lineHeight: 1.2 }}>AI Ops Dashboard</div>
              <div className="text-xs" style={{ color: '#8B9EC7' }}>Mohammad Irfan · Dubai</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="pulse-dot" />
            <span className="text-xs hidden sm:block" style={{ color: '#8B9EC7' }}>Live · Aug 2024</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'home' && <HomeTab onTabChange={setActiveTab} />}
        {activeTab === 'realestate' && <RealEstateTab />}
        {activeTab === 'ecommerce' && <EcommerceTab />}
        {activeTab === 'logistics' && <LogisticsTab />}
        {activeTab === 'sales' && <SalesTab />}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 py-6 mt-4" style={{ borderTop: '1px solid #1A2035' }}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs" style={{ color: '#8B9EC7' }}>© 2024 Mohammad Irfan · AI-Powered Operations Portfolio · Dubai, UAE</p>
          <p className="text-xs" style={{ color: '#8B9EC7' }}>Built with React · Claude AI · Deployed on Vercel</p>
        </div>
      </footer>
    </div>
  );
}
