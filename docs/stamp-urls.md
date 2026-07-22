# VANGO Stamp URLs

Each stamp has a dedicated page with an embedded QR code. Print the page or display it beside the artwork — visitors scan the QR code to collect the stamp in their VANGO Art Passport.

Scanning a QR code opens `https://ethical-tech-colab.github.io/VANGO/?stamp=…` and redeems the stamp automatically after sign-in or guest entry.

> **Security note — the codes below are public and therefore forgeable.**
> Anyone who reads this page can redeem `DAVID01` from anywhere. The API now
> accepts **signed stamp tokens** (`?stamp=v1.CODE.NONCE.EXP.SIG`, HMAC-SHA256
> under `STAMP_SIGNING_SECRET`) and verifies them server-side. Bare codes are
> still accepted only because the QR codes currently in the field encode them —
> see [Signed stamp tokens](#signed-stamp-tokens) below.

---

| Code | Title | Artist | Venue | Stamp Page | Deep Link |
|---|---|---|---|---|---|
| `CHROMA14` | Chromatic Drift | N. Osei | Biennale — Gallery Sigma | [stamps/CHROMA14.html](https://ethical-tech-colab.github.io/VANGO/stamps/CHROMA14.html) | [?stamp=CHROMA14](https://ethical-tech-colab.github.io/VANGO/?stamp=CHROMA14) |
| `FAULT02` | Fault Lines | M. Duarte | Museum of Other Worlds | [stamps/FAULT02.html](https://ethical-tech-colab.github.io/VANGO/stamps/FAULT02.html) | [?stamp=FAULT02](https://ethical-tech-colab.github.io/VANGO/?stamp=FAULT02) |
| `HOLLOW21` | Hollow Choir | R. Venn | Studio Aperture | [stamps/HOLLOW21.html](https://ethical-tech-colab.github.io/VANGO/stamps/HOLLOW21.html) | [?stamp=HOLLOW21](https://ethical-tech-colab.github.io/VANGO/?stamp=HOLLOW21) |
| `ECHO07` | Echo Garden | T. Lindqvist | Nomad Pavilion | [stamps/ECHO07.html](https://ethical-tech-colab.github.io/VANGO/stamps/ECHO07.html) | [?stamp=ECHO07](https://ethical-tech-colab.github.io/VANGO/?stamp=ECHO07) |
| `VOID99` | Voidwalk | K. Amaro | Lattice Museum | [stamps/VOID99.html](https://ethical-tech-colab.github.io/VANGO/stamps/VOID99.html) | [?stamp=VOID99](https://ethical-tech-colab.github.io/VANGO/?stamp=VOID99) |
| `BURA01` | Bura Ceramics | Niger | AABC | [stamps/BURA01.html](https://ethical-tech-colab.github.io/VANGO/stamps/BURA01.html) | [?stamp=BURA01](https://ethical-tech-colab.github.io/VANGO/?stamp=BURA01) |
| `DAVID01` | David | Michelangelo | Galleria dell'Accademia | [stamps/DAVID01.html](https://ethical-tech-colab.github.io/VANGO/stamps/DAVID01.html) | [?stamp=DAVID01](https://ethical-tech-colab.github.io/VANGO/?stamp=DAVID01) |

---

## How it works

1. **Gallery use** — open the stamp page link, print it, and place it beside the artwork. The page includes a scannable QR code and the artwork details.
2. **Direct link** — share the deep link (`?stamp=CODE`) directly with visitors. Opening it in a browser launches the VANGO app and redeems the stamp.
3. **Manual entry** — visitors can also type the stamp code (e.g. `CHROMA14`) into the manual entry tab in the app.

---

## Signed stamp tokens

A bare code is public, so it proves nothing. A **signed stamp token** is an
HMAC-SHA256 signature over `code | nonce | exp` produced with the server-side
secret `STAMP_SIGNING_SECRET`, so only the operator can mint a redeemable link:

```
v1.DAVID01.k3Bq7ZlA2Xc9.0.<base64url signature>
```

The app extracts the code from the token for display and sends the whole token
to `POST /stamps`, which verifies the signature (timing-safe), checks the
expiry, confirms the code is in the server catalog allowlist, and burns the
nonce for that user so the token cannot be replayed.

### Regenerating signed URLs / QR codes

From the `server/` directory, with `STAMP_SIGNING_SECRET` set in `.env`:

```bash
node scripts/generate-stamp-urls.js                    # all codes, no expiry
node scripts/generate-stamp-urls.js DAVID01 BURA01     # selected codes
node scripts/generate-stamp-urls.js --days 180         # tokens expire in 180 days
node scripts/generate-stamp-urls.js --format markdown  # table for this file
```

Generate a secret with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Then re-render the QR images from the printed URLs with any QR generator, e.g.
`qrencode -o DAVID01.png "<url>"`, and update `public/stamps/*.html`.

### Switching to strict mode

`ALLOW_LEGACY_STAMP_CODES` defaults to **true**, so every QR code already
printed and hanging in a gallery keeps working; each legacy redemption logs a
warning server-side. Setting it to `false` rejects bare codes — which means
**every QR code in the field must be reprinted with a signed URL first**, and
manual code entry stops working for unsigned codes.
