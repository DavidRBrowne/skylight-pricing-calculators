# Unified Design System Implementation Guide

## 🎯 Goal: Apply Sona Calculator's Excellent UI to All Calculators

**Target**: All pricing calculators should have the same clean, professional look as the Sona calculator.

## 📋 Implementation Steps

### 1. **Copy the Unified Design System**

Copy `shared-design-system.css` to each calculator project:

```bash
# For S:Craft Calculator
cp shared-design-system.css s-craft-pricing-calculator/src/styles/

# For any other calculators
cp shared-design-system.css [calculator-name]/src/styles/
```

### 2. **Update Each Calculator's CSS Import**

Replace the existing CSS imports in each calculator's main CSS file:

**Before:**
```css
/* Old design system */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

**After:**
```css
/* New unified design system */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap');
@import './shared-design-system.css';
```

### 3. **Update HTML Structure**

Replace the existing layout with the Sona-style structure:

**Header Structure:**
```html
<header class="calc-header">
  <div class="calc-header-content">
    <div class="calc-header-left">
      <img src="/path/to/logo.png" alt="Scottish Shutter Company Logo" class="calc-logo" />
      <div>
        <h1 class="calc-title">[Calculator Name]</h1>
        <p class="calc-subtitle">[Calculator Description]</p>
      </div>
    </div>
    <div class="calc-header-right">
      <p class="calc-tagline">The Scottish Shutter Company</p>
      <p class="calc-brand">Professional Solutions</p>
    </div>
  </div>
</header>
```

**Main Layout Structure:**
```html
<main class="calc-main">
  <!-- Sidebar - Input Panel -->
  <aside class="calc-sidebar">
    <!-- Step indicators and form inputs -->
  </aside>
  
  <!-- Content Area - Output Cards -->
  <section class="calc-content">
    <!-- Pricing and summary cards -->
  </section>
</main>
```

### 4. **Update CSS Classes**

Replace existing CSS classes with the unified system:

| Old Classes | New Classes |
|-------------|-------------|
| `.sona-calc-*` | `.calc-*` |
| `.calc-heading-1` | `.calc-heading-1` |
| `.calc-card` | `.calc-card` |
| `.calc-input` | `.calc-input` |
| `.calc-select` | `.calc-select` |
| `.calc-btn` | `.calc-btn` |
| `.calc-btn-primary` | `.calc-btn-primary` |

### 5. **Update Form Elements**

**Input Fields:**
```html
<label class="calc-label">Field Label</label>
<input type="text" class="calc-input" placeholder="Enter value" />
```

**Select Dropdowns:**
```html
<label class="calc-label">Select Option</label>
<select class="calc-select">
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</select>
```

**Radio Buttons:**
```html
<input type="radio" class="calc-radio" name="option" value="value1" />
<label>Option 1</label>
```

### 6. **Update Step Indicators**

```html
<div class="calc-step">
  <div class="calc-step-circle active">1</div>
  <h3 class="calc-step-title">Step Title</h3>
</div>
```

### 7. **Update Cards**

**Regular Cards:**
```html
<div class="calc-card">
  <h3 class="calc-heading-3">Card Title</h3>
  <p class="calc-text-base">Card content</p>
</div>
```

**Pricing Cards:**
```html
<div class="calc-price-card">
  <div class="calc-price-amount">£1,234</div>
  <div class="calc-price-label">Total Price</div>
</div>
```

## 🎨 Key Design Elements

### **Colors (Sona Style)**
- **Primary Teal**: `#007A87`
- **Deep Teal**: `#00333B`
- **Light Grey Background**: `#C6C6BC`
- **White Cards**: `#ffffff`
- **Black Text**: `#1D1D1B`

### **Typography**
- **Font**: Open Sans (300, 400, 500, 600, 700)
- **Headings**: Semi-bold weight
- **Body**: Regular weight
- **Labels**: Medium weight

### **Layout**
- **Background**: Light grey (`#C6C6BC`)
- **Cards**: White with rounded corners (`border-radius: 2rem`)
- **Shadows**: Large, professional shadows
- **Spacing**: Consistent 24px, 32px, 48px spacing

### **Components**
- **Header**: White background with logo and branding
- **Sidebar**: White card with form inputs
- **Content**: 2x2 grid of white cards
- **Buttons**: Teal primary, white secondary

## 📱 Responsive Design

The unified system includes responsive breakpoints:
- **Desktop**: 2-column layout (sidebar + content)
- **Tablet**: Single column layout
- **Mobile**: Stacked layout with adjusted spacing

## 🔧 Implementation Checklist

### For Each Calculator:

- [ ] Copy `shared-design-system.css` to project
- [ ] Update CSS imports
- [ ] Replace header structure
- [ ] Update main layout to use `.calc-main`
- [ ] Replace form elements with new classes
- [ ] Update step indicators
- [ ] Replace cards with new structure
- [ ] Test responsive design
- [ ] Verify all colors match Sona style
- [ ] Check typography consistency
- [ ] Test on mobile devices

## 🚀 Quick Start Template

Here's a minimal template to get started:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator Name - Scottish Shutter Company</title>
    <link rel="stylesheet" href="shared-design-system.css">
</head>
<body>
    <!-- Header -->
    <header class="calc-header">
        <div class="calc-header-content">
            <div class="calc-header-left">
                <img src="/logo.png" alt="SSC Logo" class="calc-logo" />
                <div>
                    <h1 class="calc-title">Calculator Name</h1>
                    <p class="calc-subtitle">Calculator Description</p>
                </div>
            </div>
            <div class="calc-header-right">
                <p class="calc-tagline">The Scottish Shutter Company</p>
                <p class="calc-brand">Professional Solutions</p>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="calc-main">
        <!-- Sidebar -->
        <aside class="calc-sidebar">
            <div class="calc-step">
                <div class="calc-step-circle active">1</div>
                <h3 class="calc-step-title">Step One</h3>
            </div>
            <!-- Add more steps and form elements -->
        </aside>

        <!-- Content -->
        <section class="calc-content">
            <div class="calc-card">
                <h3 class="calc-heading-3">Card Title</h3>
                <p class="calc-text-base">Card content</p>
            </div>
            <!-- Add more cards -->
        </section>
    </main>
</body>
</html>
```

## ✅ Success Criteria

When complete, all calculators should have:
- ✅ Same light grey background (`#C6C6BC`)
- ✅ Same white cards with rounded corners
- ✅ Same teal color scheme (`#007A87`)
- ✅ Same Open Sans typography
- ✅ Same professional shadows and spacing
- ✅ Same responsive behavior
- ✅ Same header layout with logo
- ✅ Same sidebar + content grid layout

## 🎯 Next Steps

1. **Start with S:Craft Calculator** - Apply the unified design system
2. **Test thoroughly** - Ensure all functionality works with new styling
3. **Deploy and verify** - Check the live deployment looks correct
4. **Apply to other calculators** - Repeat the process for each calculator
5. **Document any customizations** - Note any calculator-specific styling needs

This unified design system will ensure all your calculators have the same excellent, professional look as the Sona calculator! 🚀 