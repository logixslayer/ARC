import type { ReactNode } from "react";
export function Surface({ title, children }: { title?: string; children: ReactNode }) {
  return <section className="surface">{title && <div className="surface-title">{title}</div>}{children}</section>;
}
