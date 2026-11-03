# ARC architecture

ARC is a Vite React TypeScript single-page application. `src/app` owns application composition and routes; `src/components` owns reusable structural UI; `src/pages` owns route-level composition; `src/types` owns shared contracts; `src/services` owns integration interfaces; `src/styles` owns global structural styling.

The application uses a `ProtectedRoute` integration point. Phase 1 uses a temporary session adapter only to make the skeleton navigable; Firebase implementations belong to Agent 02.
