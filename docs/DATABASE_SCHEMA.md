# Database schema expectations

This document records frontend expectations only. Backend owns the physical schema and security rules. Required logical collections are users/preferences, thoughts, tasks, schedules, reminders, focus sessions, vault items, journal entries, and goals. Every entity must be scoped by `userId`; timestamps are serialized ISO strings at the frontend boundary.
