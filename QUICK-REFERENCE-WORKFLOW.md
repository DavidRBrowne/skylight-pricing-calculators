# ⚡ Quick Reference: Two-Terminal Development Workflow

## 🖥️ Terminal Setup

### Terminal 1: Development Server (Keep Running)
```bash
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators
npm start
```

**Status:** `Compiled successfully!`  
**URL:** http://localhost:3000  
**Purpose:** Live development with instant feedback

**LEAVE THIS RUNNING!** ← Most important rule

---

### Terminal 2: Git & Commands
```bash
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators

# Your git commands, version bumping, etc.
```

**Purpose:** Version control, deployment, maintenance

---

## 🔄 Development Cycle

```
┌─────────────────────────────────────────────────────┐
│ 1. EDIT CODE IN IDE/CURSOR                          │
│    src/AppDuette.js                                 │
│    [Make changes] → [Save]                          │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 2. TERMINAL 1 AUTO-REBUILDS                         │
│    Compiling...                                     │
│    Compiled successfully! (5-10 seconds)            │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 3. BROWSER AUTO-REFRESHES                           │
│    http://localhost:3000                            │
│    [See changes immediately]                        │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 4. TEST CHANGES                                     │
│    ✓ Enter dimensions                               │
│    ✓ Select options                                 │
│    ✓ Verify calculations                            │
└─────────────────────────────────────────────────────┘
                      ↓
              ┌───────────────┐
              │  Is it good?  │
              └───────────────┘
                ↓           ↓
              YES          NO
                ↓           ↓
                ↓    Back to Step 1
                ↓
┌─────────────────────────────────────────────────────┐
│ 5. COMMIT (TERMINAL 2)                              │
│    git add src/AppDuette.js                         │
│    git commit -m "feat: add Duette pricing"        │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 6. PUSH TO GITHUB (TERMINAL 2)                      │
│    git push origin main                             │
└─────────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│ 7. VERCEL AUTO-DEPLOYS                              │
│    GitHub webhook → Vercel                          │
│    Build → Deploy → Live (30-60 seconds)            │
└─────────────────────────────────────────────────────┘
```

---

## 📝 Essential Commands

### Development (Terminal 1)

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `npm start` | Start dev server | At beginning of session |
| `Ctrl+C` | Stop dev server | When completely done |
| *Watch output* | Check for errors | Continuously |

### Git Workflow (Terminal 2)

| Command | Purpose | Example |
|---------|---------|---------|
| `git status` | Check changes | See what's modified |
| `git diff` | View changes | Review code changes |
| `git add <file>` | Stage changes | `git add src/AppDuette.js` |
| `git commit -m "msg"` | Commit | `git commit -m "feat: add pricing"` |
| `git push origin main` | Push to GitHub | Deploy to production |

### Version Management (Terminal 2)

| Command | Version Change | Example |
|---------|----------------|---------|
| `npm run version:bump` | 1.2.7 → 1.2.8 | Bug fixes |
| `npm run version:minor` | 1.2.7 → 1.3.0 | New features |
| `npm run version:major` | 1.2.7 → 2.0.0 | Breaking changes |

### Deployment (Terminal 2)

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `git push origin main` | Auto-deploy | Preferred method |
| `npm run deploy` | Manual deploy | If auto-deploy fails |
| `npm run build` | Test build | Before pushing |

---

## 🚨 Troubleshooting

### Terminal 1 Shows Errors

```bash
# Clear cache
rm -rf node_modules/.cache

# Restart
Ctrl+C
npm start
```

### Port 3000 Already in Use

```bash
# Terminal 2
lsof -ti:3000 | xargs kill -9

# Then restart Terminal 1
npm start
```

### Changes Not Appearing

```bash
# Hard refresh browser
Cmd+Shift+R (Mac)
Ctrl+Shift+R (Windows)

# Or clear cache (Terminal 2)
rm -rf node_modules/.cache

# Restart Terminal 1
```

### Build Fails

```bash
# Terminal 2: Test build
npm run build

# Fix errors shown
# Then restart Terminal 1
```

---

## ⚡ Pro Tips

### 1. Never Close Terminal 1
**WHY:** You lose instant feedback  
**FIX:** Keep it running entire session

### 2. Commit Often
**WHY:** Easy to rollback if something breaks  
**RULE:** Commit after each working feature

### 3. Test Before Pushing
**WHY:** Catch errors locally, not in production  
**HOW:** Use localhost:3000 thoroughly

### 4. Watch Terminal 1 Output
**WHY:** Shows errors immediately  
**WHAT:** Look for red error messages

### 5. Small Changes
**WHY:** Easy to debug, instant feedback  
**HOW:** Change one thing, test, commit

### 6. Use git diff
**WHY:** Review before committing  
**WHEN:** Before every `git add`

---

## 📊 Typical Session

### Starting Work

```bash
# Terminal 1
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators
npm start
# Leave running

# Terminal 2 (new tab/window)
cd /Users/davidbrowne/Dev.noindex/ssc/skylight-pricing-calculators
git status
git pull origin main  # Get latest changes

# Open browser
http://localhost:3000
```

### During Development

```bash
# Edit files in IDE/Cursor
# Watch Terminal 1 for "Compiled successfully!"
# Check localhost:3000
# Repeat

# When feature works:
# Terminal 2
git add src/AppDuette.js
git commit -m "feat: add motorisation options"

# Continue developing...
```

### Ending Session

```bash
# Commit any remaining work
# Terminal 2
git add .
git commit -m "wip: work in progress"
git push origin main

# Terminal 1
Ctrl+C  # Stop dev server

# Close terminals
```

---

## 🎯 Common Workflows

### Adding New Pricing Data

```bash
# 1. Edit src/AppDuette.js (add pricing table)
# 2. Save
# 3. Terminal 1: Watch "Compiled successfully!"
# 4. Browser: Test pricing calculations
# 5. If correct:
#    Terminal 2:
git add src/AppDuette.js
git commit -m "feat: add Q4 2025 pricing"
git push origin main
```

### Changing Colours

```bash
# 1. Edit src/brand-config.js
# 2. Save
# 3. Terminal 1: Auto-rebuild
# 4. Browser: See colour change instantly
# 5. If satisfied:
#    Terminal 2:
git add src/brand-config.js
git commit -m "style: update brand colours"
git push origin main
```

### Fixing Calculation Bug

```bash
# 1. Edit src/AppDuette.js (fix calculation)
# 2. Save
# 3. Terminal 1: Auto-rebuild
# 4. Browser: Test calculation
# 5. If fixed:
#    Terminal 2:
git add src/AppDuette.js
git commit -m "fix: correct margin calculation"
npm run version:bump  # Bump to 1.2.8
git push origin main
```

### Adding New Feature

```bash
# 1. Edit src/AppDuette.js (add feature)
# 2. Save and test (repeat until working)
# 3. Terminal 2:
git add src/AppDuette.js
git commit -m "feat: add PDF export"
npm run version:minor  # Bump to 1.3.0
git push origin main
# Vercel auto-deploys
```

---

## 📋 Pre-Push Checklist

Before `git push origin main`:

- [ ] Terminal 1 shows `Compiled successfully!`
- [ ] No red errors in Terminal 1
- [ ] Browser console has no errors (F12 → Console)
- [ ] Tested on localhost:3000
- [ ] All calculations correct
- [ ] All UI elements working
- [ ] No console warnings (ideally)
- [ ] Committed with descriptive message
- [ ] Ready for production

---

## 🎨 Key Files Reference

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `src/AppDuette.js` | Main calculator | ⭐⭐⭐⭐⭐ Often |
| `src/brand-config.js` | Brand colours/fonts | ⭐ Rarely |
| `src/index.js` | Entry point | ⭐ Once |
| `src/index.css` | Global styles | ⭐ Rarely |
| `public/index.html` | HTML template | ⭐ Once (title) |
| `package.json` | Dependencies | ⭐⭐ Sometimes |
| `vercel.json` | Deployment config | ⭐ Never |

---

## 🔍 Monitoring Terminal 1

### Good Output (✅)
```
Compiling...
Compiled successfully!

webpack compiled with 0 errors
```

### Warning Output (⚠️)
```
Compiled with warnings.

./src/AppDuette.js
  Line 125:9:  'fabricColors' is assigned but never used

Search for the keywords to learn more about each warning.
```
**Action:** Fix warning (remove unused variable)

### Error Output (❌)
```
Failed to compile.

./src/AppDuette.js
  Line 45:13:  Parsing error: Unexpected token

This error occurred during the build time.
```
**Action:** Fix syntax error at Line 45

---

## ⏱️ Timing Expectations

| Action | Expected Time |
|--------|---------------|
| npm start (first time) | 30-60 seconds |
| Code change → rebuild | 5-10 seconds |
| Browser refresh | Instant |
| git commit | Instant |
| git push | 2-5 seconds |
| Vercel deployment | 30-60 seconds |
| **Total: Code → Live** | **~1-2 minutes** |

---

## 💡 Remember

1. **Terminal 1 = Feedback** (always running)
2. **Terminal 2 = Control** (git commands)
3. **Save → Auto-rebuild → Auto-refresh** (instant feedback)
4. **Test locally first** (localhost:3000)
5. **Commit often** (small, working changes)
6. **Push to deploy** (Vercel auto-deploys)

---

## 🆘 Emergency Commands

### Something Went Wrong

```bash
# Terminal 2

# See what changed
git status
git diff

# Undo uncommitted changes
git checkout -- src/AppDuette.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Clear everything, start fresh
rm -rf node_modules/.cache
npm start
```

### Rollback Deployment

```bash
# Terminal 2
npm run rollback:list  # See versions
npm run rollback      # Rollback to previous
```

---

**Version:** 1.0  
**Created:** October 10, 2025  
**Companion to:** LUXAFLEX-DUETTE-BLUEPRINT.md, CLAUDE-LUXAFLEX-PROMPT.md

---

## 🎓 One-Minute Summary

```bash
# Terminal 1 (always running)
npm start

# Edit code, save
# Watch Terminal 1: "Compiled successfully!"
# Check localhost:3000: works?

# Terminal 2 (when ready)
git add .
git commit -m "feat: description"
git push origin main

# Vercel auto-deploys in 30-60 seconds
# Done! 🎉
```

**That's it!** Master this cycle and you can develop with lightning speed. 🚀


