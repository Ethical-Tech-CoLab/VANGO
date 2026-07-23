# VANGO — Art Passport

**[Live site](https://ethical-tech-colab.github.io/VANGO/)** ·
**[Research report](VANGO-Paper.md)** (plain-language, non-technical)

A mobile-style digital passport for collecting stamps at art experiences. Each artwork has a unique code; scanning or entering the code earns a stamp that is saved to your passport.

---

## Features

### Passport & Stamps
- **Collect stamps** by scanning a QR code or manually entering an artwork code at any participating installation.
- Each stamp displays a custom vintage-style illustration of the artwork, the artist name, venue, and the date it was collected.
- Stamps are stored locally in the browser and persist between sessions.

### Bio Page
- Displays the passport holder's name, profile picture, member-since date, total stamps collected, and passport number.
- Includes the Ars Pro Mundo emblem.

### Settings
- **Name** — set your passport holder name.
- **Profile picture** — upload a photo from your device.
- **Theme** — toggle between dark and light mode.
- **Language** — switch the full app interface between English, French, and Italian.

### Multilingual Support
All UI text is available in:
- 🇬🇧 English
- 🇫🇷 French
- 🇮🇹 Italian

---

## Stamp Codes

Enter any of the codes below in the app (tap the **+** button → *Enter code*). Codes are case-insensitive and hyphens/spaces are ignored.

| Code | Artwork | Artist | Venue |
|---|---|---|---|
| `CHROMA14` | Chromatic Drift | N. Osei | Biennale — Gallery Sigma |
| `FAULT02` | Fault Lines | M. Duarte | Museum of Other Worlds |
| `HOLLOW21` | Hollow Choir | R. Venn | Studio Aperture |
| `ECHO07` | Echo Garden | T. Lindqvist | Nomad Pavilion |
| `VOID99` | Voidwalk | K. Amaro | Lattice Museum |
| `BURA01` | Bura Ceramics | Niger | Unspecified holder (illustrative) |
| `DAVID01` | David | Michelangelo | Galleria dell'Accademia |

---

## Adding New Stamp Codes

Open `src/App.jsx` and find the `CATALOG` object (search for `const CATALOG`). Add a new entry:

```js
const CATALOG = {
  // existing entries...
  MYCODE01: { title: "Artwork Title", artist: "Artist Name", venue: "Gallery Name" },
};
```

The key becomes the stamp code (uppercase, no spaces or hyphens). Users can type it in any format — the app normalises it automatically.

To generate a matching QR code for physical signage, encode the raw key string (e.g. `MYCODE01`) in any QR code generator.

---

## Running Locally

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

---

## Tech Stack

- [React](https://react.dev) — UI
- [Vite](https://vitejs.dev) — build tool & dev server
- [lucide-react](https://lucide.dev) — icons
- Google Fonts — Fraunces, Space Mono, Inter, Nothing You Could Do, Caveat

---

## Peer Review

The full independent academic peer review of this report is in [PEER-REVIEW.md](PEER-REVIEW.md) (also available as [Word](peer-review/vango-Peer-Review.docx) under [`peer-review/`](peer-review/)).

**Recommendation:** Major revisions

**What the review found:**

- The conclusion that the idea "works" (S13.1) exceeds the evidence, since S1.7/S10.5 admit it was never tested with users. — **Fixed.**
- The "gap" reads as manufactured: only the NPS passport is cited, with no engagement of gamification, museum-engagement, or proof-of-attendance literature (S2.2-2.3).
- An unresolved ethical thread: a Red List looted-class object is seeded into demo data and then disclaimed as "not a criticism" (S5.11/S9.1/S9.5). — **Fixed.**

**Noted strength:** An unusually candid limitations section (S10) and a precise, well-argued deterministic-seed design rationale (S5.5, S13.2).


### Revisions applied (peer review, Tier 2)

**The "it works" conclusion is withdrawn** (S13.1). VANGO has never been placed in a real exhibition or tested with a single museum visitor, so the prototype cannot answer whether the idea works — and the premise that an attendance record is "a form of value in itself" (S12.3) is asserted, not evidenced. S13.1 now claims only what is supported: feasibility. The mechanism is explainable in one sentence, a venue's cost is a sheet of paper, and guest mode runs without collecting personal information. Whether visitors would *want* it is stated as untested and named as the next piece of work.

**The Bura Ceramics entry is kept, but made deliberate and honest** (S9.1, S9.5). It is retained because removing it would let readers believe provenance simply does not arise for an attendance record; a catalogue of only invented works could not make the boundary in S9.4 concrete. Two changes:

- The venue **"AABC"** — an unexplained initialism that read as a real institution while attaching an at-risk object to an unidentifiable holder — is now **"Unspecified holder (illustrative)"** across the app, the printable stamp, and both catalogue tables. S9.1 states plainly that the entry is illustrative and that no real object, holder, or exhibition is referred to.
- **"This is not a criticism of the design" is dropped** from S9.5. It deflected a criticism that lands: a document styled as a passport implies an officialdom the record does not support, and issuing one beside an object of contested origin lends it the appearance of a settled institutional context. The design does not cause that, but it does not avoid it, and the section now says so.

Note: the three pre-seeded guest stamps (CHROMA14, FAULT02, HOLLOW21) are all fictional — Bura is catalogue-only and reachable by entering its code, not shown automatically.
