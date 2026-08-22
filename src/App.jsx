import React, { useState, useCallback } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  Home, Building2, ShoppingCart, Truck, Users,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  Clock, X, Sparkles, BarChart2, DollarSign, MapPin, Pencil
} from 'lucide-react';

const GOLD = '#D4AF37';
const CHART_COLORS = ['#D4AF37', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

// ─── STATUS OPTIONS ────────────────────────────────────────────────────────────
const RE_STATUSES = ['Active', 'Under Offer', 'Sold', 'Expired'];
const ECOM_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Cancelled'];
const LOG_STATUSES = ['On Route', 'Delayed', 'Delivered', 'Critical'];
const SALES_STAGES = ['Discovery', 'Proposal Sent', 'Negotiation', 'Closed Won', 'Closed Lost'];

const STATUS_COLOR = {
  'Active':'green','Under Offer':'amber','Sold':'green','Expired':'red',
  'Delivered':'green','Processing':'amber','Shipped':'amber','Cancelled':'red',
  'On Route':'green','Delayed':'amber','Critical':'red',
  'Negotiation':'amber','Proposal Sent':'amber','Discovery':'amber',
  'Closed Won':'green','Closed Lost':'red',
};

// ─── INITIAL DATA ──────────────────────────────────────────────────────────────
const INIT_RE = [
  { id:'P001', name:'Marina Gate Tower 3 — 2BR', agent:'Omar Al Rashidi', location:'Dubai Marina', price:2850000, status:'Active', leads:18 },
  { id:'P002', name:'Downtown Burj Vista — 1BR', agent:'Sarah Mitchell', location:'Downtown Dubai', price:1950000, status:'Under Offer', leads:24 },
  { id:'P003', name:'JBR Sadaf 6 — Studio', agent:'Khalid Al Mansoori', location:'JBR', price:980000, status:'Active', leads:9 },
  { id:'P004', name:'Business Bay — 3BR Penthouse', agent:'Priya Sharma', location:'Business Bay', price:5400000, status:'Sold', leads:41 },
  { id:'P005', name:'Palm Jumeirah Frond — 4BR Villa', agent:'Ahmed Al Suwaidi', location:'Palm Jumeirah', price:12800000, status:'Active', leads:53 },
  { id:'P006', name:'DIFC Index Tower — 2BR', agent:'Jessica Wong', location:'DIFC', price:3200000, status:'Under Offer', leads:19 },
  { id:'P007', name:'JVC — 3BR Townhouse', agent:'Faisal Al Hamad', location:'JVC', price:1650000, status:'Active', leads:12 },
  { id:'P008', name:'Emaar Beachfront — 1BR Sea View', agent:'Noor Al Zaabi', location:'Emaar Beachfront', price:2100000, status:'Expired', leads:3 },
];

const INIT_ECOM = [
  { id:'ORD-8821', customer:'Layla Al Farsi', product:'Apple Watch Ultra 2', value:3299, status:'Delivered', location:'Al Barsha' },
  { id:'ORD-8822', customer:'James Patterson', product:'Samsung 65" QLED TV', value:5499, status:'Processing', location:'Downtown' },
  { id:'ORD-8823', customer:'Fatima Al Blooshi', product:'Dyson V15 Detect', value:2799, status:'Shipped', location:'Jumeirah' },
  { id:'ORD-8824', customer:'Raj Patel', product:'Nike Air Max 2024', value:799, status:'Delivered', location:'Silicon Oasis' },
  { id:'ORD-8825', customer:'Aisha Al Marzooqi', product:'Nespresso Expert Coffee', value:1299, status:'Cancelled', location:'Mirdif' },
  { id:'ORD-8826', customer:'Michael Chen', product:'iPad Pro M4 12.9"', value:4999, status:'Processing', location:'DIFC' },
  { id:'ORD-8827', customer:'Mariam Al Kaabi', product:'Bosch Refrigerator 500L', value:3799, status:'Shipped', location:'Abu Hail' },
  { id:'ORD-8828', customer:'David Williams', product:'Sony WH-1000XM6', value:1599, status:'Delivered', location:'JBR' },
];

const INIT_LOG = [
  { id:'SHP-4401', origin:'Jebel Ali Port', destination:'Business Bay', driver:'Hassan Al Matroushi', ETA:'14:30', status:'On Route', cargo:'Electronics 2.4T', delay:0 },
  { id:'SHP-4402', origin:'DIP Warehouse', destination:'Dubai Marina', driver:'Suresh Kumar', ETA:'15:00', status:'Delayed', cargo:'Furniture 1.8T', delay:45 },
  { id:'SHP-4403', origin:'Dragon Mart', destination:'Mirdif City Centre', driver:'Ali Al Jabri', ETA:'13:15', status:'Delivered', cargo:'Retail Goods 0.9T', delay:0 },
  { id:'SHP-4404', origin:'Al Quoz Hub', destination:'Palm Jumeirah', driver:'Rajesh Nair', ETA:'16:45', status:'On Route', cargo:'Luxury Items 0.3T', delay:0 },
  { id:'SHP-4405', origin:'Sharjah Depot', destination:'DAFZA Free Zone', driver:'Mohammed Al Khuri', ETA:'12:00', status:'Delayed', cargo:'Chemicals 3.1T', delay:90 },
  { id:'SHP-4406', origin:'Jebel Ali Port', destination:'Al Quoz Industrial', driver:'Vikram Singh', ETA:'17:30', status:'On Route', cargo:'Construction 5.2T', delay:0 },
  { id:'SHP-4407', origin:'DWC Cargo Hub', destination:'Downtown Dubai', driver:'Omar Al Saeed', ETA:'11:45', status:'Delivered', cargo:'Food Grade 1.1T', delay:0 },
  { id:'SHP-4408', origin:'RAKEZ Depot', destination:'JBR Walk', driver:'Pradeep Thomas', ETA:'18:00', status:'Critical', cargo:'Perishables 0.8T', delay:120 },
];

const INIT_SALES = [
  { id:'L-3301', name:'Omar Al Rashidi', company:'Al Futtaim Group', value:485000, stage:'Proposal Sent', source:'LinkedIn', probability:75 },
  { id:'L-3302', name:'Sarah Mitchell', company:'Emaar Properties', value:1200000, stage:'Negotiation', source:'Referral', probability:85 },
  { id:'L-3303', name:'Khalid Al Mansoori', company:'DAMAC Holdings', value:890000, stage:'Discovery', source:'Event', probability:35 },
  { id:'L-3304', name:'Priya Sharma', company:'Noon Digital', value:320000, stage:'Closed Won', source:'Cold Outreach', probability:100 },
  { id:'L-3305', name:'Ahmed Al Suwaidi', company:'DP World', value:2100000, stage:'Proposal Sent', source:'Website', probability:60 },
  { id:'L-3306', name:'Jessica Wong', company:'Carrefour UAE', value:560000, stage:'Discovery', source:'LinkedIn', probability:40 },
  { id:'L-3307', name:'Faisal Al Hamad', company:'Emirates NBD', value:780000, stage:'Negotiation', source:'Referral', probability:80 },
  { id:'L-3308', name:'Noor Al Zaabi', company:'Etisalat (e&)', value:1450000, stage:'Closed Lost', source:'Event', probability:0 },
];

// ─── CHART STATIC DATA ─────────────────────────────────────────────────────────
const RE_BAR = [{month:'Mar',listings:12,sold:4},{month:'Apr',listings:18,sold:7},{month:'May',listings:15,sold:5},{month:'Jun',listings:22,sold:9},{month:'Jul',listings:28,sold:12},{month:'Aug',listings:31,sold:14}];
const RE_PIE = [{name:'Apartments',value:48},{name:'Villas',value:22},{name:'Townhouses',value:15},{name:'Penthouses',value:9},{name:'Studios',value:6}];
const ECOM_BAR = [{day:'Mon',orders:142,revenue:89400},{day:'Tue',orders:168,revenue:112800},{day:'Wed',orders:195,revenue:143200},{day:'Thu',orders:221,revenue:167900},{day:'Fri',orders:287,revenue:198400},{day:'Sat',orders:334,revenue:241600},{day:'Sun',orders:256,revenue:178300}];
const ECOM_PIE = [{name:'Electronics',value:42},{name:'Home & Living',value:24},{name:'Fashion',value:18},{name:'Sports',value:10},{name:'Other',value:6}];
const LOG_BAR = [{zone:'Marina',deliveries:48,onTime:44},{zone:'Downtown',deliveries:62,onTime:58},{zone:'Biz Bay',deliveries:71,onTime:65},{zone:'JBR',deliveries:39,onTime:37},{zone:'DIFC',deliveries:53,onTime:50},{zone:'JVC',deliveries:44,onTime:41}];
const LOG_PIE = [{name:'On Time',value:67},{name:'Delayed <1hr',value:18},{name:'Delayed >1hr',value:11},{name:'Critical',value:4}];
const SALES_BAR = [{rep:'Omar',target:500,achieved:485},{rep:'Sarah',target:800,achieved:920},{rep:'Khalid',target:600,achieved:410},{rep:'Priya',target:400,achieved:380},{rep:'Ahmed',target:1000,achieved:750},{rep:'Jessica',target:450,achieved:390}];
const SALES_PIE = [{name:'Negotiation',value:28},{name:'Proposal Sent',value:35},{name:'Discovery',value:20},{name:'Closed Won',value:12},{name:'Closed Lost',value:5}];
const HOME_REV = [{month:'Mar',re:18.2,ec:12.4,lg:8.1,sa:9.3},{month:'Apr',re:31.5,ec:15.8,lg:9.4,sa:11.2},{month:'May',re:22.8,ec:19.2,lg:10.8,sa:13.7},{month:'Jun',re:47.3,ec:24.1,lg:12.3,sa:18.4},{month:'Jul',re:61.1,ec:28.7,lg:15.6,sa:22.1},{month:'Aug',re:78.4,ec:33.9,lg:18.2,sa:28.6}];

// ─── SHARED UI ─────────────────────────────────────────────────────────────────
function Badge({s}){
  const t=STATUS_COLOR[s]||'amber';
  return <span className={`status-${t} text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap`}>{s}</span>;
}

function KPI({label,value,sub,icon:Icon,trend,color=GOLD}){
  const up=trend>=0;
  return(
    <div className="kpi-card">
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:`${color}18`}}><Icon size={16} style={{color}}/></div>
      </div>
      <div className="text-2xl font-bold mb-1" style={{color}}>{value}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-slate-400">{sub}</span>
        {trend!==undefined&&<span className={`text-xs font-semibold flex items-center gap-0.5 ${up?'text-emerald-600':'text-red-500'}`}>{up?<TrendingUp size={11}/>:<TrendingDown size={11}/>}{Math.abs(trend)}%</span>}
      </div>
    </div>
  );
}

function Tip({active,payload,label}){
  if(!active||!payload?.length)return null;
  return(
    <div className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg text-xs">
      <p className="font-bold mb-1" style={{color:GOLD}}>{label}</p>
      {payload.map((p,i)=><p key={i} style={{color:p.color}} className="my-0.5">{p.name}: <strong>{p.value?.toLocaleString()}</strong></p>)}
    </div>
  );
}

function ChartBox({title,children}){
  return(
    <div className="chart-container">
      <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:GOLD}}>{title}</h3>
      {children}
    </div>
  );
}

function AIModal({title,content,onClose}){
  return(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2"><Sparkles size={18} style={{color:GOLD}}/><span className="font-bold text-sm uppercase tracking-widest" style={{color:GOLD}}>AI Generated Content</span></div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-100 hover:bg-slate-200 transition-colors"><X size={16} className="text-slate-600"/></button>
        </div>
        <h3 className="font-bold text-base mb-4 text-slate-800">{title}</h3>
        <div className="text-sm leading-relaxed whitespace-pre-wrap text-slate-600">{content}</div>
      </div>
    </div>
  );
}

// ─── EDITABLE CELL ─────────────────────────────────────────────────────────────
function EditCell({value, onChange, type='text', width}){
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    setEditing(false);
    const parsed = type==='number' ? (parseFloat(draft.replace(/,/g,''))||0) : draft;
    if(parsed !== value) onChange(parsed);
  };

  if(editing){
    return(
      <input
        autoFocus
        className="border border-yellow-400 rounded px-2 py-1 text-sm outline-none bg-yellow-50"
        style={{width: width||'100%', minWidth:80}}
        value={draft}
        onChange={e=>setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e=>{ if(e.key==='Enter') commit(); if(e.key==='Escape'){ setEditing(false); setDraft(String(value)); } }}
      />
    );
  }

  return(
    <span
      onClick={()=>{ setDraft(String(value)); setEditing(true); }}
      className="cursor-pointer group inline-flex items-center gap-1 hover:text-yellow-600 transition-colors"
      title="Click to edit"
    >
      {type==='number' ? Number(value).toLocaleString() : value}
      <Pencil size={10} className="opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0"/>
    </span>
  );
}

// ─── STATUS SELECT ─────────────────────────────────────────────────────────────
function StatusSelect({value, options, onChange}){
  const t=STATUS_COLOR[value]||'amber';
  return(
    <select
      value={value}
      onChange={e=>onChange(e.target.value)}
      className={`status-${t} text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer`}
      style={{appearance:'none',paddingRight:8}}
    >
      {options.map(o=><option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ─── AI CONTENT GENERATOR (based on live row data) ────────────────────────────
function genREListing(p){
  return `✦ AI Generated Listing — ${p.name}\n\nDiscover an exceptional ${p.name.includes('Villa')?'villa':'residence'} in ${p.location}, offered at AED ${Number(p.price).toLocaleString()}. This is a rare opportunity in one of Dubai's most sought-after addresses.\n\nKey Features:\n• Prime location in ${p.location} with excellent connectivity\n• Premium finishes and modern design throughout\n• Access to world-class community amenities\n• Strong investment profile with consistent rental demand\n• Managed by ${p.agent}\n\nWith ${p.leads} active leads already registered for this property, buyer interest is strong. ${p.status==='Active'?'Available for immediate viewing — contact us today.':p.status==='Under Offer'?'Currently under offer. Register your interest for similar properties.':p.status==='Sold'?'Sold — a testament to strong market demand.':'Listing expired. Re-list now to capture renewed market interest.'}\n\nPriced at AED ${Number(p.price).toLocaleString()}, this represents compelling value in the ${p.location} market.`;
}

function genEcomDesc(o){
  return `✦ AI Generated — ${o.product}\n\nPremium quality meets everyday performance. The ${o.product} is now available for delivery to ${o.location} and across the UAE.\n\nWhy You'll Love It:\n• Best-in-class performance and durability\n• Backed by full UAE warranty and after-sales support\n• Fast delivery to ${o.location} and all Emirates\n• Trusted by thousands of UAE customers\n• Value pricing at AED ${Number(o.value).toLocaleString()}\n\nOrder Status: ${o.status}\nDelivery Zone: ${o.location}\n\n${o.status==='Delivered'?'✓ Successfully delivered to your doorstep.':o.status==='Processing'?'⏳ Order confirmed and being processed for dispatch.':o.status==='Shipped'?'🚚 On its way — expect delivery within 24 hours.':'This order was cancelled. Re-order anytime at the same great price.'}\n\n⚡ AED ${Number(o.value).toLocaleString()} — Free delivery across UAE.`;
}

function genLogNotice(s){
  const delayed = s.status==='Delayed'||s.status==='Critical';
  return `${s.status==='Critical'?'⚠️ URGENT — CRITICAL DELAY NOTICE\n\n':''}Dear Valued Customer,\n\n${delayed?`We sincerely apologise for a delay on shipment ${s.id}.`:`Shipment ${s.id} update — ${s.status}.`}\n\nShipment Details:\n• Cargo: ${s.cargo}\n• Route: ${s.origin} → ${s.destination}\n• Driver: ${s.driver}\n• ETA: ${s.ETA}${s.delay>0?` (delayed ${s.delay} min)`:' ✓ On schedule'}\n• Status: ${s.status}\n\n${s.status==='On Route'?'Your shipment is progressing on schedule. You will receive an SMS notification upon arrival.':s.status==='Delivered'?'Your shipment has been delivered successfully. Please inspect goods and notify us within 24 hours of any discrepancies.':s.status==='Critical'?`This is a critical situation. A replacement vehicle has been dispatched. Cold chain / cargo integrity is being monitored. Please call immediately: +971 4 000 1234`:`Our team has been notified and is actively working to resolve the delay. Updates will be provided every 30 minutes.`}\n\nFor queries: +971 4 000 1234 | ops@dubaifastlog.ae\n\nBest regards,\nOperations Team | Dubai FastLog`;
}

function genSalesEmail(l){
  return `Subject: Following Up — ${l.company} Partnership\n\nDear ${l.name.split(' ')[0]},\n\nThank you for your time and continued engagement. I'm following up on our discussion regarding the ${l.company} partnership opportunity.\n\nCurrent Status: ${l.stage}\nDeal Value: AED ${Number(l.value).toLocaleString()}\nProbability: ${l.probability}%\n\n${l.stage==='Discovery'?`I'd love to schedule a deeper discovery session to understand ${l.company}'s specific requirements and show you exactly how we can add value. Would a 45-minute call this week work?`:l.stage==='Proposal Sent'?`Our proposal of AED ${Number(l.value).toLocaleString()} is now with you for review. I'm happy to walk through any questions with your team — would a brief call help clarify any points before you make your decision?`:l.stage==='Negotiation'?`We're close to finalising terms that work for both parties. I've reviewed the points raised and can confirm we can accommodate the key requests. Shall we target signing by end of this week?`:l.stage==='Closed Won'?`Welcome aboard! We're thrilled to partner with ${l.company}. Your onboarding team will be in touch within 48 hours to get you set up.`:`Thank you for giving us the opportunity to present to ${l.company}. While the timing wasn't right on this occasion, I'd love to stay in touch for future opportunities.`}\n\nSource: ${l.source} | I remain fully available at your convenience.\n\nWarm regards,\nMohammad Irfan\n+971 50 000 0000`;
}

const AI_WEEKLY = `╔══════════════════════════════════════════════════════════════╗
║     WEEKLY OPERATIONS REPORT — MOHAMMAD IRFAN               ║
║     AI Ops Portfolio | Dubai, UAE | August 2024             ║
╚══════════════════════════════════════════════════════════════╝

EXECUTIVE SUMMARY
─────────────────
August 2024 is the strongest month on record across all four operational verticals. Combined portfolio value has crossed AED 40M in active opportunities, with AI automation contributing to an 87% reduction in manual content generation time.

KEY WINS THIS WEEK
──────────────────
✓ Real Estate: Palm Jumeirah Villa (AED 12.8M) attracted 53 new leads — highest single-property engagement on record. Two properties under offer expected to close by month-end.

✓ E-commerce: Friday achieved AED 241,600 in single-day revenue — a new weekly peak. Fulfilment rate held at 87.5% despite volume surge.

✓ Logistics: Business Bay zone delivered 65/71 shipments on time (91.5% SLA). Driver Hassan Al Matroushi logged zero delays across 12 consecutive runs.

✓ Sales CRM: Emirates NBD deal (AED 780,000) moved to final negotiation. Noon Digital (AED 320,000) closed — onboarding confirmed September 15th.

CONCERNS & RISKS
────────────────
⚠ Logistics: JBR perishables (SHP-4408) experienced a 120-minute critical delay — vehicle breakdown. Cold chain maintained but fleet audit recommended.

⚠ Sales: Etisalat (e&) deal AED 1.45M closed lost — largest single loss this quarter. Win/loss analysis required.

⚠ E-commerce: Cancellation rate at 12.5% — above 10% target. Root cause: Mirdif delivery zone delays.

AI AUTOMATION IMPACT
────────────────────
• 94% of real estate listing descriptions generated by AI
• 88% of product descriptions automated — avg 4.2 min saved per SKU
• 79% of logistics delay notifications sent without human drafting
• 85% of sales follow-up emails AI-generated and personalised
• Estimated weekly time saved: 31 hours across all verticals

RECOMMENDED ACTIONS — NEXT WEEK
────────────────────────────────
1. Audit refrigerated fleet — prevent repeat of SHP-4408 breakdown
2. Win/loss debrief on Etisalat loss — identify gaps for future telco deals
3. Investigate Mirdif zone cancellation spike — consider dedicated driver
4. Fast-track Business Bay Penthouse (P004) — buyer showing strong intent
5. Prepare DP World port reference call — highest value active deal AED 2.1M

─────────────────────────────────────────────────────────────
Report generated by AI Ops Dashboard | Mohammad Irfan
MBA Finance | Dubai Operations Specialist | Available Immediately
─────────────────────────────────────────────────────────────`;

// ─── REAL ESTATE TAB ──────────────────────────────────────────────────────────
function RealEstateTab(){
  const [rows, setRows] = useState(INIT_RE);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);

  const updateRow = (id, field, value) => {
    setRows(prev => prev.map(r => r.id===id ? {...r, [field]:value} : r));
  };

  const filtered = filter==='All' ? rows : rows.filter(r=>r.status===filter);

  const activeCount = rows.filter(r=>r.status==='Active').length;
  const totalValue = rows.reduce((s,r)=>s+Number(r.price),0);
  const totalLeads = rows.reduce((s,r)=>s+Number(r.leads),0);
  const avgLeads = Math.round(totalLeads/rows.length);
  const soldCount = rows.filter(r=>r.status==='Sold').length;
  const convRate = ((soldCount/rows.length)*100).toFixed(1);

  return(
    <div className="space-y-6">
      {modal&&<AIModal title={`Listing: ${modal.name}`} content={genREListing(modal)} onClose={()=>setModal(null)}/>}

      <div className="edit-hint">✎ Click any value in the table below to edit it live — KPIs and AI content update instantly</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Active Listings" value={activeCount} sub="Properties live" icon={Building2} trend={12}/>
        <KPI label="Portfolio Value" value={`AED ${(totalValue/1e6).toFixed(1)}M`} sub="Auto-calculated" icon={DollarSign} trend={8}/>
        <KPI label="Avg Leads / Listing" value={avgLeads} sub="Auto-calculated" icon={Users} trend={5}/>
        <KPI label="Conversion Rate" value={`${convRate}%`} sub="Listed → Sold" icon={TrendingUp} trend={3}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartBox title="Monthly Listings & Sales">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={RE_BAR} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5"/>
              <XAxis dataKey="month" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,color:'#94A3B8'}}/>
              <Bar dataKey="listings" name="Listings" fill="#3B82F6" radius={[4,4,0,0]}/>
              <Bar dataKey="sold" name="Sold" fill={GOLD} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Property Type Mix">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={RE_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {RE_PIE.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}
              </Pie>
              <Tooltip content={<Tip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>Active Portfolio — Click any cell to edit</h3>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">
            {['All',...RE_STATUSES].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Property</th><th>Agent</th><th>Location</th><th>Price (AED)</th><th>Leads</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id}>
                  <td className="text-slate-400">{r.id}</td>
                  <td style={{minWidth:160}}><EditCell value={r.name} onChange={v=>updateRow(r.id,'name',v)}/></td>
                  <td><EditCell value={r.agent} onChange={v=>updateRow(r.id,'agent',v)}/></td>
                  <td><span className="flex items-center gap-1"><MapPin size={10} style={{color:GOLD}}/><EditCell value={r.location} onChange={v=>updateRow(r.id,'location',v)}/></span></td>
                  <td className="font-bold" style={{color:GOLD}}><EditCell value={r.price} type="number" onChange={v=>updateRow(r.id,'price',v)} width={100}/></td>
                  <td><EditCell value={r.leads} type="number" onChange={v=>updateRow(r.id,'leads',v)} width={50}/></td>
                  <td><StatusSelect value={r.status} options={RE_STATUSES} onChange={v=>updateRow(r.id,'status',v)}/></td>
                  <td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Write Listing</button></td>
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
function EcommerceTab(){
  const [rows, setRows] = useState(INIT_ECOM);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);

  const updateRow = (id, field, value) => setRows(prev=>prev.map(r=>r.id===id?{...r,[field]:value}:r));
  const filtered = filter==='All' ? rows : rows.filter(r=>r.status===filter);

  const totalRev = rows.reduce((s,r)=>s+Number(r.value),0);
  const avgOrder = Math.round(totalRev/rows.length);
  const delivered = rows.filter(r=>r.status==='Delivered').length;
  const fulfilRate = ((delivered/rows.length)*100).toFixed(0);

  return(
    <div className="space-y-6">
      {modal&&<AIModal title={`Product: ${modal.product}`} content={genEcomDesc(modal)} onClose={()=>setModal(null)}/>}

      <div className="edit-hint">✎ Click any value in the table below to edit it live — KPIs update instantly</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Orders Today" value={rows.length} sub="Total orders" icon={ShoppingCart} trend={14} color="#3B82F6"/>
        <KPI label="Revenue (AED)" value={`${(totalRev/1000).toFixed(1)}K`} sub="Auto-calculated" icon={DollarSign} trend={9}/>
        <KPI label="Avg Order Value" value={`AED ${avgOrder.toLocaleString()}`} sub="Auto-calculated" icon={TrendingUp} trend={6} color="#10B981"/>
        <KPI label="Fulfilment Rate" value={`${fulfilRate}%`} sub="Auto-calculated" icon={CheckCircle} trend={2} color="#8B5CF6"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartBox title="Weekly Orders & Revenue">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ECOM_BAR}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5"/>
              <XAxis dataKey="day" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="l" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis yAxisId="r" orientation="right" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,color:'#94A3B8'}}/>
              <Bar yAxisId="l" dataKey="orders" name="Orders" fill="#3B82F6" radius={[4,4,0,0]}/>
              <Bar yAxisId="r" dataKey="revenue" name="Revenue" fill={GOLD} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Category Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={ECOM_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {ECOM_PIE.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}
              </Pie>
              <Tooltip content={<Tip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>Order Management — Click any cell to edit</h3>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">
            {['All',...ECOM_STATUSES].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Value (AED)</th><th>Location</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id}>
                  <td className="text-slate-400">{r.id}</td>
                  <td><EditCell value={r.customer} onChange={v=>updateRow(r.id,'customer',v)}/></td>
                  <td style={{minWidth:160}}><EditCell value={r.product} onChange={v=>updateRow(r.id,'product',v)}/></td>
                  <td className="font-bold" style={{color:GOLD}}><EditCell value={r.value} type="number" onChange={v=>updateRow(r.id,'value',v)} width={80}/></td>
                  <td><EditCell value={r.location} onChange={v=>updateRow(r.id,'location',v)}/></td>
                  <td><StatusSelect value={r.status} options={ECOM_STATUSES} onChange={v=>updateRow(r.id,'status',v)}/></td>
                  <td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Write Desc</button></td>
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
function LogisticsTab(){
  const [rows, setRows] = useState(INIT_LOG);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);

  const updateRow = (id, field, value) => setRows(prev=>prev.map(r=>r.id===id?{...r,[field]:value}:r));
  const filtered = filter==='All' ? rows : rows.filter(r=>r.status===filter);

  const onTime = rows.filter(r=>r.status==='On Route'||r.status==='Delivered').length;
  const delayed = rows.filter(r=>r.status==='Delayed').length;
  const critical = rows.filter(r=>r.status==='Critical').length;
  const onTimeRate = ((onTime/rows.length)*100).toFixed(0);

  return(
    <div className="space-y-6">
      {modal&&<AIModal title={`Notice: ${modal.id}`} content={genLogNotice(modal)} onClose={()=>setModal(null)}/>}

      <div className="edit-hint">✎ Click any value in the table below to edit it live — KPIs update instantly</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Shipments" value={rows.length} sub="Active today" icon={Truck} trend={7} color="#3B82F6"/>
        <KPI label="On-Time Rate" value={`${onTimeRate}%`} sub="Auto-calculated" icon={CheckCircle} trend={3} color="#10B981"/>
        <KPI label="Delayed" value={delayed} sub="Need attention" icon={Clock} trend={-8} color="#D97706"/>
        <KPI label="Critical Alerts" value={critical} sub="Urgent escalation" icon={AlertCircle} trend={-15} color="#DC2626"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartBox title="Deliveries by Zone">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={LOG_BAR}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5"/>
              <XAxis dataKey="zone" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,color:'#94A3B8'}}/>
              <Bar dataKey="deliveries" name="Total" fill="#3B82F6" radius={[4,4,0,0]}/>
              <Bar dataKey="onTime" name="On Time" fill={GOLD} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Delivery Status Mix">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={LOG_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {LOG_PIE.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}
              </Pie>
              <Tooltip content={<Tip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>Live Shipment Tracker — Click any cell to edit</h3>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">
            {['All',...LOG_STATUSES].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>SHP ID</th><th>Origin</th><th>Destination</th><th>Driver</th><th>Cargo</th><th>ETA</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id}>
                  <td className="text-slate-400">{r.id}</td>
                  <td><EditCell value={r.origin} onChange={v=>updateRow(r.id,'origin',v)}/></td>
                  <td><EditCell value={r.destination} onChange={v=>updateRow(r.id,'destination',v)}/></td>
                  <td><EditCell value={r.driver} onChange={v=>updateRow(r.id,'driver',v)}/></td>
                  <td><EditCell value={r.cargo} onChange={v=>updateRow(r.id,'cargo',v)}/></td>
                  <td className="font-bold" style={{color:r.delay>0?'#D97706':'#059669'}}><EditCell value={r.ETA} onChange={v=>updateRow(r.id,'ETA',v)} width={60}/></td>
                  <td><StatusSelect value={r.status} options={LOG_STATUSES} onChange={v=>updateRow(r.id,'status',v)}/></td>
                  <td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Notify</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SALES TAB ────────────────────────────────────────────────────────────────
function SalesTab(){
  const [rows, setRows] = useState(INIT_SALES);
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(null);

  const updateRow = (id, field, value) => setRows(prev=>prev.map(r=>r.id===id?{...r,[field]:value}:r));
  const filtered = filter==='All' ? rows : rows.filter(r=>r.stage===filter);

  const pipeline = rows.reduce((s,r)=>s+Number(r.value),0);
  const won = rows.filter(r=>r.stage==='Closed Won').reduce((s,r)=>s+Number(r.value),0);
  const winCount = rows.filter(r=>r.stage==='Closed Won').length;
  const winRate = ((winCount/rows.length)*100).toFixed(0);
  const avgDeal = Math.round(pipeline/rows.length);

  return(
    <div className="space-y-6">
      {modal&&<AIModal title={`Follow-Up: ${modal.name} @ ${modal.company}`} content={genSalesEmail(modal)} onClose={()=>setModal(null)}/>}

      <div className="edit-hint">✎ Click any value in the table below to edit it live — KPIs update instantly</div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Pipeline Value" value={`AED ${(pipeline/1e6).toFixed(1)}M`} sub="Auto-calculated" icon={DollarSign} trend={18}/>
        <KPI label="Revenue Closed" value={`AED ${(won/1000).toFixed(0)}K`} sub="Auto-calculated" icon={CheckCircle} trend={22} color="#10B981"/>
        <KPI label="Win Rate" value={`${winRate}%`} sub="Auto-calculated" icon={TrendingUp} trend={5} color="#8B5CF6"/>
        <KPI label="Avg Deal Size" value={`AED ${(avgDeal/1000).toFixed(0)}K`} sub="Auto-calculated" icon={BarChart2} trend={11} color="#3B82F6"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartBox title="Target vs Achieved (AED K)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SALES_BAR}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5"/>
              <XAxis dataKey="rep" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
              <Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,color:'#94A3B8'}}/>
              <Bar dataKey="target" name="Target" fill="#E2E8F0" radius={[4,4,0,0]}/>
              <Bar dataKey="achieved" name="Achieved" fill={GOLD} radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartBox>
        <ChartBox title="Pipeline Stage Distribution">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={SALES_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {SALES_PIE.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}
              </Pie>
              <Tooltip content={<Tip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>CRM Pipeline — Click any cell to edit</h3>
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">
            {['All',...SALES_STAGES].map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Contact</th><th>Company</th><th>Value (AED)</th><th>Stage</th><th>Probability %</th><th>Source</th><th>AI Action</th></tr></thead>
            <tbody>
              {filtered.map(r=>(
                <tr key={r.id}>
                  <td className="text-slate-400">{r.id}</td>
                  <td><EditCell value={r.name} onChange={v=>updateRow(r.id,'name',v)}/></td>
                  <td><EditCell value={r.company} onChange={v=>updateRow(r.id,'company',v)}/></td>
                  <td className="font-bold" style={{color:GOLD}}><EditCell value={r.value} type="number" onChange={v=>updateRow(r.id,'value',v)} width={90}/></td>
                  <td><StatusSelect value={r.stage} options={SALES_STAGES} onChange={v=>updateRow(r.id,'stage',v)}/></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 rounded-full bg-slate-100" style={{width:50}}>
                        <div className="h-full rounded-full" style={{width:`${r.probability}%`,background:r.probability>=70?'#059669':r.probability>=40?'#D97706':'#DC2626'}}/>
                      </div>
                      <EditCell value={r.probability} type="number" onChange={v=>updateRow(r.id,'probability',Math.min(100,Math.max(0,Number(v))))} width={40}/>
                    </div>
                  </td>
                  <td><EditCell value={r.source} onChange={v=>updateRow(r.id,'source',v)}/></td>
                  <td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Email</button></td>
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
function HomeTab({onTabChange}){
  const [modal,setModal]=useState(false);
  const metrics=[
    {label:'Real Estate Portfolio',value:'AED 31.4M',sub:'8 Properties',color:GOLD,icon:Building2,tab:'realestate'},
    {label:'E-com Revenue (Week)',value:'AED 1.13M',sub:'1,403 Orders',color:'#3B82F6',icon:ShoppingCart,tab:'ecommerce'},
    {label:'Logistics On-Time',value:'62.5%',sub:'8 Active Shipments',color:'#10B981',icon:Truck,tab:'logistics'},
    {label:'Sales Pipeline',value:'AED 7.78M',sub:'8 Active Leads',color:'#8B5CF6',icon:Users,tab:'sales'},
  ];
  return(
    <div className="space-y-6">
      {modal&&<AIModal title="Weekly Operations Report — Mohammad Irfan" content={AI_WEEKLY} onClose={()=>setModal(false)}/>}
      <div className="rounded-2xl p-6 md:p-8 relative overflow-hidden" style={{background:'linear-gradient(135deg,#FFFDF0 0%,#FFF9E6 100%)',border:'2px solid #D4AF37'}}>
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{background:GOLD,transform:'translate(30%,-30%)'}}/>
        <div className="relative">
          <div className="flex items-center gap-2 mb-2"><span className="pulse-dot"/><span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Live Dashboard — Dubai Operations</span></div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 text-slate-800">Mohammad Irfan &nbsp;<span className="gradient-text">AI Ops Portfolio</span></h1>
          <p className="text-sm md:text-base mb-6 text-slate-500">MBA Finance · Dubai · AI-Powered Operations Specialist</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Real Estate Ops','E-commerce Ops','Logistics Ops','Sales Coordination'].map(t=>(
              <span key={t} className="text-xs px-3 py-1 rounded-full font-semibold" style={{background:`${GOLD}20`,color:'#B8960A',border:`1px solid ${GOLD}50`}}>{t}</span>
            ))}
          </div>
          <button className="ai-btn" onClick={()=>setModal(true)}>✦ Generate Weekly Report</button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map(m=>(
          <div key={m.label} className="kpi-card cursor-pointer" onClick={()=>onTabChange(m.tab)}>
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{m.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:`${m.color}18`}}><m.icon size={16} style={{color:m.color}}/></div>
            </div>
            <div className="text-xl font-bold mb-1" style={{color:m.color}}>{m.value}</div>
            <div className="text-xs text-slate-400">{m.sub}</div>
          </div>
        ))}
      </div>
      <div className="chart-container">
        <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:GOLD}}>Cross-Industry Revenue Trend — AED Millions</h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={HOME_REV}>
            <defs>
              {[['g',GOLD],['b','#3B82F6'],['gr','#10B981'],['p','#8B5CF6']].map(([id,c])=>(
                <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={c} stopOpacity={0.2}/><stop offset="95%" stopColor={c} stopOpacity={0.01}/>
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5"/>
            <XAxis dataKey="month" tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fill:'#94A3B8',fontSize:11}} axisLine={false} tickLine={false}/>
            <Tooltip content={<Tip/>}/><Legend wrapperStyle={{fontSize:11,color:'#94A3B8'}}/>
            <Area type="monotone" dataKey="re" name="Real Estate" stroke={GOLD} fill="url(#g-g)" strokeWidth={2}/>
            <Area type="monotone" dataKey="ec" name="E-commerce" stroke="#3B82F6" fill="url(#g-b)" strokeWidth={2}/>
            <Area type="monotone" dataKey="lg" name="Logistics" stroke="#10B981" fill="url(#g-gr)" strokeWidth={2}/>
            <Area type="monotone" dataKey="sa" name="Sales" stroke="#8B5CF6" fill="url(#g-p)" strokeWidth={2}/>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="chart-container md:col-span-2">
          <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:GOLD}}>AI Automation Impact</h3>
          <div className="space-y-4">
            {[
              {label:'Real Estate — Listing Descriptions Automated',pct:94,color:GOLD},
              {label:'E-commerce — Product Descriptions Generated',pct:88,color:'#3B82F6'},
              {label:'Logistics — Delay Notifications Automated',pct:79,color:'#10B981'},
              {label:'Sales — Follow-up Emails Automated',pct:85,color:'#8B5CF6'},
            ].map(item=>(
              <div key={item.label}>
                <div className="flex justify-between mb-1"><span className="text-xs text-slate-500">{item.label}</span><span className="text-xs font-bold" style={{color:item.color}}>{item.pct}%</span></div>
                <div className="h-1.5 rounded-full bg-slate-100"><div className="h-full rounded-full" style={{width:`${item.pct}%`,background:item.color}}/></div>
              </div>
            ))}
          </div>
        </div>
        <div className="chart-container">
          <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:GOLD}}>Portfolio Health</h3>
          <div className="space-y-3">
            {[
              {label:'Revenue Growth MoM',value:'+28.4%',good:true},
              {label:'Active Opportunities',value:'34',good:true},
              {label:'Automation Rate',value:'87%',good:true},
              {label:'Overdue Actions',value:'3',good:false},
              {label:'Critical Alerts',value:'1',good:false},
              {label:'Closed Deals (Aug)',value:'AED 8.3M',good:true},
            ].map(item=>(
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{item.label}</span>
                <span className="text-xs font-bold" style={{color:item.good?'#059669':'#DC2626'}}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS=[
  {id:'home',label:'Overview',icon:Home},
  {id:'realestate',label:'Real Estate',icon:Building2},
  {id:'ecommerce',label:'E-commerce',icon:ShoppingCart},
  {id:'logistics',label:'Logistics',icon:Truck},
  {id:'sales',label:'Sales CRM',icon:Users},
];

export default function App(){
  const [tab,setTab]=useState('home');
  return(
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white" style={{background:GOLD}}>MI</div>
            <div><div className="font-bold text-sm text-slate-800">AI Ops Dashboard</div><div className="text-xs text-slate-400">Mohammad Irfan · Dubai</div></div>
          </div>
          <div className="flex items-center gap-2"><span className="pulse-dot"/><span className="text-xs text-slate-400 hidden sm:block">Live · Aug 2024</span></div>
        </div>
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${tab===t.id?'tab-active':'tab-inactive'}`}>
                <t.icon size={13}/>{t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        {tab==='home'&&<HomeTab onTabChange={setTab}/>}
        {tab==='realestate'&&<RealEstateTab/>}
        {tab==='ecommerce'&&<EcommerceTab/>}
        {tab==='logistics'&&<LogisticsTab/>}
        {tab==='sales'&&<SalesTab/>}
      </main>
      <footer className="max-w-7xl mx-auto px-4 py-6 mt-4 border-t border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs text-slate-400">© 2024 Mohammad Irfan · AI-Powered Operations Portfolio · Dubai, UAE</p>
          <p className="text-xs text-slate-400">Built with React · Deployed on Vercel</p>
        </div>
      </footer>
    </div>
  );
}
