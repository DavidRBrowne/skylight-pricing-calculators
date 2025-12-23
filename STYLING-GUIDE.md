# 🎨 The Scottish Shutter Company - Complete Styling Guide

**Version:** v1.3.4  
**Date:** November 21, 2025  
**Purpose:** Uniform styling across all documents and applications

---

## 📋 Table of Contents

1. [Brand Colors](#brand-colors)
2. [Typography](#typography)
3. [Card Styles](#card-styles)
4. [Button Styles](#button-styles)
5. [Logo & Assets](#logo--assets)
6. [Version Display](#version-display)
7. [Layout Patterns](#layout-patterns)
8. [PDF Quote Styling](#pdf-quote-styling)
9. [CSS/Global Styles](#cssglobal-styles)
10. [Complete Brand Configuration](#complete-brand-configuration)

---

## 🎨 Brand Colors

### Primary Palette

```javascript
// Brand Colors - The Scottish Shutter Company (Pantone colors)
colors: {
  teal: '#007A87',           // Primary Teal (Pantone 7474C)
  deepTeal: '#00333B',       // Deep Teal (Pantone 546C)
  lightGrey: '#C6C6BC',      // Light Grey (Pantone 413C) - Main background
  black: '#1D1D1B',          // Black - Primary text
  brightPink: '#C50084',     // Bright Pink (Pantone 233C)
  purple: '#752864',         // Purple (Pantone 249C)
  grassGreen: '#58A618',     // Grass Green (Pantone 369C)
  white: '#ffffff',
}
```

### Semantic Colors

```javascript
primary: '#007A87',      // Teal - Primary actions, headings
secondary: '#00333B',    // Deep Teal - Secondary elements
accent: '#C50084',       // Bright Pink - Accent/highlight
success: '#58A618',      // Grass Green - Success messages
warning: '#C50084',      // Bright Pink - Warning messages
error: '#752864',        // Purple - Error messages
light: '#C6C6BC',        // Light Grey - Background
dark: '#1D1D1B',         // Black - Text
```

### Tailwind Color Equivalents

```javascript
// For Tailwind CSS usage:
'teal-600': '#007A87',      // Primary teal
'teal-700': '#00333B',      // Deep teal
'teal-500': '#14b8a6',      // Lighter teal variant (used in gradients)
'teal-800': '#0f766e',      // Dark teal variant
'gray-100': '#C6C6BC',      // Light grey background
'gray-50': '#fafafa',       // Very light grey
'gray-200': '#e5e5e5',      // Light grey borders
'gray-300': '#d4d4d4',      // Medium grey
'gray-400': '#a3a3a3',      // Medium grey text
'gray-500': '#737373',      // Muted text
'gray-600': '#525252',      // Secondary text
'gray-700': '#404040',      // Darker text
'black': '#1D1D1B',         // Primary text
```

---

## 📝 Typography

### Font Families

```javascript
fonts: {
  heading: '"Open Sans", Helvetica, sans-serif',
  body: '"Open Sans", Helvetica, sans-serif',
  light: '"Open Sans Light", "Open Sans", Helvetica, sans-serif',
  semibold: '"Open Sans Semi Bold", "Open Sans", Helvetica, sans-serif',
  mono: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
}
```

### Google Fonts Import

```html
<!-- Add to <head> of HTML documents -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

### Font Weights

- **Light:** 300 (`font-light`)
- **Regular:** 400 (`font-normal`)
- **Semi Bold:** 600 (`font-semibold`)
- **Bold:** 700 (`font-bold`)

### Font Sizes

```javascript
fontSize: {
  xs: '0.75rem',      // 12px - Small labels, captions
  sm: '0.875rem',     // 14px - Secondary text
  base: '1rem',       // 16px - Body text
  lg: '1.125rem',     // 18px - Larger body
  xl: '1.25rem',      // 20px - Subheadings
  '2xl': '1.5rem',    // 24px - Headings
  '3xl': '1.875rem',  // 30px - Large headings
  '4xl': '2.25rem',   // 36px - Display headings
  '5xl': '3rem'       // 48px - Hero headings
}
```

### Typography Usage Examples

**Page Title (Main Heading):**
```html
<h1 style="font-family: 'Open Sans Semi Bold', 'Open Sans', sans-serif; 
           font-size: 1.875rem; 
           color: #007A87; 
           font-weight: 600;">
  Sona Sky Series
</h1>
```

**Subtitle:**
```html
<p style="font-family: 'Open Sans Light', 'Open Sans', sans-serif; 
          font-size: 1.125rem; 
          color: #1D1D1B;">
  Skylight Blind Calculator
</p>
```

**Section Heading:**
```html
<h3 style="font-family: 'Open Sans Semi Bold', 'Open Sans', sans-serif; 
           font-size: 1.25rem; 
           color: #00333B; 
           font-weight: 600;">
  Section Title
</h3>
```

**Body Text:**
```html
<p style="font-family: 'Open Sans', Helvetica, sans-serif; 
          font-size: 1rem; 
          color: #1D1D1B;">
  Regular body text content
</p>
```

**Version Label:**
```html
<p style="font-family: 'Open Sans Light', 'Open Sans', sans-serif; 
          font-size: 0.75rem; 
          color: #737373;">
  v1.3.4
</p>
```

---

## 🃏 Card Styles

### Main Card Container

```html
<div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100">
  <!-- Card content -->
</div>
```

**CSS Equivalent:**
```css
.card-main {
  background-color: #ffffff;
  border-radius: 1.5rem;      /* 24px */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
  padding: 1.5rem;             /* 24px - mobile */
  padding: 2rem;               /* 32px - desktop (lg:p-8) */
  border: 1px solid #f5f5f5;   /* gray-100 */
}
```

### Section Card with Icon

```html
<div className="bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100 mb-6">
  <div className="flex items-center mb-4">
    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-bold text-sm flex items-center justify-center mr-4">
      1
    </div>
    <h3 className="text-xl font-bold" style="color: #00333B; font-family: 'Open Sans Semi Bold', sans-serif;">
      Section Title
    </h3>
  </div>
  <!-- Content -->
</div>
```

**Icon Badge CSS:**
```css
.icon-badge {
  width: 2rem;                /* 32px */
  height: 2rem;               /* 32px */
  border-radius: 50%;
  background: linear-gradient(to right, #14b8a6, #007A87);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.875rem;        /* 14px */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
```

### Info Card

```html
<div className="border border-gray-200 rounded-lg p-4">
  <h4 className="font-semibold mb-2">Card Title</h4>
  <p className="text-sm text-gray-700">Card content</p>
</div>
```

### Header Card

```html
<header className="bg-white shadow-lg border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 py-6">
    <!-- Header content -->
  </div>
</header>
```

---

## 🔘 Button Styles

### Primary Button

```html
<button className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors">
  Button Text
</button>
```

**CSS Equivalent:**
```css
.btn-primary {
  width: 100%;
  background-color: #007A87;      /* teal-600 */
  color: #ffffff;
  padding: 0.5rem 1rem;            /* py-2 px-4 */
  border-radius: 0.5rem;           /* rounded-lg */
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #00333B;       /* teal-700 / deepTeal */
}
```

### Secondary/Text Button

```html
<button className="text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1">
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <!-- Icon -->
  </svg>
  Button Text
</button>
```

**CSS Equivalent:**
```css
.btn-text {
  font-size: 0.875rem;             /* text-sm */
  color: #007A87;                  /* text-teal-600 */
  display: flex;
  align-items: center;
  gap: 0.25rem;                    /* gap-1 */
}

.btn-text:hover {
  color: #00333B;                  /* text-teal-700 */
}
```

### Disabled Button

```html
<button disabled className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded-lg cursor-not-allowed">
  Disabled
</button>
```

---

## 🖼️ Logo & Assets

### Logo File Specification

**IMPORTANT: The application uses PNG format, NOT SVG.**

**Main Logo File:**
- **Format:** PNG (Portable Network Graphics)
- **File Name:** `scottish-shutter-company-logo.png`
- **File Size:** 255KB
- **Dimensions:** 2000 × 2000 pixels (square format)
- **Color Depth:** 8-bit RGBA (supports transparency)
- **Quality:** High resolution

**File Locations:**
1. **Public Directory (for web use):**
   - Path: `/public/scottish-shutter-company-logo.png`
   - URL: `/scottish-shutter-company-logo.png`
   - Used for: PDF generation, direct image references

2. **Source Assets (for React imports):**
   - Path: `src/assets/The Scottish Shutter Company Logo 2024 Square copy.png`
   - Used for: React component imports

### Logo Display

**In React/Web Application:**
```html
<img src="/scottish-shutter-company-logo.png" 
     alt="Scottish Shutter Company Logo" 
     style="height: 48px; width: auto; border-radius: 8px;" />
```

**For PDF/Print Documents:**
```html
<img src="/scottish-shutter-company-logo.png" 
     alt="Scottish Shutter Company Logo" 
     style="height: 60px; width: auto;" />
```

**In React Component (imported):**
```javascript
import sscLogoPng from './assets/The Scottish Shutter Company Logo 2024 Square copy.png';

// Then use:
<img src={sscLogoPng} 
     alt="Scottish Shutter Company Logo" 
     style={{ height: '48px', width: 'auto', borderRadius: '8px' }} />
```

### Logo Sizes & Usage

| Context | Height | Width | Border Radius | Notes |
|---------|--------|-------|---------------|-------|
| **Web Header** | 48px | auto | 8px | Main application header |
| **PDF Header** | 60px | auto | none | Quote documents |
| **Favicon** | 32px × 32px | 32px × 32px | - | Browser tab icon |
| **Touch Icon** | 180px × 180px | 180px × 180px | - | Apple touch icon |
| **Source File** | 2000px × 2000px | 2000px × 2000px | - | Original high-res |

### Logo Notes

⚠️ **Important Specifications:**
- **Format:** PNG only (SVG file exists but is empty/not used)
- **Aspect Ratio:** Square (1:1)
- **Transparency:** Supports RGBA (can have transparent background)
- **Naming:** Exact filename must be `scottish-shutter-company-logo.png` for public directory
- **Resolution:** High resolution source (2000×2000) scales down cleanly to any display size

### Alternative Logo Files

- `logo.svg`: Exists but is empty/placeholder (1 byte) - **DO NOT USE**
- `logo192.png`: 192×192px favicon variant
- `logo512.png`: 512×512px larger variant
- `apple-touch-icon.png`: 180×180px iOS touch icon

---

## 🔢 Version Display

### Header Version Display

**Desktop (Hidden on Mobile):**
```html
<div className="hidden md:block">
  <div className="text-right">
    <p className="text-sm" style="color: #1D1D1B; font-family: 'Open Sans Light', sans-serif;">
      The Scottish Shutter Company
    </p>
    <p className="text-sm font-medium" style="color: #00333B; font-family: 'Open Sans Semi Bold', sans-serif;">
      Professional Skylight Solutions
    </p>
    <p className="text-xs mt-1" style="color: #737373; font-family: 'Open Sans Light', sans-serif;">
      v1.3.4
    </p>
  </div>
</div>
```

**Mobile (Hidden on Desktop):**
```html
<div className="md:hidden mt-2">
  <p className="text-xs" style="color: #737373; font-family: 'Open Sans Light', sans-serif;">
    The Scottish Shutter Company - v1.3.4
  </p>
</div>
```

### Version Styling

```css
.version-display {
  font-family: 'Open Sans Light', 'Open Sans', sans-serif;
  font-size: 0.75rem;              /* 12px */
  color: #737373;                  /* gray-500 */
}
```

---

## 📐 Layout Patterns

### Main Container

```html
<div className="min-h-screen" style="background-color: #C6C6BC; color: #1D1D1B; font-family: 'Open Sans', Helvetica, sans-serif;">
  <!-- App content -->
</div>
```

**Background:**
- Color: `#C6C6BC` (lightGrey)
- This is the main page background color

### Max Width Container

```html
<div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
  <!-- Content -->
</div>
```

**CSS:**
```css
.container-main {
  max-width: 80rem;                /* 1280px - max-w-7xl */
  margin-left: auto;
  margin-right: auto;
  padding: 1.5rem 1rem;            /* px-4 py-6 */
}

@media (min-width: 640px) {
  .container-main {
    padding-left: 1.5rem;          /* sm:px-6 */
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-main {
    padding-top: 2rem;             /* lg:py-8 */
    padding-bottom: 2rem;
  }
}
```

### Grid Layout

**Two Column (Desktop) / Single Column (Mobile):**
```html
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
  <!-- Sidebar: xl:col-span-1 -->
  <!-- Main: xl:col-span-2 -->
</div>
```

**Responsive Grid:**
```html
<div className="grid md:grid-cols-2 gap-4">
  <!-- Two columns on desktop, one on mobile -->
</div>
```

---

## 📄 PDF Quote Styling

### PDF Container

```html
<div style="font-family: 'Open Sans', Arial, sans-serif; color: #1f2937; padding: 20px;">
  <!-- PDF content -->
</div>
```

### PDF Header

```html
<div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 16px; margin-bottom: 16px;">
  <div style="display: flex; align-items: center; gap: 16px;">
    <img src="/scottish-shutter-company-logo.png" 
         alt="Scottish Shutter Company Logo" 
         style="height: 60px; width: auto;" />
    <div>
      <div style="font-size: 24px; font-weight: 700; color: #14b8a6;">
        THE SCOTTISH SHUTTER COMPANY
      </div>
      <div style="font-size: 12px; color: #6b7280; letter-spacing: 0.1em;">
        PREMIUM WINDOW SHADING SPECIALISTS
      </div>
    </div>
  </div>
  <div>
    <div style="font-size: 28px; font-weight: 700; color: #0f766e; letter-spacing: 0.1em;">
      QUOTATION
    </div>
  </div>
</div>
```

### PDF Quote Reference & Date

```html
<div style="display: flex; gap: 32px; margin-bottom: 24px;">
  <div>
    <div style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em;">
      Quote Reference
    </div>
    <div style="font-size: 16px; font-weight: 600; color: #111827;">
      SSC-2025-1234
    </div>
  </div>
  <div>
    <div style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 0.08em;">
      Date
    </div>
    <div style="font-size: 16px; font-weight: 600; color: #111827;">
      21 November 2025
    </div>
  </div>
</div>
```

### PDF Table Styling

```html
<table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
  <thead>
    <tr>
      <th style="padding: 12px 8px; text-align: left; font-size: 13px; font-weight: 600;">
        Description
      </th>
      <th style="padding: 12px 8px; text-align: left; font-size: 13px; font-weight: 600;">
        Specification
      </th>
      <th style="padding: 12px 8px; text-align: center; font-size: 13px; font-weight: 600;">
        Qty
      </th>
      <th style="padding: 12px 8px; text-align: right; font-size: 13px; font-weight: 600;">
        Unit Price
      </th>
      <th style="padding: 12px 8px; text-align: right; font-size: 13px; font-weight: 600;">
        Total
      </th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-top: 1px solid #e5e7eb;">
      <td style="padding: 12px 8px; font-weight: 600;">Item</td>
      <td style="padding: 12px 8px; font-size: 12px; color: #374151; line-height: 1.6;">
        Specification details
      </td>
      <td style="padding: 12px 8px; text-align: center; font-weight: 600;">1</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600;">£1,234.56</td>
      <td style="padding: 12px 8px; text-align: right; font-weight: 600;">£1,234.56</td>
    </tr>
  </tbody>
</table>
```

### PDF Total Section

```html
<div style="margin-top: 24px; padding-top: 16px; border-top: 2px solid #0f766e;">
  <div style="display: flex; justify-content: space-between; padding: 8px 12px;">
    <div style="font-size: 14px; color: #4b5563;">Subtotal</div>
    <div style="font-size: 14px; color: #111827; text-align: right; font-weight: 600;">
      £1,234.56
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; padding: 8px 12px;">
    <div style="font-size: 14px; color: #4b5563;">VAT (20%)</div>
    <div style="font-size: 14px; color: #111827; text-align: right; font-weight: 600;">
      £246.91
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; padding: 16px 12px;">
    <div style="font-size: 18px; font-weight: 700; color: #0f766e;">Total Inc VAT</div>
    <div style="font-size: 18px; font-weight: 700; color: #0f766e; text-align: right;">
      £1,481.47
    </div>
  </div>
</div>
```

### PDF Footer

```html
<div style="text-align: center; font-size: 12px; color: #4b5563; line-height: 1.8; margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
  <div style="font-weight: 700; color: #0f766e;">The Scottish Shutter Company</div>
  <div>Showrooms: Dundee & Edinburgh | www.scottishshutters.co.uk</div>
  <div>Email: info@scottishshutters.co.uk | Tel: 01382 XXX XXX</div>
</div>
```

### Money Formatting

```javascript
function formatMoney(amount) {
  return `£${amount.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
// Example: £1,234.56
```

---

## 🎨 CSS/Global Styles

### Base Styles

```css
body {
  margin: 0;
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Focus States

```css
input:focus, select:focus {
  outline: none;
  border-color: #007A87 !important;              /* teal */
  box-shadow: 0 0 0 3px rgba(0, 122, 135, 0.1) !important;
}
```

### Custom Radio Buttons

```css
input[type="radio"]:checked {
  accent-color: #007A87;                          /* teal */
}
```

### Custom Select Dropdowns

```css
select {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23007A87' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}
```

### Input Field Styles

```css
.input-field {
  width: 100%;
  padding: 0.5rem 0.75rem;                        /* px-3 py-2 */
  border: 1px solid #d4d4d4;                      /* gray-300 */
  border-radius: 0.5rem;                          /* rounded-lg */
}

.input-field:focus {
  outline: none;
  border-color: #14b8a6;                          /* teal-500 */
  box-shadow: 0 0 0 2px rgba(20, 184, 166, 0.2);
}
```

### Modal Overlay

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);          /* bg-black bg-opacity-50 */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
}

.modal-content {
  background-color: #ffffff;
  border-radius: 0.5rem;                          /* rounded-lg */
  max-width: 48rem;                               /* max-w-3xl */
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;                                /* p-6 */
}
```

### Shadows

```css
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-xl {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### Border Radius

```css
.rounded-sm { border-radius: 0.25rem; }          /* 4px */
.rounded-md { border-radius: 0.375rem; }         /* 6px */
.rounded-lg { border-radius: 0.5rem; }           /* 8px */
.rounded-xl { border-radius: 0.75rem; }          /* 12px */
.rounded-2xl { border-radius: 1rem; }            /* 16px */
.rounded-3xl { border-radius: 1.5rem; }          /* 24px */
.rounded-full { border-radius: 9999px; }         /* Circle */
```

---

## ⚙️ Complete Brand Configuration

### JavaScript Configuration Object

```javascript
export const brandConfig = {
  // Brand Colors
  colors: {
    teal: '#007A87',
    deepTeal: '#00333B',
    lightGrey: '#C6C6BC',
    black: '#1D1D1B',
    brightPink: '#C50084',
    purple: '#752864',
    grassGreen: '#58A618',
    white: '#ffffff',
    
    // Semantic colors
    primary: '#007A87',
    secondary: '#00333B',
    accent: '#C50084',
    success: '#58A618',
    warning: '#C50084',
    error: '#752864',
    light: '#C6C6BC',
    dark: '#1D1D1B',
  },

  // Typography
  fonts: {
    heading: '"Open Sans", Helvetica, sans-serif',
    body: '"Open Sans", Helvetica, sans-serif',
    light: '"Open Sans Light", "Open Sans", Helvetica, sans-serif',
    semibold: '"Open Sans Semi Bold", "Open Sans", Helvetica, sans-serif',
    mono: 'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace'
  },

  // Font Sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem'
  },

  // Border Radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    full: '9999px'
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
  },

  // Brand Information
  brand: {
    name: 'SSC',
    fullName: 'The Scottish Shutter Company',
    tagline: 'Professional Skylight Solutions',
    website: 'https://www.scottishshutters.co.uk',
    email: 'info@scottishshutters.co.uk'
  },

  // Logo Configuration
  logo: {
    src: '/scottish-shutter-company-logo.png',
    alt: 'SSC Logo',
    width: 'auto',
    height: '48px'  // Header: 48px, PDF: 60px
  }
};
```

---

## 📋 Quick Reference Cheat Sheet

### Most Common Colors
- **Primary Teal:** `#007A87`
- **Deep Teal:** `#00333B`
- **Background:** `#C6C6BC`
- **Text:** `#1D1D1B`
- **White:** `#ffffff`

### Most Common Fonts
- **Body:** `'Open Sans', Helvetica, sans-serif`
- **Light:** `'Open Sans Light', 'Open Sans', Helvetica, sans-serif`
- **Semi Bold:** `'Open Sans Semi Bold', 'Open Sans', Helvetica, sans-serif`

### Card Class Names
- Main card: `bg-white rounded-3xl shadow-xl p-6 lg:p-8 border border-gray-100`

### Button Class Names
- Primary: `bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700`
- Text link: `text-sm text-teal-600 hover:text-teal-700`

### Spacing
- Small: `0.5rem` (8px)
- Medium: `1rem` (16px)
- Large: `1.5rem` (24px)
- Extra Large: `2rem` (32px)

---

## 📝 Notes

1. **Font Loading:** Always include Google Fonts link in HTML head for proper rendering
2. **Logo Paths:** Use `/scottish-shutter-company-logo.png` for public paths
3. **Responsive:** Cards use `p-6` on mobile, `lg:p-8` on desktop
4. **Accessibility:** Ensure color contrast meets WCAG AA standards (teal on white passes)
5. **Version Display:** Always use `securityConfig.version` or similar version variable

---

**Document Version:** 1.0  
**Last Updated:** November 21, 2025  
**Maintained By:** The Scottish Shutter Company Development Team

