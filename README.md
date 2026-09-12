# Faith Checklist — standalone app

This is a self-contained web app: no server, no build step, no account needed.
Your data is saved in your phone or browser's local storage, so it stays on
the device you use it on.

## Fastest way to get it on your phone (GitHub Pages, free)

1. Go to https://github.com and create a free account if you don't have one.
2. Click **New repository**, name it something like `faith-checklist`, keep it
   Public, and create it.
3. On the repository page, click **Add file → Upload files**, and drag in all
   five files from this folder (`index.html`, `manifest.json`, `sw.js`,
   `icon-192.png`, `icon-512.png`). Commit the upload.
4. Go to **Settings → Pages**. Under "Build and deployment", set
   **Source: Deploy from a branch**, branch **main**, folder **/ (root)**.
   Save.
5. GitHub gives you a URL like `https://yourname.github.io/faith-checklist/`.
   It takes a minute or two to go live.
6. Open that URL on your phone:
   - **iPhone (Safari):** tap the Share icon → "Add to Home Screen."
   - **Android (Chrome):** tap the menu (⋮) → "Install app" or "Add to Home
     Screen."

You'll get a home-screen icon that opens full-screen, like a normal app.

## Alternative: Netlify drag-and-drop (also free, no GitHub account)

1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. Netlify gives you a live URL immediately. Open it on your phone and add it
   to your home screen as above.

## Backing up your data

Because everything is stored locally on one device, it's a good idea to back
up occasionally — especially before switching phones or clearing browser
data. Inside the app, use the **"Back up data"** link near the top to save a
`.json` file, and **"Restore backup"** to load it back in (on the same device
or a new one).

## Updating it later

If you ever want changes to the app, just re-upload the new `index.html` (and
any other changed files) to the same GitHub repository or Netlify site — your
existing backup file still works with any future version.
