
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (
  !firebaseConfig.projectId ||
  !firebaseConfig.clientEmail ||
  !firebaseConfig.privateKey
) {
  throw new Error(
    "Firebase Admin credentials are missing. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY."
  );
}

const firebaseApp =
  getApps().length === 0
    ? initializeApp({
        credential: cert(firebaseConfig),
      })
    : getApps()[0];

export const firebaseAuth = getAuth(firebaseApp);