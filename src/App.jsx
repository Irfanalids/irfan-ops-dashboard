import React, { useState } from 'react';
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

const RE_BAR = [{month:'Mar',listings:12,sold:4},{month:'Apr',listings:18,sold:7},{month:'May',listings:15,sold:5},{month:'Jun',listings:22,sold:9},{month:'Jul',listings:28,sold:12},{month:'Aug',listings:31,sold:14}];
const RE_PIE = [{name:'Apartments',value:48},{name:'Villas',value:22},{name:'Townhouses',value:15},{name:'Penthouses',value:9},{name:'Studios',value:6}];
const ECOM_BAR = [{day:'Mon',orders:142,revenue:89400},{day:'Tue',orders:168,revenue:112800},{day:'Wed',orders:195,revenue:143200},{day:'Thu',orders:221,revenue:167900},{day:'Fri',orders:287,revenue:198400},{day:'Sat',orders:334,revenue:241600},{day:'Sun',orders:256,revenue:178300}];
const ECOM_PIE = [{name:'Electronics',value:42},{name:'Home & Living',value:24},{name:'Fashion',value:18},{name:'Sports',value:10},{name:'Other',value:6}];
const LOG_BAR = [{zone:'Marina',deliveries:48,onTime:44},{zone:'Downtown',deliveries:62,onTime:58},{zone:'Biz Bay',deliveries:71,onTime:65},{zone:'JBR',deliveries:39,onTime:37},{zone:'DIFC',deliveries:53,onTime:50},{zone:'JVC',deliveries:44,onTime:41}];
const LOG_PIE = [{name:'On Time',value:67},{name:'Delayed <1hr',value:18},{name:'Delayed >1hr',value:11},{name:'Critical',value:4}];
const SALES_BAR = [{rep:'Omar',target:500,achieved:485},{rep:'Sarah',target:800,achieved:920},{rep:'Khalid',target:600,achieved:410},{rep:'Priya',target:400,achieved:380},{rep:'Ahmed',target:1000,achieved:750},{rep:'Jessica',target:450,achieved:390}];
const SALES_PIE = [{name:'Negotiation',value:28},{name:'Proposal Sent',value:35},{name:'Discovery',value:20},{name:'Closed Won',value:12},{name:'Closed Lost',value:5}];
const HOME_REV = [{month:'Mar',re:18.2,ec:12.4,lg:8.1,sa:9.3},{month:'Apr',re:31.5,ec:15.8,lg:9.4,sa:11.2},{month:'May',re:22.8,ec:19.2,lg:10.8,sa:13.7},{month:'Jun',re:47.3,ec:24.1,lg:12.3,sa:18.4},{month:'Jul',re:61.1,ec:28.7,lg:15.6,sa:22.1},{month:'Aug',re:78.4,ec:33.9,lg:18.2,sa:28.6}];

// ── SHARED DATA FOR REAL ESTATE BEFORE/AFTER ─────────────────────────────────
const RE_PROPERTIES = [
  { id:'P001', name:'Marina Horizon Tower, Unit 804', area:'Dubai Marina', type:'2BR Apartment', price:'AED 1,850,000', rent:'AED 95,000/yr', status:'Available', agent:'Khalid Al Mansoori' },
  { id:'P002', name:'JVC Green Park, Unit 312', area:'Jumeirah Village Circle', type:'1BR Apartment', price:'AED 720,000', rent:'AED 52,000/yr', status:'Rented', agent:'Priya Sharma' },
  { id:'P003', name:'Downtown Burj View, Unit 1502', area:'Downtown Dubai', type:'3BR Apartment', price:'AED 3,200,000', rent:'AED 160,000/yr', status:'Sold', agent:'Khalid Al Mansoori' },
  { id:'P004', name:'Sports City Residence, Unit 205', area:'Dubai Sports City', type:'Studio', price:'AED 420,000', rent:'AED 35,000/yr', status:'Available', agent:'Fatima Al Zaabi' },
  { id:'P005', name:'Business Bay Canal View, Unit 901', area:'Business Bay', type:'2BR Apartment', price:'AED 1,650,000', rent:'AED 110,000/yr', status:'Available', agent:'Rahul Mehta' },
  { id:'P006', name:'Mirdif Tulip Villas, Villa 7', area:'Mirdif', type:'4BR Villa', price:'AED 2,900,000', rent:'AED 145,000/yr', status:'Rented', agent:'Fatima Al Zaabi' },
];

const RE_LEADS = [
  { id:'L001', name:'Fatima Al Mansoori', source:'Property Finder', interest:'2BR in JVC', budget:'AED 750,000', status:'New', received:'Today, 9:14 AM', score:92, intent:'High', waitTime:'90 sec', agentBrief:'Serious buyer. Budget AED 750K, prefers JVC, ready to view this week. Best contact: evenings.' },
  { id:'L002', name:'James Whitfield', source:'Bayut', interest:'3BR Downtown', budget:'AED 3,000,000', status:'Contacted', received:'Today, 10:32 AM', score:78, intent:'High', waitTime:'85 sec', agentBrief:'Motivated buyer. Relocating from London, needs keys by March. Budget flexible up to 3.2M.' },
  { id:'L003', name:'Aisha Bint Rashid', source:'Instagram DM', interest:'Studio or 1BR', budget:'AED 400,000', status:'Follow-up', received:'Yesterday, 3:05 PM', score:45, intent:'Medium', waitTime:'2 min', agentBrief:'Early stage. First property purchase, needs guidance. Not urgent but engaged.' },
  { id:'L004', name:'Vikram Nair', source:'WhatsApp', interest:'Villa in Mirdif', budget:'AED 2,500,000', status:'New', received:'Today, 7:45 AM', score:88, intent:'High', waitTime:'78 sec', agentBrief:'Family relocation from India. Wife and two kids, school proximity important. Ready to buy Q1.' },
  { id:'L005', name:'Sara Al Hamdan', source:'Referral', interest:'2BR Business Bay', budget:'AED 1,700,000', status:'New', received:'Today, 11:00 AM', score:95, intent:'Very High', waitTime:'60 sec', agentBrief:'Cash buyer. Referred by existing client. Wants to close fast — priority lead.' },
];

const WA_SEQUENCE = [
  { step:1, delay:'Instant', message:'Hi {name}, thanks for enquiring about {property_type} in {area}. I\'m your AI assistant at Kirpa Properties 🏠', type:'Auto' },
  { step:2, delay:'2 min', message:'Based on your budget of {budget}, I\'ve found 3 matching properties. Shall I send the details now?', type:'Auto' },
  { step:3, delay:'No reply — 4 hrs', message:'Hi {name}, our agent {agent_name} has availability for a viewing this week. Thursday or Friday?', type:'Auto' },
  { step:4, delay:'Agent takeover', message:'Agent receives full brief: lead score, budget, preferred area, best contact time, and full conversation history.', type:'Handoff' },
];

const RE_PROMPTS = [
  { title:'Lead qualification', body:'You are a real estate AI for a Dubai brokerage. A new lead just enquired:\nName: {name}, Source: {source}, Interest: {interest}, Budget: {budget}.\n\nScore this lead 0–100 based on intent signals, budget seriousness, and source quality.\nReturn: score, intent level (Low/Medium/High/Very High), recommended next action, and a 2-sentence agent briefing note.' },
  { title:'WhatsApp follow-up', body:'Write a WhatsApp follow-up for a Dubai real estate lead who hasn\'t responded in 4 hours.\nName: {name}. Enquired about {property_type} in {area} with budget {budget}.\nKeep it under 50 words, friendly, not pushy. End with a yes/no question.' },
  { title:'Listing description', body:'Write a property listing description for the Dubai market.\nProperty: {type}, Location: {area}, Price: {price}, Key features: {features}.\nTone: professional, aspirational. Max 80 words. End with a strong call to action.' },
  { title:'Call summary / CRM entry', body:'Summarise this real estate agent call note into a structured CRM entry:\n{raw_notes}\n\nReturn: Lead interest level, key requirements mentioned, objections raised, agreed next step, and follow-up date.' },
];

const ROI_DATA = [
  { label:'Leads contacted daily', before:12, after:48 },
  { label:'Avg response time (min)', before:127, after:2 },
  { label:'Qualified leads / week', before:8, after:31 },
  { label:'Deals closed / month', before:2, after:5 },
];

const PROP_STATUS_COLOR = {
  Available:'bg-blue-100 text-blue-700',
  Rented:'bg-emerald-100 text-emerald-700',
  Sold:'bg-amber-100 text-amber-700',
};
const LEAD_STATUS_COLOR = {
  New:'bg-purple-100 text-purple-700',
  Contacted:'bg-blue-100 text-blue-700',
  'Follow-up':'bg-amber-100 text-amber-700',
};
const INTENT_COLOR = {
  'Very High':'text-emerald-600 font-bold',
  'High':'text-blue-600 font-semibold',
  'Medium':'text-amber-600',
};

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

function EditCell({value,onChange,type='text',width}){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(String(value));
  const commit=()=>{
    setEditing(false);
    const parsed=type==='number'?(parseFloat(draft.replace(/,/g,''))||0):draft;
    if(parsed!==value)onChange(parsed);
  };
  if(editing){
    return <input autoFocus className="border border-yellow-400 rounded px-2 py-1 text-sm outline-none bg-yellow-50" style={{width:width||'100%',minWidth:80}} value={draft} onChange={e=>setDraft(e.target.value)} onBlur={commit} onKeyDown={e=>{if(e.key==='Enter')commit();if(e.key==='Escape'){setEditing(false);setDraft(String(value));}}}/>;
  }
  return <span onClick={()=>{setDraft(String(value));setEditing(true);}} className="cursor-pointer group inline-flex items-center gap-1 hover:text-yellow-600 transition-colors" title="Click to edit">{type==='number'?Number(value).toLocaleString():value}<Pencil size={10} className="opacity-0 group-hover:opacity-50 transition-opacity flex-shrink-0"/></span>;
}

function StatusSelect({value,options,onChange}){
  const t=STATUS_COLOR[value]||'amber';
  return <select value={value} onChange={e=>onChange(e.target.value)} className={`status-${t} text-xs font-semibold px-2 py-1 rounded-full border-0 outline-none cursor-pointer`} style={{appearance:'none',paddingRight:8}}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>;
}

function genEcomDesc(o){
  return `✦ AI Generated — ${o.product}\n\nPremium quality meets everyday performance. The ${o.product} is now available for delivery to ${o.location} and across the UAE.\n\nWhy You'll Love It:\n• Best-in-class performance and durability\n• Backed by full UAE warranty and after-sales support\n• Fast delivery to ${o.location} and all Emirates\n• Trusted by thousands of UAE customers\n• Value pricing at AED ${Number(o.value).toLocaleString()}\n\nOrder Status: ${o.status}\nDelivery Zone: ${o.location}\n\n${o.status==='Delivered'?'✓ Successfully delivered to your doorstep.':o.status==='Processing'?'⏳ Order confirmed and being processed for dispatch.':o.status==='Shipped'?'🚚 On its way — expect delivery within 24 hours.':'This order was cancelled. Re-order anytime at the same great price.'}\n\n⚡ AED ${Number(o.value).toLocaleString()} — Free delivery across UAE.`;
}

function genLogNotice(s){
  const delayed=s.status==='Delayed'||s.status==='Critical';
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

// ─── REAL ESTATE TAB — BEFORE / AFTER ────────────────────────────────────────
function RealEstateTab(){
  const [expandedLead, setExpandedLead] = useState(null);
  const [openPrompt, setOpenPrompt] = useState(null);

  const toggleLead = (id) => setExpandedLead(prev => prev === id ? null : id);
  const togglePrompt = (i) => setOpenPrompt(prev => prev === i ? null : i);

  const propStatusStyle = { Available:'bg-blue-100 text-blue-700', Rented:'bg-emerald-100 text-emerald-700', Sold:'bg-amber-100 text-amber-700' };
  const leadStatusStyle = { New:'bg-purple-100 text-purple-700', Contacted:'bg-blue-100 text-blue-700', 'Follow-up':'bg-amber-100 text-amber-700' };
  const intentStyle = { 'Very High':'text-emerald-600 font-bold', High:'text-blue-600 font-semibold', Medium:'text-amber-600' };

  return (
    <div className="space-y-6">

      {/* ── SECTION 1 HEADER ── */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0 text-base">📋</div>
        <div className="flex-1">
          <p className="font-bold text-slate-700 text-sm">Traditional Ops Tracking</p>
          <p className="text-xs text-slate-500 mt-0.5">How most real estate teams operate today — manual data entry, no lead scoring, response time depends on agent availability.</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-500 font-medium flex-shrink-0">Manual</span>
      </div>

      {/* ── MANUAL KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Listings" value={RE_PROPERTIES.length} sub="Active portfolio" icon={Building2} trend={0} color="#64748b"/>
        <KPI label="Available" value={RE_PROPERTIES.filter(p=>p.status==='Available').length} sub="Ready to sell/rent" icon={Home} trend={0} color="#64748b"/>
        <KPI label="Rented" value={RE_PROPERTIES.filter(p=>p.status==='Rented').length} sub="Occupied units" icon={CheckCircle} trend={0} color="#64748b"/>
        <KPI label="Portfolio Value" value="AED 10.7M" sub="Excl. sold units" icon={DollarSign} trend={0} color="#64748b"/>
      </div>

      {/* ── MANUAL CHARTS ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartBox title="Monthly Listings & Sales">
          <ResponsiveContainer width="100%" height={200}>
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
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={RE_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {RE_PIE.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}
              </Pie>
              <Tooltip content={<Tip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>

      {/* ── MANUAL PROPERTY TABLE ── */}
      <div className="chart-container">
        <h3 className="font-bold text-xs uppercase tracking-widest mb-4 text-slate-400">Property Listings</h3>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Property</th><th>Area</th><th>Type</th><th>Sale Price</th><th>Annual Rent</th><th>Status</th><th>Agent</th></tr></thead>
            <tbody>
              {RE_PROPERTIES.map(p=>(
                <tr key={p.id}>
                  <td className="text-slate-400 font-mono text-xs">{p.id}</td>
                  <td className="font-medium text-slate-700">{p.name}</td>
                  <td>{p.area}</td>
                  <td>{p.type}</td>
                  <td className="font-semibold text-slate-700">{p.price}</td>
                  <td>{p.rent}</td>
                  <td><span className={`text-xs font-semibold px-2 py-1 rounded-full ${propStatusStyle[p.status]||'bg-slate-100 text-slate-600'}`}>{p.status}</span></td>
                  <td>{p.agent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MANUAL LEADS TABLE ── */}
      <div className="chart-container">
        <h3 className="font-bold text-xs uppercase tracking-widest mb-1 text-slate-400">Incoming Leads — Manual Log</h3>
        <p className="text-xs text-slate-400 mb-4">Manually entered. No scoring. Response time depends on agent availability.</p>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Lead</th><th>Source</th><th>Interest</th><th>Budget</th><th>Received</th><th>Status</th></tr></thead>
            <tbody>
              {RE_LEADS.map(l=>(
                <tr key={l.id}>
                  <td className="font-medium text-slate-700">{l.name}</td>
                  <td>{l.source}</td>
                  <td>{l.interest}</td>
                  <td className="font-semibold text-slate-700">{l.budget}</td>
                  <td className="text-xs text-slate-400">{l.received}</td>
                  <td><span className={`text-xs font-semibold px-2 py-1 rounded-full ${leadStatusStyle[l.status]||'bg-slate-100 text-slate-600'}`}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DIVIDER ── */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center"><div className="w-full border-t-2 border-dashed border-slate-300"/></div>
        <div className="relative flex justify-center">
          <div className="bg-white px-6 py-3 rounded-full border-2 border-slate-300 text-center shadow-sm">
            <p className="text-sm font-bold text-slate-700">↓ Same data. Same team. AI layer added below.</p>
            <p className="text-xs text-slate-400 mt-0.5">Everything above is manual. Everything below is what changes when I design an AI system on top.</p>
          </div>
        </div>
      </div>

      {/* ── SECTION 2 HEADER ── */}
      <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 text-base">⚡</div>
        <div className="flex-1">
          <p className="font-bold text-emerald-700 text-sm">AI Automation Layer</p>
          <p className="text-xs text-slate-500 mt-0.5">Same properties, same leads — now with AI scoring every lead instantly, firing WhatsApp sequences automatically, and briefing agents before they pick up the phone.</p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 font-medium flex-shrink-0">AI Powered</span>
      </div>

      {/* ── AI KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Avg AI Response" value="< 2 min" sub="vs 127 min manual" icon={Clock} trend={94} color="#10B981"/>
        <KPI label="Leads Auto-Scored" value="100%" sub="Every lead, instantly" icon={Sparkles} trend={100} color="#3B82F6"/>
        <KPI label="Agent Time Saved" value="4.2 hrs/day" sub="On manual follow-ups" icon={TrendingUp} trend={42} color="#8B5CF6"/>
        <KPI label="Conversion Lift" value="+150%" sub="2 → 5 deals/month" icon={BarChart2} trend={150} color="#D4AF37"/>
      </div>

      {/* ── AI LEAD INTELLIGENCE TABLE ── */}
      <div className="chart-container">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>AI Lead Intelligence — Same Leads, Scored & Briefed</h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">Click any row to expand the AI-generated agent briefing note.</p>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Lead</th><th>Source</th><th>Interest</th><th>Budget</th><th>AI Score</th><th>Intent</th><th>Auto-Response</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {RE_LEADS.map(l=>(
                <React.Fragment key={l.id}>
                  <tr onClick={()=>toggleLead(l.id)} className="cursor-pointer">
                    <td className="font-medium text-slate-700">{l.name}</td>
                    <td>{l.source}</td>
                    <td>{l.interest}</td>
                    <td className="font-semibold text-slate-700">{l.budget}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-14 bg-slate-100 rounded-full h-1.5"><div className="h-1.5 rounded-full bg-emerald-500" style={{width:`${l.score}%`}}/></div>
                        <span className="text-emerald-600 font-bold text-xs">{l.score}</span>
                      </div>
                    </td>
                    <td className={`text-xs ${intentStyle[l.intent]||''}`}>{l.intent}</td>
                    <td className="text-xs text-emerald-600 font-semibold">✓ Sent in {l.waitTime}</td>
                    <td><span className={`text-xs font-semibold px-2 py-1 rounded-full ${leadStatusStyle[l.status]||'bg-slate-100 text-slate-600'}`}>{l.status}</span></td>
                    <td className="text-xs text-slate-400">{expandedLead===l.id?'▲ Hide':'▼ Brief'}</td>
                  </tr>
                  {expandedLead===l.id&&(
                    <tr>
                      <td colSpan={9} className="bg-purple-50 px-6 py-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-purple-600 text-xs font-bold">AI</span>
                          </div>
                          <div>
                            <p className="text-xs text-purple-600 font-bold mb-1">Agent Briefing Note</p>
                            <p className="text-sm text-slate-600">{l.agentBrief}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── WHATSAPP SEQUENCE ── */}
      <div className="chart-container">
        <h3 className="font-bold text-xs uppercase tracking-widest mb-1" style={{color:GOLD}}>Automated WhatsApp Follow-up Sequence</h3>
        <p className="text-xs text-slate-400 mb-4">Fires automatically when a new lead arrives. No agent action needed until Step 4.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {WA_SEQUENCE.map((s,i)=>(
            <div key={i} className={`rounded-xl p-3 border ${s.type==='Handoff'?'bg-purple-50 border-purple-200':'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${s.type==='Handoff'?'bg-purple-500':'bg-blue-500'}`}>{s.step}</span>
                <span className="text-xs text-slate-400 flex-1">{s.delay}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${s.type==='Handoff'?'bg-purple-100 text-purple-600':'bg-blue-100 text-blue-600'}`}>{s.type}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{s.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ROI COMPARISON ── */}
      <div className="chart-container">
        <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:GOLD}}>Before vs After AI — Same Team, Same Leads</h3>
        <div className="space-y-4">
          {ROI_DATA.map((r,i)=>{
            const max=Math.max(r.before,r.after);
            return(
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">{r.label}</span>
                  <span className="text-emerald-600 font-bold">{r.before} → {r.after}</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-slate-400 w-12 text-right">Before</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2"><div className="h-2 rounded-full bg-slate-300" style={{width:`${Math.round(r.before/max*100)}%`}}/></div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-600 w-12 text-right font-medium">After AI</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2"><div className="h-2 rounded-full bg-emerald-500" style={{width:`${Math.round(r.after/max*100)}%`}}/></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── PROMPT LIBRARY ── */}
      <div className="chart-container">
        <h3 className="font-bold text-xs uppercase tracking-widest mb-1" style={{color:GOLD}}>Real Estate Prompt Library</h3>
        <p className="text-xs text-slate-400 mb-4">Working prompts designed and tested for real estate operations. Click to expand.</p>
        <div className="space-y-2">
          {RE_PROMPTS.map((p,i)=>(
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button onClick={()=>togglePrompt(i)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors bg-white">
                <div className="w-6 h-6 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-xs text-purple-600 font-bold flex-shrink-0">{i+1}</div>
                <span className="text-sm font-semibold text-slate-700 flex-1">{p.title}</span>
                <span className="text-slate-400 text-xs">{openPrompt===i?'▲':'▼'}</span>
              </button>
              {openPrompt===i&&(
                <div className="px-4 pb-4 border-t border-slate-100 bg-slate-50">
                  <pre className="mt-3 bg-white rounded-lg p-3 font-mono text-xs text-slate-600 leading-relaxed whitespace-pre-wrap border border-slate-200">{p.body}</pre>
                  <p className="text-xs text-slate-400 mt-2">Variables in {'{'+'curly braces'+'}'} are replaced with live CRM data at runtime.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── E-COMMERCE TAB ───────────────────────────────────────────────────────────
function EcommerceTab(){
  const [rows,setRows]=useState(INIT_ECOM);
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const updateRow=(id,field,value)=>setRows(prev=>prev.map(r=>r.id===id?{...r,[field]:value}:r));
  const filtered=filter==='All'?rows:rows.filter(r=>r.status===filter);
  const totalRev=rows.reduce((s,r)=>s+Number(r.value),0);
  const avgOrder=Math.round(totalRev/rows.length);
  const delivered=rows.filter(r=>r.status==='Delivered').length;
  const fulfilRate=((delivered/rows.length)*100).toFixed(0);
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
              <Pie data={ECOM_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
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
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">{['All',...ECOM_STATUSES].map(o=><option key={o}>{o}</option>)}</select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Value (AED)</th><th>Location</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>{filtered.map(r=><tr key={r.id}><td className="text-slate-400">{r.id}</td><td><EditCell value={r.customer} onChange={v=>updateRow(r.id,'customer',v)}/></td><td style={{minWidth:160}}><EditCell value={r.product} onChange={v=>updateRow(r.id,'product',v)}/></td><td className="font-bold" style={{color:GOLD}}><EditCell value={r.value} type="number" onChange={v=>updateRow(r.id,'value',v)} width={80}/></td><td><EditCell value={r.location} onChange={v=>updateRow(r.id,'location',v)}/></td><td><StatusSelect value={r.status} options={ECOM_STATUSES} onChange={v=>updateRow(r.id,'status',v)}/></td><td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Write Desc</button></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── LOGISTICS TAB ────────────────────────────────────────────────────────────
function LogisticsTab(){
  const [rows,setRows]=useState(INIT_LOG);
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const updateRow=(id,field,value)=>setRows(prev=>prev.map(r=>r.id===id?{...r,[field]:value}:r));
  const filtered=filter==='All'?rows:rows.filter(r=>r.status===filter);
  const onTime=rows.filter(r=>r.status==='On Route'||r.status==='Delivered').length;
  const delayed=rows.filter(r=>r.status==='Delayed').length;
  const critical=rows.filter(r=>r.status==='Critical').length;
  const onTimeRate=((onTime/rows.length)*100).toFixed(0);
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
              <Pie data={LOG_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
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
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">{['All',...LOG_STATUSES].map(o=><option key={o}>{o}</option>)}</select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>SHP ID</th><th>Origin</th><th>Destination</th><th>Driver</th><th>Cargo</th><th>ETA</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>{filtered.map(r=><tr key={r.id}><td className="text-slate-400">{r.id}</td><td><EditCell value={r.origin} onChange={v=>updateRow(r.id,'origin',v)}/></td><td><EditCell value={r.destination} onChange={v=>updateRow(r.id,'destination',v)}/></td><td><EditCell value={r.driver} onChange={v=>updateRow(r.id,'driver',v)}/></td><td><EditCell value={r.cargo} onChange={v=>updateRow(r.id,'cargo',v)}/></td><td className="font-bold" style={{color:r.delay>0?'#D97706':'#059669'}}><EditCell value={r.ETA} onChange={v=>updateRow(r.id,'ETA',v)} width={60}/></td><td><StatusSelect value={r.status} options={LOG_STATUSES} onChange={v=>updateRow(r.id,'status',v)}/></td><td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Notify</button></td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── SALES TAB ────────────────────────────────────────────────────────────────
function SalesTab(){
  const [rows,setRows]=useState(INIT_SALES);
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const updateRow=(id,field,value)=>setRows(prev=>prev.map(r=>r.id===id?{...r,[field]:value}:r));
  const filtered=filter==='All'?rows:rows.filter(r=>r.stage===filter);
  const pipeline=rows.reduce((s,r)=>s+Number(r.value),0);
  const won=rows.filter(r=>r.stage==='Closed Won').reduce((s,r)=>s+Number(r.value),0);
  const winCount=rows.filter(r=>r.stage==='Closed Won').length;
  const winRate=((winCount/rows.length)*100).toFixed(0);
  const avgDeal=Math.round(pipeline/rows.length);
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
              <Pie data={SALES_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
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
          <select value={filter} onChange={e=>setFilter(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">{['All',...SALES_STAGES].map(o=><option key={o}>{o}</option>)}</select>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Contact</th><th>Company</th><th>Value (AED)</th><th>Stage</th><th>Probability %</th><th>Source</th><th>AI Action</th></tr></thead>
            <tbody>{filtered.map(r=><tr key={r.id}><td className="text-slate-400">{r.id}</td><td><EditCell value={r.name} onChange={v=>updateRow(r.id,'name',v)}/></td><td><EditCell value={r.company} onChange={v=>updateRow(r.id,'company',v)}/></td><td className="font-bold" style={{color:GOLD}}><EditCell value={r.value} type="number" onChange={v=>updateRow(r.id,'value',v)} width={90}/></td><td><StatusSelect value={r.stage} options={SALES_STAGES} onChange={v=>updateRow(r.id,'stage',v)}/></td><td><div className="flex items-center gap-2"><div className="h-1.5 rounded-full bg-slate-100" style={{width:50}}><div className="h-full rounded-full" style={{width:`${r.probability}%`,background:r.probability>=70?'#059669':r.probability>=40?'#D97706':'#DC2626'}}/></div><EditCell value={r.probability} type="number" onChange={v=>updateRow(r.id,'probability',Math.min(100,Math.max(0,Number(v))))} width={40}/></div></td><td><EditCell value={r.source} onChange={v=>updateRow(r.id,'source',v)}/></td><td><button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={()=>setModal(r)}>✦ Email</button></td></tr>)}</tbody>
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
    {label:'Real Estate Portfolio',value:'AED 10.7M',sub:'6 Properties',color:GOLD,icon:Building2,tab:'realestate'},
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
              {label:'Real Estate — Lead Qualification & WhatsApp Sequences Automated',pct:94,color:GOLD},
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
