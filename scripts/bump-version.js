#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Path to package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');

try {
  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Parse current version
  const versionParts = packageJson.version.split('.');
  const major = parseInt(versionParts[0]);
  const minor = parseInt(versionParts[1]);
  const patch = parseInt(versionParts[2]);
  
  // Determine version bump type
  const bumpType = process.argv[2] || 'patch';
  let newVersion;
  
  switch (bumpType) {
    case 'major':
      newVersion = `${major + 1}.0.0`;
      break;
    case 'minor':
      newVersion = `${major}.${minor + 1}.0`;
      break;
    case 'patch':
    default:
      newVersion = `${major}.${minor}.${patch + 1}`;
      break;
  }
  
  // Store old version for logging
  const oldVersion = packageJson.version;
  
  // Update package.json
  packageJson.version = newVersion;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log(`✅ Version bumped from ${oldVersion} to ${newVersion}`);
  
  // Also create a version info file for easy access
  const versionInfo = {
    version: newVersion,
    timestamp: new Date().toISOString(),
    gitCommit: process.env.GIT_COMMIT || 'unknown',
    gitBranch: process.env.GIT_BRANCH || 'unknown'
  };
  
  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'version-info.json'),
    JSON.stringify(versionInfo, null, 2)
  );
  
  console.log(`📝 Version info saved to src/version-info.json`);
  
  // Auto-deploy to Vercel if requested
  if (process.env.AUTO_DEPLOY !== 'false') {
    console.log('🚀 Auto-deploying to Vercel...');
    try {
      const { execSync } = require('child_process');
      execSync('node scripts/deploy-vercel.js', { stdio: 'inherit' });
    } catch (deployError) {
      console.log('⚠️  Auto-deployment failed, but version was bumped successfully');
      console.log('💡 You can deploy manually with: npm run deploy');
    }
  }
  
} catch (error) {
  console.error('❌ Error bumping version:', error.message);
  process.exit(1);
}
