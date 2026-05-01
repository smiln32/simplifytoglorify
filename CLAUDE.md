# Claude Code Guidelines — Simplify to Glorify

## Workspace Layout

The canonical git repo is:
`C:\Users\smiln\OneDrive\Desktop\simplifytoglorify`

- This folder is the single source of truth. Always confirm `git remote -v` points to `github.com/smiln32/simplifytoglorify` before staging or pushing anything.
- Never use `git push --force`. Use standard pushes only.
- Before any push, verify these config files still exist — if any are missing, stop and report before proceeding:
  - `tsconfig.json`
  - `tsconfig.node.json`
  - `tsconfig.app.json`
  - `postcss.config.js`
  - `vite.config.ts`
  - `tailwind.config.js`
  - `netlify.toml`

## Shell Environment

- The shell is **PowerShell on Windows**. Use PowerShell-compatible syntax for all commands.
- Use `;` instead of `&&` to chain commands.
- Use `$env:VAR` for environment variables, not `export VAR=`.

## Multi-File Changes

- When asked to update something across multiple files (fonts, components, class names, copy), search the entire project first and apply the change to **all matching files in one pass**.
- After editing, run a grep to confirm zero references to the old value remain.
- Do not stop after the first file.
