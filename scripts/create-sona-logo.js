const fs = require('fs');

// Create a simple text-based Sona logo as a data URI
function createSonaLogoDataURI(size) {
  const fontSize = Math.round(size * 0.3);
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" fill="#000000"/>
    <text x="${size/2}" y="${size*0.6}" font-family="Arial, sans-serif" font-size="${fontSize}" font-weight="bold" text-anchor="middle" fill="#ffffff">SONA</text>
    <circle cx="${size/2}" cy="${size*0.3}" r="${size*0.08}" fill="#ffffff"/>
    <rect x="${size*0.42}" y="${size*0.22}" width="${size*0.16}" height="${size*0.02}" fill="#000000"/>
    <rect x="${size*0.42}" y="${size*0.26}" width="${size*0.16}" height="${size*0.02}" fill="#000000"/>
    <rect x="${size*0.42}" y="${size*0.30}" width="${size*0.16}" height="${size*0.02}" fill="#000000"/>
    <rect x="${size*0.42}" y="${size*0.34}" width="${size*0.16}" height="${size*0.02}" fill="#000000"/>
    <rect x="${size*0.42}" y="${size*0.38}" width="${size*0.16}" height="${size*0.02}" fill="#000000"/>
  </svg>`;
  
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Create HTML file to generate proper logos
const html = `<!DOCTYPE html>
<html>
<head>
    <title>Sona Logo Generator</title>
    <style>
        body { background: #333; color: white; font-family: Arial, sans-serif; padding: 20px; }
        .logo { margin: 20px; display: inline-block; }
        .instructions { margin-top: 20px; padding: 20px; background: #444; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Sona Logo Generator</h1>
    
    <div class="logo">
        <h3>192x192 Logo</h3>
        <img src="${createSonaLogoDataURI(192)}" width="192" height="192" />
    </div>
    
    <div class="logo">
        <h3>512x512 Logo</h3>
        <img src="${createSonaLogoDataURI(512)}" width="512" height="512" />
    </div>
    
    <div class="instructions">
        <h3>Instructions:</h3>
        <ol>
            <li>Right-click on each logo above</li>
            <li>Select "Save image as..."</li>
            <li>Save as "logo192.png" and "logo512.png"</li>
            <li>Replace the files in the public/ folder</li>
            <li>Run: npm run deploy:force</li>
        </ol>
    </div>
</body>
</html>`;

fs.writeFileSync('sona-logo-generator.html', html);

console.log('✅ Created Sona logo generator');
console.log('📁 sona-logo-generator.html - Open this in your browser');
console.log('🎨 Features:');
console.log('   - Black background');
console.log('   - White "SONA" text');
console.log('   - Striped "O" design');
console.log('   - Professional appearance');
console.log('');
console.log('📱 Next steps:');
console.log('1. Open sona-logo-generator.html in your browser');
console.log('2. Right-click and save both logos as PNG files');
console.log('3. Replace the current logo files in public/');
console.log('4. Deploy the changes');
