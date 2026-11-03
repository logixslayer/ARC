export type ID = string;
export type Timestamp = string;
export type TaskStatus = "todo" | "in_progress" | "done" | "archived";
export type Priority = "low" | "medium" | "high";
export interface User { id: ID; email: string; displayName: string; photoUrl?: string; createdAt: Timestamp; }
export interface UserPreferences { userId: ID; theme: "light" | "dark" | "system"; timezone: string; notifications: boolean; }
export interface Thought { id: ID; userId: ID; content: string; category?: string; createdAt: Timestamp; convertedTaskId?: ID; }
export interface Task { id: ID; userId: ID; title: string; description?: string; status: TaskStatus; priority: Priority; dueAt?: Timestamp; createdAt: Timestamp; }
export interface Schedule { id: ID; userId: ID; title: string; startsAt: Timestamp; endsAt: Timestamp; taskId?: ID; }
export interface Reminder { id: ID; userId: ID; title: string; dueAt: Timestamp; recurrence?: string; completed: boolean; }
export interface FocusSession { id: ID; userId: ID; startedAt: Timestamp; endedAt?: Timestamp; durationMinutes: number; taskId?: ID; }
export interface VaultItem { id: ID; userId: ID; title: string; url?: string; notes?: string; tags: string[]; createdAt: Timestamp; }
export interface JournalEntry { id: ID; userId: ID; body: string; mood?: string; createdAt: Timestamp; updatedAt: Timestamp; }
export interface Goal { id: ID; userId: ID; title: string; progress: number; dueAt?: Timestamp; }
