import React, { useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import {
  Home, Building2, ShoppingCart, Truck, Users,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle,
  Clock, X, Sparkles, BarChart2, DollarSign, MapPin
} from 'lucide-react';

const GOLD = '#D4AF37';
const CHART_COLORS = ['#D4AF37', '#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const AI_RE = {
  'P001': `✦ AI Generated Listing — Marina Gate Tower 3\n\nWake up to panoramic views of Dubai Marina's glittering skyline from this stunning 2-bedroom residence. Designed for those who demand the best, this is waterfront living at its most refined.\n\nKey Features:\n• Floor-to-ceiling windows with full marina views\n• Premium Bosch kitchen appliances and Italian marble finishes\n• Access to world-class gym, infinity pool, and concierge\n• Smart home automation throughout\n• Two dedicated parking spaces\n\nAt AED 2,850,000, this property delivers exceptional value in one of Dubai's most sought-after addresses. Marina Walk, JBR Beach, and metro access are minutes away — historically achieving 6-7% rental yield annually.`,
  'P002': `✦ AI Generated Listing — Downtown Burj Vista\n\nOwn a piece of the world's most iconic skyline. This immaculate 1-bedroom in Burj Vista places you in the beating heart of Downtown Dubai, with Burj Khalifa views that never lose their magic.\n\nKey Features:\n• Direct Burj Khalifa and Dubai Fountain views\n• High-end fitted kitchen with integrated appliances\n• Soho-inspired interiors with floor-to-ceiling glazing\n• Rooftop pool, gym, and residents lounge\n• Walking distance to Dubai Mall, Opera, and DIFC\n\nAt AED 1,950,000, Downtown consistently delivers 5-8% rental yields with near-zero vacancy — making this as smart an investment as it is a beautiful home.`,
  'P003': `✦ AI Generated Listing — JBR Sadaf 6 Studio\n\nStep into the lifestyle Dubai is famous for. This bright studio in JBR puts you 2 minutes from one of the world's most famous beach walks — with cafes, restaurants, and boutiques at your doorstep.\n\nKey Features:\n• Fully fitted kitchen and modern bathroom\n• Partial sea view with abundant natural light\n• Access to shared pool and beach facilities\n• Strong short-term rental demand (Airbnb/holiday lets)\n• Close to tram, marina, and JBR Beach\n\nAt AED 980,000, this is one of the most affordable entry points into Dubai's premium beachfront market — ideal for investors seeking strong holiday rental income.`,
  'P004': `✦ AI Generated Listing — Business Bay Penthouse\n\nA statement of success. This 3-bedroom penthouse commands sweeping views of the Canal and Burj Khalifa from its private rooftop terrace — a true trophy property.\n\nKey Features:\n• Private rooftop terrace with plunge pool\n• Triple-aspect views: Canal, Burj Khalifa, DIFC skyline\n• Bespoke Italian kitchen and designer bathrooms\n• Smart home automation throughout\n• Four parking spaces and dedicated concierge\n\nAt AED 5,400,000, capital appreciation in Business Bay has averaged 12-15% annually. An exceptional long-term asset in one of Dubai's fastest-growing commercial districts.`,
  'P005': `✦ AI Generated Listing — Palm Jumeirah Villa\n\nThe Palm needs no introduction. A 4-bedroom villa on the Frond delivers private beach access, a landscaped garden, and sunsets over the Arabian Gulf — every single day.\n\nKey Features:\n• Direct private beach access (40ft beachfront)\n• Private pool, landscaped garden, outdoor dining\n• Spacious open-plan living with premium finishes\n• Maid's room, driver's room, and 4-car garage\n• Close to Nakheel Mall, Atlantis, and Palm Monorail\n\nAt AED 12,800,000, Palm Frond villas are a finite commodity — no more can ever be built. Capital appreciation has outpaced all other Dubai districts over the past 3 years.`,
  'P006': `✦ AI Generated Listing — DIFC Index Tower\n\nFor the professional who lives as well as they work. This sleek 2-bedroom in DIFC's prestigious Index Tower places you at the centre of the Middle East's financial powerhouse.\n\nKey Features:\n• Premium layout with separate study/home office\n• Views of Gate Village and Sheikh Zayed Road\n• Hotel-style amenities: pool, gym, spa\n• Walking distance to 50+ DIFC restaurants\n• Ideal for C-suite executives and finance professionals\n\nAt AED 3,200,000, DIFC properties offer unmatched rental demand from the district's 25,000+ daily workforce. Vacancy rates sit below 2% — one of Dubai's safest income assets.`,
  'P007': `✦ AI Generated Listing — JVC Townhouse\n\nFamily space without compromise. This 3-bedroom townhouse in JVC offers room, community feel, and value for growing families in one of Dubai's fastest-growing neighbourhoods.\n\nKey Features:\n• Private garden and rooftop terrace\n• Maid's room and storage included\n• Community parks, pools, and schools within walking distance\n• Easy access to Sheikh Mohammed Bin Zayed Road\n• Pet-friendly community\n\nAt AED 1,650,000, JVC has seen consistent 10-12% capital growth driven by end-user demand, with strong rental yields of 7-8% attracting buy-to-let investors.`,
  'P008': `✦ AI Generated Listing — Emaar Beachfront\n\nRare beachfront living with the energy of Dubai Marina. This 1-bedroom offers direct beach access and sea views in one of Dubai's newest master communities.\n\nKey Features:\n• Direct access to 1.5km private sandy beach\n• Unobstructed Arabian Gulf views\n• Premium Emaar finishes with smart home features\n• Access to beach club, retail boulevard, and marina\n• Strong holiday rental potential\n\nAt AED 2,100,000, Emaar Beachfront remains one of the few genuine beachfront communities in Dubai. Limited supply and growing global interest have delivered 15%+ appreciation since handover.`,
};

const AI_ECOM = {
  'ORD-8821': `✦ AI Generated — Apple Watch Ultra 2\n\nThe most rugged, capable Apple Watch ever made — for those who push limits.\n\nWhy You'll Love It:\n• 49mm titanium case built for alpine climbs and open-water dives\n• Precision dual-frequency GPS — pinpoint accuracy across UAE terrain\n• Up to 60 hours battery life — outlast any adventure\n• Emergency SOS via satellite — be found anywhere\n• 2000-nit display visible in full UAE sunlight\n\nWhether you're timing laps at Dubai Autodrome or tracking a morning run along JBR Beach, nothing keeps up like the Ultra 2.\n\n⚡ Limited stock. Delivery in 1-2 business days across UAE.`,
  'ORD-8822': `✦ AI Generated — Samsung 65" QLED TV\n\nTransform your living room into a private cinema.\n\nWhy You'll Love It:\n• Quantum Dot technology delivers 100% colour volume\n• 4K AI Upscaling makes every source look cinematic\n• Object Tracking Sound+ follows the action around the room\n• Slim design fits seamlessly into modern Dubai interiors\n• Smart TV: Netflix, OSN+, Shahid, and all streaming services\n\nWhether it's Premier League, a Friday movie night, or the latest Arabic drama — the Samsung QLED makes every moment unmissable.\n\n⚡ Free same-day delivery in Dubai. White-glove installation available.`,
  'ORD-8823': `✦ AI Generated — Dyson V15 Detect\n\nThe vacuum that reveals what you can't see — and eliminates it completely.\n\nWhy You'll Love It:\n• Laser Detect illuminates microscopic dust invisible to the naked eye\n• LCD screen counts and categorises particles in real-time\n• 230 AW suction tackles Dubai's fine sand and dust effortlessly\n• HEPA filtration captures 99.97% of particles — essential for allergy sufferers\n• 60 minutes run time — clean your entire villa on one charge\n\nDubai's environment is uniquely demanding. Fine desert dust and sandstorms create challenges most vacuums can't handle. The V15 Detect was built for this.\n\n⚡ In stock. Free delivery across Dubai within 24 hours.`,
  'ORD-8824': `✦ AI Generated — Nike Air Max 2024\n\nThe icon, reinvented for 2024 — maximum comfort, unmistakable style.\n\nWhy You'll Love It:\n• Next-gen Air cushioning absorbs every step on Dubai's hard surfaces\n• Breathable mesh upper keeps feet cool in UAE heat\n• Versatile colourways match every outfit from casual to smart-casual\n• Durable outsole grips on mall floors and outdoor pavements\n• Lightweight construction for all-day comfort\n\nFrom morning walks on The Walk JBR to weekend brunches in DIFC — the Air Max 2024 keeps up with Dubai's pace.\n\n⚡ Fast delivery. Multiple sizes in stock.`,
  'ORD-8825': `✦ AI Generated — Nespresso Expert\n\nBusiness-class coffee. In your kitchen.\n\nWhy You'll Love It:\n• Bluetooth connectivity — start brewing from your phone\n• Precise temperature control for perfect extraction\n• Compatible with 30+ Nespresso Original capsule varieties\n• Milk frother included for lattes, cappuccinos, flat whites\n• Whisper-quiet — won't disturb the morning household\n\nFor UAE professionals who treat their morning coffee as seriously as their morning meeting — barista-grade results in under 60 seconds.\n\n⚡ In stock. Gift wrapping available. Free delivery across UAE.`,
  'ORD-8826': `✦ AI Generated — iPad Pro M4 12.9"\n\nPro performance. Zero compromise. The most powerful tablet on earth.\n\nWhy You'll Love It:\n• Apple M4 chip — faster than most laptops, in a 6.4mm body\n• Ultra Retina XDR display with nano-texture glass\n• Apple Pencil Pro support for creatives and architects\n• All-day battery for full UAE workdays\n• Perfect for presentations, video editing, and remote work\n\nFor UAE professionals who refuse to be slowed down — the iPad Pro M4 is a productivity revolution.\n\n⚡ In stock. Free next-day delivery. Finance options available.`,
  'ORD-8827': `✦ AI Generated — Bosch Refrigerator 500L\n\nGerman engineering meets UAE family life.\n\nWhy You'll Love It:\n• 500L capacity — designed for large UAE family grocery shops\n• VitaFresh keeps fruits and vegetables fresh 2x longer\n• NoFrost system — never defrost again\n• Super-quiet 38dB operation — library-silent\n• A+++ energy rating — lower electricity bills\n\nBuilt to handle the demands of UAE family life — from bulk Carrefour shops to Ramadan food preparations.\n\n⚡ Free delivery and installation across Dubai. 2-year warranty included.`,
  'ORD-8828': `✦ AI Generated — Sony WH-1000XM6\n\nThe world's best noise-cancelling headphones, now even better.\n\nWhy You'll Love It:\n• Industry-leading noise cancellation — silence Dubai traffic and flight engines\n• 30-hour battery life with quick charge (3 min = 3 hours)\n• Multipoint connection — switch between phone, laptop, and tablet\n• Speak-to-Chat automatically pauses music when you talk\n• Premium sound tuned by Sony's master engineers\n\nFor UAE commuters on the Metro, frequent flyers on Emirates, or open-plan office professionals — the XM6 creates a personal sanctuary of sound.\n\n⚡ In stock now. Free delivery across UAE. Carry case included.`,
};

const AI_LOG = {
  'SHP-4401': `Dear Valued Customer,\n\nShipment SHP-4401 is on route and progressing on schedule.\n\nShipment Details:\n• Cargo: Electronics (2.4T)\n• Origin: Jebel Ali Port → Business Bay\n• Driver: Hassan Al Matroushi\n• ETA: 14:30 today ✓\n\nNo delays reported. You will receive an SMS notification upon arrival.\n\nQueries: +971 4 000 1234 | ops@dubaifastlog.ae\n\nBest regards,\nOperations Team | Dubai FastLog`,
  'SHP-4402': `Dear Valued Customer,\n\nWe apologise for an unexpected delay on shipment SHP-4402.\n\nDelay Details:\n• Cargo: Furniture (1.8T) — DIP Warehouse → Dubai Marina\n• Delay: 45 minutes\n• Cause: Heavy traffic congestion on Sheikh Zayed Road, Interchange 4\n• Revised ETA: 15:45 (was 15:00)\n\nOur driver has been re-routed via Al Khail Road. Our operations team is actively monitoring the situation and will provide a full update within 30 minutes.\n\nUrgent contact: +971 4 000 1234\n\nApologies for the inconvenience.\nOperations Team | Dubai FastLog`,
  'SHP-4403': `Dear Valued Customer,\n\nShipment SHP-4403 has been successfully delivered.\n\nDelivery Confirmation:\n• Cargo: Retail Goods (0.9T)\n• Dragon Mart → Mirdif City Centre\n• Driver: Ali Al Jabri\n• Delivered: 13:15 — ON TIME ✓\n\nPlease inspect goods upon receipt and notify us within 24 hours of any discrepancies.\n\nThank you for choosing Dubai FastLog.\nops@dubaifastlog.ae | +971 4 000 1234`,
  'SHP-4404': `Dear Valued Customer,\n\nYour premium shipment SHP-4404 is on route as planned.\n\nShipment Details:\n• Cargo: Luxury Items (0.3T)\n• Al Quoz Hub → Palm Jumeirah\n• Driver: Rajesh Nair | ETA: 16:45\n\nOur driver has been briefed on premium handling protocols. All luxury items are transported in climate-controlled conditions with full insurance coverage.\n\nYou will receive a call 30 minutes before arrival.\n\n+971 4 000 1234 | Premium Operations Team`,
  'SHP-4405': `Dear Valued Customer,\n\nWe must advise of a significant delay on shipment SHP-4405.\n\nDelay Details:\n• Cargo: Chemical Freight (3.1T)\n• Sharjah Depot → DAFZA Free Zone\n• Delay: 90 minutes\n• Cause: Mandatory customs inspection — regulatory requirement for chemical freight\n• Revised ETA: 13:30 (was 12:00)\n\nAll documentation is in order. Our compliance officer is on site and we expect clearance within 60 minutes. Updates every 30 minutes.\n\n🚨 Urgent: +971 4 000 1234\n\nOperations Team | Dubai FastLog`,
  'SHP-4406': `Dear Valued Customer,\n\nHeavy freight shipment SHP-4406 is confirmed on route.\n\nShipment Details:\n• Cargo: Construction Materials (5.2T)\n• Jebel Ali Port → Al Quoz Industrial\n• Driver: Vikram Singh | ETA: 17:30\n\nFull compliance with RTA weight regulations confirmed. Delivery will be coordinated with your site supervisor.\n\nPlease ensure unloading equipment is available by 17:15.\n\n+971 4 000 1234 | Heavy Freight Team`,
  'SHP-4407': `Dear Valued Customer,\n\nDelivery confirmed. Shipment SHP-4407 has arrived safely.\n\n• Cargo: Food Grade (1.1T) — DWC → Downtown Dubai\n• Driver: Omar Al Saeed\n• Delivered: 11:45 — ON TIME ✓\n• Cold Chain: Maintained throughout ✓\n\nAll food-grade handling protocols followed. Temperature logs available on request.\n\nThank you for trusting Dubai FastLog with your temperature-sensitive cargo.\n\n+971 4 000 1234`,
  'SHP-4408': `⚠️ URGENT — CRITICAL DELAY NOTICE\n\nDear Valued Customer,\n\nCritical delay on perishable shipment SHP-4408 — immediate attention required.\n\n• Cargo: Perishables (0.8T) — RAKEZ → JBR Walk\n• Delay: 120 minutes (CRITICAL)\n• Cause: Vehicle breakdown on Emirates Road\n• Revised ETA: 20:00 (was 18:00)\n• Cargo Status: Cold chain active — temperature confirmed 4°C ✓\n\nActions Taken:\n✓ Refrigerated replacement vehicle dispatched from Al Quoz depot\n✓ Senior operations manager personally overseeing this case\n✓ Temperature monitoring active — 3-hour safe window remaining\n\n🚨 CALL NOW: +971 4 000 1234\nWhatsApp: +971 50 000 5678\n\nWe deeply apologise.\nOperations Director | Dubai FastLog`,
};

const AI_SALES = {
  'L-3301': `Subject: Following Up — Partnership Proposal for Al Futtaim Group\n\nDear Omar,\n\nThank you for the time you shared earlier this week. It was a pleasure discussing Al Futtaim Group's operational expansion goals and how our solutions can directly support your Q4 targets.\n\nI wanted to follow up on the proposal (AED 485,000) and address a few key points:\n• Our implementation timeline fits within your pre-Expo calendar\n• ROI modelling shows full payback within 14 months\n• We're ready to arrange a technical walkthrough with your operations team\n\nI'd welcome the opportunity to move this forward before end of August. Would you have 30 minutes for a call this week?\n\nWarm regards,\nMohammad Irfan | +971 50 000 0000`,
  'L-3302': `Subject: Emaar Properties — Final Terms Discussion\n\nDear Sarah,\n\nThank you for the constructive meeting last Thursday. I'm confident we can finalise terms that work for both parties.\n\nAs discussed, I can confirm:\n• 90-day payment structure accommodated as requested\n• SLA guarantees extended to 99.5% uptime (see revised annexure)\n• Dedicated UAE-based account manager confirmed\n\nAt AED 1,200,000, Emaar's scale will see returns within the first operational quarter. I'm targeting a signed agreement by August 30th for a smooth September rollout.\n\nWould that timeline work on your end?\n\nBest regards,\nMohammad Irfan | +971 50 000 0000`,
  'L-3303': `Subject: Next Steps — DAMAC Holdings Discovery\n\nDear Khalid,\n\nThank you for attending the Operations Excellence Summit. It was genuinely valuable to hear DAMAC's perspective on your project pipeline challenges.\n\nI'd love to share some initial thoughts in a focused discovery session. Proposed agenda:\n• 20 min: Review of DAMAC's current pain points\n• 20 min: Walkthrough of our tailored approach\n• 10 min: Q&A and next steps\n\nNo obligation — just a conversation to explore fit. Would next week work for a 45-minute virtual meeting? I'm available Tuesday through Thursday.\n\nWarm regards,\nMohammad Irfan | +971 50 000 0000`,
  'L-3304': `Subject: Welcome Aboard — Noon Digital Partnership Confirmed\n\nDear Priya,\n\nA genuine pleasure to welcome Noon Digital as our newest partner. Congratulations on a swift and decisive process.\n\nWhat happens next:\n• Kick-off call: Scheduled within 48 hours\n• Onboarding credentials: Delivered by tomorrow\n• Dedicated manager: Rania Al Hassan — your single point of contact\n• Go-live target: September 15th as agreed\n\nThe AED 320,000 investment will begin delivering measurable ROI from day one. We're equally invested in making this a success story for Noon.\n\nWelcome to the family.\n\nMohammad Irfan | +971 50 000 0000`,
  'L-3305': `Subject: DP World Proposal — Addressing Your Key Questions\n\nDear Ahmed,\n\nThank you for the detailed feedback following our submission. I want to directly address the three points raised:\n\n1. Scalability across Jebel Ali terminals: Our architecture has been validated at port environments handling 3x DP World's volume. Reference call with Singapore port client available.\n\n2. CATOS integration: We've completed two prior CATOS integrations — technical documentation available on request.\n\n3. Pricing (AED 2,100,000): A phased approach is available — begin with Terminals 1-3 and scale, reducing upfront commitment.\n\nI'd welcome presenting these points to your evaluation committee this week.\n\nWith respect,\nMohammad Irfan | +971 50 000 0000`,
  'L-3306': `Subject: Following Up — Carrefour UAE Operations\n\nDear Jessica,\n\nI hope you're well. Reconnecting following our LinkedIn conversation to ensure I've addressed any outstanding questions.\n\nCarrefour UAE's supply chain complexity across 80+ locations is precisely the environment our platform was built for. Comparable retail operations in the region have achieved a 23% reduction in operational overhead within the first 6 months.\n\nI'd love to show you a 30-minute live demo tailored to Carrefour's specific workflows — concrete and numbers-based.\n\nWould you or a colleague be available for a virtual session this week?\n\nBest regards,\nMohammad Irfan | +971 50 000 0000`,
  'L-3307': `Subject: Emirates NBD — Moving Towards Agreement\n\nDear Faisal,\n\nThank you for this morning's productive call. There's clear alignment and I'm encouraged by the momentum.\n\nAs agreed, revised commercial terms with the amended SLA structure will reach you by end of day tomorrow. Security compliance documentation is attached.\n\nKey agreed points:\n• Implementation: October 1st\n• Dedicated Emirates NBD instance with full data segregation\n• Monthly C-level business reviews\n• AED 780,000 with 60-day payment schedule\n\nTargeting signed agreement by Friday, August 30th. Please let me know if additional stakeholders should be included.\n\nWarm regards,\nMohammad Irfan | +971 50 000 0000`,
  'L-3308': `Subject: Etisalat (e&) — Keeping the Door Open\n\nDear Noor,\n\nThank you for letting us know about the outcome. While we're disappointed, we genuinely respect the thoroughness with which e& approached this evaluation.\n\nI understand timing and internal priorities played a significant role. Please know our door remains open — the telecommunications sector is one we're deeply committed to, and we continue to invest in capabilities relevant to operators at e&'s scale.\n\nI'd welcome staying in touch and revisiting this when the timing is right.\n\nThank you again for the engagement. It was a privilege.\n\nWith best wishes,\nMohammad Irfan | +971 50 000 0000`,
};

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

const RE_PROPERTIES = [
  { id:'P001', name:'Marina Gate Tower 3 — 2BR', agent:'Omar Al Rashidi', location:'Dubai Marina', price:2850000, status:'Active', leads:18 },
  { id:'P002', name:'Downtown Burj Vista — 1BR', agent:'Sarah Mitchell', location:'Downtown Dubai', price:1950000, status:'Under Offer', leads:24 },
  { id:'P003', name:'JBR Sadaf 6 — Studio', agent:'Khalid Al Mansoori', location:'JBR', price:980000, status:'Active', leads:9 },
  { id:'P004', name:'Business Bay — 3BR Penthouse', agent:'Priya Sharma', location:'Business Bay', price:5400000, status:'Sold', leads:41 },
  { id:'P005', name:'Palm Jumeirah Frond — 4BR Villa', agent:'Ahmed Al Suwaidi', location:'Palm Jumeirah', price:12800000, status:'Active', leads:53 },
  { id:'P006', name:'DIFC Index Tower — 2BR', agent:'Jessica Wong', location:'DIFC', price:3200000, status:'Under Offer', leads:19 },
  { id:'P007', name:'JVC — 3BR Townhouse', agent:'Faisal Al Hamad', location:'JVC', price:1650000, status:'Active', leads:12 },
  { id:'P008', name:'Emaar Beachfront — 1BR Sea View', agent:'Noor Al Zaabi', location:'Emaar Beachfront', price:2100000, status:'Expired', leads:3 },
];
const RE_BAR = [{month:'Mar',listings:12,sold:4},{month:'Apr',listings:18,sold:7},{month:'May',listings:15,sold:5},{month:'Jun',listings:22,sold:9},{month:'Jul',listings:28,sold:12},{month:'Aug',listings:31,sold:14}];
const RE_PIE = [{name:'Apartments',value:48},{name:'Villas',value:22},{name:'Townhouses',value:15},{name:'Penthouses',value:9},{name:'Studios',value:6}];

const ECOM_ORDERS = [
  { id:'ORD-8821', customer:'Layla Al Farsi', product:'Apple Watch Ultra 2', value:3299, status:'Delivered', location:'Al Barsha' },
  { id:'ORD-8822', customer:'James Patterson', product:'Samsung 65" QLED TV', value:5499, status:'Processing', location:'Downtown' },
  { id:'ORD-8823', customer:'Fatima Al Blooshi', product:'Dyson V15 Detect', value:2799, status:'Shipped', location:'Jumeirah' },
  { id:'ORD-8824', customer:'Raj Patel', product:'Nike Air Max 2024', value:799, status:'Delivered', location:'Silicon Oasis' },
  { id:'ORD-8825', customer:'Aisha Al Marzooqi', product:'Nespresso Expert Coffee', value:1299, status:'Cancelled', location:'Mirdif' },
  { id:'ORD-8826', customer:'Michael Chen', product:'iPad Pro M4 12.9"', value:4999, status:'Processing', location:'DIFC' },
  { id:'ORD-8827', customer:'Mariam Al Kaabi', product:'Bosch Refrigerator 500L', value:3799, status:'Shipped', location:'Abu Hail' },
  { id:'ORD-8828', customer:'David Williams', product:'Sony WH-1000XM6', value:1599, status:'Delivered', location:'JBR' },
];
const ECOM_BAR = [{day:'Mon',orders:142,revenue:89400},{day:'Tue',orders:168,revenue:112800},{day:'Wed',orders:195,revenue:143200},{day:'Thu',orders:221,revenue:167900},{day:'Fri',orders:287,revenue:198400},{day:'Sat',orders:334,revenue:241600},{day:'Sun',orders:256,revenue:178300}];
const ECOM_PIE = [{name:'Electronics',value:42},{name:'Home & Living',value:24},{name:'Fashion',value:18},{name:'Sports',value:10},{name:'Other',value:6}];

const LOGISTICS = [
  { id:'SHP-4401', origin:'Jebel Ali Port', destination:'Business Bay', driver:'Hassan Al Matroushi', ETA:'14:30', status:'On Route', cargo:'Electronics 2.4T', delay:0 },
  { id:'SHP-4402', origin:'DIP Warehouse', destination:'Dubai Marina', driver:'Suresh Kumar', ETA:'15:00', status:'Delayed', cargo:'Furniture 1.8T', delay:45 },
  { id:'SHP-4403', origin:'Dragon Mart', destination:'Mirdif City Centre', driver:'Ali Al Jabri', ETA:'13:15', status:'Delivered', cargo:'Retail Goods 0.9T', delay:0 },
  { id:'SHP-4404', origin:'Al Quoz Hub', destination:'Palm Jumeirah', driver:'Rajesh Nair', ETA:'16:45', status:'On Route', cargo:'Luxury Items 0.3T', delay:0 },
  { id:'SHP-4405', origin:'Sharjah Depot', destination:'DAFZA Free Zone', driver:'Mohammed Al Khuri', ETA:'12:00', status:'Delayed', cargo:'Chemicals 3.1T', delay:90 },
  { id:'SHP-4406', origin:'Jebel Ali Port', destination:'Al Quoz Industrial', driver:'Vikram Singh', ETA:'17:30', status:'On Route', cargo:'Construction 5.2T', delay:0 },
  { id:'SHP-4407', origin:'DWC Cargo Hub', destination:'Downtown Dubai', driver:'Omar Al Saeed', ETA:'11:45', status:'Delivered', cargo:'Food Grade 1.1T', delay:0 },
  { id:'SHP-4408', origin:'RAKEZ Depot', destination:'JBR Walk', driver:'Pradeep Thomas', ETA:'18:00', status:'Critical', cargo:'Perishables 0.8T', delay:120 },
];
const LOG_BAR = [{zone:'Marina',deliveries:48,onTime:44},{zone:'Downtown',deliveries:62,onTime:58},{zone:'Biz Bay',deliveries:71,onTime:65},{zone:'JBR',deliveries:39,onTime:37},{zone:'DIFC',deliveries:53,onTime:50},{zone:'JVC',deliveries:44,onTime:41}];
const LOG_PIE = [{name:'On Time',value:67},{name:'Delayed <1hr',value:18},{name:'Delayed >1hr',value:11},{name:'Critical',value:4}];

const SALES = [
  { id:'L-3301', name:'Omar Al Rashidi', company:'Al Futtaim Group', value:485000, stage:'Proposal Sent', source:'LinkedIn', probability:75 },
  { id:'L-3302', name:'Sarah Mitchell', company:'Emaar Properties', value:1200000, stage:'Negotiation', source:'Referral', probability:85 },
  { id:'L-3303', name:'Khalid Al Mansoori', company:'DAMAC Holdings', value:890000, stage:'Discovery', source:'Event', probability:35 },
  { id:'L-3304', name:'Priya Sharma', company:'Noon Digital', value:320000, stage:'Closed Won', source:'Cold Outreach', probability:100 },
  { id:'L-3305', name:'Ahmed Al Suwaidi', company:'DP World', value:2100000, stage:'Proposal Sent', source:'Website', probability:60 },
  { id:'L-3306', name:'Jessica Wong', company:'Carrefour UAE', value:560000, stage:'Discovery', source:'LinkedIn', probability:40 },
  { id:'L-3307', name:'Faisal Al Hamad', company:'Emirates NBD', value:780000, stage:'Negotiation', source:'Referral', probability:80 },
  { id:'L-3308', name:'Noor Al Zaabi', company:'Etisalat (e&)', value:1450000, stage:'Closed Lost', source:'Event', probability:0 },
];
const SALES_BAR = [{rep:'Omar',target:500,achieved:485},{rep:'Sarah',target:800,achieved:920},{rep:'Khalid',target:600,achieved:410},{rep:'Priya',target:400,achieved:380},{rep:'Ahmed',target:1000,achieved:750},{rep:'Jessica',target:450,achieved:390}];
const SALES_PIE = [{name:'Negotiation',value:28},{name:'Proposal Sent',value:35},{name:'Discovery',value:20},{name:'Closed Won',value:12},{name:'Closed Lost',value:5}];
const HOME_REV = [{month:'Mar',re:18.2,ec:12.4,lg:8.1,sa:9.3},{month:'Apr',re:31.5,ec:15.8,lg:9.4,sa:11.2},{month:'May',re:22.8,ec:19.2,lg:10.8,sa:13.7},{month:'Jun',re:47.3,ec:24.1,lg:12.3,sa:18.4},{month:'Jul',re:61.1,ec:28.7,lg:15.6,sa:22.1},{month:'Aug',re:78.4,ec:33.9,lg:18.2,sa:28.6}];

const STATUS_MAP = {
  'Active':'green','Under Offer':'amber','Sold':'green','Expired':'red',
  'Delivered':'green','Processing':'amber','Shipped':'amber','Cancelled':'red',
  'On Route':'green','Delayed':'amber','Critical':'red',
  'Negotiation':'amber','Proposal Sent':'amber','Discovery':'amber',
  'Closed Won':'green','Closed Lost':'red',
};

function Badge({s}){const t=STATUS_MAP[s]||'amber';return <span className={`status-${t} text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap`}>{s}</span>;}

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

function Modal({title,content,onClose}){
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

function ChartBox({title,children}){
  return(
    <div className="chart-container">
      <h3 className="font-bold text-xs uppercase tracking-widest mb-4" style={{color:GOLD}}>{title}</h3>
      {children}
    </div>
  );
}

function Filter({value,onChange,options}){
  return(
    <select value={value} onChange={e=>onChange(e.target.value)} className="text-xs rounded-lg px-3 py-2 outline-none border border-slate-200 bg-white text-slate-700">
      {options.map(o=><option key={o}>{o}</option>)}
    </select>
  );
}

function AIBtn({label,onClick}){return <button className="ai-btn" style={{padding:'5px 12px',fontSize:11}} onClick={onClick}>✦ {label}</button>;}

function RealEstateTab(){
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const rows=filter==='All'?RE_PROPERTIES:RE_PROPERTIES.filter(p=>p.status===filter);
  return(
    <div className="space-y-6">
      {modal&&<Modal title={`Listing: ${modal.name}`} content={AI_RE[modal.id]} onClose={()=>setModal(null)}/>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Active Listings" value="4" sub="Properties live" icon={Building2} trend={12}/>
        <KPI label="Portfolio Value" value="AED 31.4M" sub="Total listed value" icon={DollarSign} trend={8}/>
        <KPI label="Avg Leads / Listing" value="22" sub="Enquiries per property" icon={Users} trend={5}/>
        <KPI label="Conversion Rate" value="12.5%" sub="Listed → Sold" icon={TrendingUp} trend={3}/>
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
              <Pie data={RE_PIE} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false}>
                {RE_PIE.map((_,i)=><Cell key={i} fill={CHART_COLORS[i%CHART_COLORS.length]}/>)}
              </Pie>
              <Tooltip content={<Tip/>}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartBox>
      </div>
      <div className="chart-container">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>Active Portfolio</h3>
          <Filter value={filter} onChange={setFilter} options={['All','Active','Under Offer','Sold','Expired']}/>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Property</th><th>Agent</th><th>Location</th><th>Price (AED)</th><th>Leads</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>
              {rows.map(p=>(
                <tr key={p.id}>
                  <td className="text-slate-400">{p.id}</td>
                  <td className="font-semibold text-slate-800" style={{minWidth:160}}>{p.name}</td>
                  <td>{p.agent}</td>
                  <td><span className="flex items-center gap-1"><MapPin size={10} style={{color:GOLD}}/>{p.location}</span></td>
                  <td className="font-bold" style={{color:GOLD}}>{p.price.toLocaleString()}</td>
                  <td>{p.leads}</td>
                  <td><Badge s={p.status}/></td>
                  <td><AIBtn label="Write Listing" onClick={()=>setModal(p)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EcommerceTab(){
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const rows=filter==='All'?ECOM_ORDERS:ECOM_ORDERS.filter(o=>o.status===filter);
  const rev=ECOM_ORDERS.reduce((s,o)=>s+o.value,0);
  return(
    <div className="space-y-6">
      {modal&&<Modal title={`Product: ${modal.product}`} content={AI_ECOM[modal.id]} onClose={()=>setModal(null)}/>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Orders Today" value="8" sub="Total orders" icon={ShoppingCart} trend={14} color="#3B82F6"/>
        <KPI label="Revenue (AED)" value={`${(rev/1000).toFixed(1)}K`} sub="Today's revenue" icon={DollarSign} trend={9}/>
        <KPI label="Avg Order Value" value={`AED ${Math.round(rev/ECOM_ORDERS.length).toLocaleString()}`} sub="Per transaction" icon={TrendingUp} trend={6} color="#10B981"/>
        <KPI label="Fulfilment Rate" value="87.5%" sub="Orders delivered" icon={CheckCircle} trend={2} color="#8B5CF6"/>
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
              <Bar yAxisId="r" dataKey="revenue" name="Revenue (AED)" fill={GOLD} radius={[4,4,0,0]}/>
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
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>Order Management</h3>
          <Filter value={filter} onChange={setFilter} options={['All','Processing','Shipped','Delivered','Cancelled']}/>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Value (AED)</th><th>Location</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>
              {rows.map(o=>(
                <tr key={o.id}>
                  <td className="text-slate-400">{o.id}</td>
                  <td className="font-semibold text-slate-800">{o.customer}</td>
                  <td style={{minWidth:160}}>{o.product}</td>
                  <td className="font-bold" style={{color:GOLD}}>{o.value.toLocaleString()}</td>
                  <td>{o.location}</td>
                  <td><Badge s={o.status}/></td>
                  <td><AIBtn label="Write Desc" onClick={()=>setModal(o)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LogisticsTab(){
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const rows=filter==='All'?LOGISTICS:LOGISTICS.filter(s=>s.status===filter);
  return(
    <div className="space-y-6">
      {modal&&<Modal title={`Notice: ${modal.id} — ${modal.cargo}`} content={AI_LOG[modal.id]} onClose={()=>setModal(null)}/>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Total Shipments" value="8" sub="Active today" icon={Truck} trend={7} color="#3B82F6"/>
        <KPI label="On-Time Rate" value="62.5%" sub="On schedule" icon={CheckCircle} trend={3} color="#10B981"/>
        <KPI label="Delayed" value="2" sub="Need attention" icon={Clock} trend={-8} color="#D97706"/>
        <KPI label="Critical Alerts" value="1" sub="Urgent escalation" icon={AlertCircle} trend={-15} color="#DC2626"/>
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
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>Live Shipment Tracker</h3>
          <Filter value={filter} onChange={setFilter} options={['All','On Route','Delayed','Delivered','Critical']}/>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>SHP ID</th><th>Origin</th><th>Destination</th><th>Driver</th><th>Cargo</th><th>ETA</th><th>Status</th><th>AI Action</th></tr></thead>
            <tbody>
              {rows.map(s=>(
                <tr key={s.id}>
                  <td className="text-slate-400">{s.id}</td>
                  <td>{s.origin}</td>
                  <td>{s.destination}</td>
                  <td className="font-semibold text-slate-800">{s.driver}</td>
                  <td>{s.cargo}</td>
                  <td className="font-bold" style={{color:s.delay>0?'#D97706':'#059669'}}>{s.ETA}</td>
                  <td><Badge s={s.status}/></td>
                  <td><AIBtn label="Notify" onClick={()=>setModal(s)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SalesTab(){
  const [filter,setFilter]=useState('All');
  const [modal,setModal]=useState(null);
  const rows=filter==='All'?SALES:SALES.filter(l=>l.stage===filter);
  const pipe=SALES.reduce((s,l)=>s+l.value,0);
  return(
    <div className="space-y-6">
      {modal&&<Modal title={`Follow-Up: ${modal.name} @ ${modal.company}`} content={AI_SALES[modal.id]} onClose={()=>setModal(null)}/>}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPI label="Pipeline Value" value={`AED ${(pipe/1e6).toFixed(1)}M`} sub="Total opportunity" icon={DollarSign} trend={18}/>
        <KPI label="Revenue Closed" value="AED 320K" sub="Won this month" icon={CheckCircle} trend={22} color="#10B981"/>
        <KPI label="Win Rate" value="12.5%" sub="Closed vs Total" icon={TrendingUp} trend={5} color="#8B5CF6"/>
        <KPI label="Avg Deal Size" value="AED 972K" sub="Per opportunity" icon={BarChart2} trend={11} color="#3B82F6"/>
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
          <h3 className="font-bold text-xs uppercase tracking-widest" style={{color:GOLD}}>CRM Pipeline</h3>
          <Filter value={filter} onChange={setFilter} options={['All','Discovery','Proposal Sent','Negotiation','Closed Won','Closed Lost']}/>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead><tr><th>ID</th><th>Contact</th><th>Company</th><th>Value (AED)</th><th>Stage</th><th>Probability</th><th>Source</th><th>AI Action</th></tr></thead>
            <tbody>
              {rows.map(l=>(
                <tr key={l.id}>
                  <td className="text-slate-400">{l.id}</td>
                  <td className="font-semibold text-slate-800">{l.name}</td>
                  <td>{l.company}</td>
                  <td className="font-bold" style={{color:GOLD}}>{l.value.toLocaleString()}</td>
                  <td><Badge s={l.stage}/></td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 rounded-full bg-slate-100" style={{width:50}}>
                        <div className="h-full rounded-full" style={{width:`${l.probability}%`,background:l.probability>=70?'#059669':l.probability>=40?'#D97706':'#DC2626'}}/>
                      </div>
                      <span className="text-xs text-slate-400">{l.probability}%</span>
                    </div>
                  </td>
                  <td>{l.source}</td>
                  <td><AIBtn label="Email" onClick={()=>setModal(l)}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

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
      {modal&&<Modal title="Weekly Operations Report — Mohammad Irfan" content={AI_WEEKLY} onClose={()=>setModal(false)}/>}
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
