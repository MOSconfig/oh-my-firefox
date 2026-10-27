# Copilot Instructions

## Project Overview

This is a custom Firefox theme (`oh-my-firefox`) applied via `userChrome.css` and `userContent.css`. It lives inside a Firefox profile's `chrome/` directory and is activated by setting `toolkit.legacyUserProfileCustomizations.stylesheets` to `true` in `about:config`.

There is no build system, test suite, or linter — changes are pure CSS applied directly by Firefox on restart (or via the Browser Toolbox for live preview).

## Architecture

- **`userChrome.css`** — Styles the browser chrome (tabs, toolbars, menus, context menus). Uses CSS custom properties defined on `:root` as the theme's color tokens.
- **`userContent.css`** — Styles in-content pages: `view-source:` syntax highlighting, DevTools theming (the `about:devtools-toolbox` frame that holds the tool tabs, plus the `chrome://devtools/` and `chrome://browser/content/devtools/` panels), and blank/new-tab backgrounds (`about:home`, `about:newtab`, `about:blank`, `about:privatebrowsing`).

## Key Conventions

### Color Palette

The theme uses the [**Apollo Dark**](https://github.com/apollo-theme/apollo-theme) palette. All colors should come from it:

| Token | Value | Role |
|---|---|---|
| `--mtheme-background-1` | `#141617` | Canvas (page / content background) |
| `--mtheme-surface` | `#1d2021` | Surface (menus, toolbars) |
| `--mtheme-background-2` | `#3c3836` | Selection / hover / separators |
| `--mtheme-foreground-1` | `#cfbc97` | Primary text |
| `--mtheme-foreground-2` | `#d5c4a1` | Secondary text |
| `--mtheme-accent` | `#fabd2f` | Focus / selected accent |

Accents: red `#fb4934`, green `#b8bb26`, blue `#83a598`, magenta `#d3869b`, cyan `#8ec07c`, inactive text `#928374`. Syntax colors follow Apollo for VS Code (keywords red, strings green, numbers magenta, types/attributes yellow, properties blue, tags cyan, comments `#928374` italic).

When adding new rules in `userChrome.css`, use the `--mtheme-*` custom properties rather than hardcoding hex values. `userContent.css` cannot read those tokens, so it repeats the hex values (listed in its header comment); in DevTools sections, prefer the `--theme-*` variables.

### Font Stack

Two font families are used:

- **UI font (browser chrome):** `Rec Sans Mt.Baker`, forced globally via the
  `* { font-family: … !important }` rule at the top of `userChrome.css`.
- **Monospace font (DevTools code, view-source):** `Rec Mono St.Helens`, with
  `Rec Sans Mt.Baker` as the fallback.

In DevTools, UI text is Rec Sans 13px and code is Rec Mono 12px. "Code" follows
Firefox's own split: whatever it renders with `--monospace-font-family` (the
`.devtools-monospace`, `.cm-editor`, `.CodeMirror`, `.tag-line`, `.message`, …
containers listed in `userContent.css`). A new code surface goes in both code
lists (as `X` and `X *`). The font rules use `:where()` so specificity stays in
fixed tiers — UI (0) < code (1) < UI nested inside code (2) — whatever selectors
the lists hold; keep new font rules inside that scheme.

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

Unwanted context menu items (Send to Device, Pocket) are hidden via `display: none !important` on their element IDs. New items to hide should follow the same pattern in the existing ID list block in `userChrome.css`.
