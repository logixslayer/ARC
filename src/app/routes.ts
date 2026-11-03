import type { LucideIcon } from "lucide-react";
import { BarChart3, Brain, CalendarDays, CheckSquare, Clock3, FileText, LayoutDashboard, Settings, Timer } from "lucide-react";

export type RouteDefinition = {
  path: string;
  label: string;
  description: string;
  icon: LucideIcon;
  sections: string[];
};

export const routeDefinitions: RouteDefinition[] = [
  { path: "/app/dashboard", label: "Dashboard", description: "Your daily overview and next best actions.", icon: LayoutDashboard, sections: ["Daily overview", "Today’s tasks", "Upcoming reminders", "Focus statistics", "Quick capture"] },
  { path: "/app/brain", label: "Brain", description: "Capture thoughts and turn them into organized ideas.", icon: Brain, sections: ["Thought input", "Recent thoughts", "Categories", "Organized ideas"] },
  { path: "/app/tasks", label: "Tasks", description: "Manage priorities, progress, and deadlines.", icon: CheckSquare, sections: ["Task creation", "List view", "Kanban view", "Filters"] },
  { path: "/app/planner", label: "Planner", description: "Shape your day with intentional time blocks.", icon: CalendarDays, sections: ["Daily planner", "Weekly planner", "Time blocks", "Schedule management"] },
  { path: "/app/reminders", label: "Reminders", description: "Keep important moments visible at the right time.", icon: Clock3, sections: ["Reminder creation", "Reminder list", "Recurrence settings"] },
  { path: "/app/focus", label: "Focus", description: "Create a calm workspace for meaningful work.", icon: Timer, sections: ["Pomodoro timer", "Session controls", "Focus progress", "Session history"] },
  { path: "/app/vault", label: "Knowledge Vault", description: "Keep resources, notes, and ideas connected.", icon: FileText, sections: ["Resource cards", "Links and notes", "Tags and categories", "Search"] },
  { path: "/app/journal", label: "Journal", description: "Reflect on the day and preserve what matters.", icon: FileText, sections: ["Daily writing", "Reflection entry", "Journal history"] },
  { path: "/app/analytics", label: "Analytics", description: "See patterns in your work and focus.", icon: BarChart3, sections: ["Productivity summary", "Task completion", "Focus time"] },
  { path: "/app/settings", label: "Settings", description: "Manage your profile and ARC preferences.", icon: Settings, sections: ["Profile", "Preferences", "Theme", "Notifications"] },
];
