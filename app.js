/**
 * Inspirate — App Logic
 * Fetches a quote from the local dataset, applies shuffle-logic
 * to prevent repeats, and injects it into the DOM.
 */

(async function inspirate() {
  "use strict";

  const BUFFER_KEY = "inspirate_last_seen";
  const BUFFER_SIZE = 10;

  const FALLBACK_QUOTE = {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  };

  // --- 1. Load quotes from local JSON ---
  let quotes;
  try {
    const response = await fetch("data/quotes.json");
    quotes = await response.json();
    if (!Array.isArray(quotes) || quotes.length === 0) {
      throw new Error("Empty or malformed quotes dataset.");
    }
  } catch {
    // Graceful degradation: show a hardcoded fallback
    render(FALLBACK_QUOTE);
    return;
  }

  // --- 2. Shuffle-Logic: avoid repeats within the last N quotes ---
  let buffer = [];
  try {
    const stored = await chromeStorageGet(BUFFER_KEY);
    if (Array.isArray(stored)) {
      buffer = stored;
    }
  } catch {
    // Storage unavailable — proceed with empty buffer
  }

  // Build pool of candidate indices not in the buffer
  let pool = quotes
    .map((_, i) => i)
    .filter((i) => !buffer.includes(i));

  // If pool is exhausted (very small dataset), reset buffer
  if (pool.length === 0) {
    buffer = [];
    pool = quotes.map((_, i) => i);
  }

  // Pick a random index from the pool
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  // Update buffer and persist
  buffer.push(chosen);
  if (buffer.length > BUFFER_SIZE) {
    buffer = buffer.slice(-BUFFER_SIZE);
  }

  try {
    await chromeStorageSet(BUFFER_KEY, buffer);
  } catch {
    // Non-critical — continue even if storage write fails
  }

  // --- 3. Render ---
  render(quotes[chosen]);

  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------

  function render(quote) {
    const quoteEl = document.getElementById("quote");
    const authorEl = document.getElementById("author");
    const container = document.getElementById("container");

    quoteEl.textContent = quote.text;
    authorEl.textContent = quote.author
      ? `— ${quote.author}`
      : "— Anonymous";

    // Trigger the CSS fade-in
    container.classList.remove("loading");
    container.classList.add("ready");
  }

  function chromeStorageGet(key) {
    return new Promise((resolve, reject) => {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        chrome.storage.local.get([key], (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(result[key]);
          }
        });
      } else {
        // Fallback for non-extension contexts (e.g., local file testing)
        try {
          const val = JSON.parse(localStorage.getItem(key));
          resolve(val);
        } catch {
          resolve(undefined);
        }
      }
    });
  }

  function chromeStorageSet(key, value) {
    return new Promise((resolve, reject) => {
      if (
        typeof chrome !== "undefined" &&
        chrome.storage &&
        chrome.storage.local
      ) {
        chrome.storage.local.set({ [key]: value }, () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve();
          }
        });
      } else {
        // Fallback for non-extension contexts
        try {
          localStorage.setItem(key, JSON.stringify(value));
          resolve();
        } catch {
          resolve();
        }
      }
    });
  }
})();
