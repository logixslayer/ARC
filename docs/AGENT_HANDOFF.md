# Agent handoff

## Agent 01 — frontend

Implemented the Phase 1 Vite/React/TypeScript skeleton, public and protected routes, structural layout, reusable UI primitives, typed entities, service interfaces, and documentation.

## Agent 02 — backend

Replace `src/services/authAdapter.ts` with the Firebase-backed auth adapter behind the existing `AuthService` contract, connect `ProtectedRoute` to auth state, and implement `ArcDataService` without changing the frontend entity contracts or routes.

## Integration checklist

- Confirm auth loading state before redirecting.
- Keep all reads and writes user-scoped.
- Preserve explicit error states.
- Replace placeholder feature sections with service-backed components.

## Agent 02 — Firebase backend

Implemented the Firebase integration on `feature/firebase-backend`:

- `src/services/firebase.ts` initializes the Firebase web SDK from `VITE_FIREBASE_*` variables.
- `src/services/authAdapter.ts` implements email/password auth, password reset, profile initialization, sign-out, and an auth-state observer.
- `src/services/dataService.ts` implements the declared typed ARC data service with authenticated user scoping.
- `firestore.rules` enforces authenticated ownership for profiles, preferences, and data collections.
- `.env.example` documents configuration placeholders only.

The frontend should call `authService` instead of the legacy `setAuthenticated` compatibility method and subscribe to `authService.subscribe` before redirecting protected routes. No Storage bucket is used because the current contracts do not require file uploads.
