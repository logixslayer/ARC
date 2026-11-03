import { useState } from "react";
import { ArrowUpRight, Check, Plus, Sparkles } from "lucide-react";
import type { RouteDefinition } from "../app/routes";
import { Button } from "../components/ui/Button";
import { EmptyState, LoadingState } from "../components/ui/States";
import { Surface } from "../components/ui/Surface";

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
              <h2>Good morning, Alex.</h2>
              <p>You have a focused day ahead. Here is what deserves your attention first.</p>
            </div>
            <div className="daily-score"><strong>72%</strong><span>day planned</span></div>
          </div>
          <div className="metric-grid">
            <div className="metric-card"><span className="metric-label">Open tasks</span><strong>12</strong><span className="metric-trend positive">↓ 3 from yesterday</span></div>
            <div className="metric-card"><span className="metric-label">Focus time</span><strong>2h 40m</strong><span className="metric-trend">Goal: 4h</span></div>
            <div className="metric-card"><span className="metric-label">Completed</span><strong>8</strong><span className="metric-trend positive">↑ 20% this week</span></div>
          </div>
        </div>
      )}
      <div className="section-grid">
        {definition.sections.map((section, index) => <Surface title={section} key={section}>
          {index === 0 && definition.path === "/app/dashboard" ? <div className="priority-list"><div className="list-item"><span className="task-check"><Check size={14} /></span><span><strong>Review product brief</strong><small>Work · Due in 2 hours</small></span><ArrowUpRight size={16} aria-hidden="true" /></div><div className="list-item"><span className="task-check"><Check size={14} /></span><span><strong>Plan tomorrow’s deep work</strong><small>Planning · 15 min</small></span><ArrowUpRight size={16} aria-hidden="true" /></div><button className="text-button">View all tasks <ArrowUpRight size={14} /></button></div>
            : index === 0 ? <EmptyState title="Ready when you are" message="This workspace is connected to its typed service contract and ready for backend data." /> : index === 1 ? <LoadingState /> : <EmptyState title="No items yet" message="Items created here will appear in this section." />}
        </Surface>)}
      </div>
    </div>
  );
}
