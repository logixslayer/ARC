import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  Timestamp as FirestoreTimestamp,
} from "firebase/firestore";
import type { ArcDataService } from "./contracts";
import { firebaseAuth, firestore } from "./firebase";
import type {
  FocusSession,
  Goal,
  JournalEntry,
  Reminder,
  Schedule,
  Task,
  Thought,
  UserPreferences,
  VaultItem,
} from "../types";

function requireUserId(): string {
  const user = firebaseAuth.currentUser;
  if (!user) throw new Error("You must be signed in to access ARC data.");
  return user.uid;
}

function toIso(value: unknown): string | undefined {
  if (value instanceof FirestoreTimestamp) return value.toDate().toISOString();
  if (value instanceof Date) return value.toISOString();
  return typeof value === "string" ? value : undefined;
}

function withId<T>(id: string, data: Record<string, unknown>): T {
  const normalized = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [key, toIso(value) ?? value]),
  );
  return { id, ...normalized } as T;
}

async function listOwned<T>(name: string, userId: string): Promise<T[]> {
  const snapshot = await getDocs(query(collection(firestore, name), where("userId", "==", userId)));
  return snapshot.docs.map((item) => withId<T>(item.id, item.data()));
}

function ownedPayload(userId: string, payload: Record<string, unknown>): Record<string, unknown> {
  const { id: _id, userId: _userId, createdAt: _createdAt, ...safePayload } = payload;
  return { ...safePayload, userId };
}

export const dataService: ArcDataService = {
  thoughts: {
    async list() {
      return listOwned<Thought>("thoughts", requireUserId());
    },
    async create(input) {
      const userId = requireUserId();
      const reference = await addDoc(collection(firestore, "thoughts"), {
        ...ownedPayload(userId, input),
        createdAt: serverTimestamp(),
      });
      return withId<Thought>(reference.id, { ...input, userId, createdAt: new Date().toISOString() });
    },
  },
  tasks: {
    async list() {
      return listOwned<Task>("tasks", requireUserId());
    },
    async create(input) {
      const userId = requireUserId();
      const reference = await addDoc(collection(firestore, "tasks"), {
        ...ownedPayload(userId, input),
        createdAt: serverTimestamp(),
      });
      return withId<Task>(reference.id, { ...input, userId, createdAt: new Date().toISOString() });
    },
    async update(id, input) {
      const userId = requireUserId();
      const reference = doc(firestore, "tasks", id);
      const existing = await getDoc(reference);
      if (!existing.exists() || existing.data().userId !== userId) throw new Error("Task not found.");
      const payload = ownedPayload(userId, input);
      await updateDoc(reference, payload);
      return withId<Task>(id, { ...existing.data(), ...payload });
    },
    async delete(id) {
      const userId = requireUserId();
      const reference = doc(firestore, "tasks", id);
      const existing = await getDoc(reference);
      if (!existing.exists() || existing.data().userId !== userId) throw new Error("Task not found.");
      await deleteDoc(reference);
    },
  },
  schedules: { list: () => listOwned<Schedule>("schedules", requireUserId()) },
  reminders: { list: () => listOwned<Reminder>("reminders", requireUserId()) },
  focusSessions: { list: () => listOwned<FocusSession>("focusSessions", requireUserId()) },
  vault: { list: () => listOwned<VaultItem>("vaultItems", requireUserId()) },
  journal: {
    async list() {
      return listOwned<JournalEntry>("journalEntries", requireUserId());
    },
    async create(body) {
      const userId = requireUserId();
      const now = new Date().toISOString();
      const reference = await addDoc(collection(firestore, "journalEntries"), {
        body,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return withId<JournalEntry>(reference.id, { body, userId, createdAt: now, updatedAt: now });
    },
  },
  goals: { list: () => listOwned<Goal>("goals", requireUserId()) },
  preferences: {
    async get() {
      const userId = requireUserId();
      const reference = doc(firestore, "users", userId, "preferences", "default");
      const snapshot = await getDoc(reference);
      if (snapshot.exists()) return withId<UserPreferences>(userId, snapshot.data());
      const defaults: UserPreferences = {
        userId,
        theme: "system",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        notifications: true,
      };
      await setDoc(reference, defaults);
      return defaults;
    },
    async update(input) {
      const userId = requireUserId();
      const reference = doc(firestore, "users", userId, "preferences", "default");
      const existing = await getDoc(reference);
      const payload = { ...input, userId };
      await setDoc(reference, payload, { merge: true });
      return {
        ...(existing.exists() ? (existing.data() as UserPreferences) : await this.get()),
        ...payload,
        userId,
      };
    },
  },
};
