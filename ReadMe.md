FireFox Customized Theme
---

Yet, just another fully customized theme for Firefox, featuring the [**Apollo Dark**](https://github.com/apollo-theme/apollo-theme) palette and a custom font setup.


#### Features

- **Apollo Dark** color scheme for browser chrome, DevTools (toolbox tabs included), and view-source pages
- **Rec Sans Mt.Baker** as the default UI font (browser chrome)
- **Rec Mono St.Helens** as the code font (DevTools code surfaces, view-source)
- DevTools UI text in Rec Sans 13px, code in Rec Mono 12px
- **Apollo** syntax highlighting (matching Apollo for VS Code) in DevTools editors and `view-source:` pages
  - Limitation: the Debugger's CodeMirror 6 tokenizer gives function calls the same class as variables, and `null` / `undefined` / `NaN` the keyword or variable class, so those can't get Apollo's yellow / magenta there (the Console's object previews do).
- macOS font antialiasing (`-moz-osx-font-smoothing: grayscale`)
- Context menu cleanup (hidden: Send to Device, Pocket)
- White flash prevention for new tabs / blank pages


#### Files

| File | Purpose |
|---|---|
| `userChrome.css` | Styles browser chrome (tabs, toolbars, menus, context menus) |
| `userContent.css` | Styles view-source pages, DevTools theming, and about: pages |


#### How to install

1. Locate your profile folder.
> Click **Help → More Troubleshooting Information**, then find **Profile Folder** and click **Open Folder**.
2. Open a terminal here (PowerShell, Bash, Zsh — anything with `git`).
3. Use `git clone https://github.com/MOSconfig/oh-my-firefox.git chrome` to download this theme.
4. Open **about:config** and set `toolkit.legacyUserProfileCustomizations.stylesheets` to `true`.
5. *(Recommended)* Go to **Settings → Fonts and Colors → Advanced**, set **Proportional** to `Rec Sans Mt.Baker` and **Monospace** to `Rec Mono St.Helens`.
6. Restart Firefox and enjoy.


#### Fonts

| Context | Font | Method |
|---|---|---|
| Browser UI | Rec Sans Mt.Baker 13px (tab titles included) | `userChrome.css` |
| DevTools UI | Rec Sans Mt.Baker 13px | `userContent.css` |
| DevTools code | Rec Mono St.Helens 12px | `userContent.css` |
| View-source | Rec Mono St.Helens 12px | `userContent.css` |


#### Why doing this

I like Firefox much more than Edge or Chrome, while it can let me fully customize my browser, makes me feel control everything.

Edge or Chrome never lets me increase the font size of a tab title. That sucks.
