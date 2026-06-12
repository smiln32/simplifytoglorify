# Environment Variables Reference

Complete list of all environment variables, their purpose, and where they're used.

## All Variables

### VITE_WEB3FORMS_KEY

| Property | Value |
| -------- | ------- |
| **Purpose** | Web3Forms API key for email delivery |
| **Type** | String (API key) |
| **Public/Private** | Public (prefixed with VITE_) |
| **Where Used** | Frontend environment |
| **Used By** | Contact form, freebie signup |
| **File Locations** | `src/components/sections/ContactSection.tsx`, `src/components/sections/FreeResourceSection.tsx` |
| **Local (.env.local)** | Required for local testing |
| **Netlify** | Settings → Environment variables |
| **What Happens If Missing** | Forms appear but don't send emails; error in browser console |

### ADMIN_PIN

| Property | Value |
| -------- | ------- |
| **Purpose** | PIN to protect admin code generation page |
| **Type** | String (long random value — see Security Notes) |
| **Public/Private** | Private (NOT prefixed with VITE_) |
| **Where Used** | Backend (Netlify Functions) |
| **Used By** | `netlify/functions/generate-token.mts` |
| **Local (.env.local)** | Set for local testing (use the same long random value as Netlify) |
| **Netlify** | Settings → Environment variables (private) |
| **What Happens If Missing** | Admin page loads but PIN check fails; cannot generate codes |

## Local Setup (.env.local)

Create file in project root with:

```ini
VITE_WEB3FORMS_KEY=your_web3forms_key_here
ADMIN_PIN=a-long-random-string-here
```

**Note:** `.env.local` is in `.gitignore` and should NOT be committed.

## Netlify Setup

### Where to Set Variables

1. Go to <https://app.netlify.com>
2. Select your site
3. Settings → Environment variables
4. Click "Add a variable"
5. Enter key and value
6. Re-deploy for changes to take effect

### Checking Current Values

1. Go to Netlify dashboard
2. Settings → Environment variables
3. Values shown (masked for security)

## Testing Locally

### With Variables Set

```powershell
# Start dev server
npm run dev

# Forms should work
# Admin page should accept PIN
# Functions should work
```

### Without Variables

- Forms won't send (check browser console)
- Admin page won't authenticate (PIN check fails)
- No error page shown; check console

## Adding New Variables

If you add a new variable:

1. Document it here
2. Add to `.env.local` for local testing
3. Add to Netlify environment settings
4. Update this reference file

## Security Notes

- **Never commit `.env.local`** — It's in `.gitignore` for a reason
- **ADMIN_PIN** must be a long, random string (16+ characters) — it is the only credential protecting the admin code-generation endpoint. Do not use a short numeric PIN. Generate one with: `node -e "console.log(require('crypto').randomBytes(18).toString('base64url'))"`
- **VITE_WEB3FORMS_KEY** is public (visible in frontend code) but tied to your Web3Forms account
- **Netlify env variables** are masked in UI but visible in deployed code (marked with VITE_)

## Troubleshooting

| Problem | Likely Cause | Fix |
| ------- | ------------ | --- |
| "Form won't send" | Missing/wrong VITE_WEB3FORMS_KEY | Check .env.local and Netlify settings |
| "Admin PIN rejected" | Missing/wrong ADMIN_PIN | Check .env.local and Netlify settings |
| "Forms work locally but not on live site" | Live site missing env var | Add to Netlify environment settings |
| "Changed env var but site still old" | Old deploy cached | Re-deploy or wait for new deploy |

---

→ For help setting up Web3Forms, see [../business/etsy-workflow.md](../business/etsy-workflow.md)

→ For local development, see [../tech/development.md](../tech/development.md)
