# Claude Code Guidelines — Simplify to Glorify

## Shell Environment

- PowerShell on Windows. Use PowerShell-compatible syntax for all commands.
- Use `;` instead of `&&` to chain commands.
- Use `$env:VAR` for environment variables.

## Multi-File Changes

- Search the entire project first, then apply the change to all matching files in one pass.
- After editing, grep to confirm zero references to the old value remain.
