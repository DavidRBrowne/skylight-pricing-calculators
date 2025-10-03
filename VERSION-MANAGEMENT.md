# 🔄 Version Management System

This project includes an automated version management system that helps track changes and enables easy rollbacks.

## 🚀 Quick Start

### Automatic Version Bumping
Every time you commit changes, the version will automatically bump:
```bash
git add .
git commit -m "Your changes"
# Version automatically bumps from 0.1.1 to 0.1.2
```

### Manual Version Bumping
You can also manually bump versions:

```bash
# Patch version (bug fixes, small changes): 0.1.1 -> 0.1.2
npm run version:bump

# Minor version (new features): 0.1.1 -> 0.2.0  
npm run version:minor

# Major version (breaking changes): 0.1.1 -> 1.0.0
npm run version:major
```

## 📋 Version Information

### Check Current Version
```bash
npm run version:info
```

### View Version History
```bash
npm run version:history
```

## 🚀 Automatic Deployment

### Deploy to Vercel
```bash
npm run deploy           # Deploy current version
npm run deploy:force     # Force deploy even if no changes
npm run deploy:status    # Check deployment status
```

### Auto-Deployment
- ✅ **Every commit** automatically deploys to Vercel
- ✅ **Version bumps** trigger immediate deployment
- ✅ **Production ready** - deploys to live site
- ✅ **Rollback ready** - can rollback both code and deployment

## 🔄 Rollback System

### List Available Versions
```bash
npm run rollback:list
```

### Rollback to Specific Version
```bash
npm run rollback v0.1.0
```

### After Rollback
When you rollback, you'll be in "detached HEAD" state:
```bash
# Create a new branch to continue development
git checkout -b hotfix-v0.1.0

# Return to main branch
git checkout main
```

## 📁 Files Created

- `scripts/bump-version.js` - Main version bumping script
- `scripts/version-manager.js` - Version information and history
- `scripts/rollback.js` - Rollback management
- `src/version-info.json` - Current version metadata
- `.git/hooks/pre-commit` - Automatic version bumping on commits

## 🏷️ Version Tags

The system automatically creates git tags for each version:
- `v0.1.0`, `v0.1.1`, `v0.1.2`, etc.
- These tags allow you to easily rollback to any previous version

## 🎯 Version Display

The current version is automatically displayed in the application header:
- **Desktop**: Shows under "Professional Skylight Solutions"
- **Mobile**: Shows with company name

## 🔧 Configuration

### Version Bump Types
- **Patch** (0.1.1 → 0.1.2): Bug fixes, small changes
- **Minor** (0.1.1 → 0.2.0): New features, non-breaking changes  
- **Major** (0.1.1 → 1.0.0): Breaking changes, major rewrites

### Automatic Behavior
- ✅ Version bumps on every commit (patch level)
- ✅ Version info saved to `src/version-info.json`
- ✅ Git tags created for rollback capability
- ✅ Version displayed in application header

## 🚨 Emergency Rollback

If something goes wrong in production:

1. **Check available versions:**
   ```bash
   npm run rollback:list
   ```

2. **Rollback to last working version:**
   ```bash
   npm run rollback v0.1.5  # or whatever version was working
   ```

3. **Deploy the rollback:**
   ```bash
   git push origin main  # Push the rollback
   npm run deploy        # Deploy rollback to Vercel
   ```

## 📝 Best Practices

1. **Always commit working versions** - The system will auto-bump
2. **Use descriptive commit messages** - They help identify what changed
3. **Tag important releases** - Create manual tags for major releases
4. **Test before committing** - Ensure the version you commit actually works
5. **Keep version history clean** - Use `npm run version:history` to review

## 🆘 Troubleshooting

### Version not bumping automatically
- Check if `.git/hooks/pre-commit` is executable: `chmod +x .git/hooks/pre-commit`

### Rollback not working
- Ensure you have git tags: `git tag --list`
- Check if the version exists: `git show v0.1.0`

### Version display not updating
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check if `src/version-info.json` was updated

## 📊 Version History Example

```
📚 Recent Version History (Git Tags):
  1. v0.1.1 - 10/3/2025, 4:29:56 PM
  2. v0.1.0 - 10/3/2025, 4:25:00 PM
```

This system ensures you can always track changes and quickly rollback if needed!
