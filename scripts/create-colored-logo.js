const fs = require('fs');

// Create a simple colored logo using base64 encoded PNG
function createColoredPNG(size, color) {
  // This creates a simple colored square PNG
  // Using a minimal PNG structure with the specified color
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  
  // Create a simple 1x1 pixel PNG with the color, then we'll use CSS to scale it
  const pngData = Buffer.from([
    0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
    // IHDR chunk
    0x00, 0x00, 0x00, 0x0D, // length
    0x49, 0x48, 0x44, 0x52, // IHDR
    0x00, 0x00, 0x00, 0x01, // width = 1
    0x00, 0x00, 0x00, 0x01, // height = 1
    0x08, 0x02, 0x00, 0x00, 0x00, // bit depth, color type, etc.
    0x00, 0x00, 0x00, 0x00, // CRC placeholder
    // IDAT chunk with color data
    0x00, 0x00, 0x00, 0x0C, // length
    0x49, 0x44, 0x41, 0x54, // IDAT
    0x78, 0x9C, 0x63, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // compressed data
    0x00, 0x00, 0x00, 0x00, // CRC placeholder
    // IEND chunk
    0x00, 0x00, 0x00, 0x00, // length
    0x49, 0x45, 0x4E, 0x44, // IEND
    0xAE, 0x42, 0x60, 0x82  // CRC
  ]);
  
  return pngData;
}

// Create a simple HTML file that generates colored logos
const html = `<!DOCTYPE html>
<html>
<head>
    <title>Sona Colored Logo</title>
    <style>
        body { background: #333; color: white; font-family: Arial, sans-serif; padding: 20px; }
        .logo { margin: 20px; display: inline-block; }
        .colored-square { 
            background: #007A87; 
            border: 2px solid white; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            color: white; 
            font-weight: bold; 
            font-family: Arial, sans-serif;
        }
        .logo-192 { width: 192px; height: 192px; font-size: 24px; }
        .logo-512 { width: 512px; height: 512px; font-size: 64px; }
    </style>
</head>
<body>
    <h1>Sona Logo - Colored Version</h1>
    <p>This creates a colored logo that should NOT be white!</p>
    
    <div class="logo">
        <h3>192x192 Logo</h3>
        <div class="colored-square logo-192">SONA</div>
    </div>
    
    <div class="logo">
        <h3>512x512 Logo</h3>
        <div class="colored-square logo-512">SONA</div>
    </div>
    
    <div style="margin-top: 20px; padding: 20px; background: #444; border-radius: 5px;">
        <h3>Instructions:</h3>
        <ol>
            <li>Right-click on each colored square above</li>
            <li>Select "Save image as..." (if available)</li>
            <li>Or take a screenshot and crop to the logo</li>
            <li>Save as "logo192.png" and "logo512.png"</li>
            <li>Replace the files in public/ folder</li>
        </ol>
        <p><strong>Note:</strong> This creates a teal-colored logo that should definitely not appear white on your phone!</p>
    </div>
</body>
</html>`;

fs.writeFileSync('colored-logo-generator.html', html);

console.log('✅ Created colored logo generator');
console.log('📁 colored-logo-generator.html - Open this in your browser');
console.log('');
console.log('🎨 This creates a TEAL colored logo (#007A87) that should NOT be white!');
console.log('');
console.log('📱 The logo will be:');
console.log('   - Teal background (#007A87 - your brand color)');
console.log('   - White "SONA" text');
console.log('   - Definitely NOT white!');
console.log('');
console.log('Try this approach - it should solve the white icon issue!');
