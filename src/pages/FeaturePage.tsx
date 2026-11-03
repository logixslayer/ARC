import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import type { RouteDefinition } from "../app/routes";
import { Button } from "../components/ui/Button";
import { EmptyState } from "../components/ui/States";
import { Surface } from "../components/ui/Surface";
import { ThemeToggle } from "../components/ui/ThemeToggle";

const sectionCopy: Record<string, { title: string; message: string }> = {
  "Thought input": { title: "Make space for a thought", message: "Capture a sentence, question, or idea. Your connected brain will appear here once sync is enabled." },
  "Recent thoughts": { title: "No thoughts captured yet", message: "Your latest captures will be organized here without losing their original context." },
  "Task creation": { title: "Start with one clear action", message: "Create a task to give your attention a useful next step." },
  "List view": { title: "Your task list is ready", message: "Tasks from your workspace will appear here when the data connection is available." },
  "Daily planner": { title: "Shape your day", message: "Time blocks and appointments will appear here once your planner is connected." },
  "Reminder creation": { title: "Nothing to remember yet", message: "Add a reminder and ARC will keep it visible at the right moment." },
  "Pomodoro timer": { title: "Protect your attention", message: "Your focus timer is ready for a session. Start when you are ready to do meaningful work." },
  "Resource cards": { title: "Your vault is quiet", message: "Save a note, link, or resource to build a knowledge space that stays useful." },
  "Daily writing": { title: "A blank page can be kind", message: "Write a few lines about today. Your journal entries will stay private and organized." },
  "Productivity summary": { title: "Insights will grow with use", message: "Connect your workspace activity to see patterns without guessing at your progress." },
  Profile: { title: "Your profile", message: "Profile details will be available when account data is connected." },
};

export function FeaturePage({ definition }: { definition: RouteDefinition }) {
  const [showInput, setShowInput] = useState(false);
  const Icon = definition.icon;
  return (
    <div className="page">
      <div className="page-heading">
        <div><p className="eyebrow">Tuesday · November 3, 2026</p><h1><Icon size={28} aria-hidden="true" />{definition.label}</h1><p className="page-description">{definition.description}</p></div>
        <Button onClick={() => setShowInput((value) => !value)}><Plus size={17} aria-hidden="true" />Add new</Button>
      </div>
      {showInput && <Surface title={`Create ${definition.label.toLowerCase()} item`}><div className="inline-form"><input autoFocus placeholder={`Write a new ${definition.label.toLowerCase()} item`} /><Button onClick={() => setShowInput(false)}>Save</Button></div></Surface>}
      {definition.path === "/app/dashboard" && (
        <div className="dashboard-overview">
          <div className="welcome-card">
            <div>
              <span className="welcome-kicker"><Sparkles size={14} aria-hidden="true" /> A clear start</span>
              <h2>Your calm workspace is ready.</h2>
              <p>Start by capturing one thought or task. ARC will turn it into a clear next step when your data connection is ready.</p>
            </div>
            <div className="daily-score"><strong>Setup</strong><span>workspace status</span></div>
          </div>
          <div className="metric-grid">
            <div className="metric-card"><span className="metric-label">Workspace status</span><strong>Ready</strong><span className="metric-trend">Waiting for sync</span></div>
            <div className="metric-card"><span className="metric-label">Next step</span><strong>Capture</strong><span className="metric-trend">Start with one thought</span></div>
            <div className="metric-card"><span className="metric-label">Theme</span><strong>Personal</strong><span className="metric-trend">Choose your atmosphere</span></div>
          </div>
        </div>
      )}
      <div className="section-grid">
        {definition.sections.map((section, index) => <Surface title={section} key={section}>
          {definition.path === "/app/settings" && section === "Theme" ? <ThemeToggle /> : index === 0 && definition.path === "/app/dashboard" ? <EmptyState title="Your priorities will appear here" message="Connect your task data or use Add new to create your first next step." /> : <EmptyState title={sectionCopy[section]?.title ?? "No connected data yet"} message={sectionCopy[section]?.message ?? "This area is ready for your connected ARC data."} />}
        </Surface>)}
      </div>
    </div>
  );
}
