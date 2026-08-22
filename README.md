# AI Ops Dashboard — Mohammad Irfan

A professional AI-powered operations dashboard showcasing real-time KPIs, charts, and Claude AI integrations across 4 Dubai industry verticals.

## Industries Covered
- 🏢 Real Estate (Dubai Marina, Downtown, Palm, JBR, DIFC)
- 🛒 E-commerce (Order management, product ops)
- 🚚 Logistics (Shipment tracking, delay management)
- 💼 Sales Coordination (CRM pipeline, lead management)

## Features
- Dark navy & gold enterprise design
- 4 KPI cards per industry
- Bar + Pie charts (Recharts)
- Color-coded status tables (green/amber/red)
- Dropdown filters per tab
- Claude AI generation buttons (listing descriptions, product copy, delay notices, follow-up emails)
- Executive home tab with weekly AI report generation
- Mobile-first responsive design

## Tech Stack
- React 18 + Vite
- Tailwind CSS
- Recharts
- Claude Sonnet 4.6 API
- Vercel deployment

## Deploy to Vercel
1. Push to GitHub
2. Connect repo in Vercel
3. Add env var: `VITE_ANTHROPIC_API_KEY=your_key` (handled by proxy in production)
4. Deploy
