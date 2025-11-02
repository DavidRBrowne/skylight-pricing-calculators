# Sona Sky Demo Version Guide

## Overview
Secure, time-limited demo version for external sharing (e.g., Sam Thapar at Sona).

## Live URLs
- **Production** (Internal only): https://sona-sky-pricing-calculator.vercel.app
- **Demo** (External sharing): https://sona-demo-calculator.vercel.app

## Demo Credentials
- **Password**: SonaDemo2025
- **Expiry**: November 9, 2025 (can be updated in `src/demo-config.js`)

## Security Features
1. **Password Protection**: Required on first access
2. **Terms & Conditions**: Must accept before use
3. **Visual Watermarks**: 
   - Header: "DEMO VERSION - Expires: [date]"
   - Footer: Red bar with expiry
4. **PDF Watermark**: "DEMO COPY - NOT FOR COMMERCIAL USE"
5. **Code Protection**: Minified with no source maps
6. **Time Limit**: Automatically expires on set date

## Architecture
- **Branch**: `demo` (separate from `main`)
- **Vercel Project**: `sona-demo-calculator`
- **Config File**: `src/demo-config.js`
- **Version File**: `public/version-check.json`

## For Monday's Demo
**Give to Sam:**
- URL: https://sona-demo-calculator.vercel.app
- Password: SonaDemo2025
- Expiry notice: November 9, 2025

**Show Sam:**
- Single blind configuration
- Duo system capabilities
- PDF quote generation
- Professional output

**DON'T share:**
- Production URL
- Code/GitHub access
- Vercel dashboard
- Internal profit margins

## Updating Demo
1. Make changes on `demo` branch
2. Commit and push: `git push origin demo`
3. Vercel auto-deploys
4. Promote to Production in Vercel dashboard

## Troubleshooting
### Version Popup Appears
- Check `public/version-check.json` matches app version
- Hard refresh browser: `Cmd + Shift + R`

### Password Not Working
- Verify `src/demo-config.js` has correct password
- Check browser didn't cache old version

### Watermarks Not Showing
- Confirm on `demo` branch: `git branch`
- Check `src/demo-config.js` has `enabled: true`

### Demo Expired
- Update `expiryDate` in `src/demo-config.js`
- Commit, push, redeploy

## Version History
- **v1.3.4-demo**: Initial demo version with all security features
- November 2, 2025: Fixed version-check.json popup issue

## Related Docs
- [Sessions Work Summary](SESSIONS-WORK-SUMMARY-NOV-2-2025.md)
- [Sona Demo Setup Guide](SONA-DEMO-SETUP-GUIDE.md)
- [README](README.md)
