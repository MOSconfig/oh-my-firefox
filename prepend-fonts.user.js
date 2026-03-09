// ==UserScript==
// @name         Prepend Resource Han Rounded CN + Rec Mono St.Helens
// @namespace    github.com/d0n9x1n
// @version      1.0.0
// @description  Prepend preferred fonts to every element's font stack without replacing site fonts. Preserves icon fonts.
// @author       d0n9x1n
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  "use strict";

  const SANS_FONT = '"Resource Han Rounded CN"';
  const MONO_FONT = '"Rec Mono St.Helens"';

  const ICON_SELECTORS = [
    "svg",
    '[class*="icon"]',
    '[class*="fa-"]',
    '[class*="fa "]',
    '[class*="glyphicon"]',
    '[class*="emoji"]',
    '[class*="material-icons"]',
    '[class*="material-symbols"]',
    "[data-icon]",
    '[role="img"]',
  ];

  const MONO_TAGS = new Set(["CODE", "KBD", "SAMP", "PRE", "TT", "VAR"]);

  function isIconElement(el) {
    if (el.tagName === "SVG" || el.closest("svg")) return true;
    if (el.tagName === "I" && (!el.textContent || el.textContent.length <= 2))
      return true;
    for (const sel of ICON_SELECTORS) {
      try {
        if (el.matches(sel)) return true;
      } catch (e) {}
    }
    return false;
  }

  function isMonoContext(el) {
    if (MONO_TAGS.has(el.tagName)) return true;
    const style = el.getAttribute("style") || "";
    if (/monospace/i.test(style)) return true;
    let parent = el.parentElement;
    while (parent) {
      if (MONO_TAGS.has(parent.tagName)) return true;
      parent = parent.parentElement;
    }
    return false;
  }

  function prependFont(el) {
    if (isIconElement(el)) return;

    const computed = getComputedStyle(el);
    const currentFonts = computed.fontFamily;

    if (currentFonts.includes("Resource Han Rounded CN")) return;
    if (currentFonts.includes("Rec Mono St.Helens")) return;

    const preferred = isMonoContext(el) ? MONO_FONT : SANS_FONT;

    el.style.setProperty(
      "font-family",
      `${preferred}, ${currentFonts}`,
      "important"
    );
  }

  function processAll() {
    document.querySelectorAll("*").forEach(prependFont);
  }

  // Initial pass
  processAll();

  // Watch for dynamic content
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) {
          prependFont(node);
          node.querySelectorAll?.("*").forEach(prependFont);
        }
      }
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
