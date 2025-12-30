# SSC Skylight Pricing Calculators - Complete Technical Handoff Document

**Project Name:** sona-sky-pricing-calculator
**Current Version:** 2.0.0
**Document Date:** December 30, 2025
**Prepared For:** SSC Brain AI System
**Status:** Production Active

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Project Overview](#2-project-overview)
3. [Architecture & Technology Stack](#3-architecture--technology-stack)
4. [File Structure & Organization](#4-file-structure--organization)
5. [Calculator Implementations](#5-calculator-implementations)
6. [Pricing Logic & Calculation Engine](#6-pricing-logic--calculation-engine)
7. [Brand Configuration](#7-brand-configuration)
8. [Security Configuration](#8-security-configuration)
9. [Deployment & DevOps](#9-deployment--devops)
10. [Development Workflow](#10-development-workflow)
11. [Future Development](#11-future-development)
12. [Testing & Quality Assurance](#12-testing--quality-assurance)
13. [Troubleshooting Guide](#13-troubleshooting-guide)
14. [Dependencies & Third-party Libraries](#14-dependencies--third-party-libraries)
15. [API Reference & Data Structures](#15-api-reference--data-structures)
16. [Version History](#16-version-history)

---

## 1. Executive Summary

### 1.1 Project Purpose
This React-based web application provides interactive pricing calculators for The Scottish Shutter Company's skylight blind products. It enables sales teams and customers to generate instant quotes for three distinct product lines: Sky System, Lantern System, and (future) Eliminate System.

### 1.2 Current Status
**Production Live:** https://sona-sky-pricing-calculator-hw76y5vu6-david-brownes-projects.vercel.app

**Implemented Calculators:**
- ✅ **Sky System (Sona)** - Motorised cellular blinds for skylights (Single, Duo Inward, Duo Parallel configurations)
- ✅ **Lantern System (MasterBlinds)** - Wire-free motorised cellular blinds for skylights (MK2 system)
- ❌ **Eliminate System (Robertshaws)** - Not yet implemented

**Key Metrics:**
- Version: 2.0.0 (2026 pricing implemented)
- Build Size: ~19 source files
- Lines of Code: ~2,800+ (main calculators)
- Deployment Platform: Vercel
- Framework: React 19.1.0
- Update Frequency: Auto-checks every 60 seconds

### 1.3 Key Stakeholders
- **Client:** The Scottish Shutter Company (SSC)
- **Primary Users:** Sales team, customers
- **Developers:** David Browne
- **Hosting:** Vercel
- **Future AI Integration:** SSC Brain

---

## 2. Project Overview

### 2.1 Business Context
The Scottish Shutter Company specializes in premium skylight shading solutions. This calculator system replaces manual quote generation with automated, accurate pricing for three distinct product lines from different manufacturers.

### 2.2 Product Lines

#### 2.2.1 Sky System (Sona)
**Manufacturer:** SONA
**Product Type:** Motorised cellular blind for skylights and overhead glazing
**Configurations:**
- **Sky Single:** Up to 3m wide × 5m long (one blind)
- **Sky Duo Inward:** Up to 3m wide × 10m long (two blinds meeting in center)
- **Sky Duo Parallel:** Up to 6m wide × 5m long (two blinds side by side)
- **Sky Trio:** Up to 9m wide × 3m long (three blinds in parallel)

**Key Features:**
- 25mm perimeter shelf system
- Somfy motor powered (multiple power options)
- Remote control and smart home integration
- Translucent or Room Darkening fabric options
- Visible support lines and cords when retracted
- Premium German-engineered hardware

**Pricing Model:**
- Base blind price (from pricing tables based on dimensions)
- Fabric type premium (Dimout vs Blackout)
- Hardware color options (White, Grey, Anthracite, Black, Bespoke)
- Power supply options (Solar, Battery, Mains Adapters)
- Control options (Handsets, Wall Switches)
- Optional side trims with T-bar
- 2026 Premieré Range option (+10% premium)
- Configurable margin (default 50%)
- VAT (20%)
- Shipping cost (£75)

#### 2.2.2 Lantern System (MasterBlinds)
**Manufacturer:** MasterBlinds
**Product Type:** Wire-free motorised cellular blind (MK2)
**Dimensions:** 400-2000mm width × 400-3600mm drop

**Key Features:**
- Completely wire and cord-free
- Includes motor and battery pack
- Wireless controller included
- 45mm white frame (RAL optional)
- No visible support lines
- Cellular fabric (Hunter Douglas or Coulisse)

**Fabric Options:**
- **True Rioja** (Coulisse) - Entry level
  - Translucent (Band AA)
  - Room Darkening (Band A)
- **Unix Duette** (Hunter Douglas) - Premium
  - Translucent (Band A)
  - Room Darkening (Band B)
- **Elan Duette** (Hunter Douglas) - Luxury
  - Translucent (Band B)
  - Room Darkening (Band C)

**Pricing Model:**
- Band-based pricing tables (AA, A, B, C)
- Controller cost (£38)
- Configurable margin (50%, 56%, 60%, 65%)
- VAT (20%)

#### 2.2.3 Eliminate System (Robertshaws) - FUTURE
**Status:** Not yet implemented
**Expected Implementation:** Q1 2026

### 2.3 Technical Requirements
- **Responsive Design:** Mobile, tablet, desktop support
- **Real-time Calculations:** Auto-update on any input change
- **PDF Generation:** Professional quote output with customer details
- **Auto-update System:** Service worker checks for new versions
- **Security:** Input validation, rate limiting, CSP headers
- **Accessibility:** WCAG 2.1 AA compliance (target)

---

## 3. Architecture & Technology Stack

### 3.1 Core Technologies

#### Frontend Framework
- **React 19.1.0** - Latest stable version
- **React DOM 19.1.0** - DOM rendering
- **React Scripts 5.0.1** - Create React App build system

#### Styling & UI
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - Browser compatibility

#### PDF Generation
- **html2pdf.js 0.12.1** - Client-side PDF generation from HTML

#### Testing
- **@testing-library/react 16.3.0** - React component testing
- **@testing-library/jest-dom 6.6.3** - DOM matchers
- **@testing-library/user-event 13.5.0** - User interaction simulation

#### Development Tools
- **xlsx 0.18.5** - Excel spreadsheet handling (dev dependency)

### 3.2 Application Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Browser/User                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              AppRouter Component (Index)                │
│  - Navigation Bar                                       │
│  - Calculator Selection (Sky/Lantern)                   │
└────────┬──────────────────────────────┬─────────────────┘
         │                              │
         ▼                              ▼
┌────────────────────┐      ┌────────────────────────┐
│  SkyCalculator     │      │  LanternCalculator     │
│  (AppFinal.js)     │      │  (LanternCalculator.js)│
│                    │      │                        │
│  - State Mgmt      │      │  - State Mgmt          │
│  - Pricing Logic   │      │  - Pricing Logic       │
│  - PDF Generation  │      │  - Real-time Calc      │
│  - Validation      │      │  - Validation          │
└────────┬───────────┘      └────────┬───────────────┘
         │                           │
         ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│              Shared Configuration Layer                 │
│  - brand-config.js (Colors, Fonts, Branding)           │
│  - security-config.js (Validation, Rate Limiting)      │
└─────────────────────────────────────────────────────────┘
```

### 3.3 State Management
**Strategy:** React Hooks (useState, useEffect)
**No external state library** - Complexity doesn't warrant Redux/Context

**State Patterns:**
1. **Local Component State** - Each calculator manages its own state
2. **Computed State** - Quotes calculated on-the-fly via useEffect
3. **Validation State** - Errors array updated on input changes
4. **Modal State** - Boolean flags for info modals

### 3.4 Routing
**Router:** Custom AppRouter component
**Navigation:** Tab-based selection (no URL routing)

```javascript
// src/AppRouter.js
- currentCalculator: 'sky' | 'lantern'
- Renders appropriate calculator based on selection
- Sticky navigation bar with calculator tabs
```

### 3.5 Build & Deployment Pipeline

```
Developer Commit
      │
      ▼
   Git Push (main branch)
      │
      ▼
Vercel Auto-Deploy
      │
      ├─> npm install
      │
      ├─> npm run build
      │   │
      │   ├─> Tailwind CSS compile
      │   ├─> React build (CRA)
      │   ├─> PostCSS processing
      │   └─> Asset optimization
      │
      ├─> Deploy to CDN
      │
      └─> Live URL update
```

---

## 4. File Structure & Organization

### 4.1 Project Root Structure

```
skylight-pricing-calculators/
│
├── .git/                       # Git repository
├── .vercel/                    # Vercel deployment config
├── .claude/                    # Claude AI session data
│
├── src/                        # Source code (PRIMARY)
│   ├── AppFinal.js            # Sky System Calculator (2061 lines)
│   ├── AppRouter.js           # Main router component
│   ├── LanternCalculator.js   # Lantern System Calculator (593 lines)
│   ├── brand-config.js        # Brand configuration
│   ├── security-config.js     # Security settings
│   ├── index.js               # React entry point
│   ├── index.css              # Tailwind CSS imports
│   ├── logo.svg               # Logo SVG
│   ├── version-info.json      # Version tracking
│   ├── assets/                # Images and static assets
│   └── [test files]
│
├── public/                     # Public static files
│   ├── index.html             # HTML template
│   ├── scottish-shutter-company-logo.png
│   ├── favicon.ico
│   ├── sw.js                  # Service Worker
│   ├── version-check.json     # Version file for auto-update
│   └── [other assets]
│
├── scripts/                    # Build and deployment scripts
│   ├── bump-version.js
│   ├── deploy-vercel.js
│   ├── deploy-only.js
│   ├── rollback.js
│   ├── security-audit.js
│   ├── update-version-check.js
│   ├── version-manager.js
│   └── [logo generation scripts]
│
├── docs/                       # Documentation
│   ├── DESIGN-SYSTEM-SUMMARY.md
│   └── UNIFIED-DESIGN-IMPLEMENTATION.md
│
├── build/                      # Production build (generated)
├── node_modules/              # Dependencies (generated)
│
├── package.json               # Project dependencies
├── package-lock.json          # Dependency lock file
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vercel.json                # Vercel deployment config
├── deployment-config.json     # Custom deployment settings
│
├── README.md                  # Project documentation
├── CHANGELOG.md               # Version history
├── STYLING-GUIDE.md           # Brand styling guide
├── Sky-System-Description.md  # Product description
│
└── [Various other documentation files]
```

### 4.2 Critical Files Deep Dive

#### src/AppRouter.js
**Purpose:** Main application router
**Responsibilities:**
- Navigation bar rendering
- Calculator selection state
- Tab switching logic
- Logo and branding display

**Key Code:**
```javascript
const [currentCalculator, setCurrentCalculator] = useState('sky');
// Renders SkyCalculator or LanternCalculator based on selection
```

#### src/AppFinal.js (Sky System)
**Size:** 2061 lines
**Purpose:** Complete Sky System calculator

**Major Sections:**
1. **Lines 1-100:** Imports, component setup, auto-update logic
2. **Lines 100-315:** PDF generation function
3. **Lines 315-400:** Pricing tables (dimout, blackout, side trims, accessories)
4. **Lines 400-465:** Helper functions (cord counts, dimension calculations)
5. **Lines 465-700:** Main calculation logic (useEffect hook)
6. **Lines 700-1200:** Hardware, fabric, power options data
7. **Lines 1200-2061:** UI rendering (JSX)

**State Variables:**
```javascript
systemType: 'single' | 'duo-inward' | 'duo-parallel' | 'trio'
recess: { length: '', width: '' }
fabricType: 'dimout' | 'blackout'
fabricColor: string (from fabric options)
hardwareColor: 'white' | 'grey' | 'anthracite' | 'black' | 'bespoke'
powerSupply: string (from power options)
handset: string (from handset options)
wallSwitch: string (from wall switch options)
margin: number (default 50)
sideTrims: boolean
tBarColor: string
premiereRange: boolean (2026 feature)
customerDetails: { name, address, phone, email }
quote: object | null (calculated result)
errors: string[]
```

#### src/LanternCalculator.js
**Size:** 593 lines
**Purpose:** Lantern System calculator (MasterBlinds MK2)

**Major Sections:**
1. **Lines 1-100:** State setup and pricing tables
2. **Lines 100-240:** Calculation logic
3. **Lines 240-290:** Fabric info modal
4. **Lines 290-593:** UI rendering

**Pricing Bands:**
- Band AA: True Rioja Translucent
- Band A: True Rioja RD, Unix Duette Translucent
- Band B: Unix Duette RD, Elan Duette Translucent
- Band C: Elan Duette RD

#### src/brand-config.js
**Purpose:** Centralized brand configuration
**Exports:** brandConfig object

**Key Sections:**
```javascript
colors: {
  teal: '#007A87',        // Pantone 7474C
  deepTeal: '#00333B',    // Pantone 546C
  lightGrey: '#C6C6BC',   // Pantone 413C
  black: '#1D1D1B',
  brightPink: '#C50084',  // Pantone 233C
  purple: '#752864',      // Pantone 249C
  grassGreen: '#58A618',  // Pantone 369C
}

fonts: {
  heading: '"Open Sans", Helvetica, sans-serif',
  body: '"Open Sans", Helvetica, sans-serif',
  // ... font variations
}

brand: {
  name: 'SSC',
  fullName: 'The Scottish Shutter Company',
  tagline: 'Professional Skylight Solutions',
  // ... contact info
}
```

#### src/security-config.js
**Purpose:** Security configuration and validation
**Exports:** securityConfig, securityMiddleware

**Key Features:**
```javascript
version: '2.0.0'  // Version locking
security: {
  maxInputLength: 10,
  allowedCharacters: /^[0-9]+$/,
  maxDimensions: { width: 3000, length: 5000 },
  rateLimit: { maxRequests: 100, windowMs: 60000 }
}
validateInput(value, type)  // Input validation
sanitizeInput(input)        // XSS prevention
securityHeaders             // HTTP security headers
```

#### vercel.json
**Purpose:** Vercel deployment configuration

**Key Settings:**
```json
{
  "builds": [{ "src": "package.json", "use": "@vercel/static-build" }],
  "routes": [
    // Static asset caching (1 year)
    // Version check no-cache
    // Service worker no-cache
    // SPA fallback to index.html
  ],
  "headers": {
    "X-Frame-Options": "DENY",
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "..."
  }
}
```

---

## 5. Calculator Implementations

### 5.1 Sky System Calculator (AppFinal.js)

#### 5.1.1 System Configurations

**Single Blind**
- Max dimensions: 3000mm × 5000mm
- Min dimensions: 500mm × 500mm
- One motor, one headrail
- Optional side trims

**Duo Inward**
- Max dimensions: 3000mm × 10000mm
- Min dimensions: 500mm × 1000mm
- Two blinds meet in center
- Each blind: (total length ÷ 2) × width
- Side trims REQUIRED

**Duo Parallel**
- Max dimensions: 6000mm × 5000mm (or 3000mm with side trims)
- Min dimensions: 1000mm × 500mm
- Two blinds side by side
- Each blind: length × (total width ÷ 2)
- T-bar option available

**Trio**
- Max dimensions: 9000mm × 3000mm
- Min dimensions: 1500mm × 500mm
- Three blinds in parallel
- Each blind: length × (total width ÷ 3)
- Side trims REQUIRED

#### 5.1.2 Pricing Calculation Flow

```javascript
// Step 1: Validate dimensions
if (totalLength < minLength || totalWidth < minWidth) {
  setErrors([...])
  return;
}

// Step 2: Calculate individual blind dimensions
const blindDims = calculateBlindDimensions(totalLength, totalWidth, systemType);

// Step 3: Find pricing size (round UP to next available size)
const pricingLength = findNextSizeUp(blind.length, availableLengths);
const pricingWidth = findNextSizeUp(blind.width, availableWidths);

// Step 4: Get base price from table
const basePricePerBlind = pricingTable[pricingLength][pricingWidth];

// Step 5: Apply fabric type multiplier
const fabricPrice = fabricType === 'blackout' ? blackoutPricing : dimoutPricing;

// Step 6: Calculate total blind cost
let totalBlindCost = basePricePerBlind * blindCount;

// Step 7: Add Premieré Range premium (if selected)
if (premiereRange) {
  totalBlindCost *= 1.10; // +10%
}

// Step 8: Add side trims (if applicable)
let sideTrimsCost = 0;
if (sideTrims) {
  sideTrimsCost = sideTrimsPricing[pricingLength][pricingWidth];
}

// Step 9: Add T-bar (for Duo Parallel)
let tBarCost = 0;
if (systemType === 'duo-parallel' && sideTrims) {
  tBarCost = 50; // Fixed cost
}

// Step 10: Add power supply
let powerCost = powerOptions[powerSupply].price * blindCount;

// Step 11: Add controls
let handsetCost = handsetOptions[handset].price;
let wallSwitchCost = wallSwitchOptions[wallSwitch].price;

// Step 12: Add shipping
let shippingCost = 75;

// Step 13: Calculate subtotal
const buySubtotal = totalBlindCost + sideTrimsCost + tBarCost + powerCost + handsetCost + wallSwitchCost + shippingCost;

// Step 14: Apply margin
const marginMultiplier = 1 + (margin / 100);
const retailSubtotal = buySubtotal * marginMultiplier;

// Step 15: Add VAT
const vatAmount = retailSubtotal * 0.20;
const totalWithVAT = retailSubtotal + vatAmount;

// Step 16: Round and set quote
setQuote({
  // ... all calculated values
  pricing: {
    retailTotal: Math.round(retailSubtotal),
    retailTotalIncVAT: Math.round(totalWithVAT),
    // ... breakdown
  }
});
```

#### 5.1.3 Pricing Tables (2026)

**Dimout Fabric Pricing:**
```javascript
dimoutPricing = {
  1000: { 1000: 362, 1200: 372, 1400: 384, ..., 3000: 478 },
  1500: { 1000: 380, 1200: 391, 1400: 399, ..., 3000: 493 },
  2000: { 1000: 396, 1200: 411, 1400: 419, ..., 3000: 512 },
  // ... up to 5000mm length
  5000: { 1000: 912, 1200: 924, 1400: 937, ..., 3000: 1039 }
}
```

**Blackout Fabric Pricing:** (Similar structure, ~£14 premium per blind)

**Side Trims Pricing:**
```javascript
sideTrimsPricing = {
  1000: { 1000: 53, 1200: 59, ..., 3000: 107 },
  // ... up to 5000mm
}
```

**Power Options (2026):**
```javascript
{
  solar: { name: "Solar Pack", price: 76, capacity: 1 },
  adapter: { name: "12v Mains Adapter", price: 18, capacity: 1 },
  battery: { name: "Li-on USB-C Battery", price: 38, capacity: 1 },
  batteryCharger: { name: "Li-on USB-C Battery plus charger", price: 50 },
  sna45: { name: "SNA-45-12 Mains Transformer", price: 40, capacity: 1 },
  sna75: { name: "SNA-75-12 Mains Transformer", price: 50, capacity: 3 },
  sna100: { name: "SNA-100-12 Mains Transformer", price: 65, capacity: 4 },
  sna12151: { name: "SNA12151 Mains Transformer", price: 110, capacity: 6 }
}
```

**Control Options:**
```javascript
// Handsets
{ situo1: 29, situo5: 47, telis16: 134, tahoma: 145 }

// Wall Switches
{ smoove: 34, smoove4: 47 }
```

#### 5.1.4 Fabric Options

**Fabric Colors (Dimout):**
- Snow, Pebble, Cloud, Stone, Slate, Chalk, Mist, Ash

**Fabric Colors (Blackout):**
- Midnight, Charcoal, Graphite, Smoke, Pearl

#### 5.1.5 Hardware Finish Options
- White RAL9016
- Grey RAL7040
- Anthracite RAL7016
- Black RAL9005
- Bespoke RAL (POA)

#### 5.1.6 PDF Quote Generation

**Function:** `handleGeneratePdf()`
**Library:** html2pdf.js
**Output:** Professional PDF quotation

**PDF Structure:**
1. **Header:** SSC logo + company name
2. **Quote Reference:** SSC-YYYY-NNNN (random 4-digit)
3. **Date:** Current date (formatted)
4. **Customer Details:** Name, address, phone, email
5. **Product Table:**
   - Description: "SonaSky Motorised Cellular Blind"
   - Specification: All blind details, fabric, hardware, controls
   - Quantity: 1 (all items consolidated)
   - Unit Price & Total
6. **Pricing Summary:**
   - Subtotal
   - VAT (20%)
   - Total Inc VAT
7. **Terms & Conditions:**
   - Valid 30 days
   - Includes installation
   - Lead time 4-6 weeks
   - 50% deposit required
   - SONA manufacture
   - Warranty included
8. **Footer:** Company contact information

**PDF Options:**
```javascript
{
  margin: [10, 10, 20, 10],
  filename: `SSC-Quote-${quoteReference}.pdf`,
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
}
```

### 5.2 Lantern System Calculator (LanternCalculator.js)

#### 5.2.1 Product Specifications
- **Manufacturer:** MasterBlinds
- **System:** Lantern MK2
- **Width Range:** 400-2000mm
- **Drop Range:** 400-3600mm
- **Frame:** 45mm white (RAL optional)
- **Power:** Wire-free battery system
- **Controller:** Wireless handset included

#### 5.2.2 Fabric Bands & Pricing

**Band AA - True Rioja Translucent**
```javascript
bandAA = {
  400: { 400: 196, 600: 205, 800: 213, ..., 2000: 257 },
  600: { 400: 203, 600: 212, 800: 222, ..., 2000: 271 },
  // ... up to 3600mm drop
  3600: { 400: 305, 600: 330, 800: 354, ..., 2000: 478 }
}
```

**Band A - True Rioja RD, Unix Duette Translucent**
**Band B - Unix Duette RD, Elan Duette Translucent**
**Band C - Elan Duette RD**

(All bands follow same structure with progressive pricing)

#### 5.2.3 Fabric Selection Logic

```javascript
const fabricOptions = {
  trueRioja: {
    name: 'True Rioja',
    description: 'Entry level cellular fabric from Coulisse',
    translucentBand: 'AA',
    roomDarkeningBand: 'A'
  },
  unixDuette: {
    name: 'Unix Duette',
    description: 'Premium Hunter Douglas Duette fabric',
    translucentBand: 'A',
    roomDarkeningBand: 'B'
  },
  elanDuette: {
    name: 'Elan Duette',
    description: 'Luxury Hunter Douglas Duette fabric',
    translucentBand: 'B',
    roomDarkeningBand: 'C'
  }
};

// Selection determines pricing band
const band = fabricType === 'translucent'
  ? fabricOptions[fabricRange].translucentBand
  : fabricOptions[fabricRange].roomDarkeningBand;
```

#### 5.2.4 Pricing Calculation

```javascript
// Step 1: Validate dimensions
if (width < 400 || width > 2000) error;
if (drop < 400 || drop > 3600) error;

// Step 2: Round UP to nearest pricing dimension
const nearestDrop = findNearestDimension(drop, availableDrops);
const nearestWidth = findNearestDimension(width, availableWidths);

// Step 3: Get blind price from band table
const blindBuyPrice = pricingTable[nearestDrop][nearestWidth];

// Step 4: Add controller
const totalBuyPrice = blindBuyPrice + 38; // Controller £38

// Step 5: Apply margin (50%, 56%, 60%, or 65%)
const priceWithMargin = totalBuyPrice * (1 + margin/100);

// Step 6: Add VAT (20%)
const vatAmount = priceWithMargin * 0.20;
const totalPrice = priceWithMargin + vatAmount;

// Step 7: Round and set quote
setQuote({
  width,
  drop,
  nearestWidth,
  nearestDrop,
  fabricRange: fabricOptions[fabricRange].name,
  fabricType: fabricType === 'translucent' ? 'Translucent' : 'Room Darkening',
  band,
  blindBuyPrice,
  controllerCost: 38,
  totalBuyPrice,
  margin,
  priceWithMargin: Math.round(priceWithMargin),
  vatAmount: Math.round(vatAmount),
  totalPrice: Math.round(totalPrice)
});
```

#### 5.2.5 Margin Presets
- 50% (default)
- 56%
- 60%
- 65%
- Custom (user input)

---

## 6. Pricing Logic & Calculation Engine

### 6.1 Dimension Rounding Strategy

**Rule:** ALWAYS round UP to the next available pricing size

**Rationale:**
- Ensures adequate material coverage
- Prevents underpricing
- Matches manufacturer pricing tiers

**Implementation:**
```javascript
const findNextSizeUp = (value, availableValues) => {
  const sortedValues = availableValues.sort((a, b) => a - b);
  return sortedValues.find(size => size >= value)
    || sortedValues[sortedValues.length - 1];
};
```

**Example:**
```
Customer input: 1850mm width
Available widths: [1000, 1200, 1400, 1600, 1800, 2000, ...]
Pricing width: 2000mm (rounds UP from 1850)
```

### 6.2 Multi-Blind Calculations

**Duo Inward:**
```javascript
// Customer enters: 6000mm length × 2000mm width
// System calculates:
Blind 1: 3000mm length × 2000mm width
Blind 2: 3000mm length × 2000mm width
// Both blinds meet in center
```

**Duo Parallel:**
```javascript
// Customer enters: 2000mm length × 4000mm width
// System calculates:
Blind 1: 2000mm length × 2000mm width
Blind 2: 2000mm length × 2000mm width
// Blinds run side by side
```

**Trio:**
```javascript
// Customer enters: 2000mm length × 6000mm width
// System calculates:
Blind 1: 2000mm length × 2000mm width
Blind 2: 2000mm length × 2000mm width
Blind 3: 2000mm length × 2000mm width
// Three blinds in parallel
```

### 6.3 Cord Count Calculation

**Purpose:** Determine number of support lines based on width

```javascript
const getCordCount = (width) => {
  if (width < 700) return { total: 4, spooling: 2, support: 2 };
  if (width < 1101) return { total: 6, spooling: 3, support: 3 };
  if (width < 1401) return { total: 8, spooling: 4, support: 4 };
  if (width < 2201) return { total: 10, spooling: 5, support: 5 };
  return { total: 12, spooling: 6, support: 6 };
};
```

### 6.4 Power Supply Capacity Planning

**Transformer Capacity:**
```
SNA-45-12: 1 blind
SNA-75-12: 3 blinds
SNA-100-12: 4 blinds
SNA12151: 6 blinds
```

**Validation:**
- System validates transformer capacity vs blind count
- Shows warning if capacity insufficient
- Recommends appropriate transformer

### 6.5 Margin Application

**Default Margin:** 50%
**Calculation:** `sellPrice = buyPrice × (1 + margin/100)`

**Example:**
```
Buy price: £500
Margin: 50%
Sell price: £500 × 1.50 = £750
```

### 6.6 VAT Calculation

**Rate:** 20%
**Applied to:** Final retail price (after margin)
**Calculation:** `VAT = retailPrice × 0.20`

**Example:**
```
Retail price (ex VAT): £750
VAT (20%): £150
Total inc VAT: £900
```

### 6.7 Shipping Cost

**Fixed Cost:** £75
**Applied to:** All Sky System orders
**Not applicable to:** Lantern System (included in base price)

---

## 7. Brand Configuration

### 7.1 Color Palette

#### Primary Colors
```javascript
teal: '#007A87'        // Pantone 7474C - Primary brand color
deepTeal: '#00333B'    // Pantone 546C - Dark variant
lightGrey: '#C6C6BC'   // Pantone 413C - Background
black: '#1D1D1B'       // Primary text color
```

#### Accent Colors
```javascript
brightPink: '#C50084'  // Pantone 233C - Accents, warnings
purple: '#752864'      // Pantone 249C - Errors
grassGreen: '#58A618'  // Pantone 369C - Success messages
white: '#ffffff'       // Cards, backgrounds
```

#### Gray Scale
```javascript
gray: {
  50: '#fafafa',   // Very light backgrounds
  100: '#f5f5f5',  // Light backgrounds
  200: '#e5e5e5',  // Borders
  300: '#d4d4d4',  // Disabled states
  400: '#a3a3a3',  // Muted text
  500: '#737373',  // Secondary text
  600: '#525252',  // Body text
  700: '#404040',  // Headings
  800: '#262626',  // Dark text
  900: '#171717'   // Darkest text
}
```

### 7.2 Typography

**Font Family:** Open Sans (from Google Fonts)

**Weights:**
- Light: 300
- Regular: 400
- Semi Bold: 600
- Bold: 700

**Font Sizes:**
```javascript
xs: '0.75rem'    // 12px
sm: '0.875rem'   // 14px
base: '1rem'     // 16px
lg: '1.125rem'   // 18px
xl: '1.25rem'    // 20px
2xl: '1.5rem'    // 24px
3xl: '1.875rem'  // 30px
4xl: '2.25rem'   // 36px
5xl: '3rem'      // 48px
```

**Font Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### 7.3 Spacing System

```javascript
xs: '0.25rem'   // 4px
sm: '0.5rem'    // 8px
md: '1rem'      // 16px
lg: '1.5rem'    // 24px
xl: '2rem'      // 32px
2xl: '3rem'     // 48px
3xl: '4rem'     // 64px
```

### 7.4 Border Radius

```javascript
sm: '0.25rem'    // 4px
md: '0.375rem'   // 6px
lg: '0.5rem'     // 8px
xl: '0.75rem'    // 12px
2xl: '1rem'      // 16px
3xl: '1.5rem'    // 24px (used for cards)
full: '9999px'   // Pills/circles
```

### 7.5 Shadows

```javascript
sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
```

### 7.6 Logo Assets

**Primary Logo:** `/scottish-shutter-company-logo.png`
**Location:** `/public/scottish-shutter-company-logo.png`
**Format:** PNG with transparency
**Usage:** Header, PDF quotes

**Favicon:** `/favicon.ico`
**Formats:** ICO, PNG (multiple sizes)

### 7.7 Brand Information

```javascript
brand: {
  name: 'SSC',
  fullName: 'The Scottish Shutter Company',
  tagline: 'Professional Skylight Solutions',
  website: 'https://www.scottishshuttercompany.com',
  email: 'info@scottishshuttercompany.com'
}
```

---

## 8. Security Configuration

### 8.1 Input Validation

**Max Input Length:** 10 characters
**Allowed Characters:** Digits only (0-9)

**Validation Function:**
```javascript
validateInput: (value, type) => {
  if (!value || value === '') return false;

  switch (type) {
    case 'number':
      return /^[0-9]+$/.test(value) &&
             parseInt(value) >= 0 &&
             parseInt(value) <= 999999;
    case 'dimension':
      return /^[0-9]+$/.test(value) &&
             parseInt(value) >= 500 &&
             parseInt(value) <= 5000;
    default:
      return false;
  }
}
```

### 8.2 Sanitization

**XSS Prevention:**
```javascript
sanitizeInput: (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>"'&]/g, '');
}
```

**PDF Generation Sanitization:**
```javascript
const safeText = (value, fallback = 'Not provided') => {
  if (!value || value.trim() === '') return fallback;
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};
```

### 8.3 Rate Limiting

**Client-Side Rate Limiting:**
```javascript
rateLimit: {
  maxRequests: 100,
  windowMs: 60000  // 1 minute
}

// Tracking
requests: Map<identifier, timestamp[]>

// Check
checkRateLimit(identifier) {
  // Filters requests within time window
  // Returns false if limit exceeded
}
```

### 8.4 Security Headers

**HTTP Security Headers (vercel.json):**
```json
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; ..."
}
```

### 8.5 Version Locking

**Purpose:** Prevent unauthorized updates

```javascript
version: '2.0.0',
locked: false,          // Can be set to true to freeze version
allowUpdates: true      // Toggle auto-updates
```

### 8.6 Allowed Origins

**CORS Configuration:**
```javascript
allowedOrigins: [
  'https://skylight-pricing-calculators.vercel.app',
  'http://localhost:3000'  // Development only
]
```

---

## 9. Deployment & DevOps

### 9.1 Production URL
**Live Site:** https://sona-sky-pricing-calculator-hw76y5vu6-david-brownes-projects.vercel.app
**Platform:** Vercel
**Region:** Auto (CDN distributed)

### 9.2 Build Process

**Build Command:** `npm run build`
**Build Tool:** React Scripts (Create React App)
**Output Directory:** `build/`

**Build Steps:**
1. Compile Tailwind CSS
2. Process PostCSS
3. Optimize JavaScript (minify, tree-shake)
4. Optimize CSS (purge unused)
5. Optimize images
6. Generate service worker
7. Create production bundle

**Build Output:**
```
build/
├── index.html
├── static/
│   ├── js/
│   │   ├── main.[hash].js
│   │   └── [chunks].js
│   ├── css/
│   │   └── main.[hash].css
│   └── media/
│       └── [images]
├── scottish-shutter-company-logo.png
├── sw.js
├── version-check.json
└── [other assets]
```

### 9.3 Deployment Configuration

**vercel.json:**
```json
{
  "version": 2,
  "builds": [{
    "src": "package.json",
    "use": "@vercel/static-build",
    "config": { "distDir": "build" }
  }],
  "routes": [
    // Asset caching
    { "src": "/static/(.*)", "headers": { "Cache-Control": "public, max-age=31536000, immutable" }},
    // No-cache for dynamic files
    { "src": "/version-check.json", "headers": { "Cache-Control": "no-cache, ..." }},
    // SPA routing
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

**deployment-config.json:**
```json
{
  "autoDeploy": true,
  "deployOnCommit": true,
  "deployOnVersionBump": true,
  "vercelProject": "skylight-pricing-calculators",
  "rollbackSettings": {
    "keepLastDeployments": 10,
    "autoRollbackOnFailure": false
  }
}
```

### 9.4 Auto-Update System

**Service Worker (sw.js):**
```javascript
// Caches assets
// Checks for updates every 30 seconds
// Prompts user when new version available
```

**Version Check:**
```javascript
// Fetches /version-check.json every 60 seconds
// Compares with current version
// Prompts reload if different
```

**Update Flow:**
```
1. User loads app
2. Service worker registers
3. Every 30s: Check for new service worker
4. Every 60s: Fetch version-check.json
5. If new version detected:
   → Show confirmation dialog
   → User clicks OK
   → window.location.reload()
   → New version loads
```

### 9.5 Deployment Scripts

**scripts/deploy-vercel.js:**
- Builds production bundle
- Deploys to Vercel
- Updates version-check.json
- Supports force deploy

**scripts/bump-version.js:**
- Increments version (patch/minor/major)
- Updates package.json
- Updates security-config.js
- Updates version-info.json
- Creates git tag

**scripts/rollback.js:**
- Lists previous deployments
- Rolls back to specific version
- Updates version files

**scripts/update-version-check.js:**
- Generates version-check.json
- Includes version, timestamp, git info

### 9.6 CI/CD Pipeline

**Current Setup:** Manual deployment via scripts

**Recommended GitHub Actions Workflow:**
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 9.7 Environment Variables

**Production:**
```
NODE_ENV=production
```

**Development:**
```
NODE_ENV=development
PORT=3000
```

### 9.8 Monitoring & Analytics

**Current:** None implemented

**Recommended:**
- Vercel Analytics (built-in)
- Google Analytics
- Error tracking (Sentry)
- Performance monitoring (Web Vitals)

---

## 10. Development Workflow

### 10.1 Local Development Setup

```bash
# 1. Clone repository
git clone [repo-url]
cd skylight-pricing-calculators

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Open browser
# http://localhost:3000
```

### 10.2 Development Commands

```bash
# Start dev server
npm start

# Build production
npm run build

# Run tests
npm test

# Security audit
npm run security:audit

# Bump version
npm run version:bump        # Patch (1.0.0 → 1.0.1)
npm run version:minor       # Minor (1.0.0 → 1.1.0)
npm run version:major       # Major (1.0.0 → 2.0.0)

# Deploy
npm run deploy              # Deploy to Vercel
npm run deploy:force        # Force deploy
npm run deploy:status       # Check deployment status

# Rollback
npm run rollback:list       # List previous deployments
npm run rollback            # Rollback to previous version
```

### 10.3 Git Workflow

**Branching Strategy:** Single branch (main)

**Commit Convention:**
```
<type>: <description>

Examples:
- Add Lantern System calculator
- Update Lantern calculator margins to 50%, 56%, 60%, 65%
- Refine Sky System description with client feedback
- Update fabric terminology to Translucent and Room Darkening
- Fix version-check.json to match v1.3.4
```

**Commit Types:**
- Add: New feature
- Update: Modify existing feature
- Fix: Bug fix
- Refactor: Code restructure
- Docs: Documentation update

### 10.4 Code Style & Conventions

**JavaScript:**
- ES6+ syntax
- Functional components (React Hooks)
- camelCase for variables/functions
- PascalCase for components
- Descriptive variable names
- Comments for complex logic

**CSS/Tailwind:**
- Utility-first approach
- Custom classes in index.css
- Responsive breakpoints: sm, md, lg, xl
- Consistent spacing units

**File Organization:**
- One component per file
- Shared configs in separate files
- Colocate related files

### 10.5 Testing Strategy

**Current:** Minimal test coverage

**Recommended:**
```javascript
// Unit tests for calculations
describe('Sky Calculator', () => {
  test('calculates duo inward dimensions correctly', () => {
    const result = calculateBlindDimensions(6000, 2000, 'duo-inward');
    expect(result.blind1.length).toBe(3000);
    expect(result.blind1.width).toBe(2000);
  });

  test('rounds dimensions up correctly', () => {
    const result = findNextSizeUp(1850, [1000, 1200, 1400, 1600, 1800, 2000]);
    expect(result).toBe(2000);
  });

  test('applies margin correctly', () => {
    const buyPrice = 500;
    const margin = 50;
    const sellPrice = buyPrice * (1 + margin/100);
    expect(sellPrice).toBe(750);
  });
});
```

---

## 11. Future Development

### 11.1 Eliminate System Calculator (Robertshaws)

**Status:** Not yet implemented
**Priority:** High
**Target Date:** Q1 2026

**Requirements:**
- Product specifications from Robertshaws
- Pricing tables
- Configuration options
- Dimension constraints
- Unique selling points

**Implementation Plan:**
1. Create `EliminateCalculator.js` component
2. Add to AppRouter navigation
3. Implement pricing logic
4. Add to unified styling system
5. Test thoroughly
6. Deploy

**File Template:**
```javascript
// src/EliminateCalculator.js
import React, { useState, useEffect } from 'react';
import { brandConfig } from './brand-config';
import { securityConfig } from './security-config';

function EliminateCalculator() {
  // State management
  const [dimensions, setDimensions] = useState({ width: '', drop: '' });
  const [quote, setQuote] = useState(null);

  // Pricing tables (to be populated)
  const pricingTable = {
    // ... pricing data
  };

  // Calculation logic
  useEffect(() => {
    // ... calculate quote
  }, [dimensions]);

  // Render UI
  return (
    <div>
      {/* Calculator UI */}
    </div>
  );
}

export default EliminateCalculator;
```

### 11.2 Planned Features

#### Admin Panel
**Purpose:** Update pricing without code changes

**Features:**
- Upload new pricing tables (CSV/Excel)
- Update margin defaults
- Modify product options
- Enable/disable features
- View usage analytics

**Technology:** Separate admin React app + Firebase/Supabase backend

#### Customer Portal
**Purpose:** Save and retrieve quotes

**Features:**
- User accounts
- Quote history
- Favorite configurations
- Share quotes via link
- Request survey/installation

#### Enhanced PDF Quotes
**Features:**
- Custom logo per salesperson
- Include product images
- Terms & conditions variations
- Digital signature
- Email delivery

#### Quote Comparison
**Features:**
- Side-by-side comparison of different configurations
- Highlight differences
- Cost breakdown visualization
- Savings calculator

#### Smart Recommendations
**Features:**
- Suggest optimal configuration based on dimensions
- Recommend transformer based on blind count
- Fabric selection wizard
- Installation complexity estimation

### 11.3 Technical Debt

**Items to Address:**
1. **Test Coverage:** Add comprehensive unit and integration tests
2. **TypeScript Migration:** Convert to TypeScript for type safety
3. **State Management:** Consider Context API or Zustand for complex state
4. **Component Library:** Extract reusable components (buttons, inputs, modals)
5. **Performance:** Lazy load calculators, optimize bundle size
6. **Accessibility:** Full WCAG 2.1 AA compliance audit
7. **Analytics:** Implement usage tracking and error monitoring
8. **Documentation:** Add JSDoc comments to all functions
9. **Code Splitting:** Split calculators into separate bundles
10. **API Backend:** Move pricing data to API for easier updates

---

## 12. Testing & Quality Assurance

### 12.1 Manual Testing Checklist

**Sky Calculator:**
- [ ] Single blind: Min/max dimensions work
- [ ] Duo Inward: Calculations correct, side trims forced
- [ ] Duo Parallel: Calculations correct, T-bar option works
- [ ] Trio: Three blinds calculated correctly
- [ ] Dimout vs Blackout pricing difference
- [ ] All hardware colors selectable
- [ ] All power options calculate correctly
- [ ] Handset/Wall Switch options work
- [ ] Margin calculation accurate
- [ ] VAT calculation correct (20%)
- [ ] PDF generation works with all details
- [ ] Customer details save and appear in PDF
- [ ] Responsive on mobile/tablet
- [ ] All modals (fabric, hardware, power, control) display
- [ ] Premieré Range toggle adds 10%

**Lantern Calculator:**
- [ ] Min dimensions validated (400mm)
- [ ] Max dimensions validated (2000mm width, 3600mm drop)
- [ ] All fabric ranges selectable
- [ ] Translucent vs Room Darkening changes band
- [ ] Dimensions round up correctly
- [ ] Margin presets work (50%, 56%, 60%, 65%)
- [ ] Custom margin input works
- [ ] VAT calculation correct
- [ ] Fabric info modal displays
- [ ] Responsive design

**General:**
- [ ] Navigation between calculators works
- [ ] Logo displays correctly
- [ ] Brand colors consistent
- [ ] Fonts load correctly
- [ ] No console errors
- [ ] Auto-update prompts work
- [ ] Service worker registers

### 12.2 Browser Compatibility

**Supported Browsers:**
- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

**Mobile Browsers:**
- iOS Safari 14+ ✅
- Chrome Mobile ✅
- Samsung Internet ✅

### 12.3 Responsive Breakpoints

```css
/* Tailwind breakpoints */
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

**Layout Tests:**
- 320px (iPhone SE) ✅
- 375px (iPhone 12) ✅
- 768px (iPad) ✅
- 1024px (Desktop) ✅
- 1920px (Large desktop) ✅

### 12.4 Performance Benchmarks

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- First Input Delay: < 100ms

**Bundle Size:**
- Main JS: ~200KB (gzipped)
- CSS: ~15KB (gzipped)
- Total: < 250KB

---

## 13. Troubleshooting Guide

### 13.1 Common Issues

#### Issue: Tailwind CSS not loading
**Symptoms:** Plain HTML styling, no colors/spacing
**Causes:**
- Tailwind not properly configured
- PostCSS not running
- Cache issues

**Solutions:**
```bash
# 1. Verify Tailwind config
cat tailwind.config.js

# 2. Clear cache
rm -rf node_modules/.cache
rm -rf build

# 3. Reinstall
npm install

# 4. Restart dev server
npm start
```

#### Issue: Calculations not updating
**Symptoms:** Quote doesn't change when inputs change
**Causes:**
- useEffect dependency array incorrect
- State not updating

**Solutions:**
```javascript
// Check useEffect dependencies
useEffect(() => {
  calculateQuote();
}, [recess.width, recess.length, fabricType, margin]); // All dependencies listed
```

#### Issue: PDF generation fails
**Symptoms:** Error when clicking "Generate PDF"
**Causes:**
- html2pdf.js not loaded
- Invalid HTML in template
- Image CORS issues

**Solutions:**
```bash
# Reinstall html2pdf
npm install html2pdf.js@latest

# Check for console errors
# Verify image paths are correct
```

#### Issue: Deployment fails
**Symptoms:** Vercel deploy errors
**Causes:**
- Build errors
- Missing environment variables
- Incorrect vercel.json

**Solutions:**
```bash
# Test build locally
npm run build

# Check build output
ls -la build/

# Review vercel logs
vercel logs
```

### 13.2 Debug Mode

**Enable React DevTools:**
1. Install React DevTools browser extension
2. Open DevTools
3. Navigate to Components/Profiler tabs
4. Inspect component state

**Console Logging:**
```javascript
// Add debug logs
console.log('Quote calculated:', quote);
console.log('Blind dimensions:', blindDims);
console.log('Pricing table lookup:', pricingTable[length][width]);
```

### 13.3 Error Messages

**"Dimensions must be at least Xmm × Ymm"**
- Input values below minimum for selected system type
- Check min dimensions for each system configuration

**"Too many requests. Please wait a moment."**
- Rate limiting triggered (100 requests/minute)
- Wait 60 seconds before continuing

**"Cannot find pricing for these dimensions"**
- Dimensions exceed maximum for system type
- Reduce dimensions or change system type

---

## 14. Dependencies & Third-party Libraries

### 14.1 Production Dependencies

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-scripts": "5.0.1",
  "html2pdf.js": "^0.12.1",
  "web-vitals": "^2.1.4"
}
```

**React 19.1.0:**
- Purpose: UI framework
- License: MIT
- Docs: https://react.dev

**html2pdf.js 0.12.1:**
- Purpose: Client-side PDF generation
- Dependencies: html2canvas, jsPDF
- License: MIT
- Docs: https://github.com/eKoopmans/html2pdf.js

### 14.2 Development Dependencies

```json
{
  "tailwindcss": "^3.4.17",
  "postcss": "^8.5.6",
  "autoprefixer": "^10.4.21",
  "xlsx": "^0.18.5",
  "@testing-library/react": "^16.3.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^13.5.0"
}
```

**Tailwind CSS 3.4.17:**
- Purpose: Utility-first CSS framework
- License: MIT
- Docs: https://tailwindcss.com

**xlsx 0.18.5:**
- Purpose: Spreadsheet handling (dev only)
- License: Apache-2.0
- Docs: https://sheetjs.com

### 14.3 Dependency Update Policy

**Strategy:** Conservative updates

**Process:**
1. Check for updates monthly: `npm outdated`
2. Review changelogs for breaking changes
3. Update patch versions automatically
4. Test minor/major updates in development
5. Deploy after thorough testing

**Update Commands:**
```bash
# Check outdated packages
npm outdated

# Update specific package
npm update [package-name]

# Update all patch versions
npm update

# Update to latest (use cautiously)
npm install [package]@latest
```

### 14.4 Security Audits

```bash
# Run security audit
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix including breaking changes (use cautiously)
npm audit fix --force
```

**Audit Schedule:** Weekly
**Critical Vulnerabilities:** Fix immediately
**High Vulnerabilities:** Fix within 7 days
**Medium/Low:** Fix in next update cycle

---

## 15. API Reference & Data Structures

### 15.1 Quote Object Structure (Sky System)

```javascript
quote = {
  // System configuration
  systemType: 'single' | 'duo-inward' | 'duo-parallel' | 'trio',

  // Total recess dimensions (customer input)
  totalRecess: {
    length: number,  // mm
    width: number    // mm
  },

  // Individual blind dimensions
  blind1: {
    dimensions: {
      length: number,
      width: number
    },
    pricingDimensions: {
      length: number,  // Rounded up size
      width: number    // Rounded up size
    },
    cords: {
      total: number,
      spooling: number,
      support: number
    }
  },

  // Blind 2 (if duo/trio)
  blind2: { /* same structure as blind1 */ },

  // Blind 3 (if trio)
  blind3: { /* same structure as blind1 */ },

  // Fabric selection
  fabric: {
    type: 'dimout' | 'blackout',
    color: string
  },

  // Hardware
  hardware: string,  // e.g., "White RAL9016"

  // Components
  components: {
    power: string,      // e.g., "Solar Pack"
    handset: string,    // e.g., "Situo 5 (5-channel)"
    wallSwitch: string  // e.g., "No Wall Switch"
  },

  // Side trims (if applicable)
  sideTrims: boolean,
  tBar: {
    required: boolean,
    color: string
  } | null,

  // Premieré Range
  premiereRange: boolean,

  // Pricing breakdown
  pricing: {
    // Buy prices (before margin)
    blind1Buy: number,
    blind2Buy: number,
    blind3Buy: number,
    totalBlindsBuy: number,
    sideTrimsBuy: number,
    tBarBuy: number,
    powerBuy: number,
    handsetBuy: number,
    wallSwitchBuy: number,
    shippingBuy: number,
    buySubtotal: number,

    // Retail prices (after margin)
    margin: number,  // percentage
    retailTotal: number,
    vatAmount: number,
    retailTotalIncVAT: number
  }
}
```

### 15.2 Quote Object Structure (Lantern System)

```javascript
quote = {
  // Customer input dimensions
  width: number,   // mm
  drop: number,    // mm

  // Pricing dimensions (rounded up)
  nearestWidth: number,
  nearestDrop: number,

  // Fabric selection
  fabricRange: 'True Rioja' | 'Unix Duette' | 'Elan Duette',
  fabricType: 'Translucent' | 'Room Darkening',
  band: 'AA' | 'A' | 'B' | 'C',

  // Pricing breakdown
  blindBuyPrice: number,
  controllerCost: number,  // Always £38
  totalBuyPrice: number,

  margin: number,  // percentage
  priceWithMargin: number,
  vatAmount: number,
  totalPrice: number
}
```

### 15.3 Pricing Table Structure

**Sky System (Dimout/Blackout):**
```javascript
{
  [length: number]: {
    [width: number]: number  // price
  }
}

// Example
dimoutPricing = {
  1000: {
    1000: 362,
    1200: 372,
    1400: 384,
    // ... up to 3000mm width
  },
  1500: { /* ... */ },
  // ... up to 5000mm length
}
```

**Lantern System (Band AA/A/B/C):**
```javascript
{
  [drop: number]: {
    [width: number]: number  // price
  }
}

// Example
bandAA = {
  400: {
    400: 196,
    600: 205,
    800: 213,
    // ... up to 2000mm width
  },
  600: { /* ... */ },
  // ... up to 3600mm drop
}
```

### 15.4 Configuration Objects

**Power Options:**
```javascript
{
  [key: string]: {
    name: string,
    price: number,
    capacity: number,      // Number of blinds supported
    needsCharger: boolean  // For battery options
  }
}
```

**Handset/Wall Switch Options:**
```javascript
{
  [key: string]: {
    name: string,
    price: number
  }
}
```

**Hardware/Fabric Options:**
```javascript
{
  [key: string]: string  // Display name
}
```

---

## 16. Version History

### 16.1 Current Version: 2.0.0 (December 23, 2025)

**Major Changes:**
- ✅ Updated to 2026 pricing for Sky System
- ✅ Added Lantern System calculator
- ✅ Refined Sky System customer-facing description
- ✅ Updated fabric terminology to "Translucent" and "Room Darkening"
- ✅ Added margin presets to Lantern calculator (50%, 56%, 60%, 65%)

### 16.2 Previous Versions

**v1.3.4** (October 2025)
- Added Li-on USB-C Battery plus charger option (£52)
- Fixed version-check.json sync
- Production ready deployment

**v1.2.7** (July 2025)
- Official SSC logo integration
- Improved PDF quote generation
- Enhanced UI/UX

**v1.0.0** (October 2025)
- Initial production release
- Sky System Single calculator
- Basic PDF generation
- Vercel deployment

### 16.3 Changelog Summary

```
v2.0.0 (2025-12-23)
  - Add: Lantern System calculator
  - Update: 2026 pricing tables
  - Update: Fabric terminology
  - Add: Sky System description

v1.3.4 (2025-10-05)
  - Add: Battery + charger combo option
  - Fix: Version sync issues
  - Docs: Production ready summary

v1.2.7 (2025-07-20)
  - Add: Official SSC logo
  - Update: PDF quote styling
  - Fix: Various UI improvements

v1.0.0 (2025-10-03)
  - Initial release
  - Sky System calculator
  - Vercel deployment
```

### 16.4 Roadmap

**Q1 2026:**
- [ ] Eliminate System calculator (Robertshaws)
- [ ] Admin panel for pricing updates
- [ ] Enhanced analytics

**Q2 2026:**
- [ ] Customer portal with quote history
- [ ] Email quote delivery
- [ ] Mobile app (React Native)

**Q3 2026:**
- [ ] Smart recommendations engine
- [ ] Multi-language support
- [ ] CRM integration

---

## Appendix A: Quick Reference

### Key Files at a Glance

| File | Purpose | Lines |
|------|---------|-------|
| src/AppRouter.js | Main router | 62 |
| src/AppFinal.js | Sky calculator | 2061 |
| src/LanternCalculator.js | Lantern calculator | 593 |
| src/brand-config.js | Branding | 128 |
| src/security-config.js | Security | 126 |
| package.json | Dependencies | 60 |
| vercel.json | Deployment | 58 |

### Important URLs

| Purpose | URL |
|---------|-----|
| Production | https://sona-sky-pricing-calculator-hw76y5vu6-david-brownes-projects.vercel.app |
| Repository | [To be added] |
| Documentation | This file |

### Key Contacts

| Role | Contact |
|------|---------|
| Developer | David Browne |
| Client | The Scottish Shutter Company |
| Support | info@scottishshuttercompany.com |

---

## Appendix B: Glossary

**Terms:**
- **Recess:** The opening where the blind will be installed
- **Drop:** Vertical dimension of the blind
- **Width:** Horizontal dimension of the blind
- **Dimout:** Translucent fabric that filters light
- **Blackout:** Room darkening fabric
- **Duo Inward:** Two blinds meeting in the center
- **Duo Parallel:** Two blinds running side by side
- **Trio:** Three blinds running in parallel
- **Side Trims:** Perimeter framing around the blind
- **T-Bar:** Central support bar for parallel blinds
- **Premieré Range:** Premium 2026 product line (+10%)
- **Band:** Pricing tier based on fabric selection
- **MK2:** MasterBlinds second-generation Lantern system

---

**Document End**

*This handoff document is maintained and updated with each major release. Last updated: December 30, 2025 for version 2.0.0*

*For questions or clarifications, contact the development team or refer to inline code comments.*
