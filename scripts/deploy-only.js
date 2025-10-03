#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function deployOnly() {
  try {
    console.log('🚀 Deploying current version to Vercel...');
    
    // Check if Vercel CLI is available
    try {
      execSync('vercel --version', { stdio: 'ignore' });
    } catch {
      console.error('❌ Vercel CLI not found. Please install it: npm install -g vercel');
      return false;
    }
    
    // Get current version
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const version = packageJson.version;
    
    console.log(`📦 Deploying version ${version} to Vercel...`);
    
    // Deploy to Vercel
    const deployOutput = execSync('vercel --prod', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    
    // Extract deployment URL from output
    const urlMatch = deployOutput.match(/https:\/\/[^\s]+\.vercel\.app/);
    const deploymentUrl = urlMatch ? urlMatch[0] : 'Unknown URL';
    
    console.log(`✅ Successfully deployed version ${version}`);
    console.log(`🌐 Deployment URL: ${deploymentUrl}`);
    
    // Update version info with deployment details
    updateVersionInfoWithDeployment(version, deploymentUrl);
    
    return true;
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    return false;
  }
}

function updateVersionInfoWithDeployment(version, deploymentUrl) {
  try {
    const versionInfoPath = path.join(__dirname, '..', 'src', 'version-info.json');
    
    let versionInfo = {};
    if (fs.existsSync(versionInfoPath)) {
      versionInfo = JSON.parse(fs.readFileSync(versionInfoPath, 'utf8'));
    }
    
    versionInfo.version = version;
    versionInfo.lastDeployment = {
      url: deploymentUrl,
      timestamp: new Date().toISOString(),
      status: 'success'
    };
    
    fs.writeFileSync(versionInfoPath, JSON.stringify(versionInfo, null, 2));
    console.log('📝 Deployment info saved to version-info.json');
    
  } catch (error) {
    console.log('⚠️  Could not update version info:', error.message);
  }
}

deployOnly();
