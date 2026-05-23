# Operations — Admin Tasks & Deployment

This section covers day-to-day operations: generating codes, uploading PDFs, testing, and deploying changes.

## Files in Reading Order

1. **[admin-tasks.md](./admin-tasks.md)** — Daily admin procedures. Read when doing admin work.
   - Generate download codes for Etsy
   - Upload PDFs to Netlify Blobs
   - Test forms locally

2. **[deployment.md](./deployment.md)** — Deploying code changes. Read before pushing.
   - Pre-deploy checklist
   - Monitoring deployment
   - Rollback if needed

3. **[monitoring.md](./monitoring.md)** — Monitoring the live site (optional).
   - Check download system
   - Monitor form submissions
   - Check deployment status

## Common Tasks

| Task | File |
|------|------|
| "I need to generate codes for an Etsy sale" | admin-tasks.md |
| "I need to upload a new PDF" | admin-tasks.md |
| "How do I test the download system locally?" | admin-tasks.md |
| "How do I test the forms locally?" | admin-tasks.md |
| "What do I check before deploying?" | deployment.md |
| "My changes are live, what's next?" | monitoring.md |
| "Is the site working?" | monitoring.md |

## Quick Tasks

### Generate Download Codes
→ See [admin-tasks.md](./admin-tasks.md) — "Generate Download Codes" section

### Upload PDF
```powershell
netlify blobs:set product-pdfs prayer-journal-anxiety.pdf --input=./downloads/prayer-journal-anxiety.pdf
```

### Deploy Changes
```powershell
git push origin main  # Auto-deploys
```

### Test Forms Locally
1. `npm run dev` + `netlify dev`
2. Submit contact form
3. Check smiln32@gmail.com for email

## Admin Checklist

**Daily (if shipping Etsy orders):**
- [ ] Customer emails Etsy order
- [ ] Upload PDF (if new): `netlify blobs:set product-pdfs ...`
- [ ] Visit `/admin/downloads`
- [ ] Generate codes
- [ ] Copy codes to Etsy message
- [ ] Send to customer

**Weekly:**
- [ ] Check download activity in Netlify Blobs
- [ ] Scan for failed redemptions

**Before Major Changes:**
- [ ] Review [deployment.md](./deployment.md) checklist
- [ ] Test locally thoroughly
- [ ] Push to main
- [ ] Monitor deployment

## Netlify Access

- **Dashboard:** https://app.netlify.com
- **Environment variables:** Settings → Environment variables
- **Blobs:** Go to your site → Storage → Blobs
- **Functions:** Go to your site → Functions

## Navigation

- **To business context** → [../business/CONTEXT.md](../business/CONTEXT.md)
- **To tech details** → [../tech/CONTEXT.md](../tech/CONTEXT.md)
- **Back to main docs** → [../CONTEXT.md](../CONTEXT.md)
