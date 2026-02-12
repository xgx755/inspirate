# Contributing to Inspirate

Thank you for your interest in contributing to Inspirate! This project values simplicity, performance, and privacy above all else.

## Ways to Contribute

### 🗣️ Add Quotes

The easiest way to contribute is by expanding the quote dataset:

1. Fork this repository
2. Open `data/quotes.json`
3. Add your quotes following the existing schema:
   ```json
   { "text": "Your quote here.", "author": "Author Name" }
   ```
4. Validate that `quotes.json` is still valid JSON (use [jsonlint.com](https://jsonlint.com))
5. Submit a Pull Request with a brief description of the quotes you added

**Guidelines for quotes:**
- Favor timeless wisdom over trending catchphrases
- Attribute accurately — verify the source before submitting
- Omit the `author` field only if the origin is genuinely unknown

### 🐛 Report Bugs

If something isn't working as expected, please [open an issue](https://github.com/xgx755/inspirate/issues) with:
- A clear description of the problem
- Steps to reproduce it
- Your Chrome version and OS

### 💡 Suggest Features

Feature ideas are welcome! Please open an issue tagged with **enhancement** and describe:
- What the feature would do
- Why it would benefit users
- How it aligns with the project's minimalist philosophy

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/xgx755/inspirate.git
   ```
2. Open `chrome://extensions` in Chrome
3. Enable **Developer mode**
4. Click **Load unpacked** and select the project folder
5. Open a new tab to see Inspirate in action

There is no build step — the extension runs directly from source.

## Core Principles

When contributing code, please keep these principles in mind:

| Principle | What It Means |
|---|---|
| **Zero Latency** | No external network requests. No CDN fonts. No API calls. |
| **Zero Tracking** | No analytics, telemetry, or data collection of any kind. |
| **Simplicity** | Vanilla JS only. No frameworks, no build tools, no dependencies. |
| **Accessibility** | Respect system preferences (dark mode, reduced motion). |

## Code Style

- Modern JavaScript (ES6+)
- Vanilla CSS — no preprocessors
- Descriptive variable names over comments
- Keep functions small and focused

## License

By contributing, you agree that your contributions will be licensed under the [MIT License](LICENSE).
