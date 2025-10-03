#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function showHelp() {
  console.log(`
🚀 Vercel Deployment Manager

Usage:
  npm run deploy           - Deploy current version to Vercel
  npm run deploy:force     - Force deploy even if no changes
  npm run deploy:status    - Check deployment status

Auto-deployment:
  - Automatically runs after version bumps
  - Deploys to production environment
  - Updates Vercel with latest changes
`);
}

async function deployToVercel(force = false) {
  try {
    console.log('🚀 Starting Vercel deployment...');
    
    // Check if we're in a git repository
    try {
      execSync('git status', { stdio: 'ignore' });
    } catch {
      console.error('❌ Not in a git repository. Please initialize git first.');
      return false;
    }
    
    // Check if Vercel CLI is available
    try {
      execSync('vercel --version', { stdio: 'ignore' });
    } catch {
      console.error('❌ Vercel CLI not found. Please install it: npm install -g vercel');
      return false;
    }
    
    // Check if we have uncommitted changes
    try {
      const status = execSync('git status --porcelain', { encoding: 'utf8' });
      if (status.trim() && !force) {
        console.log('⚠️  You have uncommitted changes. Committing them first...');
        execSync('git add .', { stdio: 'inherit' });
        execSync(`git commit -m "Auto-commit before deployment"`, { stdio: 'inherit' });
      }
    } catch (error) {
      console.log('ℹ️  No uncommitted changes detected');
    }
    
    // Get current version for deployment message
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const version = packageJson.version;
    
    console.log(`📦 Deploying version ${version} to Vercel...`);
    
    // Deploy to Vercel
    const deployCommand = force ? 'vercel --prod --force' : 'vercel --prod';
    const deployOutput = execSync(deployCommand, { 
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
    
    // Check if it's a common error
    if (error.message.includes('not authenticated')) {
      console.log('💡 Please login to Vercel: vercel login');
    } else if (error.message.includes('project not found')) {
      console.log('💡 Please link your project: vercel link');
    }
    
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

function checkDeploymentStatus() {
  try {
    console.log('🔍 Checking Vercel deployment status...');
    
    // Get project info
    const projectInfo = execSync('vercel ls --yes', { encoding: 'utf8' });
    console.log(projectInfo);
    
    // Check version info
    const versionInfoPath = path.join(__dirname, '..', 'src', 'version-info.json');
    if (fs.existsSync(versionInfoPath)) {
      const versionInfo = JSON.parse(fs.readFileSync(versionInfoPath, 'utf8'));
      
      if (versionInfo.lastDeployment) {
        console.log(`
📋 Last Deployment Info:
  Version: ${versionInfo.lastDeployment.url}
  URL: ${versionInfo.lastDeployment.url}
  Time: ${new Date(versionInfo.lastDeployment.timestamp).toLocaleString()}
  Status: ${versionInfo.lastDeployment.status}
`);
      }
    }
    
  } catch (error) {
    console.error('❌ Could not check deployment status:', error.message);
  }
}

// Main command handling
const command = process.argv[2];

switch (command) {
  case 'force':
    deployToVercel(true);
    break;
  case 'status':
    checkDeploymentStatus();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    deployToVercel();
    break;
}
