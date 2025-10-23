# 🏗️ Blueprint: Building Luxaflex Duette Calculator from Sona Sky Architecture

**Purpose:** This document provides a comprehensive guide to understanding the Sona Sky Calculator architecture and using it as a foundation for building the Luxaflex Duette Range calculator.

**Created:** October 10, 2025  
**Based on:** Sona Sky Calculator v1.2.7  
**Target:** Luxaflex Duette Range Calculator MVP

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & File Structure](#architecture--file-structure)
3. [Key Components Explained](#key-components-explained)
4. [Development Workflow (Two-Terminal Setup)](#development-workflow-two-terminal-setup)
5. [GitHub & Version Control](#github--version-control)
6. [Vercel Deployment Process](#vercel-deployment-process)
7. [Creating Luxaflex Duette Calculator](#creating-luxaflex-duette-calculator)
8. [Step-by-Step Implementation Guide](#step-by-step-implementation-guide)

---

## 🎯 Project Overview

### What is the Sona Sky Calculator?

The Sona Sky Calculator is a production-ready React application that:
- Calculates pricing for skylight blinds based on dimensions and options
- Provides real-time quotes with technical specifications
- Supports multiple system types (Single, Duo Inward, Duo Parallel)
- Uses a clean, professional UI with Scottish Shutter Company branding
- Includes automatic version checking and updates
- Deploys seamlessly to Vercel with auto-deployment from GitHub

### Technology Stack

```
Frontend Framework:    React 19.1.0
Build Tool:           Create React App (react-scripts 5.0.1)
Styling:              Tailwind CSS 3.4.17
Fonts:                Google Fonts (Open Sans, Expletus Sans)
Hosting:              Vercel
Version Control:      Git + GitHub
Node Version:         v16 or higher
Package Manager:      npm
```

---

## 📁 Architecture & File Structure

### Complete Project Structure

```
skylight-pricing-calculators/
│
├── public/                          # Static assets served directly
│   ├── index.html                   # HTML template
│   ├── apple-touch-icon.png         # App icons
│   ├── favicon.ico
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json                # PWA manifest
│   ├── robots.txt                   # SEO robots file
│   ├── sw.js                        # Service Worker for updates
│   ├── version-check.json           # Version checking for updates
│   ├── _headers                     # Vercel security headers
│   └── _redirects                   # Vercel redirect rules
│
├── src/                             # React source code
│   ├── index.js                     # Entry point - imports AppFinal.js
│   ├── index.css                    # Global CSS + Tailwind directives
│   ├── AppFinal.js                  # 🎯 MAIN CALCULATOR COMPONENT
│   ├── brand-config.js              # Brand colours, fonts, spacing
│   ├── security-config.js           # Security settings & version info
│   ├── version-info.json            # Version metadata
│   ├── reportWebVitals.js           # Performance monitoring
│   ├── setupTests.js                # Test configuration
│   └── assets/
│       └── The Scottish Shutter Company Logo 2024 Square copy.png
│
├── scripts/                         # Automation scripts
│   ├── bump-version.js              # Version bumping (patch/minor/major)
│   ├── deploy-only.js               # Deploy current version to Vercel
│   ├── deploy-vercel.js             # Full deployment script
│   ├── update-version-check.js      # Update version-check.json
│   ├── version-manager.js           # Version info & history
│   ├── rollback.js                  # Rollback to previous version
│   └── security-audit.js            # Security checking
│
├── docs/                            # Documentation
│   ├── DESIGN-SYSTEM-SUMMARY.md
│   ├── shared-design-system.css
│   └── UNIFIED-DESIGN-IMPLEMENTATION.md
│
├── package.json                     # Dependencies & scripts
├── package-lock.json                # Lock file
├── vercel.json                      # Vercel deployment config
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── .gitignore                       # Git ignore rules
└── README.md                        # Project documentation
```

### Critical Files Breakdown

| File | Purpose | Modify for Duette? |
|------|---------|-------------------|
| `src/AppFinal.js` | Main calculator logic, UI, pricing tables | ✅ YES - Core changes |
| `src/brand-config.js` | Colours, fonts, spacing | ⚠️ MAYBE - if branding differs |
| `src/index.css` | Tailwind setup + custom styles | ❌ NO - keep as is |
| `src/index.js` | Entry point | ❌ NO - keep as is |
| `public/index.html` | HTML template, fonts | ⚠️ MAYBE - update title |
| `package.json` | Dependencies, version, scripts | ⚠️ MAYBE - update name |
| `vercel.json` | Deployment configuration | ❌ NO - keep as is |
| `tailwind.config.js` | Tailwind setup | ❌ NO - keep as is |

---

## 🔍 Key Components Explained

### 1. AppFinal.js - The Heart of the Calculator

**Location:** `/src/AppFinal.js`  
**Size:** ~1,255 lines  
**Purpose:** Contains ALL calculator logic, UI, and pricing

#### Structure Overview:

```javascript
import React, { useState, useEffect } from 'react';
import brandConfig from './brand-config';
import sscLogoPng from './assets/...';
import securityConfig from './security-config';

const SonaCalculator = () => {
  // 1. AUTO-UPDATE DETECTION (lines 10-57)
  useEffect(() => {
    // Service Worker registration
    // Periodic version checking
  }, []);

  // 2. STATE MANAGEMENT (lines 59-74)
  const [systemType, setSystemType] = useState('single');
  const [recess, setRecess] = useState({ length: '', width: '' });
  const [fabricType, setFabricType] = useState('dimout');
  const [fabricColor, setFabricColor] = useState('snow');
  const [hardwareColor, setHardwareColor] = useState('white');
  const [powerSupply, setPowerSupply] = useState('battery');
  const [handset, setHandset] = useState('none');
  const [wallSwitch, setWallSwitch] = useState('none');
  const [margin, setMargin] = useState(50);
  const [sideTrims, setSideTrims] = useState(false);
  const [tBarColor, setTBarColor] = useState('white');
  const [quote, setQuote] = useState(null);
  const [errors, setErrors] = useState([]);

  // 3. PRICING TABLES (lines 77-99)
  const dimoutPricing = { /* 2D object: length x width */ };
  const blackoutPricing = { /* 2D object: length x width */ };

  // 4. FABRIC COLOURS (lines 101-200+)
  const dimoutColors = [
    { name: 'Snow', hex: '#F8F8F8', code: 'M0000' },
    // ... more colours
  ];
  const blackoutColors = [/* ... */];

  // 5. DIMENSION VALIDATION (lines 300-400)
  const dimensionRanges = {
    single: { minLength: 500, maxLength: 5000, minWidth: 500, maxWidth: 3000 },
    'duo-inward': { minLength: 1000, maxLength: 10000, minWidth: 500, maxWidth: 3000 },
    'duo-parallel': { minLength: 500, maxLength: 6000, minWidth: 1000, maxWidth: 5000 }
  };

  // 6. CALCULATION LOGIC (lines 500-700)
  const calculateQuote = () => {
    // Price lookup from tables
    // Options pricing (power supply, handset, etc.)
    // T-Bar calculations
    // Margin application
    // Return complete quote object
  };

  // 7. UI RENDERING (lines 800-1255)
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header with logo */}
      {/* Input panel (left side) */}
      {/* Output cards (right side) */}
      {/* Modals */}
    </div>
  );
};

export default SonaCalculator;
```

#### Key Data Structures in AppFinal.js:

**Pricing Tables:**
```javascript
const dimoutPricing = {
  1000: { 1000: 344, 1200: 354, 1400: 365, ... },
  1500: { 1000: 361, 1200: 372, ... },
  2000: { ... },
  // Length in mm: { Width in mm: Price in £ }
};
```

**Fabric Colours:**
```javascript
const dimoutColors = [
  { name: 'Snow', hex: '#F8F8F8', code: 'M0000', category: 'Whites & Neutrals' },
  { name: 'Cream', hex: '#F5F0E5', code: 'M0001', category: 'Whites & Neutrals' },
  // ...
];
```

**Options Pricing:**
```javascript
const powerSupplyOptions = [
  { value: 'battery', label: 'Battery Wand (Included)', price: 0 },
  { value: 'solar', label: 'Solar Panel (£120)', price: 120 },
  // ...
];
```

### 2. brand-config.js - Centralised Branding

**Location:** `/src/brand-config.js`  
**Purpose:** Single source of truth for ALL brand styling

```javascript
export const brandConfig = {
  colors: {
    teal: '#007A87',          // Primary
    deepTeal: '#00333B',      // Secondary
    lightGrey: '#C6C6BC',     // Background
    brightPink: '#C50084',    // Accent
    // ... more colours
  },
  
  fonts: {
    heading: '"Open Sans", Helvetica, sans-serif',
    body: '"Open Sans", Helvetica, sans-serif',
    // ...
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    // ...
  },
  
  spacing: { /* ... */ },
  borderRadius: { /* ... */ },
  shadows: { /* ... */ },
  
  brand: {
    name: 'SSC',
    fullName: 'The Scottish Shutter Company',
    tagline: 'Professional Skylight Solutions',
  }
};
```

### 3. index.css - Tailwind Integration

**Location:** `/src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Open Sans', sans-serif;
  /* ... */
}

/* Custom brand-specific styles */
input:focus, select:focus {
  outline: none;
  border-color: #007A87 !important;
  box-shadow: 0 0 0 3px rgba(0, 122, 135, 0.1) !important;
}

input[type="radio"]:checked {
  accent-color: #007A87;
}
```

### 4. package.json - Dependencies & Scripts

**Location:** `/package.json`

```json
{
  "name": "sona-sky-pricing-calculator",
  "version": "1.2.7",
  "dependencies": {
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "react-scripts": "5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17",
    "postcss": "^8.5.6",
    "autoprefixer": "^10.4.21"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "deploy": "node scripts/update-version-check.js && node scripts/deploy-only.js",
    "version:bump": "node scripts/bump-version.js"
  }
}
```

### 5. vercel.json - Deployment Configuration

**Location:** `/vercel.json`

```json
{
  "version": 2,
  "builds": [{
    "src": "package.json",
    "use": "@vercel/static-build",
    "config": { "distDir": "build" }
  }],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": { "Cache-Control": "public, max-age=31536000, immutable" }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html",
      "headers": {
        "X-Frame-Options": "DENY",
        "X-Content-Type-Options": "nosniff",
        // ... security headers
      }
    }
  ]
}
```

---

## 💻 Development Workflow (Two-Terminal Setup)

### Why Two Terminals?

1. **Terminal 1:** Runs the development server (`npm start`)
2. **Terminal 2:** Used for git commands, version bumping, and deployment

### Terminal 1: Development Server

```bash
# Navigate to project directory
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators

# Install dependencies (first time only)
npm install

# Start development server
npm start

# Output:
# Compiled successfully!
# You can now view sona-sky-pricing-calculator in the browser.
#   Local:            http://localhost:3000
#   On Your Network:  http://192.168.1.x:3000
```

**What Happens:**
- React development server starts on `http://localhost:3000`
- **Hot Module Replacement (HMR)** is enabled
- Any changes to files in `/src` automatically rebuild
- Browser refreshes automatically (usually within 1-2 seconds)
- Terminal shows compilation status and errors

**Leave This Terminal Running!** This provides instant feedback while coding.

### Terminal 2: Git & Deployment Commands

```bash
# Navigate to same directory
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators

# Check status
git status

# View changes
git diff

# Add files
git add src/AppFinal.js

# Commit changes
git commit -m "feat: update pricing table for Q4 2025"

# Push to GitHub
git push origin main

# Bump version
npm run version:bump           # Patch: 1.2.7 -> 1.2.8
npm run version:minor          # Minor: 1.2.7 -> 1.3.0
npm run version:major          # Major: 1.2.7 -> 2.0.0

# Deploy to Vercel (optional - GitHub auto-deploys)
npm run deploy
```

### Development Cycle

```
1. Edit code in IDE/Cursor
   ↓
2. Terminal 1 automatically rebuilds
   ↓
3. Browser at localhost:3000 refreshes
   ↓
4. Test changes immediately
   ↓
5. If good: Terminal 2 → git add/commit/push
   ↓
6. GitHub triggers Vercel auto-deployment
   ↓
7. Live in 30-60 seconds
```

### Live Development Example

**Scenario:** Change primary colour from teal to blue

```bash
# Terminal 1 (already running npm start)
# Terminal 2:
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators

# Edit brand-config.js
# Change: teal: '#007A87' → teal: '#0066CC'

# Watch Terminal 1:
# Compiling...
# Compiled successfully!

# Check localhost:3000 - colour changed instantly!

# If satisfied:
git add src/brand-config.js
git commit -m "style: update primary colour to blue"
git push origin main

# Vercel automatically deploys
```

---

## 🔄 GitHub & Version Control

### Repository Setup

```bash
# Initial setup (already done for Sona)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/skylight-pricing-calculators.git
git push -u origin main
```

### Branch Strategy (Simple)

For this project, we use **main branch deployment**:

```
main branch
    ↓
Always production-ready
    ↓
Every push deploys to Vercel
```

### Commit Message Convention

Follow conventional commits:

```bash
# Feature
git commit -m "feat: add Luxaflex Duette calculator"

# Bug fix
git commit -m "fix: correct pricing calculation for large sizes"

# Styling
git commit -m "style: update button colours to match brand"

# Documentation
git commit -m "docs: add Luxaflex Duette specifications"

# Refactor
git commit -m "refactor: extract pricing logic to separate function"

# Version bump
git commit -m "chore: bump version to 1.3.0"
```

### Version Management

```bash
# Patch version (bug fixes): 1.2.7 → 1.2.8
npm run version:bump

# Minor version (new features): 1.2.7 → 1.3.0
npm run version:minor

# Major version (breaking changes): 1.2.7 → 2.0.0
npm run version:major

# Each bump:
# 1. Updates package.json
# 2. Updates src/version-info.json
# 3. Can optionally auto-deploy
```

### Typical Workflow

```bash
# 1. Make changes
vim src/AppFinal.js

# 2. Test locally (Terminal 1 running npm start)
# Visit http://localhost:3000

# 3. Check what changed
git status
git diff

# 4. Stage changes
git add src/AppFinal.js

# 5. Commit with descriptive message
git commit -m "feat: add support for motorised blinds"

# 6. Bump version (if needed)
npm run version:bump

# 7. Push to GitHub
git push origin main

# 8. Vercel auto-deploys (30-60 seconds)
# Check: https://your-app.vercel.app
```

---

## 🚀 Vercel Deployment Process

### Initial Vercel Setup (One-Time)

1. **Create Vercel Account**
   - Visit [vercel.com](https://vercel.com)
   - Sign up with GitHub account

2. **Connect Repository**
   - Click "Add New Project"
   - Import `skylight-pricing-calculators` repository
   - Select repository from GitHub

3. **Configure Project**
   ```
   Framework Preset:     Create React App
   Build Command:        npm run build
   Output Directory:     build
   Install Command:      npm install
   Development Command:  npm start
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel builds and deploys
   - Receive deployment URL: `https://your-project.vercel.app`

### Auto-Deployment from GitHub

Once connected, **every push to main triggers automatic deployment**:

```bash
# Local machine
git push origin main
    ↓
# GitHub receives push
    ↓
# Vercel webhook triggered
    ↓
# Vercel clones repository
    ↓
# Vercel runs: npm install
    ↓
# Vercel runs: npm run build
    ↓
# Vercel deploys build/ folder
    ↓
# Live in 30-60 seconds
```

### Deployment Configuration (vercel.json)

The `vercel.json` file configures:

```json
{
  "version": 2,
  "builds": [{
    "src": "package.json",
    "use": "@vercel/static-build",
    "config": { "distDir": "build" }
  }],
  "routes": [
    /* Caching for static assets */
    /* Security headers */
    /* SPA routing fallback */
  ]
}
```

### Manual Deployment (Optional)

```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Login
vercel login

# Deploy current code
vercel --prod

# Output:
# 🔍  Inspect: https://vercel.com/...
# ✅  Production: https://your-app.vercel.app
```

### Deployment Scripts

```bash
# Deploy current version (using deploy-only.js)
npm run deploy

# What happens:
# 1. Updates public/version-check.json
# 2. Runs vercel --prod
# 3. Outputs deployment URL
# 4. Updates src/version-info.json

# Force deployment (even if no changes)
npm run deploy:force

# Check deployment status
npm run deploy:status
```

### Monitoring Deployments

**Vercel Dashboard:**
- Visit [vercel.com/dashboard](https://vercel.com/dashboard)
- View all deployments
- See build logs
- Check deployment status
- View analytics

**Deployment URL Pattern:**
```
Production:  https://skylight-pricing-calculators.vercel.app
Preview:     https://skylight-pricing-calculators-abc123.vercel.app
```

---

## 🏗️ Creating Luxaflex Duette Calculator

### What Changes?

| Component | Sona Sky | Luxaflex Duette | Change Required? |
|-----------|----------|-----------------|------------------|
| **UI Layout** | Grid: input left, output right | Same | ❌ NO |
| **Branding** | SSC logo, teal colours | Same | ❌ NO |
| **Styling** | Tailwind, Open Sans font | Same | ❌ NO |
| **System Types** | Single, Duo Inward, Duo Parallel | Different options | ✅ YES |
| **Pricing Tables** | 9x11 matrix (length x width) | Different structure | ✅ YES |
| **Fabric Types** | Dimout, Blackout | Different materials | ✅ YES |
| **Fabric Colours** | 40+ colours | Different colours | ✅ YES |
| **Options** | Power supply, handset, T-Bar | Different options | ✅ YES |
| **Dimension Ranges** | 500-5000mm length, etc. | Different ranges | ✅ YES |
| **Calculation Logic** | Specific to Sona | Specific to Duette | ✅ YES |
| **Technical Specs** | Sona specifications | Duette specifications | ✅ YES |

### What Stays the Same?

✅ **Keep Unchanged:**
1. Overall UI structure (input panel + output cards)
2. Progress bar design
3. Header with SSC logo
4. Button styles and colours
5. Card layouts and shadows
6. Gradient background (blue-50 to indigo-100)
7. Typography (Open Sans)
8. Input field styling
9. Form validation approach
10. Error handling UI
11. Modal designs
12. Responsive breakpoints
13. Tailwind configuration
14. Build and deployment scripts
15. Version management system

✅ **Update Only:**
1. Pricing tables data
2. Fabric type options
3. Fabric colour lists
4. Hardware/option pricing
5. Dimension validation ranges
6. Calculation formulas
7. Technical specification text
8. System type descriptions
9. Help text and guides

---

## 📝 Step-by-Step Implementation Guide

### Phase 1: Project Setup

```bash
# 1. Navigate to project directory
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators

# 2. Create new branch for Duette calculator
git checkout -b feat/luxaflex-duette-calculator

# 3. Create new calculator file (keep Sona intact)
cp src/AppFinal.js src/AppDuette.js

# 4. Open two terminals
# Terminal 1: npm start (keep running)
# Terminal 2: git commands
```

### Phase 2: Data Preparation

**Gather Luxaflex Duette Data:**

1. **Pricing Tables**
   - Get price matrix (dimensions vs. price)
   - Format as JavaScript object

2. **Fabric Types**
   - List of fabric categories (e.g., Duette, Duette Sheer, etc.)
   - Properties of each type

3. **Fabric Colours**
   - Colour name
   - Hex code (if available)
   - Product code
   - Categories

4. **System Types/Options**
   - Window configurations supported
   - Control options (manual, motorised, etc.)

5. **Dimension Ranges**
   - Minimum width/length
   - Maximum width/length
   - Any special constraints

6. **Options & Pricing**
   - Control systems
   - Upgrades
   - Installation options
   - Pricing for each

### Phase 3: Code Modification Template

**File:** `src/AppDuette.js`

```javascript
// STEP 1: Update Component Name
const DuetteCalculator = () => {  // Changed from SonaCalculator

  // STEP 2: Update State Variables
  const [systemType, setSystemType] = useState('standard'); // Duette-specific types
  const [fabricType, setFabricType] = useState('duette');
  // ... other Duette-specific states

  // STEP 3: Replace Pricing Tables
  const duettePricingStandard = {
    // Your Luxaflex Duette pricing data
    800: { 600: 250, 800: 280, 1000: 310, ... },
    1000: { 600: 270, 800: 300, 1000: 330, ... },
    // ...
  };

  const duettePricingSheer = {
    // Sheer fabric pricing
    // ...
  };

  // STEP 4: Update Fabric Colours
  const duetteColors = [
    { name: 'Pearl', hex: '#F5F5F0', code: 'D0001', category: 'Neutrals' },
    { name: 'Linen', hex: '#E8E4D8', code: 'D0002', category: 'Neutrals' },
    // ... your Duette colours
  ];

  // STEP 5: Update Options
  const controlOptions = [
    { value: 'cordlock', label: 'Cordlock (Included)', price: 0 },
    { value: 'motorised', label: 'Motorised (£350)', price: 350 },
    // ... your options
  ];

  // STEP 6: Update Dimension Ranges
  const dimensionRanges = {
    standard: { minWidth: 300, maxWidth: 2500, minLength: 300, maxLength: 3000 },
    // ... your ranges
  };

  // STEP 7: Update Calculation Logic
  const calculateQuote = () => {
    // Your Duette-specific calculations
    // Use your pricing tables
    // Apply your formulas
    // Return quote object
  };

  // STEP 8: Update UI Text
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header>
        <h1>Luxaflex Duette Range Calculator</h1>
        {/* Keep same styling, update text */}
      </header>

      {/* Input Panel */}
      <div className="input-panel">
        {/* Update labels, options, help text */}
        {/* Keep same UI structure and styling */}
      </div>

      {/* Output Cards */}
      <div className="output-cards">
        {/* Update technical specs for Duette */}
        {/* Keep same card layouts */}
      </div>
    </div>
  );
};

export default DuetteCalculator;
```

### Phase 4: Integration & Testing

```bash
# 1. Update src/index.js to import Duette calculator
# Original:
import App from './AppFinal';

# Change to:
import App from './AppDuette';

# 2. Save file
# 3. Terminal 1 will automatically rebuild
# 4. Check http://localhost:3000
# 5. Test all functionality:
#    - Enter dimensions
#    - Select fabric types
#    - Choose colours
#    - Add options
#    - Verify calculations
#    - Check technical specs
#    - Test all system types
```

### Phase 5: Refinement

```bash
# Fix any issues found during testing
# Update calculations
# Adjust dimension ranges
# Fix UI issues
# Test edge cases

# Terminal 1 shows live updates
# Terminal 2 for git commits:
git add src/AppDuette.js
git commit -m "feat: implement Duette pricing calculations"
```

### Phase 6: Deployment Preparation

```bash
# 1. Final testing on localhost
# 2. Commit all changes
git add .
git commit -m "feat: complete Luxaflex Duette calculator"

# 3. Bump version
npm run version:minor  # 1.2.7 → 1.3.0

# 4. Update package.json name (optional)
# "name": "luxaflex-duette-calculator"

# 5. Update public/index.html title
# <title>Luxaflex Duette Calculator - The Scottish Shutter Company</title>
```

### Phase 7: Deployment

```bash
# Option 1: GitHub Auto-Deploy (Preferred)
git push origin main
# Vercel automatically deploys in 30-60 seconds

# Option 2: Manual Deploy
npm run deploy

# 3. Test live deployment
# Visit your Vercel URL
# Test all functionality on live site

# 4. Monitor deployment
# Check Vercel dashboard for any issues
```

---

## 🎨 UI/UX Consistency Checklist

To maintain the same look and feel as Sona Sky:

### Colours
- [ ] Background: `bg-gradient-to-br from-blue-50 to-indigo-100`
- [ ] Cards: `bg-white rounded-lg shadow-lg`
- [ ] Primary button: `bg-[#3B82F6]` (blue-500)
- [ ] Hover: `hover:bg-[#2563EB]` (blue-600)
- [ ] Focus rings: `focus:ring-2 focus:ring-[#3B82F6]`
- [ ] Text: `text-gray-900` for headings, `text-gray-600` for body

### Typography
- [ ] Headings: `font-bold` with Open Sans
- [ ] Body: `font-normal` with Open Sans
- [ ] Font sizes: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`

### Spacing
- [ ] Container padding: `p-6` or `p-8`
- [ ] Card spacing: `space-y-4` or `space-y-6`
- [ ] Section margins: `mb-6` or `mb-8`

### Components
- [ ] Input fields: `border border-gray-300 rounded-lg px-4 py-2`
- [ ] Select dropdowns: Same styling as inputs
- [ ] Radio buttons: Brand teal accent colour
- [ ] Progress bar: Connected dots design
- [ ] Cards: 2x2 grid on desktop, stacked on mobile

### Layout
- [ ] Header: Logo left, title centre/right
- [ ] Input panel: Left side, `lg:w-1/3`
- [ ] Output cards: Right side, `lg:w-2/3`, 2-column grid
- [ ] Responsive: Stacks on mobile (`lg:` breakpoints)

### Interactions
- [ ] Buttons: Smooth hover transitions
- [ ] Form inputs: Focus states with teal ring
- [ ] Cards: Subtle shadow elevation
- [ ] Modals: Overlay with centred content

---

## 📋 Quick Reference Commands

### Development
```bash
# Start dev server (Terminal 1)
npm start

# Build for production
npm run build

# Test production build locally
npx serve -s build
```

### Git & Version Control
```bash
# Status & changes
git status
git diff

# Commit workflow
git add .
git commit -m "feat: description"
git push origin main

# Version bumping
npm run version:bump        # Patch
npm run version:minor       # Minor
npm run version:major       # Major
```

### Deployment
```bash
# Auto-deploy via GitHub
git push origin main

# Manual deploy
npm run deploy

# Check deployment status
npm run deploy:status
```

### Testing
```bash
# Run tests
npm test

# Security audit
npm run security

# Security fix
npm run security:fix
```

---

## 🎯 Claude Prompt Template for Duette Calculator

Use this prompt when starting with Claude:

```markdown
I need to create a Luxaflex Duette Range calculator based on our existing Sona Sky Calculator.

**Requirements:**
1. Same UI/UX as Sona Sky (blue gradient, white cards, Open Sans font, SSC branding)
2. Same layout structure (input panel left, output cards right)
3. Different pricing data and calculations for Luxaflex Duette products

**Provided Data:**
[Attach your Luxaflex Duette pricing tables, fabric colours, options, specifications]

**Current Sona Calculator Location:**
- Repository: /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators
- Main file: src/AppFinal.js
- See LUXAFLEX-DUETTE-BLUEPRINT.md for full architecture details

**Tasks:**
1. Create src/AppDuette.js based on src/AppFinal.js structure
2. Replace pricing tables with Luxaflex Duette data
3. Update fabric types and colours
4. Modify calculation logic for Duette specifications
5. Update dimension validation ranges
6. Replace technical specifications text
7. Keep all UI styling, layouts, and components identical to Sona

**Testing:**
- Terminal 1: npm start (development server)
- Terminal 2: git commands
- Test on localhost:3000 after each change
- Verify calculations, pricing, and options

**Deployment:**
- Commit to GitHub: git push origin main
- Vercel auto-deploys in 30-60 seconds
- Final testing on live URL

Please start by creating the AppDuette.js file with the Luxaflex Duette data structure.
```

---

## 📚 Additional Resources

### Documentation Files
- `README.md` - Project overview
- `SONASKY-DUO-GUIDE.md` - Duo system specifications
- `docs/DESIGN-SYSTEM-SUMMARY.md` - Design system details
- `CHANGELOG.md` - Version history

### Key Concepts
- **Hot Module Replacement (HMR):** Instant code updates without page refresh
- **Service Worker:** Enables auto-update detection
- **Semantic Versioning:** MAJOR.MINOR.PATCH (2.1.3)
- **Conventional Commits:** Structured commit messages
- **Continuous Deployment:** GitHub push → Auto-deploy to Vercel

### Tools & URLs
- **Local Development:** http://localhost:3000
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/your-username/skylight-pricing-calculators
- **Live Site:** https://skylight-pricing-calculators.vercel.app

---

## ✅ Checklist: Creating Luxaflex Duette Calculator

### Preparation
- [ ] Gather all Luxaflex Duette pricing data
- [ ] Compile fabric types and colours
- [ ] List all options and their prices
- [ ] Define dimension ranges and constraints
- [ ] Document calculation formulas
- [ ] Prepare technical specifications

### Development Setup
- [ ] Navigate to project directory
- [ ] Open Terminal 1: `npm start`
- [ ] Open Terminal 2: for git commands
- [ ] Verify localhost:3000 loads Sona calculator
- [ ] Create new branch: `git checkout -b feat/luxaflex-duette`

### Code Implementation
- [ ] Copy `src/AppFinal.js` to `src/AppDuette.js`
- [ ] Update component name to `DuetteCalculator`
- [ ] Replace pricing tables with Duette data
- [ ] Update fabric types list
- [ ] Replace fabric colours array
- [ ] Modify options and pricing
- [ ] Update dimension validation ranges
- [ ] Adjust calculation logic
- [ ] Update technical specifications text
- [ ] Modify system type descriptions
- [ ] Update help text and tooltips

### Testing
- [ ] Update `src/index.js` to import `AppDuette`
- [ ] Test on localhost:3000
- [ ] Verify all system types work
- [ ] Test dimension validation
- [ ] Check pricing calculations
- [ ] Verify fabric colour selection
- [ ] Test all options and upgrades
- [ ] Check technical specs output
- [ ] Test responsive design (mobile/tablet/desktop)
- [ ] Verify error handling

### Refinement
- [ ] Fix any calculation errors
- [ ] Adjust UI text for clarity
- [ ] Verify all Luxaflex-specific terminology
- [ ] Check colour swatches display correctly
- [ ] Ensure technical specs are accurate

### Deployment Preparation
- [ ] Final testing on localhost
- [ ] Commit all changes with descriptive messages
- [ ] Bump version: `npm run version:minor`
- [ ] Update `package.json` name (optional)
- [ ] Update `public/index.html` title

### Deployment
- [ ] Push to GitHub: `git push origin main`
- [ ] Monitor Vercel deployment (30-60 seconds)
- [ ] Test live deployment URL
- [ ] Verify all functionality on live site
- [ ] Check responsive design on real devices
- [ ] Document deployment in CHANGELOG

### Documentation
- [ ] Update README.md with Duette calculator info
- [ ] Create Duette-specific guide (if needed)
- [ ] Update version history
- [ ] Document any Duette-specific considerations

---

## 🎓 Understanding the Two-Terminal Workflow

### Why This Matters

The two-terminal workflow is KEY to efficient development:

**Terminal 1 (npm start):**
- Provides instant feedback
- Shows compilation errors immediately
- Auto-refreshes browser
- Displays console warnings

**Terminal 2 (git commands):**
- Keeps version control separate
- Allows commits while dev server runs
- Manages deployment
- Handles version bumping

### Visual Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  IDE/Cursor                                                  │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ src/AppDuette.js                                        │ │
│  │                                                          │ │
│  │ const duettePricing = {                                 │ │
│  │   800: { 600: 250, ... }  // Edit pricing table        │ │
│  │ };                                                       │ │
│  │                                                          │ │
│  │ [Save]                                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Terminal 1 (npm start)                                      │
│                                                              │
│  Compiling...                                                │
│  Compiled successfully!                                      │
│  webpack compiled with 0 errors                              │
│                                                              │
│  [Keep this running - DO NOT CLOSE]                         │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Browser: http://localhost:3000                              │
│                                                              │
│  [Auto-refreshes with changes]                               │
│  [Test new pricing immediately]                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
                         If satisfied...
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Terminal 2 (git commands)                                   │
│                                                              │
│  $ git add src/AppDuette.js                                  │
│  $ git commit -m "feat: update Duette pricing for Q4"       │
│  $ git push origin main                                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  GitHub                                                      │
│  [Push received]                                             │
│  [Triggers Vercel webhook]                                   │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Vercel                                                      │
│  [Clones repo]                                               │
│  [Runs npm install]                                          │
│  [Runs npm run build]                                        │
│  [Deploys to production]                                     │
│  ✅ Deployed in 45 seconds                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚨 Common Pitfalls & Solutions

### Issue 1: Changes Not Appearing

**Symptom:** Edit code, but localhost:3000 doesn't update

**Solutions:**
```bash
# Check Terminal 1 for errors
# Look for compilation errors

# Clear cache
rm -rf node_modules/.cache

# Restart dev server
# Ctrl+C in Terminal 1
npm start

# Hard refresh browser
# Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

### Issue 2: Port 3000 Already in Use

**Symptom:** `Something is already running on port 3000`

**Solution:**
```bash
# Find and kill process
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm start
```

### Issue 3: Vercel Deployment Fails

**Symptom:** Push to GitHub, but Vercel shows build error

**Solutions:**
```bash
# Test build locally first
npm run build

# Check for errors
# Fix any issues
# Commit and push again

# View Vercel build logs
# Go to Vercel dashboard → Deployments → View build logs
```

### Issue 4: Styling Not Working

**Symptom:** Tailwind classes not applying

**Solutions:**
```bash
# Check tailwind.config.js content paths
# Should include: "./src/**/*.{js,jsx,ts,tsx}"

# Restart dev server
# Ctrl+C in Terminal 1
npm start

# Verify index.css has Tailwind directives
# @tailwind base;
# @tailwind components;
# @tailwind utilities;
```

---

## 🎯 Success Criteria

Your Luxaflex Duette calculator is ready when:

✅ **Functionality**
- [ ] All pricing calculations are accurate
- [ ] Dimension validation works correctly
- [ ] All fabric types and colours selectable
- [ ] Options pricing calculates correctly
- [ ] Technical specifications display correctly
- [ ] Quote summary shows all correct values

✅ **UI/UX**
- [ ] Looks identical to Sona Sky calculator
- [ ] Same colours, fonts, spacing
- [ ] Same gradient background
- [ ] Same card layouts
- [ ] Responsive on mobile/tablet/desktop
- [ ] All interactions smooth and intuitive

✅ **Technical**
- [ ] No console errors
- [ ] No warnings in Terminal 1
- [ ] npm run build succeeds
- [ ] Localhost:3000 works perfectly
- [ ] Live deployment works
- [ ] Page loads quickly (<2 seconds)

✅ **Version Control**
- [ ] All changes committed
- [ ] Version bumped appropriately
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Live URL accessible

---

## 📞 Support & Next Steps

### If You Get Stuck

1. **Check Terminal 1** for error messages
2. **Read error messages carefully** - they usually tell you what's wrong
3. **Test in small increments** - don't change too much at once
4. **Commit frequently** - so you can roll back if needed
5. **Use git diff** to see what changed

### After MVP Completion

1. **User Testing:** Get feedback from team
2. **Refinements:** Adjust based on feedback
3. **Documentation:** Create Duette-specific guide
4. **Training:** Document for sales team
5. **Marketing:** Prepare for launch

### Future Enhancements

Consider adding:
- PDF export functionality
- Email quote feature
- Save/load quotes
- Admin panel for pricing updates
- Customer information capture
- Integration with CRM
- Product configurator visuals
- Installation cost calculator

---

## 🎉 Conclusion

You now have a complete blueprint for creating the Luxaflex Duette calculator based on the proven Sona Sky architecture. 

**Key Takeaways:**

1. **Same Structure, Different Data:** Keep all UI/UX, change only pricing and product data
2. **Two-Terminal Workflow:** One for development, one for git - enables instant feedback
3. **Version Control:** Frequent commits, semantic versioning, conventional commit messages
4. **Auto-Deployment:** Push to GitHub, Vercel deploys automatically in under 60 seconds
5. **Test Locally First:** Always verify on localhost:3000 before deploying

**Remember:**
- Terminal 1: `npm start` (keep running)
- Terminal 2: Git commands
- Edit → Auto-rebuild → Test → Commit → Push → Auto-deploy

This architecture has been proven with the Sona Sky calculator. Following this blueprint ensures the Luxaflex Duette calculator will have the same quality, consistency, and professional polish.

Good luck with your Luxaflex Duette calculator MVP! 🚀

---

**Document Version:** 1.0  
**Last Updated:** October 10, 2025  
**Author:** David Browne  
**Based On:** Sona Sky Calculator v1.2.7


