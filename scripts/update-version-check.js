#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read package.json to get current version
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const version = packageJson.version;

// Create version-check.json with current timestamp
const versionCheckData = {
  version: version,
  timestamp: new Date().toISOString(),
  build: new Date().toISOString().replace(/[-:T]/g, '').split('.')[0],
  updateAvailable: false,
  forceUpdate: false
};

// Write to public directory
const publicDir = path.join(__dirname, '..', 'public');
const versionCheckPath = path.join(publicDir, 'version-check.json');

fs.writeFileSync(versionCheckPath, JSON.stringify(versionCheckData, null, 2));

console.log(`✅ Updated version-check.json to version ${version}`);
console.log(`📅 Build timestamp: ${versionCheckData.timestamp}`);
console.log(`🏗️  Build ID: ${versionCheckData.build}`);
