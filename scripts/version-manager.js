#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const packageJsonPath = path.join(__dirname, '..', 'package.json');
const versionInfoPath = path.join(__dirname, '..', 'src', 'version-info.json');

function showHelp() {
  console.log(`
🔄 Version Manager for Skylight Pricing Calculators

Usage:
  npm run version:bump        - Bump patch version (0.1.0 -> 0.1.1)
  npm run version:minor       - Bump minor version (0.1.0 -> 0.2.0)  
  npm run version:major       - Bump major version (0.1.0 -> 1.0.0)
  npm run version:info        - Show current version info
  npm run version:history     - Show recent version history

Examples:
  npm run version:bump        # For bug fixes, small changes
  npm run version:minor       # For new features
  npm run version:major       # For breaking changes
`);
}

function showCurrentVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const versionInfo = fs.existsSync(versionInfoPath) 
      ? JSON.parse(fs.readFileSync(versionInfoPath, 'utf8'))
      : null;
    
    console.log(`
📋 Current Version Information:
  Version: ${packageJson.version}
  ${versionInfo ? `Last Updated: ${new Date(versionInfo.timestamp).toLocaleString()}` : ''}
  ${versionInfo ? `Git Commit: ${versionInfo.gitCommit}` : ''}
  ${versionInfo ? `Git Branch: ${versionInfo.gitBranch}` : ''}
`);
  } catch (error) {
    console.error('❌ Error reading version info:', error.message);
  }
}

function showVersionHistory() {
  try {
    console.log(`
📚 Recent Version History (Git Tags):
`);
    
    // Get git tags (versions)
    const tags = execSync('git tag --sort=-version:refname', { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(tag => tag)
      .slice(0, 10); // Show last 10 versions
    
    if (tags.length === 0) {
      console.log('  No version tags found. Run "git tag v0.1.0" to create your first tag.');
    } else {
      tags.forEach((tag, index) => {
        try {
          const tagDate = execSync(`git log -1 --format=%ai ${tag}`, { encoding: 'utf8' }).trim();
          console.log(`  ${index + 1}. ${tag} - ${new Date(tagDate).toLocaleString()}`);
        } catch {
          console.log(`  ${index + 1}. ${tag}`);
        }
      });
    }
    
    console.log(`
💡 To rollback to a previous version:
  git checkout <version-tag>
  Example: git checkout v0.1.0
`);
  } catch (error) {
    console.log('  No git repository or tags found');
  }
}

// Main command handling
const command = process.argv[2];

switch (command) {
  case 'info':
    showCurrentVersion();
    break;
  case 'history':
    showVersionHistory();
    break;
  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;
  default:
    showCurrentVersion();
    showHelp();
    break;
}
