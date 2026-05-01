# Safe Deploy

Deploy the site to GitHub and Netlify safely. Follow every step in order — stop and report if anything fails.

## Steps

1. **Verify repo location**
   - Run `git remote -v` and confirm the remote is `github.com/smiln32/simplifytoglorify`.
   - Run `pwd` (or `Get-Location`) and confirm we are in the correct project folder.
   - If either check fails, stop and report before doing anything else.

2. **Verify required config files exist**
   - Check that all of these files are present: `tsconfig.json`, `tsconfig.node.json`, `tsconfig.app.json`, `postcss.config.js`, `vite.config.ts`, `tailwind.config.js`, `netlify.toml`.
   - If any are missing, stop and report — do not proceed.

3. **Run the build**
   - Run `npm run build`.
   - If the build fails, stop and report the error. Do not push.

4. **Show staged changes**
   - Run `git status` and `git diff --stat` so the user can see exactly what will be committed.

5. **Commit and push**
   - Stage changed files by name (never `git add -A` blindly).
   - Commit with a clear, descriptive message.
   - Push with `git push origin main` — never `--force`.

6. **Confirm**
   - Report the commit hash and confirm the push succeeded.
   - Remind the user to check the Netlify dashboard for deploy status.
