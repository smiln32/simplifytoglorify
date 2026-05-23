# Monitoring

Quick guide to monitoring the live site after deployment.

## Daily Checks

- [ ] Site loads: https://simplifytoglorify.com
- [ ] Homepage renders correctly
- [ ] Navigation menu works

## Weekly Checks

### Netlify Dashboard

1. Go to https://app.netlify.com
2. Select your site
3. Check:
   - [ ] Recent deploys all say "Published"
   - [ ] No build failures in last 7 days
   - [ ] Bandwidth usage reasonable

### Blobs Storage

1. Go to Storage → Blobs
2. Check both stores:
   - [ ] `product-pdfs` — All uploaded PDFs still there
   - [ ] `download-tokens` — Codes are being generated/redeemed

### Form Submissions

1. Check smiln32@gmail.com for:
   - [ ] Contact form submissions
   - [ ] Freebie signups
   - [ ] Any spam or errors

## Troubleshooting

### Site Returns 404

- [ ] Check Netlify deployment status (might be deploying)
- [ ] Netlify DNS configured correctly
- [ ] Browser cache clear (Ctrl+Shift+R)
- [ ] Check Netlify logs for errors

### Forms Not Sending

- [ ] Check smiln32@gmail.com spam folder
- [ ] Verify `VITE_WEB3FORMS_KEY` in Netlify environment variables
- [ ] Check Web3Forms dashboard for API issues

### Download System Not Working

- [ ] Admin page `/admin/downloads` loads?
- [ ] PIN correct?
- [ ] PDF uploaded to Blobs? (`netlify blobs:set product-pdfs ...`)
- [ ] Check Netlify Functions logs

### Old Version Still Showing

- [ ] Hard refresh browser (Ctrl+Shift+R)
- [ ] Clear browser cache
- [ ] Wait 5 minutes (CDN propagation)
- [ ] Check deployment status in Netlify

## Status Dashboard Links

Keep these bookmarked:

- **Netlify Dashboard:** https://app.netlify.com
- **Your Site:** https://simplifytoglorify.com
- **Admin Page:** https://simplifytoglorify.com/admin/downloads
- **Download Page:** https://simplifytoglorify.com/download

## Alert Signs

If you see these, investigate:

- ❌ Deployment shows "Failed"
- ❌ Site returns 404 or 500 error
- ❌ Forms stop sending emails
- ❌ Download codes not working
- ❌ Admin page won't load
- ❌ Unusual bandwidth spike

## Contact

For production issues:

1. Check Netlify dashboard first
2. Look at recent commits/deployments
3. Check logs for error messages
4. Rollback if necessary (see [deployment.md](./deployment.md))

---

→ See [deployment.md](./deployment.md) for deploying changes

→ See [admin-tasks.md](./admin-tasks.md) for daily operations
