# Frontend/backend contract

Shared entities are defined in `src/types/index.ts`. Expected service boundaries are defined in `src/services/contracts.ts`. Backend services must return user-scoped entities, preserve the declared fields and timestamp format, and expose explicit loading, empty, and error outcomes.

Agent 02 owns Firebase configuration, auth implementation, Firestore services, rules, storage, and functions. Frontend code must consume service interfaces and must not create competing Firebase clients or schemas.
