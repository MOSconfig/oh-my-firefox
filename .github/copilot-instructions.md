# Copilot Instructions

## Project Overview

This is a custom Firefox theme (`oh-my-firefox`) applied via `userChrome.css` and `userContent.css`. It lives inside a Firefox profile's `chrome/` directory and is activated by setting `toolkit.legacyUserProfileCustomizations.stylesheets` to `true` in `about:config`.

There is no build system, test suite, or linter — changes are pure CSS applied directly by Firefox on restart (or via the Browser Toolbox for live preview).

## Architecture

- **`userChrome.css`** — Styles the browser chrome (tabs, toolbars, menus, context menus). Uses CSS custom properties defined on `:root` as the theme's color tokens.
- **`userContent.css`** — Styles in-content pages: `view-source:` syntax highlighting, DevTools theming (`chrome://devtools/` and `chrome://browser/content/devtools/`), and blank/new-tab backgrounds (`about:home`, `about:newtab`, `about:blank`, `about:privatebrowsing`).

## Key Conventions

### Color Palette

The theme uses **Gruvbox Dark Hard** colors. All colors should come from this palette:

| Token | Value | Role |
|---|---|---|
| `--mtheme-background-1` | `#1d2021` | Primary background (bg0_hard) |
| `--mtheme-background-2` | `#3c3836` | Secondary background / hover (bg1) |
| `--mtheme-foreground-1` | `#ebdbb2` | Primary text (fg1) |
| `--mtheme-foreground-2` | `#d5c4a1` | Secondary text (fg2) |

DevTools uses additional Gruvbox accent colors (green `#689d6a`, blue `#83a598`, red `#fb4934`, yellow `#d79921`, etc.) mapped to `--theme-highlight-*` variables.

When adding new rules, use the `--mtheme-*` custom properties from `:root` rather than hardcoding hex values. In DevTools sections, use the `--theme-*` variables.

### Font Stack

Two font families are used:

- **UI font (browser chrome):** `Rec Sans Mt.Baker`, forced globally via the
  `* { font-family: … !important }` rule at the top of `userChrome.css`.
- **Monospace font (DevTools, view-source):** `Rec Mono St.Helens`, with
  `Rec Sans Mt.Baker` as the fallback.

Keep this pairing consistent when adding new rules: chrome UI uses the UI font,
code/DevTools/view-source surfaces use the monospace stack.

> **Caveat — the global `*` rule leaks into hidden glyphs.** Because
> `* { font-size: 13px !important }` overrides *everything*, it can un-hide UI
> elements that Firefox keeps invisible with tiny/clipped text (e.g. the Windows
> caption buttons, and the hardcoded spacer `<span>a</span>` inside the
> search-mode switcher). When such an artifact appears, add a narrowly-scoped
> carve-out rather than weakening the global rule.

### Filenames

Firefox loads these stylesheets by exact, lowercase name: `userChrome.css` and
`userContent.css`. Keep them lowercase — capitalized names only work by accident
on case-insensitive filesystems (macOS/Windows) and fail silently on Linux.

### CSS Specificity

Nearly all declarations use `!important` to override Firefox's built-in styles. This is intentional and required — follow the same pattern when adding rules.

### Context Menu Cleanup

Unwanted context menu items (Send to Device, Pocket) are hidden via `display: none !important` on their element IDs. New items to hide should follow the same pattern in the existing ID list block in `UserChrome.css`.
