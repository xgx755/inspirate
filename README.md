# Inspirate

**A Digital Zen Garden for your New Tab.**

Inspirate is a minimalist Google Chrome extension that replaces your New Tab page with a single, beautifully rendered quote. No ads, no widgets, no clutter — just a moment of calm every time you open a tab.

---

## Features

- **Instant rendering** — quotes load from a local file, so the page appears as fast as Chrome's default New Tab
- **Shuffle-logic** — tracks your last 10 quotes to prevent repeats
- **Dark mode** — automatically adapts to your system's light/dark preference with no flash
- **Responsive typography** — scales gracefully from 13" laptops to ultrawide monitors
- **Fully offline** — zero network requests, zero tracking, zero telemetry
- **Easy to customize** — swap in your own quotes by editing a single JSON file

---

## Installation

1. **Download or clone** this repository to your computer
2. Open **Google Chrome** and navigate to `chrome://extensions`
3. Enable **Developer mode** using the toggle in the top-right corner
4. Click **Load unpacked**
5. Select the `inspirate` folder
6. Open a **new tab** — Inspirate is now active ✨

> To return to Chrome's default New Tab at any time, disable or remove the extension from `chrome://extensions`.

---

## Project Structure

```
inspirate/
├── manifest.json       # Chrome extension configuration (Manifest V3)
├── index.html          # Minimal HTML shell
├── styles.css          # Layout, typography, and dark mode
├── app.js              # Quote selection logic and DOM rendering
├── data/
│   └── quotes.json     # The quote dataset (edit this!)
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## Customizing Your Quotes

The quote dataset lives in **`data/quotes.json`**. You can replace it entirely with your own collection — no code changes required.

### Schema

The file must be a valid JSON array of objects. Each object supports two fields:

| Field    | Type   | Required | Description                                    |
|----------|--------|----------|------------------------------------------------|
| `text`   | string | **Yes**  | The quote text                                 |
| `author` | string | No       | The person to attribute the quote to           |

If `author` is omitted or empty, the extension will display **"— Anonymous"** automatically.

### Step-by-Step

1. Open `data/quotes.json` in any text editor

2. Replace the contents with your own quotes, following this format:

   ```json
   [
     { "text": "Your first quote here.", "author": "Author Name" },
     { "text": "A quote without a known author." },
     { "text": "Another quote.", "author": "Someone Else" }
   ]
   ```

3. Save the file

4. Go to `chrome://extensions` and click the **reload** button (↻) on the Inspirate card

5. Open a new tab to see your updated quotes

### Tips

- **Valid JSON is critical.** If the file has a syntax error, Inspirate will fall back to a single default quote. Use [jsonlint.com](https://jsonlint.com) to validate if you're unsure.
- **Minimum 1 quote.** The array must contain at least one object with a `text` field.
- **No maximum.** The dataset can hold as many quotes as you'd like. The shuffle buffer ensures variety regardless of size.
- **Special characters** like curly quotes, em dashes, and accented letters are fully supported — just make sure the file is saved as **UTF-8**.

---

## How It Works

1. When you open a new tab, Chrome loads `index.html` instead of its default page
2. `app.js` fetches `data/quotes.json` (a local file — no network involved)
3. The shuffle-logic algorithm checks your last 10 viewed quotes (stored in `chrome.storage.local`) and picks one you haven't seen recently
4. The quote and author are injected into the DOM, and a CSS fade-in animation reveals them
5. The background color and text adapt instantly to your system's light or dark mode

---

## Privacy

Inspirate makes **zero network requests**. Your data never leaves your machine.

- No analytics or telemetry
- No external fonts, scripts, or images
- Content Security Policy enforces `script-src 'self'; object-src 'none'`

---

## Technical Details

| Detail               | Value                                               |
|----------------------|-----------------------------------------------------|
| Manifest version     | 3                                                   |
| Permissions          | `storage` (for shuffle history only)                |
| External requests    | None — blocked by CSP                               |
| Font loading         | None — system font stack only                       |
| Dark mode            | `@media (prefers-color-scheme: dark)` + inline CSS  |
| Responsive sizing    | `clamp()` on all typography                         |
| Repeat prevention    | Last-10 index buffer in `chrome.storage.local`      |

---

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it.
