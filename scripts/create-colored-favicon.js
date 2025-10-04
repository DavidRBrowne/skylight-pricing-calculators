const fs = require('fs');

// Create a simple HTML page that generates a colored favicon
const html = `<!DOCTYPE html>
<html>
<head>
    <title>Create Colored Favicon</title>
    <style>
        body { 
            background: #333; 
            color: white; 
            font-family: Arial, sans-serif; 
            padding: 20px; 
        }
        .favicon-container {
            display: inline-block;
            margin: 20px;
            text-align: center;
        }
        .favicon {
            width: 64px;
            height: 64px;
            background: #007A87;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 24px;
            margin: 10px;
        }
        .favicon-32 { width: 32px; height: 32px; font-size: 12px; }
        .favicon-16 { width: 16px; height: 16px; font-size: 8px; }
        .instructions { margin-top: 20px; padding: 20px; background: #444; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>Create Colored Favicon for Sona</h1>
    <p>These are teal-colored squares that should NOT appear white on your phone!</p>
    
    <div class="favicon-container">
        <h3>64x64 Favicon</h3>
        <div class="favicon">S</div>
    </div>
    
    <div class="favicon-container">
        <h3>32x32 Favicon</h3>
        <div class="favicon favicon-32">S</div>
    </div>
    
    <div class="favicon-container">
        <h3>16x16 Favicon</h3>
        <div class="favicon favicon-16">S</div>
    </div>
    
    <div class="instructions">
        <h3>Instructions:</h3>
        <ol>
            <li>Right-click on each teal square above</li>
            <li>Select "Save image as..." (if available)</li>
            <li>Or take a screenshot and crop to the square</li>
            <li>Save as "favicon.ico"</li>
            <li>Replace the favicon.ico file in public/ folder</li>
            <li>Deploy the changes</li>
        </ol>
        <p><strong>Note:</strong> This creates a TEAL colored favicon (#007A87) that should definitely not appear white!</p>
    </div>
</body>
</html>`;

fs.writeFileSync('favicon-generator.html', html);

console.log('✅ Created colored favicon generator');
console.log('📁 favicon-generator.html - Open this in your browser');
console.log('');
console.log('🎨 This creates a TEAL colored favicon (#007A87) that should NOT be white!');
console.log('');
console.log('📱 The favicon will be:');
console.log('   - Teal background (#007A87 - your brand color)');
console.log('   - White "S" text');
console.log('   - Definitely NOT white!');
console.log('');
console.log('Try this approach - it should solve the white icon issue!');
