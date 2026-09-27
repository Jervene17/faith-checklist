# Faith Checklist — standalone app with accounts

This app now supports real accounts: each person signs up with an email and
password, and their checklist data is stored in the cloud (Firebase), so it
follows them across devices. Hosting is still free and simple — a static
site on GitHub Pages, no server for you to run or maintain.

## One-time setup: create your free Firebase project

This step connects the app to your own private cloud database. It takes
about 10 minutes and costs nothing for this kind of usage.

1. Go to https://console.firebase.google.com and sign in with a Google
   account.
2. Click **Add project**, give it a name (e.g. "faith-checklist"), and
   finish the wizard (you can decline Google Analytics — not needed).
3. In the left sidebar, go to **Build → Authentication**. Click
   **Get started**. Under "Sign-in method," enable **Email/Password** and
   save.
4. In the left sidebar, go to **Build → Firestore Database**. Click
   **Create database**. Choose any nearby region, and start in
   **production mode** (we'll set proper rules next). Click Enable.
5. Once the database is created, click the **Rules** tab and replace the
   contents with what's in `firestore.rules` in this folder, then
   **Publish**. This makes sure each person can only read and write their
   own data.
6. Click the gear icon next to "Project Overview" → **Project settings**.
   Scroll to "Your apps," click the **</> (Web)** icon, give the app any
   nickname, and click **Register app**. Firebase will show you a code
   snippet with a `firebaseConfig` object — copy those values.
7. Open `index.html` in a text editor, find the block near the top of the
   `<script>` section that looks like this:

   ```js
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

   Replace each value with the matching one Firebase gave you, then save
   the file.

That's it for setup — the app now talks to your Firebase project.

## Deploying to GitHub Pages

Same as before:

1. Create (or reuse) a GitHub repository and upload `index.html`,
   `manifest.json`, `sw.js`, `icon-192.png`, and `icon-512.png` (you don't
   need to upload `firestore.rules` — that one only gets pasted into the
   Firebase console, not hosted).
2. In the repo's **Settings → Pages**, set Source to "Deploy from a
   branch," branch `main`, folder `/ (root)`, and save.
3. Open the resulting `https://yourname.github.io/your-repo/` URL. You
   (and anyone else) can now sign up with an email and password.

## What happens to data that was already on your phone

If you were using the earlier local-only version of this app on this same
device and browser, the first time you create an account here, it will
notice that old data and ask if you'd like to import it into your new
account. Say yes, and your history carries over. On a different device or
browser, there's nothing to detect, so a fresh account starts empty — use
"Restore backup" with a previously exported `.json` file if you have one.

## Backups

Even with cloud storage, it's worth occasionally using **"Back up data"**
in the app to save a local `.json` copy, and **"Restore backup"** to load
one back in.

## Awards and the group leaderboard

Every tab now shows **"Your milestones"** — how the period you're viewing
compares to your own history in each category, plus an "Overall average"
score that blends all categories together (each category is scored out of
100 relative to your own best-ever result in it, then averaged).

The Week, Month, and Year tabs also show a **"Group leaderboard"** —
who's currently leading each category, and an overall ranking, among
everyone who has signed up and logged data for that period. Only
aggregated counts and the display name chosen at signup are shared this
way; diary entries and day-by-day details stay private to each person.

**If you already deployed this app before this feature was added**, you
need to update your Firestore rules once — this version's `firestore.rules`
adds a `leaderboard` collection that Firestore will otherwise block.
Go back to Firestore → **Rules** in the Firebase console, replace the
contents with the new `firestore.rules` from this folder, and **Publish**
again.

## Sharing this with others

Once it's deployed, just share the URL. Anyone can tap **Create an
account** and start their own private record — nobody can see anyone
else's data, enforced by the Firestore rules from step 5 above.
