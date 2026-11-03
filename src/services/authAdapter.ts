import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import type { AuthService } from "./contracts";
import { firebaseAuth, firestore } from "./firebase";
import type { User } from "../types";

function toUser(user: FirebaseUser): User {
  return {
    id: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
    ...(user.photoURL ? { photoUrl: user.photoURL } : {}),
    createdAt: user.metadata.creationTime ?? new Date().toISOString(),
  };
}

async function initializeUserProfile(user: FirebaseUser, displayName?: string): Promise<User> {
  const profile: User = {
    id: user.uid,
    email: user.email ?? "",
    displayName: displayName ?? user.displayName ?? "",
    ...(user.photoURL ? { photoUrl: user.photoURL } : {}),
    createdAt: user.metadata.creationTime ?? new Date().toISOString(),
  };
  await setDoc(
    doc(firestore, "users", user.uid),
    { ...profile, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
    { merge: true },
  );
  return profile;
}

export const authService: AuthService & {
  subscribe(listener: (user: User | null) => void): () => void;
} = {
  async signIn(email, password) {
    const result = await signInWithEmailAndPassword(firebaseAuth, email.trim(), password);
    return initializeUserProfile(result.user);
  },
  async signUp(email, password, displayName) {
    const result = await createUserWithEmailAndPassword(firebaseAuth, email.trim(), password);
    const name = displayName.trim();
    if (name) await updateProfile(result.user, { displayName: name });
    return initializeUserProfile(result.user, name);
  },
  async signOut() {
    await signOut(firebaseAuth);
  },
  async sendPasswordReset(email) {
    await sendPasswordResetEmail(firebaseAuth, email.trim());
  },
  async getCurrentUser() {
    return firebaseAuth.currentUser ? toUser(firebaseAuth.currentUser) : null;
  },
  subscribe(listener) {
    return onAuthStateChanged(firebaseAuth, (user) => listener(user ? toUser(user) : null));
  },
};
