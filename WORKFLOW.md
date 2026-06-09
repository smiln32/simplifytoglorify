# PC ↔ Laptop Workflow Cheat Sheet

Your project lives on GitHub: **github.com/smiln32/simplifytoglorify**
That is the single source of truth. Both computers sync through it — no more ZIP downloads.

---

## One-time setup (do once per computer)

1. Install **GitHub Desktop**: https://desktop.github.com — sign in as `smiln32`.
2. **Clone the repo:** File → Clone repository → `simplifytoglorify`.
   - Save it somewhere simple like `C:\Users\smiln\Desktop\simplifytoglorify`
   - ⚠️ **NOT inside the OneDrive folder.** OneDrive and git fight each other.
3. Open a terminal in that folder and run `npm install` (one time, to get dependencies).

---

## Every work session (the rhythm)

### ▶️ When you SIT DOWN to work
1. Open **GitHub Desktop** → click **"Pull origin"** (gets the latest from the other machine).
2. Then work as normal (`npm run dev`, edit files, etc.).

### ⏹️ When you FINISH working
1. In GitHub Desktop, you'll see your changed files on the left.
2. Type a short **Summary** of what you did → click **"Commit to main"**.
3. Click **"Push origin"** (sends your work up to GitHub).
4. Netlify automatically builds and deploys the live site from `main`.

> **Golden rule:** _Pull when you start, Push when you stop._
> Always Push before you switch computers, and always Pull on the other one before you start.

---

## If you forget and edit on both machines

GitHub Desktop will warn you about a "conflict." Don't panic:
- Pull first, resolve the highlighted file(s), then commit and push.
- To avoid this entirely: just remember to **Push before leaving a machine.**

---

## Command-line version (optional, same thing)

```powershell
git pull            # start of session
# ...do your work...
git add -A
git commit -m "what I changed"
git push            # end of session
```

---

## Quick reference

| Situation | Do this |
|---|---|
| Starting work | **Pull origin** |
| Done working | **Commit** → **Push origin** |
| Switching PC → laptop | Push on PC, then Pull on laptop |
| Site not updating | Make sure you **Pushed**; Netlify deploys on push to `main` |
| Need it on a NEW machine | Install GitHub Desktop → Clone → `npm install` |

**Never download a ZIP again.** Clone once, then Pull/Push.
