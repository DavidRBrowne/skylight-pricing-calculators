const fs = require('fs');
const path = require('path');

// Create a simple SVG-based logo that can be converted to PNG
function createSonaLogo(size) {
  const fontSize = Math.round(size * 0.25);
  const circleRadius = Math.round(size * 0.125);
  const stripeHeight = Math.round(size * 0.03125); // 1/32 of size
  
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#000000"/>
  
  <!-- Letters S, N, A -->
  <text x="${size * 0.25}" y="${size * 0.625}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="#ffffff">S</text>
  <text x="${size * 0.75}" y="${size * 0.625}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="#ffffff">N</text>
  <text x="${size * 1.25}" y="${size * 0.625}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="#ffffff">A</text>
  
  <!-- Stylized O with horizontal stripes -->
  <g transform="translate(${size * 0.5}, ${size * 0.375})">
    <!-- White circle background -->
    <circle cx="0" cy="0" r="${circleRadius}" fill="#ffffff"/>
    <!-- Black horizontal stripes -->
    <rect x="-${circleRadius}" y="-${circleRadius * 0.75}" width="${circleRadius * 2}" height="${stripeHeight}" fill="#000000"/>
    <rect x="-${circleRadius}" y="-${circleRadius * 0.25}" width="${circleRadius * 2}" height="${stripeHeight}" fill="#000000"/>
    <rect x="-${circleRadius}" y="${circleRadius * 0.25}" width="${circleRadius * 2}" height="${stripeHeight}" fill="#000000"/>
    <rect x="-${circleRadius}" y="${circleRadius * 0.75}" width="${circleRadius * 2}" height="${stripeHeight}" fill="#000000"/>
  </g>
</svg>`;
  
  return svg;
}

// Create the logo files
const logo192 = createSonaLogo(192);
const logo512 = createSonaLogo(512);

// Write SVG files
fs.writeFileSync(path.join(__dirname, '../public/logo192.svg'), logo192);
fs.writeFileSync(path.join(__dirname, '../public/logo512.svg'), logo512);

console.log('✅ Created Sona logo SVG files');
console.log('📁 logo192.svg - 192x192 version');
console.log('📁 logo512.svg - 512x512 version');
console.log('');
console.log('💡 To convert to PNG, you can:');
console.log('1. Open the SVG files in a browser');
console.log('2. Right-click and "Save image as PNG"');
console.log('3. Or use an online SVG to PNG converter');
console.log('');
console.log('🎨 Logo features:');
console.log('- Black background');
console.log('- White "SONA" text');
console.log('- Distinctive striped "O" design');
console.log('- Professional minimalist style');
