const fs = require('fs');

// Create a proper Sona logo using HTML canvas approach
function createSonaLogoHTML() {
  return `<!DOCTYPE html>
<html>
<head>
    <title>Create Sona Logo</title>
    <style>
        body { background: #333; color: white; font-family: Arial, sans-serif; padding: 20px; }
        canvas { border: 2px solid white; margin: 10px; }
        .container { display: flex; flex-wrap: wrap; gap: 20px; }
        .logo-section { text-align: center; }
    </style>
</head>
<body>
    <h1>Sona Logo Creator</h1>
    <p>Right-click on each canvas and "Save image as PNG"</p>
    
    <div class="container">
        <div class="logo-section">
            <h3>192x192 Logo</h3>
            <canvas id="logo192" width="192" height="192"></canvas>
        </div>
        
        <div class="logo-section">
            <h3>512x512 Logo</h3>
            <canvas id="logo512" width="512" height="512"></canvas>
        </div>
    </div>
    
    <script>
        function createLogo(canvasId, size) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext('2d');
            
            // Black background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, size, size);
            
            // White text
            ctx.fillStyle = '#ffffff';
            ctx.font = \`bold \${size * 0.25}px Arial\`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw SONA text
            ctx.fillText('SONA', size / 2, size * 0.7);
            
            // Draw striped O
            const oSize = size * 0.15;
            const oX = size / 2;
            const oY = size * 0.3;
            
            // White circle
            ctx.beginPath();
            ctx.arc(oX, oY, oSize, 0, 2 * Math.PI);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
            
            // Black stripes
            ctx.fillStyle = '#000000';
            const stripeHeight = size * 0.015;
            for (let i = 0; i < 5; i++) {
                const y = oY - oSize + (i * stripeHeight * 2.5);
                ctx.fillRect(oX - oSize, y, oSize * 2, stripeHeight);
            }
        }
        
        // Create both logos
        createLogo('logo192', 192);
        createLogo('logo512', 512);
    </script>
</body>
</html>`;
}

// Create the HTML file
fs.writeFileSync('create-sona-logo.html', createSonaLogoHTML());

console.log('✅ Created Sona logo creator');
console.log('📁 create-sona-logo.html - Open this in your browser');
console.log('');
console.log('🎨 This will create proper Sona logos with:');
console.log('   - Black background');
console.log('   - White "SONA" text');
console.log('   - Striped "O" design');
console.log('');
console.log('📱 Instructions:');
console.log('1. Open create-sona-logo.html in your browser');
console.log('2. Right-click on each canvas and "Save image as PNG"');
console.log('3. Save as "logo192.png" and "logo512.png"');
console.log('4. Replace the files in public/ folder');
console.log('5. Deploy the changes');
