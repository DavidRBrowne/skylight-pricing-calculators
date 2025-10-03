#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function showHelp() {
  console.log(`
🔄 Rollback Manager for Skylight Pricing Calculators

Usage:
  npm run rollback <version>  - Rollback to specific version
  npm run rollback:list       - List available versions to rollback to

Examples:
  npm run rollback v0.1.0     # Rollback to version 0.1.0
  npm run rollback v0.1.5     # Rollback to version 0.1.5
  npm run rollback:list       # Show all available versions

⚠️  WARNING: This will reset your code to the specified version!
`);
}

function listVersions() {
  try {
    console.log(`
📚 Available Versions for Rollback:
`);
    
    // Get git tags (versions)
    const tags = execSync('git tag --sort=-version:refname', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(tag => tag);
    
    if (tags.length === 0) {
      console.log('  No version tags found.');
      console.log('  Create your first tag with: git tag v0.1.0');
      return;
    }
    
    tags.forEach((tag, index) => {
      try {
        const tagDate = execSync(`git log -1 --format=%ai ${tag}`, { encoding: 'utf8' }).trim();
        console.log(`  ${index + 1}. ${tag} - ${new Date(tagDate).toLocaleString()}`);
      } catch {
        console.log(`  ${index + 1}. ${tag}`);
      }
    });
    
    console.log(`
💡 To rollback to a version:
  npm run rollback <version>
  Example: npm run rollback v0.1.0
`);
  } catch (error) {
    console.log('  No git repository or tags found');
  }
}

function rollbackToVersion(version) {
  if (!version) {
    console.error('❌ Please specify a version to rollback to');
    showHelp();
    return;
  }
  
  try {
    console.log(`🔄 Rolling back to version ${version}...`);
    
    // Check if tag exists
    try {
      execSync(`git rev-parse --verify ${version}`, { stdio: 'ignore' });
    } catch {
      console.error(`❌ Version ${version} not found`);
      console.log('💡 Run "npm run rollback:list" to see available versions');
      return;
    }
    
    // Rollback to the version
    execSync(`git checkout ${version}`, { stdio: 'inherit' });
    
    console.log(`✅ Successfully rolled back to ${version}`);
    console.log(`
⚠️  IMPORTANT NOTES:
  - You are now in "detached HEAD" state
  - To continue development, create a new branch: git checkout -b hotfix-${version}
  - To return to main: git checkout main
  - To update the live version, you may need to redeploy
`);
    
  } catch (error) {
    console.error('❌ Error during rollback:', error.message);
  }
}

// Main command handling
const command = process.argv[2];

if (command === 'list' || command === ':list') {
  listVersions();
} else if (command === 'help' || command === '--help' || command === '-h') {
  showHelp();
} else if (command) {
  rollbackToVersion(command);
} else {
  showHelp();
}
