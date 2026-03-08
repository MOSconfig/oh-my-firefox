# Copilot Instructions

## Project Overview

This is a custom Firefox theme (`oh-my-firefox`) applied via `userChrome.css` and `userContent.css`. It lives inside a Firefox profile's `chrome/` directory and is activated by setting `toolkit.legacyUserProfileCustomizations.stylesheets` to `true` in `about:config`.

There is no build system, test suite, or linter — changes are pure CSS applied directly by Firefox on restart (or via the Browser Toolbox for live preview).

## Architecture

- **`UserChrome.css`** — Styles the browser chrome (tabs, toolbars, menus, context menus). Uses CSS custom properties defined on `:root` as the theme's color tokens.
- **`UserContent.css`** — Styles in-content pages: `view-source:` syntax highlighting, DevTools theming (`chrome://browser/content/devtools/**`), and blank/new-tab backgrounds (`about:home`, `about:newtab`, `about:blank`, `about:privatebrowsing`).

## Key Conventions

### Color Palette

The theme uses **Gruvbox Dark** colors. All colors should come from this palette:

| Token | Value | Role |
|---|---|---|
| `--mtheme-background-1` | `#282828` | Primary background |
| `--mtheme-background-2` | `#3c3c3c` | Secondary background / hover |
| `--mtheme-foreground-1` | `#ebdbb2` | Primary text |
| `--mtheme-foreground-2` | `#ebdbb2` | Secondary text |

DevTools uses additional Gruvbox accent colors (green `#689d6a`, blue `#83a598`, red `#fb4934`, yellow `#d79921`, etc.) mapped to `--theme-highlight-*` variables.

When adding new rules, use the `--mtheme-*` custom properties from `:root` rather than hardcoding hex values. In DevTools sections, use the `--theme-*` variables.

### Font Stack

The preferred font is **Rec Mono Baker** (monospace), with fallbacks: `Rec Mono Firefox` → `Ubuntu` → `Fira Code` → `Cascadia Code` → `Microsoft YaHei UI`. Keep this font stack consistent when adding new rules.

### CSS Specificity

Nearly all declarations use `!important` to override Firefox's built-in styles. This is intentional and required — follow the same pattern when adding rules.

### Context Menu Cleanup

Unwanted context menu items (Send to Device, Pocket) are hidden via `display: none !important` on their element IDs. New items to hide should follow the same pattern in the existing ID list block in `UserChrome.css`.
