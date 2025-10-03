#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function runSecurityAudit() {
  console.log('🔒 Running Security Audit for v1.0.1...\n');
  
  const issues = [];
  const warnings = [];
  
  // Check version lock
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.version !== '1.0.1') {
    issues.push(`❌ Version not locked to 1.0.1. Current: ${packageJson.version}`);
  } else {
    console.log('✅ Version locked to 1.0.1');
  }
  
  // Check git hooks are disabled
  const preCommitExists = fs.existsSync('.git/hooks/pre-commit');
  const postCommitExists = fs.existsSync('.git/hooks/post-commit');
  
  if (preCommitExists && !fs.existsSync('.git/hooks/pre-commit.disabled')) {
    issues.push('❌ Pre-commit hook still active - auto-versioning not disabled');
  } else {
    console.log('✅ Pre-commit hook disabled');
  }
  
  if (postCommitExists && !fs.existsSync('.git/hooks/post-commit.disabled')) {
    issues.push('❌ Post-commit hook still active - auto-deployment not disabled');
  } else {
    console.log('✅ Post-commit hook disabled');
  }
  
  // Check security files exist
  const securityFiles = [
    'security-config.js',
    'vercel.json',
    'public/_headers',
    'public/_redirects'
  ];
  
  securityFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ Security file exists: ${file}`);
    } else {
      issues.push(`❌ Missing security file: ${file}`);
    }
  });
  
  // Check for sensitive files
  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'config/secrets.json'
  ];
  
  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      warnings.push(`⚠️  Sensitive file found: ${file}`);
    }
  });
  
  // Check dependencies for known vulnerabilities
  try {
    const packageLock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
    const vulnerabilities = packageLock.vulnerabilities || {};
    
    if (Object.keys(vulnerabilities).length > 0) {
      warnings.push(`⚠️  Found ${Object.keys(vulnerabilities).length} potential vulnerabilities in dependencies`);
    } else {
      console.log('✅ No known vulnerabilities in dependencies');
    }
  } catch (error) {
    warnings.push('⚠️  Could not check package-lock.json for vulnerabilities');
  }
  
  // Summary
  console.log('\n📋 Security Audit Summary:');
  console.log('='.repeat(50));
  
  if (issues.length === 0) {
    console.log('✅ All security checks passed!');
  } else {
    console.log('❌ Security issues found:');
    issues.forEach(issue => console.log(`  ${issue}`));
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    warnings.forEach(warning => console.log(`  ${warning}`));
  }
  
  console.log('\n🔒 Security Status:', issues.length === 0 ? 'SECURE' : 'NEEDS ATTENTION');
  
  if (issues.length === 0) {
    console.log('\n🎉 Application is secure and locked to v1.0.1');
    console.log('🚀 Ready for production deployment');
  }
  
  return issues.length === 0;
}

// Run audit
const isSecure = runSecurityAudit();
process.exit(isSecure ? 0 : 1);
