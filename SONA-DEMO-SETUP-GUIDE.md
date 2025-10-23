# 🔐 SONA Demo Setup Guide

## Overview
This guide explains how to set up a secure, time-limited demo of the SONA Sky Pricing Calculator for SONA's review.

**Demo URL:** `sona-demo.scottishshutters.co.uk`  
**Security:** Password-protected + Auto-expires  
**Duration:** 7 days from activation

---

## 🎯 Why This is Secure

1. **Password Protection** - Requires password on every new session
2. **Time-Limited** - Automatically expires after 7 days
3. **No Search Engine Indexing** - Won't appear in Google
4. **Unlisted** - Only accessible with exact URL
5. **Separate from Main Site** - Zero impact on www.scottishshutters.co.uk

---

## 📋 Setup Steps (When Ready to Deploy)

### Step 1: Contact Claude to Activate Demo Branch

Simply say: "Ready to activate the SONA demo for 7 days"

Claude will:
- Recreate the demo branch
- Set expiry date to 7 days from today
- Configure password protection
- Push to GitHub

### Step 2: Add DNS Record (One-Time Setup)

**In your DNS provider (where scottishshutters.co.uk is managed):**

Add a CNAME record:
```
Type:  CNAME
Name:  sona-demo
Value: cname.vercel-dns.com
TTL:   3600 (or default)
```

**Example for common providers:**

**Cloudflare:**
1. Log in to Cloudflare
2. Select scottishshutters.co.uk
3. Go to DNS → Add record
4. Type: CNAME, Name: sona-demo, Target: cname.vercel-dns.com
5. Save

**GoDaddy/Namecheap:**
1. Log in to domain management
2. Find DNS settings
3. Add CNAME: Host: sona-demo, Points to: cname.vercel-dns.com
4. Save

### Step 3: Configure Vercel Domain

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select `sona-sky-pricing-calculator` project
3. Go to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `sona-demo.scottishshutters.co.uk`
6. Assign to branch: `demo-for-sona`
7. Wait 1-2 minutes for DNS propagation

### Step 4: Share with SONA

**Email Template:**

```
Subject: SONA Sky Pricing Calculator - Secure Demo Access

Hi [SONA Contact],

We've prepared a private demonstration of the SONA Sky Pricing Calculator 
for your review. This is a secure, time-limited demo.

🔗 Demo URL: https://sona-demo.scottishshutters.co.uk
🔑 Password: SonaSky2024
⏰ Access Until: [7 days from today]

IMPORTANT: This contains confidential pricing information. 
Please do not share this URL or password outside your team.

The demo includes:
• Single and Duo blind configurations
• Complete pricing calculations
• Optional side trims with detailed specifications
• All fabric types and hardware options
• Real-time quote generation

After the access period, the demo will automatically expire.

Please feel free to explore all features and let us know if you have 
any questions or feedback.

Best regards,
The Scottish Shutter Company
www.scottishshutters.co.uk
```

---

## 🔑 Demo Access Details

**Default Settings (can be customized):**
- Password: `SonaSky2024`
- Duration: 7 days
- Expiry: Automatic

**To customize:**
- Different password: Update in `src/DemoAccessControl.js`
- Different duration: Update expiry date in same file
- Extend access: Update expiry date and push update

---

## 🗑️ Cleanup After Demo (Two Options)

### Option 1: Let it Auto-Expire
- Demo automatically shows "Access Expired" after 7 days
- URL continues to exist but shows expiry message
- Zero action required
- Can be reactivated by updating expiry date

### Option 2: Complete Removal
```bash
# Delete the branch
git branch -D demo-for-sona
git push origin --delete demo-for-sona

# Remove domain from Vercel
# (Via dashboard: Settings → Domains → Remove)
```

---

## 🔄 Extending Access

If SONA needs more time:

1. Tell Claude: "Extend SONA demo by 7 days"
2. Claude will update the expiry date
3. Automatic deployment to Vercel
4. SONA can continue using same URL

No need to share new credentials or URL!

---

## ❓ FAQ

**Q: Can people find this demo accidentally?**  
A: No. It requires password, won't be indexed by search engines, and is only accessible via direct URL.

**Q: Will this affect our main website?**  
A: No. It's a completely separate deployment using a subdomain. www.scottishshutters.co.uk is unaffected.

**Q: What happens after expiry?**  
A: The URL shows a professional "Demo Expired" message with contact information.

**Q: Can we use a different subdomain?**  
A: Yes! Options include:
   - `demo.scottishshutters.co.uk`
   - `calculator-demo.scottishshutters.co.uk`
   - `pricing-demo.scottishshutters.co.uk`

**Q: Can multiple people use it simultaneously?**  
A: Yes! Each person enters the password once per session.

**Q: What if we want to show multiple companies?**  
A: Create separate branches with different passwords:
   - `sona-demo.scottishshutters.co.uk` → SonaSky2024
   - `client2-demo.scottishshutters.co.uk` → Different password

---

## 🎯 Quick Checklist

**Before Sharing:**
- [ ] Demo branch activated by Claude
- [ ] DNS CNAME record added
- [ ] Domain configured in Vercel
- [ ] Demo URL tested (loads password screen)
- [ ] Password tested (grants access)
- [ ] Expiry date confirmed (correct number of days)
- [ ] Email prepared with credentials

**After Demo Period:**
- [ ] Decide: Auto-expire or delete completely
- [ ] If extending: Tell Claude to update expiry
- [ ] If removing: Delete branch and domain

---

## 📞 Support

For any issues or questions:
1. Contact Claude with "Help with SONA demo setup"
2. Claude can troubleshoot and make adjustments
3. All changes can be made without recreating the demo

---

**Last Updated:** October 23, 2025  
**Version:** 1.0  
**Project:** SONA Sky Pricing Calculator

