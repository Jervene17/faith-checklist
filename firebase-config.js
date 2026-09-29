// Your Firebase project's web config. Fill this in ONCE (Firebase console ->
// Project settings -> General -> Your apps -> Web app). Future updates to the
// app never touch this file, so you won't have to paste these values again.
window.FAITH_FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// The PUBLIC half of the VAPID keypair used for the 8 PM push reminder.
// This one is safe to be public - it's baked into every push subscription.
// The matching PRIVATE key goes only in the push-server's environment
// variables on Railway, never here.
window.FAITH_VAPID_PUBLIC_KEY = "BIiQgWT4LAO8Ra0HhJL2ODWDHbEwrAg17iHgz0c_7gmQBNkBsYzWmPoqx9vW0VbZDGDkXTOXtdAVqypPIQZL-PU";
