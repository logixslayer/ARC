export function EmptyState({ title, message }: { title: string; message: string }) {
  return <div className="empty-state"><strong>{title}</strong><p>{message}</p></div>;
}
export function LoadingState() {
  return <div className="loading-state" aria-label="Loading"><span /><span /><span /></div>;
}
export function ErrorState({ message = "Something went wrong. Please try again." }: { message?: string }) {
  return <div className="error-state" role="alert">{message}</div>;
}
