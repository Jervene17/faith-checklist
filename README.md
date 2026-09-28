# Faith Checklist

Accounts, groups, badges and a private diary. Static site (GitHub Pages) + free Firebase.

## Files
- `index.html` – the app (safe to replace on every update)
- `firebase-config.js` – YOUR Firebase keys. Fill in once; never re-upload after that
- `firestore.rules` – paste into Firebase console → Firestore → Rules → Publish (not uploaded to GitHub)
- `sw.js`, `manifest.json`, icons – installable/offline support

## Updating from an earlier version
1. In GitHub, upload the new `index.html` and `sw.js`.
2. Upload `firebase-config.js` ONCE, then edit it on GitHub (pencil icon) and paste your real
   Firebase values in place of the `YOUR_...` placeholders. Since your keys now live in this
   separate file, future updates won't overwrite them.
3. Publish the new `firestore.rules` in the Firebase console (adds the `groups` collection).

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

## Private diary
Diary text is encrypted on your device with a diary passphrase before it is saved, so nobody,
including the Firebase project owner, can read it. Forgetting the passphrase means the diary cannot
be recovered. Past entries: More → Diary history.

## Logging window
You can log for today and back to the most recent Sunday.
