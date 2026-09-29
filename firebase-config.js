// Your Firebase project's web config. Fill this in ONCE (Firebase console ->
// Project settings -> General -> Your apps -> Web app). Future updates to the
// app never touch this file, so you won't have to paste these values again.
window.FAITH_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAAnX0L3qSxcRohz7USm4ZU7dY7wJHIe08",
  authDomain: "faith-checklist.firebaseapp.com",
  projectId: "faith-checklist",
  storageBucket: "faith-checklist.firebasestorage.app",
  messagingSenderId: "878282088276",
  appId: "1:878282088276:web:e6d41f9be69ca01d7172c1",
  measurementId: "G-WEP7FB5ZBP"
};

// The PUBLIC half of the VAPID keypair used for the 8 PM push reminder.
// This one is safe to be public - it's baked into every push subscription.
// The matching PRIVATE key goes only in the push-server's environment
// variables on Railway, never here.
window.FAITH_VAPID_PUBLIC_KEY = "BIiQgWT4LAO8Ra0HhJL2ODWDHbEwrAg17iHgz0c_7gmQBNkBsYzWmPoqx9vW0VbZDGDkXTOXtdAVqypPIQZL-PU";
