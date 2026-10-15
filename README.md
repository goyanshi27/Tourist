# India in Motion — Bharat Tourism Intelligence Atlas

**People. Places. Movement. Economy.**

An interactive, data-driven tourism intelligence platform for India. Built as a premium data visualization portfolio project covering the complete India tourism ecosystem.

---

## Quick Start

Open `index.html` in a modern browser (Chrome, Firefox, Edge, Safari). No build tools or server required — runs as a static website.

> For the best experience, serve from a local HTTP server to avoid CORS issues with JSON data loading:
>
> ```bash
> # Python 3
> python -m http.server 8000
> # Then open http://localhost:8000
> ```

---

## Project Structure

```
india-tourism/
├── index.html                  # Homepage — animated intro, India map, KPIs, charts
├── pages/
│   ├── tourists.html           # Tourist origins, source markets, gateways, purpose
│   ├── states.html             # State comparison lab, profiles, radar charts
│   ├── destinations.html       # Destination explorer with mini dashboards
│   ├── economy.html            # Revenue, GDP, employment, Sankey flows
│   ├── culture.html            # Heritage, spiritual, wildlife, festivals, DNA
│   ├── infrastructure.html     # Hotels, airports, government projects tracker
│   ├── sustainability.html     # Eco-tourism, pressure index, protected areas
│   ├── insights.html           # Concentration, emerging destinations, opportunity
│   └── data-lab.html           # Data exploration, compare tool, CSV export
├── css/
│   ├── style.css               # Core design system, tokens, components
│   ├── animations.css          # Animation system, scroll triggers
│   └── responsive.css          # Responsive breakpoints
├── js/
│   ├── app.js                  # Homepage orchestrator
│   ├── page-common.js          # Shared init for all sub-pages
│   ├── data-loader.js          # JSON fetch, caching, auto-path detection
│   ├── animations.js           # Animation engine, counters, sparklines
│   ├── charts.js               # Chart.js factory (line, bar, donut, radar, etc.)
│   ├── map.js                  # Leaflet.js India map engine, state panels
│   └── search.js               # Global search engine
└── data/
    ├── national-tourism.json   # FTA, DTV, forex, GDP, employment 2013–2023
    ├── states.json             # State-wise tourism data, 18 major states
    ├── countries.json          # Top 20 source markets, continental breakdown
    ├── destinations.json       # 12 major destinations with visitor data
    ├── economy.json            # Forex, GDP contribution, employment, gateways
    ├── infrastructure.json     # Hotels, airports, state infrastructure
    ├── heritage.json           # ASI monuments, UNESCO sites
    ├── sustainability.json     # Protected areas, pressure index, eco-tourism
    └── projects.json           # Government tourism projects (Swadesh Darshan, PRASHAD)
```

---

## Features

### Homepage
- Animated intro screen with particle canvas
- Interactive India Leaflet map with state hover/click
- 4 switchable map layers (Total / Domestic / Foreign / Growth)
- 8 KPI cards with animated counters and sparklines
- 7 overview charts (growth, revenue, GDP, employment, composition, stacked, source countries)
- Auto-generated data insights (calculated from datasets, not hardcoded)
- India 360° interactive navigation wheel
- Global search (Ctrl+K)
- Dark/light mode toggle
- Year selector
- Fullscreen mode

### Page Modules
| Page | Key Visualizations |
|------|--------------------|
| Tourists | Top-10 bar, continental donut, ranked table, gateway charts, trend lines, purpose charts |
| States | State rankings, recovery bar, scatter plot, comparison lab (grouped bar, radar, profiles) |
| Destinations | Category filter, destination cards, mini dashboards (trend + donut + seasonality) |
| Economy | Forex trend + growth, GDP split, employment stacked, Sankey flow diagram |
| Culture | Monument visitor charts, ASI trend, spiritual sites, wildlife, festival calendar, Tourism DNA radar |
| Infrastructure | Hotel categories, airport map (Leaflet), project tracker table with status |
| Sustainability | Pressure index bar + scatter, protected areas donut, tiger reserve trend, eco radar |
| Insights | Pareto concentration, emerging destination cards, opportunity quadrant/bubble, seasonality |
| Data Lab | Filter panel, dynamic charts, exportable data table, CSV download, compare tool |

---

## Technology Stack

| Library | Version | Purpose |
|---------|---------|---------|
| Chart.js | 4.4.0 | All charts (15+ chart types) |
| Leaflet.js | 1.9.4 | Interactive India map |
| D3.js | 7.8.5 | Sankey diagram |
| Bootstrap 5 | — | Not used (custom CSS system) |
| Font Awesome | 6.5 | Icons |
| Google Fonts | — | Playfair Display, DM Serif, Inter, Manrope |

---

## Data Sources

All data is sourced from official government and intergovernmental organizations:

| Source | Data Used |
|--------|-----------|
| Ministry of Tourism, Government of India | FTA, DTV, hotel counts, project data |
| Bureau of Immigration, GoI | Gateway-wise FTA, source country breakdown |
| Reserve Bank of India | Foreign Exchange Earnings from Tourism |
| Archaeological Survey of India | Monument visitor statistics |
| Ministry of Environment, Forest & Climate Change | Protected areas, tiger reserves |
| World Travel & Tourism Council (WTTC) | GDP contribution, employment figures |
| UNESCO World Heritage Centre | World Heritage Sites |
| Airports Authority of India / DGCA | Airport passenger statistics |

### Data Classification

Every chart displays one of three badges:
- **Official** — directly from government/intergovernmental source
- **Derived** — calculated from official data with transparent methodology
- **Illustrative** — used only when data is unavailable, clearly labeled as such

---

## Design System

### Colors
- Background: `#0B0D0F` (near-black)
- Saffron accent: `#E8770A`
- Gold accent: `#C8A84B`
- Green accent: `#40916C`
- Terracotta: `#B5470B`

### Typography
- Headings: Playfair Display (editorial serif)
- Interface: Inter (clean sans-serif)
- Body: Manrope (readable sans-serif)

### Accessibility
- Semantic HTML5 throughout
- ARIA labels on interactive elements
- Keyboard navigation support
- `prefers-reduced-motion` support (all animations disabled)
- Sufficient color contrast

---

## Disclaimer

India in Motion is an independent data visualization project created for portfolio and educational purposes. Official statistics are sourced from Ministry of Tourism, Government of India and other credible sources as cited on each chart. Derived analytical metrics are clearly labeled and distinguished from official government data. This platform is not affiliated with any government agency.
