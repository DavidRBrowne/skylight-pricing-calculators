# 🚀 Claude Quick Start: Luxaflex Duette Calculator

## Context

I need you to create a Luxaflex Duette Range calculator based on our existing Sona Sky Calculator architecture.

**Project Location:** `/Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators`

**Full Blueprint:** See `LUXAFLEX-DUETTE-BLUEPRINT.md` for complete architectural details.

---

## 📋 What You Need to Know

### The Sona Sky Calculator (Template)
- **Main File:** `src/AppFinal.js` (1,255 lines)
- **Architecture:** React component with pricing tables, calculation logic, and UI
- **Styling:** Tailwind CSS with brand-config.js for consistent styling
- **UI Pattern:** Input panel (left) + Output cards (right)
- **Deployment:** GitHub → Vercel auto-deployment

### What Stays THE SAME for Luxaflex Duette
✅ **Keep 100% Identical:**
1. Overall UI structure and layout
2. Gradient background: `bg-gradient-to-br from-blue-50 to-indigo-100`
3. White cards with `rounded-lg shadow-lg`
4. Button styles: `bg-[#3B82F6]` blue buttons
5. Typography: Open Sans font throughout
6. Progress bar design (connected dots)
7. Card grid layout (2x2 on desktop)
8. Input field styling
9. All Tailwind classes and styling
10. Header with SSC logo
11. Responsive breakpoints
12. Modal designs
13. Form validation approach
14. All spacing, padding, margins

### What CHANGES for Luxaflex Duette
🔄 **Modify Only:**
1. Pricing tables data structure
2. Fabric type options
3. Fabric colour arrays
4. System type options
5. Dimension validation ranges
6. Calculation logic/formulas
7. Options pricing
8. Technical specifications text
9. Help text and descriptions

---

## 🎯 Your Task

### Step 1: Create AppDuette.js

Create a new file: `src/AppDuette.js`

**Base it on:** `src/AppFinal.js`

**Structure to follow:**

```javascript
import React, { useState, useEffect } from 'react';
import brandConfig from './brand-config';
import sscLogoPng from './assets/The Scottish Shutter Company Logo 2024 Square copy.png';
import securityConfig from './security-config';

const DuetteCalculator = () => {
  // 1. AUTO-UPDATE DETECTION (copy from Sona - lines 10-57)
  useEffect(() => {
    // Keep service worker registration
    // Keep version checking
  }, []);

  // 2. STATE MANAGEMENT
  // Update these for Luxaflex Duette product options
  const [systemType, setSystemType] = useState('standard');
  const [recess, setRecess] = useState({ length: '', width: '' });
  const [fabricType, setFabricType] = useState('duette');
  const [fabricColor, setFabricColor] = useState('pearl');
  const [controlType, setControlType] = useState('cordlock');
  // ... other Duette-specific states

  // 3. PRICING TABLES
  // Replace with Luxaflex Duette pricing
  const duettePricingStandard = {
    800: { 600: 250, 800: 280, 1000: 310, ... },
    1000: { 600: 270, 800: 300, 1000: 330, ... },
    // Your Luxaflex Duette pricing data
  };

  // 4. FABRIC COLOURS
  // Replace with Luxaflex Duette colours
  const duetteColors = [
    { name: 'Pearl', hex: '#F5F5F0', code: 'D0001', category: 'Neutrals' },
    { name: 'Linen', hex: '#E8E4D8', code: 'D0002', category: 'Neutrals' },
    // Your Luxaflex Duette colours
  ];

  // 5. OPTIONS
  // Replace with Luxaflex Duette options
  const controlOptions = [
    { value: 'cordlock', label: 'Cordlock (Included)', price: 0 },
    { value: 'motorised', label: 'Motorised (£350)', price: 350 },
    // Your options
  ];

  // 6. DIMENSION RANGES
  // Update for Luxaflex Duette specifications
  const dimensionRanges = {
    standard: { 
      minLength: 300, maxLength: 3000, 
      minWidth: 300, maxWidth: 2500 
    },
    // Your ranges
  };

  // 7. CALCULATION LOGIC
  const calculateQuote = () => {
    // Implement your Luxaflex Duette calculations
    // Use your pricing tables
    // Apply your formulas
  };

  // 8. UI RENDERING
  // KEEP THE EXACT SAME STRUCTURE, just update text/options
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Copy entire UI structure from Sona */}
      {/* Update only: labels, options, help text, technical specs */}
    </div>
  );
};

export default DuetteCalculator;
```

### Step 2: Data Structures I Need

Before you start coding, I'll provide:

**1. Pricing Tables**
```javascript
// Format: { length_mm: { width_mm: price_gbp } }
const duettePricingStandard = {
  800: { 600: 250, 800: 280, 1000: 310 },
  // ... more rows
};
```

**2. Fabric Types**
```javascript
const fabricTypes = [
  { value: 'duette', label: 'Duette' },
  { value: 'duette-sheer', label: 'Duette Sheer' },
  // ... more types
];
```

**3. Fabric Colours**
```javascript
const duetteColors = [
  { 
    name: 'Pearl', 
    hex: '#F5F5F0', 
    code: 'D0001', 
    category: 'Neutrals' 
  },
  // ... more colours
];
```

**4. System Types**
```javascript
const systemTypes = [
  { value: 'standard', label: 'Standard' },
  // ... more types
];
```

**5. Options**
```javascript
const controlOptions = [
  { value: 'cordlock', label: 'Cordlock (Included)', price: 0 },
  // ... more options
];
```

**6. Dimension Constraints**
```javascript
const dimensionRanges = {
  standard: { 
    minLength: 300, maxLength: 3000,
    minWidth: 300, maxWidth: 2500 
  }
};
```

**7. Calculation Formulas**
- Base price lookup logic
- Options pricing additions
- Margin calculation
- Any special formulas

**8. Technical Specifications**
- Text descriptions for output cards
- System explanations
- Installation notes

---

## 🎨 UI/UX Requirements (CRITICAL)

### Exact Styling to Maintain

```javascript
// Background
className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"

// Header
className="text-center py-8"
className="text-4xl font-bold text-gray-900 mb-2"

// Cards
className="bg-white rounded-lg shadow-lg p-6"

// Primary Buttons
className="w-full py-3 px-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold rounded-lg transition-all duration-200"

// Input Fields
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"

// Select Dropdowns
className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent bg-white"

// Progress Bar
className="flex items-center justify-between mb-8"
// Connected dots design

// Layout Grid
className="container mx-auto px-4 py-8"
className="grid grid-cols-1 lg:grid-cols-3 gap-8"
// Input panel: lg:col-span-1
// Output cards: lg:col-span-2
```

### Layout Structure

```
┌─────────────────────────────────────────────────────┐
│                    HEADER                            │
│  [SSC Logo]  Luxaflex Duette Calculator             │
└─────────────────────────────────────────────────────┘

┌──────────────┬──────────────────────────────────────┐
│              │                                       │
│  INPUT       │    OUTPUT CARDS (2x2 Grid)          │
│  PANEL       │                                       │
│              │  ┌──────────┬──────────┐            │
│  Step 1      │  │ Quote    │Technical │            │
│  Step 2      │  │ Summary  │ Details  │            │
│  Step 3      │  └──────────┴──────────┘            │
│  Step 4      │  ┌──────────┬──────────┐            │
│  Step 5      │  │ Pricing  │  Config  │            │
│              │  │Breakdown │ Summary  │            │
│  [Calculate] │  └──────────┴──────────┘            │
│              │                                       │
└──────────────┴──────────────────────────────────────┘
```

---

## 🔧 Development Process

### Terminal Setup

**Terminal 1: Development Server**
```bash
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators
npm start
```
**Leave this running!** It provides instant feedback.

**Terminal 2: Git Commands**
```bash
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators
# Use for git commits, version bumping
```

### Testing Workflow

1. **Edit** `src/AppDuette.js`
2. **Save** file
3. **Terminal 1** auto-rebuilds (5-10 seconds)
4. **Browser** at `localhost:3000` auto-refreshes
5. **Test** functionality immediately
6. **Repeat** until working correctly

### Integration

Once `AppDuette.js` is ready:

```javascript
// Edit: src/index.js
// Change:
import App from './AppFinal';

// To:
import App from './AppDuette';
```

Save → Terminal 1 rebuilds → Test at localhost:3000

---

## ✅ Acceptance Criteria

### Functionality
- [ ] All pricing calculations accurate
- [ ] Dimension validation working
- [ ] All fabric types/colours selectable
- [ ] Options pricing correct
- [ ] Technical specs display properly
- [ ] Quote summary shows all values

### UI/UX
- [ ] Identical look to Sona Sky
- [ ] Same gradient background
- [ ] Same button styles
- [ ] Same card layouts
- [ ] Same spacing/padding
- [ ] Same typography
- [ ] Responsive (mobile/tablet/desktop)

### Technical
- [ ] No console errors
- [ ] No warnings in Terminal 1
- [ ] Clean code (no unused variables)
- [ ] Proper state management
- [ ] Efficient calculations

---

## 📝 Example: Fabric Colour Section

### From Sona (Keep UI Structure)
```javascript
<div className="mb-6">
  <label className="block text-sm font-semibold text-gray-700 mb-3">
    3. Select Fabric Colour
  </label>
  <div className="space-y-3">
    {getCurrentFabricColors().map((color) => (
      <div 
        key={color.code}
        onClick={() => setFabricColor(color.name.toLowerCase())}
        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
          fabricColor === color.name.toLowerCase()
            ? 'border-[#3B82F6] bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <div className="flex items-center">
          <div 
            className="w-12 h-12 rounded-lg mr-4 border border-gray-300"
            style={{ backgroundColor: color.hex }}
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{color.name}</div>
            <div className="text-sm text-gray-500">{color.code}</div>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

### For Duette (Update Data Only)
```javascript
// Change data source
const duetteColors = [
  { name: 'Pearl', hex: '#F5F5F0', code: 'D0001', category: 'Neutrals' },
  // Your colours
];

// Keep EXACT same UI code above
// Just use duetteColors instead of dimoutColors
```

---

## 🚨 Common Mistakes to Avoid

❌ **DON'T:**
1. Change UI layout structure
2. Modify Tailwind classes
3. Alter button styles
4. Change spacing/padding values
5. Remove progress bar design
6. Change gradient background
7. Modify card layouts
8. Change font families
9. Alter responsive breakpoints
10. Remove service worker code

✅ **DO:**
1. Replace pricing data
2. Update fabric types/colours
3. Modify calculation logic
4. Change option lists
5. Update dimension ranges
6. Replace technical spec text
7. Update labels and help text
8. Change system type descriptions
9. Adjust validation messages
10. Update product-specific terms

---

## 📊 Code Quality Checklist

### Before Committing

```bash
# Check for errors in Terminal 1
# Should show: "Compiled successfully!"

# No console errors in browser
# Open DevTools → Console → Should be clean

# No unused variables
# ESLint will warn you

# Test all functionality
# Enter dimensions, select options, verify calculations
```

---

## 🎯 Success Definition

You've succeeded when:

1. **Looks identical** to Sona Sky calculator
2. **All Luxaflex Duette data** properly integrated
3. **Calculations work correctly** for all scenarios
4. **No console errors** or warnings
5. **Responsive** on all device sizes
6. **localhost:3000** shows Duette calculator working perfectly
7. **Ready to deploy** via GitHub → Vercel

---

## 📞 Questions to Ask Me

Before starting, ask me:

1. "Please provide the Luxaflex Duette pricing tables"
2. "What are the fabric types for Duette?"
3. "What colours are available and their hex codes?"
4. "What are the system type options?"
5. "What control options are available and their prices?"
6. "What are the dimension constraints (min/max)?"
7. "What calculation formulas should I use?"
8. "What technical specifications text should display?"
9. "Are there any special rules or edge cases?"
10. "What should the page title be?"

---

## 🚀 Let's Start

When you're ready to begin, say:

**"I'm ready to create the Luxaflex Duette calculator. Please provide the pricing tables, fabric types, colours, options, dimension ranges, and any calculation formulas I need to implement."**

Then I'll provide all the data, and you can start building `src/AppDuette.js` using the Sona Sky structure as your template.

---

**Document Version:** 1.0  
**Created:** October 10, 2025  
**Companion to:** LUXAFLEX-DUETTE-BLUEPRINT.md


