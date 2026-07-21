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
| `BURA01` | Bura Ceramics | Niger | AABC |
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
