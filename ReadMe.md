FireFox Customized Theme
---

Yet, just another fully customized theme for Firefox, featuring **Gruvbox Dark** colors and custom font setup.


#### Features

- **Gruvbox Dark** color scheme for browser chrome, DevTools, and view-source pages
- **Resource Han Rounded CN** as the default UI font (browser chrome)
- **Rec Mono St.Helens** as the monospace font (DevTools, view-source)
- **Gruvbox Medium** syntax highlighting for `view-source:` pages
- macOS font antialiasing (`-moz-osx-font-smoothing: grayscale`)
- Context menu cleanup (hidden: Send to Device, Pocket)
- White flash prevention for new tabs / blank pages
- Tampermonkey userscript to prepend preferred fonts on web content without breaking icon fonts


#### Files

| File | Purpose |
|---|---|
| `UserChrome.css` | Styles browser chrome (tabs, toolbars, menus, context menus) |
| `UserContent.css` | Styles view-source pages, DevTools theming, and about: pages |
| `prepend-fonts.user.js` | Tampermonkey userscript — prepends preferred fonts to web content font stacks |


#### How to install

1. Locate your profile folder.
> Click **Help → More Troubleshooting Information**, then find **Profile Folder** and click **Open Folder**.
2. Open a terminal here (PowerShell, Bash, Zsh — anything with `git`).
3. Use `git clone https://github.com/MOSconfig/oh-my-firefox.git chrome` to download this theme.
4. Open **about:config** and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`.
5. *(Recommended)* Go to **Settings → Fonts and Colors → Advanced**, set **Proportional** to `Resource Han Rounded CN` and **Monospace** to `Rec Mono St.Helens`.
6. *(Optional)* For web content font prepending: install [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) and import `prepend-fonts.user.js`. This prepends your preferred fonts to every page's font stack without replacing site fonts or breaking icon fonts.
7. Restart Firefox and enjoy.


#### Fonts

| Context | Font | Method |
|---|---|---|
| Browser UI | Resource Han Rounded CN | `UserChrome.css` |
| DevTools | Rec Mono St.Helens | `UserContent.css` |
| View-source | Rec Mono St.Helens | Firefox Preferences (`-moz-fixed`) |
| Web content | Resource Han Rounded CN (prepended) | `prepend-fonts.user.js` via Tampermonkey |
| Web content code | Rec Mono St.Helens (prepended) | `prepend-fonts.user.js` via Tampermonkey |


#### Why doing this

I like Firefox much more than Edge or Chrome, while it can let me fully customize my browser, makes me feel control everything.

Edge or Chrome never lets me increase the font size of a tab title. That sucks.
