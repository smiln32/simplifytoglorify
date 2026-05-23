# Admin Tasks

Step-by-step procedures for daily operations.

## Generate Download Codes

When a customer buys on Etsy, they need a download code.

### Assumptions
- PDF already uploaded to Netlify Blobs (see "Upload PDF" section below)
- You know the filename and product name
- You have the `ADMIN_PIN`

### Steps

1. **Go to admin page:**
   - Live: https://simplifytoglorify.com/admin/downloads
   - Local: http://localhost:5173/admin/downloads

2. **Enter PIN:**
   - Your `ADMIN_PIN` (check Netlify environment settings)

3. **Enter product details:**
   - **Filename:** Exact filename of PDF (e.g., `prayer-journal-anxiety.pdf`)
     - Must match what you uploaded to Blobs
     - Case-sensitive
   - **Product name:** Display name for customer (e.g., `Prayer Journal for Anxiety`)
   - **Quantity:** 1-100 codes at once

4. **Generate:** Click button

5. **Copy codes:** Codes appear in box below
   - Format: `ABC5-DEFG` (8 chars, hyphenated)
   - Copy entire list

6. **Send to customer:** Paste codes into Etsy order message
   - Include download link: simplifytoglorify.com/download
   - Example: "Here's your code: ABC5-DEFG. Visit simplifytoglorify.com/download and enter the code to download your journal."

### Common Errors

| Error | Fix |
|-------|-----|
| "Unauthorized" | PIN is wrong. Check Netlify settings. |
| "Missing required fields" | Left filename or product name blank. |
| "productFile and productName are required" | Same as above. |
| "(blank/nothing happens)" | PDF not uploaded to Blobs yet. See "Upload PDF" below. |

## Upload PDF

Before generating codes, the PDF must be uploaded to Netlify Blobs.

### When to Upload
- First time selling a new product
- Creating a new article/devotional in PDF form
- Updating an existing product

### Steps

1. **Get your PDF file** (e.g., `prayer-journal-anxiety.pdf`)

2. **Open terminal** in project directory

3. **Run command:**
   ```powershell
   netlify blobs:set product-pdfs <filename.pdf> --input=<path/to/file.pdf>
   ```

4. **Example:**
   ```powershell
   netlify blobs:set product-pdfs prayer-journal-anxiety.pdf --input=./downloads/prayer-journal-anxiety.pdf
   ```

5. **Success:** Command completes without error. Blob is now stored.

### Verify Upload

Check Netlify dashboard:
1. Go to https://app.netlify.com
2. Select your site
3. Go to Storage → Blobs
4. Look for `product-pdfs` store
5. You should see your filename listed

### Common Issues

| Issue | Solution |
|-------|----------|
| "netlify not found" | Install: `npm install -g netlify-cli` |
| "Not authenticated" | Run: `netlify login` |
| "File not found" | Check file path. Use absolute or relative path correctly. |
| "Already exists" | Uploading same filename again (overwrites previous version). |

## Test Forms Locally

Test contact form and freebie signup before major changes.

### Prerequisites
- `npm run dev` running (Terminal 1)
- `netlify dev` running (Terminal 2)
- `.env.local` with `VITE_WEB3FORMS_KEY` set

### Test Contact Form

1. **Visit:** http://localhost:5173
2. **Scroll to:** Contact section (usually near bottom)
3. **Fill out form:**
   - Name: Test Name
   - Email: test@example.com
   - Message: Test message
4. **Submit**
5. **Check email:** smiln32@gmail.com (should receive email within seconds)

### Test Freebie Signup

1. **Visit:** http://localhost:5173
2. **Scroll to:** Freebie/free resource section
3. **Fill out form:**
   - Name: Test Name
   - Email: test@example.com
4. **Submit**
5. **Check email:** smiln32@gmail.com (should receive confirmation)

### If Email Doesn't Arrive

- [ ] Check spam folder
- [ ] Verify `VITE_WEB3FORMS_KEY` in `.env.local`
- [ ] Check browser console for errors (F12 → Console tab)
- [ ] Verify Web3Forms API key is valid in Netlify settings
- [ ] Try submitting again with different email

## Test Download System Locally

Test the one-time-use code system before deploying.

### Steps

1. **Start dev servers:**
   ```powershell
   npm run dev        # Terminal 1
   netlify dev        # Terminal 2
   ```

2. **Generate test code:**
   - Visit http://localhost:8888/admin/downloads
   - Enter `ADMIN_PIN` from .env.local
   - Filename: `prayer-journal-anxiety.pdf`
   - Product name: `Test Journal`
   - Quantity: 1
   - Generate
   - Copy code (e.g., `ABC5-DEFG`)

3. **Test download:**
   - Visit http://localhost:5173/download
   - Enter code `ABC5-DEFG`
   - Submit
   - PDF should download (or attempt to, depending on browser)

4. **Test reuse rejection:**
   - Try entering the same code again
   - Should get error: "This code has already been used"

5. **Success:** System working correctly!

### Common Issues

| Issue | Solution |
|-------|----------|
| "Product file not found" | Need to upload PDF first. See "Upload PDF" section. |
| Download doesn't work | Check PDF exists in Blobs. Check filename matches exactly. |
| Code accepted twice | Bug; doesn't happen in production (Blobs prevents it). |

## Check Deployment Status

Monitor if a deploy is in progress or recently completed.

### Live Site Status

1. Go to https://app.netlify.com
2. Select your site
3. Recent builds listed
4. Click build to see logs
5. Status: Building, Deployed, Failed

### If Deploy Failed

1. Click failed build
2. Check log for error
3. Common causes:
   - TypeScript error
   - Build command failed
   - Missing environment variable
4. Fix code locally
5. Push to main again

## Monitor Blobs Usage

Check how many codes have been redeemed.

1. Go to https://app.netlify.com
2. Select your site
3. Go to Storage → Blobs
4. Select `download-tokens` store
5. Browse keys:
   - Keys with `"used": true` have been redeemed
   - Keys with `"used": false` are still available

### Example Entry

```json
{
  "ABC5-DEFG": {
    "productFile": "prayer-journal-anxiety.pdf",
    "productName": "Prayer Journal for Anxiety",
    "used": true,
    "createdAt": "2026-05-23T10:30:00Z",
    "usedAt": "2026-05-23T14:45:00Z"
  }
}
```

---

→ See [deployment.md](./deployment.md) for deployment checklist

→ See [../business/etsy-workflow.md](../business/etsy-workflow.md) for customer flow
