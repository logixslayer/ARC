import { useEffect, useMemo, useState } from "react";
import { Check, CheckCircle2, Plus, Sparkles, Trash2 } from "lucide-react";
import type { RouteDefinition } from "../app/routes";
import { Button } from "../components/ui/Button";
import { EmptyState, ErrorState, LoadingState } from "../components/ui/States";
import { Surface } from "../components/ui/Surface";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { dataService } from "../services/dataService";
import type { Task, Thought, JournalEntry } from "../types";

type ConnectedItem = Thought | Task | JournalEntry | Record<string, unknown>;

const sectionCopy: Record<string, { title: string; message: string }> = {
  "Thought input": { title: "Make space for a thought", message: "Capture a sentence, question, or idea." },
  "Task creation": { title: "Start with one clear action", message: "Create a task to give your attention a useful next step." },
  "Daily writing": { title: "A blank page can be kind", message: "Write a few lines about today." },
};

function itemLabel(item: ConnectedItem) {
  const value = "content" in item ? item.content : "body" in item ? item.body : "title" in item ? item.title : "value" in item ? item.value : "";
  return String(value);
}

function itemId(item: ConnectedItem) {
  return String("id" in item ? item.id : "");
}

function itemMeta(item: ConnectedItem) {
  if ("status" in item) return String(item.status).replace("_", " ");
  if ("category" in item && item.category) return String(item.category);
  return "";
}

export function FeaturePage({ definition }: { definition: RouteDefinition }) {
  const [items, setItems] = useState<ConnectedItem[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const Icon = definition.icon;
  const connectedSection = useMemo(() => {
    if (definition.path === "/app/brain") return "Thought input";
    if (definition.path === "/app/tasks" || definition.path === "/app/dashboard") return "Task creation";
    if (definition.path === "/app/journal") return "Daily writing";
    return null;
  }, [definition.path]);
  const completedTasks = items.filter((item): item is Task => "status" in item && item.status === "done").length;
  const activeTasks = items.filter((item): item is Task => "status" in item && item.status !== "done").length;

  useEffect(() => {
    let active = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = definition.path === "/app/brain"
          ? await dataService.thoughts.list()
          : definition.path === "/app/tasks" || definition.path === "/app/dashboard" || definition.path === "/app/analytics"
            ? await dataService.tasks.list()
            : definition.path === "/app/planner"
              ? await dataService.schedules.list()
              : definition.path === "/app/reminders"
                ? await dataService.reminders.list()
                : definition.path === "/app/focus"
                  ? await dataService.focusSessions.list()
                  : definition.path === "/app/vault"
                    ? await dataService.vault.list()
                    : definition.path === "/app/journal"
                      ? await dataService.journal.list()
                      : [];
        if (active) setItems(result as ConnectedItem[]);
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Unable to load your ARC data.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, [definition.path]);

  async function createItem() {
    if (!input.trim() || !connectedSection) return;
    setSaving(true);
    setError("");
    try {
      const created = connectedSection === "Thought input"
        ? await dataService.thoughts.create({ content: input.trim(), category: "General" })
        : connectedSection === "Daily writing"
          ? await dataService.journal.create(input.trim())
          : await dataService.tasks.create({ title: input.trim(), status: "todo", priority: "medium" });
      setItems((current) => [created, ...current]);
      setInput("");
      setShowInput(false);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to save this item.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask(id: string) {
    try {
      await dataService.tasks.delete(id);
      setItems((current) => current.filter((item) => itemId(item) !== id));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to delete this task.");
    }
  }

  async function completeTask(task: Task) {
    try {
      const updated = await dataService.tasks.update(task.id, { status: task.status === "done" ? "todo" : "done" });
      setItems((current) => current.map((item) => itemId(item) === task.id ? updated : item));
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to update this task.");
    }
  }

  function renderConnected(section: string) {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (items.length === 0) return <EmptyState title={sectionCopy[section]?.title ?? "Nothing here yet"} message={sectionCopy[section]?.message ?? "Add your first item to start building your workspace."} />;
    return (
      <div className="connected-list">
        {items.slice(0, 8).map((item) => (
          <div className="connected-item" key={itemId(item)}>
            <div><strong>{itemLabel(item)}</strong>{itemMeta(item) && <span>{itemMeta(item)}</span>}</div>
            {definition.path === "/app/tasks" && "status" in item && (
              <div className="connected-actions">
                <Button variant="ghost" aria-label={`${item.status === "done" ? "Reopen" : "Complete"} ${itemLabel(item)}`} onClick={() => void completeTask(item as Task)}>
                  {item.status === "done" ? <CheckCircle2 size={16} /> : <Check size={16} />}
                </Button>
                <Button variant="ghost" aria-label={`Delete ${itemLabel(item)}`} onClick={() => void deleteTask(itemId(item))}><Trash2 size={15} /></Button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">{new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</p><h1><Icon size={28} aria-hidden="true" />{definition.label}</h1><p className="page-description">{definition.description}</p></div>
        {connectedSection && <Button onClick={() => setShowInput((value) => !value)}><Plus size={17} aria-hidden="true" />Add new</Button>}
      </div>
      {showInput && connectedSection && <Surface title={`Create ${definition.label.toLowerCase()} item`}><div className="inline-form"><input autoFocus value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") void createItem(); }} placeholder={`Write a new ${definition.label.toLowerCase()} item`} /><Button onClick={() => void createItem()} disabled={saving}>{saving ? "Saving..." : "Save"}</Button></div></Surface>}
      {error && !connectedSection && <ErrorState message={error} />}
      {definition.path === "/app/dashboard" && (
        <div className="dashboard-overview">
          <div className="welcome-card"><div><span className="welcome-kicker"><Sparkles size={14} aria-hidden="true" /> Your command center</span><h2>Make room for what matters.</h2><p>ARC keeps your thoughts, tasks, and focus in one calm workspace. Start with the next useful action.</p></div><div className="daily-score"><strong>{loading ? "—" : activeTasks}</strong><span>open tasks</span></div></div>
          <div className="metric-grid"><div className="metric-card"><span className="metric-label">Tasks captured</span><strong>{loading ? "—" : items.length}</strong><span className="metric-trend">From your workspace</span></div><div className="metric-card"><span className="metric-label">Completed</span><strong>{loading ? "—" : completedTasks}</strong><span className="metric-trend positive"><Check size={13} /> Marked done</span></div><div className="metric-card"><span className="metric-label">Next action</span><strong>{activeTasks ? "Review" : "Capture"}</strong><span className="metric-trend">A small step is enough</span></div></div>
        </div>
      )}
      <div className="section-grid">{definition.sections.map((section) => <Surface title={section} key={section}>{connectedSection === section ? renderConnected(section) : definition.path === "/app/settings" && section === "Theme" ? <ThemeToggle /> : <EmptyState title={sectionCopy[section]?.title ?? "Ready when you are"} message={sectionCopy[section]?.message ?? "This area is ready for your connected ARC data."} />}</Surface>)}</div>
    </div>
  );
}
