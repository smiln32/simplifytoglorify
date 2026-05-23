# Etsy Workflow & Download System

## Customer Flow: Etsy → Website → PDF

### Step 1: Customer Buys on Etsy
Customer purchases product on Etsy (one-time transaction).

### Step 2: Etsy Delivery
Etsy auto-sends instructions PDF to customer that includes:
- Link to simplifytoglorify.com/download
- Unique download code (one-time use)

### Step 3: Customer Downloads PDF
1. Visit simplifytoglorify.com/download
2. Enter code
3. PDF auto-downloads
4. Code marked as "used" (cannot be reused)

## Admin Workflow: Generate Download Codes

This is how we create codes to give to Etsy customers.

### Prerequisites
PDF must already be uploaded to Netlify Blobs:
```powershell
netlify blobs:set product-pdfs <filename.pdf> --input=<path/to/file.pdf>
```

Example:
```powershell
netlify blobs:set product-pdfs prayer-journal-anxiety.pdf --input=./downloads/prayer-journal-anxiety.pdf
```

### Generate Codes

1. **Visit:** `/admin/downloads` (PIN-protected)
2. **Enter PIN:** Your `ADMIN_PIN` (check Netlify environment settings)
3. **Enter product details:**
   - **Filename:** Must match what you uploaded (e.g., `prayer-journal-anxiety.pdf`)
   - **Product name:** Display name (e.g., `Prayer Journal for Anxiety`)
   - **Quantity:** Up to 100 codes at once
4. **Generate:** Click to create codes
5. **Copy:** Codes appear; copy them
6. **Paste in Etsy:** Paste into Etsy order messages to customers

### Code Format
Codes are 8 characters (e.g., `ABC5-DEFG`):
- Random alphanumeric (no O, I, L for clarity)
- Hyphenated at position 4
- One-time use only

## Technical Details

### Storage
Two separate Netlify Blobs stores:

**1. product-pdfs**
- Stores actual PDF files
- Cannot be accessed directly by customers (server-side only)
- Access: Netlify Functions only

**2. download-tokens**
- Stores code metadata:
  - `productFile` — PDF filename
  - `productName` — Display name
  - `used` — Boolean (true = already redeemed)
  - `createdAt` — Timestamp
  - `usedAt` — Timestamp (if used)

### Netlify Functions

**generate-token.mts** (Admin only)
- Creates new codes
- PIN-protected with `ADMIN_PIN`
- Stores in `download-tokens`
- Returns array of codes

**redeem-token.mts** (Public)
- Validates code format
- Checks if code exists and unused
- Retrieves PDF from `product-pdfs`
- Marks code as used (prevents double-redemption)
- Returns PDF to customer

## Workflow Example

**Scenario:** Customer buys "Prayer Journal for Anxiety" on Etsy

1. **Admin prepares:**
   - Upload PDF: `netlify blobs:set product-pdfs prayer-journal-anxiety.pdf --input=./downloads/prayer-journal-anxiety.pdf`
   - Visit `/admin/downloads`
   - Enter PIN
   - Filename: `prayer-journal-anxiety.pdf`
   - Product name: `Prayer Journal for Anxiety`
   - Quantity: 1
   - Copy code: `ABC5-DEFG`

2. **Admin sends to customer:** Paste code in Etsy message + download link

3. **Customer redeems:**
   - Go to simplifytoglorify.com/download
   - Enter: `ABC5-DEFG`
   - PDF downloads: `Prayer Journal for Anxiety.pdf`
   - Code marked used in Netlify Blobs

4. **If customer tries again:** Error message "This code has already been used"

## Monitoring

Check redemption activity via Netlify Blobs dashboard:
- View `download-tokens` store
- See which codes are used/unused
- See timestamps of redemptions

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid code" | Code not in system (hasn't been generated yet) |
| "Code already used" | Customer already redeemed it; cannot reuse |
| "Product file not found" | PDF not uploaded to blobs; run upload command first |
| Admin PIN not working | Check Netlify env settings; make sure PIN is set |
| `/admin/downloads` not loading | Netlify Functions might be down; check deployment status |

## Next Steps

- See [operations/admin-tasks.md](../operations/admin-tasks.md) for step-by-step instructions
- See [operations/deployment.md](../operations/deployment.md) for deploying changes to this system
