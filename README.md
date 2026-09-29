# Faith Checklist

Accounts, groups, badges and a private diary. Static site (GitHub Pages) + free Firebase.

## Files
- `index.html` – the app (safe to replace on every update)
- `firebase-config.js` – YOUR Firebase keys + VAPID public key. Fill in once; never re-upload after that
- `firestore.rules` – paste into Firebase console → Firestore → Rules → Publish (not uploaded to GitHub)
- `sw.js`, `manifest.json`, icons – installable/offline support, and now real push delivery
- `push-server/` – a small always-on Python service (deploy to Railway) that actually sends the
  8 PM notification, even when nobody has the app open

## Updating from an earlier version
1. In GitHub, upload the new `index.html` and `sw.js`.
2. Upload `firebase-config.js` ONCE, then edit it on GitHub (pencil icon) and paste your real
   Firebase values in place of the `YOUR_...` placeholders. Since your keys now live in this
   separate file, future updates won't overwrite them - **don't re-upload this file** once it has
   your real values, or you'll wipe them back to placeholders. If a new version adds a new line to
   this file (like `FAITH_VAPID_PUBLIC_KEY` below), add just that one line to your existing file by
   hand on GitHub instead of replacing the whole thing.
3. Publish the new `firestore.rules` in the Firebase console. Each version has added to it - the
   groups collection, group-item editing, and in this version a `pushSubscriptions` collection for
   real push notifications - so republish it again any time you update.
4. If you want the 8 PM reminder to arrive even when the app is fully closed, see **Real push
   notifications** below - it's a one-time setup involving a small separate server.

## Badges (per week, month and year)
Predawn = Morning star · Sunday attendance = Lord's glory · Wednesday attendance = Win and win again ·
Bible = LifeScrolling · Exercise = Strong body for the Lord · Catch up = Unshaken ·
Diary = Close to the Lord · Holy Spirit letters = Holy Spirit · Sunday/Wednesday message re-reads =
Word of life · Meet and invite lives = Loving lives · Lecture = Truth.
Whoever holds the most badges wins the period (ties broken by overall average), among everyone and
within each group you belong to.

## Groups
Everyone picks their groups right after creating an account (or later under More → My groups).
Anyone can create a group; group names are shared with all signed-in users. Only counts and display
names are shared for leaderboards, never diary text.

## Group-specific checklist items and badges
Whoever creates a group can add extra checklist items just for that group (More → My groups →
Manage group items, under the group they created). Each item is either a daily checkbox or a +/−
counter, and gets its own badge name chosen at the same time. Members of that group see the item on
their Today tab automatically, and it's scored in that group's own Week/Month/Year awards — switch
the pill at the top of Awards to the group's name to see it. These items and badges never appear in
the "Everyone" overall awards, only within their own group. A group can hold up to 10 custom items,
and only the creator can add or remove them.

## Private diary
Diary text is encrypted on your device with a diary passphrase before it is saved, so nobody,
including the Firebase project owner, can read it. Forgetting the passphrase means the diary cannot
be recovered. Past entries: More → Diary history.

## Logging window
You can log for today and back to the most recent Sunday.

## Real push notifications (8 PM reminder)

This sends an actual push notification through the browser's own push service, so it arrives even if
the app and browser are fully closed - the same mechanism any other app's notifications use. That
needs one small extra piece: a tiny always-on server holding a private key, since browsers only
deliver push messages that are cryptographically signed by whoever's allowed to send them.

### One-time setup

1. **Get a VAPID keypair.** A fresh one was generated for this project:
   - Public: `BIiQgWT4LAO8Ra0HhJL2ODWDHbEwrAg17iHgz0c_7gmQBNkBsYzWmPoqx9vW0VbZDGDkXTOXtdAVqypPIQZL-PU`
   - Private: keep this only in Railway's environment variables (see step 4) - never in GitHub or
     `index.html`. Ask for it separately from wherever this project's secrets are kept, or generate
     your own fresh pair any time with `npx web-push generate-vapid-keys` (needs Node.js) or
     `pip install py_vapid && python -m py_vapid`.
2. **Paste the public key** into `firebase-config.js`:
   ```js
   window.FAITH_VAPID_PUBLIC_KEY = "BIiQgWT4LAO8Ra0HhJL2ODWDHbEwrAg17iHgz0c_7gmQBNkBsYzWmPoqx9vW0VbZDGDkXTOXtdAVqypPIQZL-PU";
   ```
3. **Get a Firebase service account key** (lets the server read subscriptions - keep it secret):
   Firebase console → Project settings → **Service accounts** tab → **Generate new private key**.
   This downloads a JSON file.
4. **Deploy the `push-server/` folder to Railway:**
   - Push that folder to its own small GitHub repo (or a subfolder of one), then in Railway choose
     "Deploy from GitHub repo," or use the Railway CLI to deploy the folder directly.
   - Railway detects it as Python from `requirements.txt` and runs it as a **worker**
     (see `Procfile`) - it doesn't need a public URL, just needs to keep running.
   - Set these environment variables in Railway's dashboard:

     | Variable | Value |
     |---|---|
     | `FIREBASE_SERVICE_ACCOUNT_B64` | the service account JSON from step 3, base64-encoded (`base64 -i key.json` on Mac/Linux; on Windows, `certutil -encode key.json key.b64` then strip the `-----BEGIN-----`/`-----END-----` lines) |
     | `VAPID_PRIVATE_KEY` | the private half of the keypair from step 1 |
     | `VAPID_PUBLIC_KEY` | `BIiQgWT4LAO8Ra0HhJL2ODWDHbEwrAg17iHgz0c_7gmQBNkBsYzWmPoqx9vW0VbZDGDkXTOXtdAVqypPIQZL-PU` |
     | `VAPID_SUBJECT` | `mailto:your@email.com` (required by the push spec, just identifies you) |
     | `REMINDER_HOUR` | `20` for 8 PM, 24-hour (optional, this is the default) |
     | `REMINDER_TZ` | `Asia/Manila` (optional, this is the default) |
   - Deploy, then check the logs - it should log "Push server started" and a daily send cycle.
5. **Republish `firestore.rules`** so the app is allowed to save subscriptions.

### What people see in the app

In **More → Reminder**, tapping **"Enable 8 PM daily reminder"** asks for notification permission and
registers that device. Tapping it again ("...tap to turn off") removes it. Each device subscribes
separately, so someone using both a phone and a laptop can enable it on either or both.

### iPhone note

iOS only supports push notifications for a site that's been **added to the home screen** (Share →
Add to Home Screen), and only on iOS 16.4 or later. Opening the site in a regular Safari tab can't
turn this on - the button will say permission wasn't granted until it's installed that way.

### If a subscription goes stale

Browsers occasionally invalidate a push subscription (e.g. after long disuse). The server detects
this automatically when a send fails and removes it - that person just taps "Enable" again next time.
